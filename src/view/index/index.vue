<template>
  <div v-infinite-scroll="loadLikeMore" class="home" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <!-- 搜索部分 -->
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
    <div class="navpart">
      <ul class="nav">
        <li v-for="item in catlist" :key="item.id">
          <router-link :to="{name:'category',query:{id:item.id}}">
            <div class="bgcolor">
              <img :src="item.image" alt="">
            </div>
            <p>{{ item.mobile_name }}</p>
          </router-link>
        </li>

        <!-- <li>
          <div class="bgcolor">
            <img src="../../../public/images/navimg/p17.png" alt="">
          </div>
          <p>全部商品</p>
        </li> -->
      </ul>
    </div>

    <div class="recmbox">
      <img src="../../../public/images/midimg/u42.png" class="bgimg" alt="">
      <h3>均衡营养 守护健康</h3>
      <ul>
        <li v-for="item in cat1list" :key="item.ad_id">
          <router-link :to="{name:'goods',query:{id:item.item_id}}">
            <div class="name">{{ item.ad_name }}</div>
            <img :src="item.thumb" :alt="item.ad_name">
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recmbox">
      <img src="../../../public/images/midimg/u18.png" class="bgimg" alt="">
      <h3>精英厨房 有温度的家</h3>
      <ul>
        <li v-for="item in cat2list" :key="item.ad_id">
          <router-link :to="{name:'goods',query:{id:item.item_id}}">
            <div class="name">{{ item.ad_name }}</div>
            <img :src="item.thumb" :alt="item.ad_name">
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recmbox">
      <img src="../../../public/images/midimg/u17.png" class="bgimg" alt="">
      <h3>时尚专属 达人派对</h3>
      <ul>
        <li v-for="item in cat3list" :key="item.ad_id">
          <router-link :to="{name:'goods',query:{id:item.item_id}}">
            <div class="name">{{ item.ad_name }}</div>
            <img :src="item.thumb" :alt="item.ad_name">
          </router-link>
        </li>
      </ul>
    </div>

    <div class="indexhotbox">
      <img src="../../../public/images/midimg/u15.png" style="width:100%;" alt="">
      <h3>品质好货&nbsp;&nbsp;一周排行榜!</h3>
      <span>单款销量突破10000</span>
      <ul class="ulindexhot">
        <li v-for="item in hotlist" :key="item.ad_id">
          <router-link :to="{name:'goods',query:{id:item.item_id}}">
            <h5/>
            <h6>{{ item.ad_name }}</h6>
            <img :src="item.thumb" :alt="item.ad_name">
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 精品推荐 -->
    <div class="recommendpart">
      <div class="imgbanner">
        <img src="../../../public/images/self-goods-tit.png" alt="">
      </div>
      <ul class="ulhome2col">
        <li v-for="(lis,i) in index_list" :key="'guess'+i">
          <router-link :to="{name:'goods',query:{id:lis.goods_id}}">
            <img :src="lis.thumb" alt>
            <div class="tit">{{ lis.goods_name }}</div>
            <div class="price">
              新品:<strong>￥{{ (parseFloat(lis.shop_price)-parseFloat(lis.exchange_integral)).toFixed(2) }}</strong> + {{ lis.exchange_integral }}积分
            </div>
            <div class="oprice">
              原价：{{ lis.market_price }}
            </div>
          </router-link>
        </li>
      </ul>
      <!-- <div class="goodslist">
        <ul>
          <li v-for="item in index_list" :key="item.goods_id">
            <div>
              <img :src="item.thumb" :alt="item.goods_name">
            </div>
            <span class="goodsheader">{{ item.goods_name }}</span>
            <span class="goodsprice">￥{{ item.shop_price }}</span><br>
            <span class="originprice">原价：￥{{ item.market_price }}</span>
          </li>
        </ul>
      </div> -->
    </div>
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
import { indexV3 } from '@/api/index'
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
      catlist: [],
      cat1list: [],
      cat2list: [],
      cat3list: [],
      hotlist: [],
      index_list: [],
      searkey: '',
      page: 1,
      busy: false,
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
      const res = await indexV3()
      if (res === 'err') { return }
      console.log(res)
      this.resdata = res.data
      this.bannerdata = res.data.slider
      this.cat1list = res.data.cat1.content
      this.cat2list = res.data.cat2.content
      this.cat3list = res.data.cat3.content
      this.hotlist = res.data.hot_goods.content
      this.catlist = res.data.category
      this.menu = res.data.menu
    },
    async getList(flag) {
      console.log(flag)
      const res = await indexV3({ block: 'like_goods', page: this.page })
      if (res === 'err') { return }
      if (flag) { this.index_list = this.index_list.concat(res.data) } else { this.index_list = res.data.like_goods.content }
      this.page++
      this.busy = false
    },
    loadLikeMore() {
      this.busy = true
      this.getList(this.page > 1)
    }
  }
}
</script>

<style lang="less">
.home{
  background: rgb(243, 240, 240); height: 100%; overflow: scroll;
  .imgbanner{
    img{ width: 80%; display: block; margin: 10px auto 10px;}
  }
  .navpart{
    overflow: hidden;
    padding: 10px 0;
    a{ color: #333;}
    .nav {
      overflow: hidden;
      padding-top: 10px;
      li {
      width: 20%;
      float: left;
      text-align: center;
      font-size: 14px;
      }
      .bgcolor{
      width: 60px;
      height: 60px;
      margin: 0 auto 4px;
      background-color: #fff;
      border-radius: 50%;
      position: relative;
      img{
      width: 80%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      }
    }
    }
  }
  .recmbox{
    position: relative;
    .bgimg{ width: 100%; display: block;}
    h3{ font-size: 16px; font-weight: normal; text-align: center; position: absolute; width: 100%; left: 0; top: 6%;}
    ul{
      position: absolute; width: 95.2%; left: 2.1%;; top: 42%; display: flex; justify-content:space-around;
      li{
         width: 32%;;
        a{display: block;text-align: center; color: #666;}
        img{ width: 80%;}
        .name{ line-height: 1.2em; font-size: 14px; margin-bottom: 3%; height: 1.2em; overflow: hidden;;}
      }
    }
  }
  .indexhotbox{ position: relative;
    h3{font-size: 20px; color: #fff; font-weight: bold; text-align: center; position: absolute; width: 60%; white-space: nowrap;left: 20%; top: 14%;}
    span{font-size: 16px; color: #fff; font-weight: normal; line-height: 1.3em; text-align: center; position: absolute; width: 60%; left: 20%; top: 19.5%;}
    .ulindexhot{
      position: absolute; top: 34%; width: 97.1%; margin-left: 0.8%; display: flex; flex-wrap: wrap; justify-content: space-around;
      li{
      width: 31.3%;  padding-bottom: 32.8%; margin-bottom: 2.1%; position: relative;
        a{ display: block; position: absolute; width: 100%; left: 0; top: 0; color: #666;}
        h5,h6{line-height: 130%; text-align: center;  overflow: hidden; width: 97%;  margin-left: 1%;;}
        h5{font-size: 14px;  margin-top: 3%; }
        h6{font-size: 13px;  margin-bottom: 3%;height: 1.3em;}
        img{ width: 80%; display: block; margin: 0 auto;}
      }
    }
  }
}
</style>
