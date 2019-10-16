<template>
  <div class="home">
    <!-- 搜索框 -->
    <van-search
      v-model="searkey"
      class="search"
      shape="round"
      placeholder="搜索"
      show-action
      background="#FF0238"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <!-- 轮播图 -->
    <van-swipe :autoplay="2000" class="home-swipe">
      <van-swipe-item v-for="thumbitem in bannerdata" :key="thumbitem.item_id">
        <router-link :to="{name:'goods',query:{id:thumbitem.item_id}}">
          <img :src="thumbitem.thumb">
        </router-link>
      </van-swipe-item>
    </van-swipe>

    <div class="slogan">
      <img src="../../../public/images/icon.png" alt="">
      <span>资生研发发财富商城 - 隆力奇指定产品购物平台</span>
      <span/>
    </div>
    <!-- 分类区 -->
    <!-- <div class="remen">精品类别</div>
    <div style="margin:0 1%">
      <van-row gutter="8" class="category">
        <van-col v-for="(lis,i) in menu" :key="'m'+i" span="8" >
          <router-link to="/category">
            <img :src="lis.icon" alt>
            <span>{{ lis.name }}</span>
          </router-link>
        </van-col>
      </van-row>
    </div> -->

    <!-- 自营精品 -->
    <!-- <div class="remen">自营精品</div> -->
    <div class="homeimgtit">
      <img src="../../../public/images/self-goods-tit.png" alt="">
    </div>
    <ul class="ulhome2col">
      <li v-for="(lis,i) in self_goods" :key="'guess'+i">
        <router-link :to="{name:'goods',query:{id:lis.item_id}}">
          <img :src="lis.thumb" alt>
          <div class="tit">{{ lis.ad_name }}</div>
        </router-link>
      </li>
    </ul>

    <!-- 热门推荐 -->
    <!-- <div class="remen">新品热销</div> -->
    <div class="homeimgtit">
      <img src="../../../public/images/new-goods-tit.png" alt="">
    </div>
    <ul class="ulhome2col">
      <li v-for="(lis,i) in new_goods" :key="'guess'+i">
        <router-link :to="{name:'goods',query:{id:lis.item_id}}">
          <img :src="lis.thumb" alt>
          <div class="tit">{{ lis.ad_name }}</div>
          <div class="price">
            新品:<strong>￥{{ lis.goods.shop_price }}</strong> + {{ lis.goods.exchange_integral }}积分
          </div>
          <div class="oprice">
            原价：{{ lis.goods.market_price }}
          </div>
        </router-link>
      </li>
    </ul>
    <!-- <van-row gutter="0" class="imgnav">
      <van-col v-for="lis in new_goods" :key="lis.ad_id" span="8" >
        <router-link :to="{name:'goods',query:{id:lis.item_id}}">
          <img :src="lis.thumb" alt>
          <span>{{ lis.ad_name }}</span>
        </router-link>
      </van-col>
    </van-row> -->

    <!-- 猜你喜欢 -->
    <!-- <div class="remen">猜你喜欢</div> -->
    <div class="homeimgtit">
      <img src="../../../public/images/guess-goods-tit.png" alt="">
    </div>
    <!-- <ul class="ulhome2col">
      <li v-for="(lis,i) in like_goods" :key="'guess'+i">
        <router-link :to="{name:'goods',query:{id:lis.item_id}}">
          <img :src="lis.thumb" alt>
          <div class="tit">{{ lis.ad_name }}</div>
        </router-link>
      </li>
    </ul> -->
    <ul class="ulhomeimgtxt">
      <li v-for="(lis) in like_goods" :key="lis.goods_id">
        <router-link :to="{name:'goods',query:{id:lis.goods_id}}">
          <img :src="lis.original_img" alt="" class="prodimg" >
          <div class="rtcon">
            <div class="tit">{{ lis.goods_name }}</div>
            <div class="price">
              会员价:<strong>￥{{ lis.shop_price }}</strong> + {{ lis.exchange_integral }}积分
            </div>
            <div class="oprice">
              原价：{{ lis.market_price }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div style="width:100%; height:60px;"/>
    <!-- 导入全局组件 -->
    <buttom-nav :actindex="1?0:0"/>
  </div>
</template>

<script>
import {
  Button,
  Swipe,
  SwipeItem,
  Search,
  Row,
  Col,
  Tabbar,
  TabbarItem
} from 'vant'
import buttomnav from '../buttomnav/index.vue'
import { indexData } from '@/api/index'
import request from '@/utils/request'
export default {
  components: {
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Search.name]: Search,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    buttomnav
  },
  data() {
    return {
      value: '',
      bannerdata: [],
      menu: [],
      self_goods: [],
      new_goods: [],
      like_goods: [],
      searkey: '',
      resdata: {
        new_goods: {},
        self_goods: {},
        like_goods: {}
      }
    }
  },
  created() {
    this.getIndex()
  },
  mounted() {
    this.getwxconfig()
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'glist', query: { key: this.searkey }})
    },
    async getwxconfig() {
      const res = await request.get('/wechat/get_js_config?url=' + encodeURIComponent('http://wx.fafasc.cn/'))
      const reswxconf = res.data
      reswxconf.url = encodeURIComponent(res.data.url)
      const vm = this
      reswxconf.jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
      reswxconf.debug = false
      wx.config(reswxconf)

      wx.ready(function() {
        console.log('wx ready')
        wx.updateTimelineShareData({
          title: '发发财富商城', // 分享标题
          link: 'http://wx.fafasc.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: location.protocol + '//' + location.host + require('../../../public/images/icon.png'), // 分享图标
          success: function() {
          // 设置成功
          },
          error: function(res) {
            console.log('error', res)
          }
        })
        wx.updateAppMessageShareData({
          title: '发发财富商城', // 分享标题
          desc: '隆力奇资生研指定产品购物平台', // 分享描述
          link: 'http://wx.fafasc.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: location.protocol + '//' + location.host + require('../../../public/images/icon.png'), // 分享图标
          success: function() {
          // 设置成功
          }
        })
        wx.onMenuShareTimeline({
          title: '发发财富商城', // 分享标题
          link: 'http://wx.fafasc.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: location.protocol + '//' + location.host + require('../../../public/images/icon.png'), // 分享图标
          success: function() {
          // 设置成功
          },
          error: function(res) {
            console.log('error', res)
          }
        })
        wx.onMenuShareAppMessage({
          title: '发发财富商城', // 分享标题
          desc: '隆力奇资生研指定产品购物平台', // 分享描述
          link: 'http://wx.fafasc.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: location.protocol + '//' + location.host + require('../../../public/images/icon.png'), // 分享图标
          success: function() {
          // 设置成功
          }
        })
      })
    },
    async getIndex() {
      const res = await indexData()
      if (res === 'err') { return }
      console.log(res)
      this.resdata = res.data
      this.bannerdata = res.data.slider
      this.self_goods = res.data.self_goods.content
      this.new_goods = res.data.new_goods.content
      this.like_goods = res.data.like_goods.content
      this.menu = res.data.menu
    }
  }
}
</script>

<style lang="less">

</style>

