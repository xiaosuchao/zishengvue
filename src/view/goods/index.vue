<template>
  <div class="goods">
    <a class="aback" @click="$router.back()"><van-icon color="#fff" name="arrow-left" /></a>
    <van-tabs v-model="activetab" :line-width="goodsline" type="line" sticky title-active-color="#f44" >
      <van-tab title="商品">
        <div class="swpout">
          <div class="swpin">
            <van-swipe :autoplay="3000" class="goods-swipe">
              <van-swipe-item v-for="imgitem in goods_images_list" :key="imgitem.img_id">
                <img :src="imgitem.image_url" >
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>

        <van-cell-group>
          <van-cell>
            <div class="goods-title">{{ goods.goods_name }}</div>
            <p class="goods-remark">{{ goods.goods_remark }}</p>
            <div >

              <span class="goods-price">会员价：&yen;{{ goods.shop_price }} + {{ goods.exchange_integral }}积分</span><br>
              <span class="goods-oriprice">原价：&yen;{{ goods.market_price }}</span>
            </div>
          </van-cell>
          <van-cell class="goods-express">
            <van-col span="8">运费：包邮</van-col>
            <van-col span="8">库存：{{ goods.store_count }}</van-col>
            <van-col span="8">销量：{{ goods.sales_sum }}</van-col>
          </van-cell>

        </van-cell-group>
        <div class="shopname"><img src="../../../public/images/icon.png"><strong>发发财富商城</strong></div>
        <!-- <p style="font-size:12px; color:#9999A5; text-decoration:line-through; margin-left:13px;"/> -->

        <!-- <p style="font-size:14px; margin:20px 0 0 20px; color:#999B99">活动 <span style="color:#CC3333; border:1px solid #CC3333; border-radius:5px; margin-left:10px;">包邮</span>本商品包邮：全场满<span style="color:#CC3333;">&yen;298</span>包邮</p> -->
        <!-- <p style="margin:15px 0 20px 20px; font-size:14px; border-bottom:5px solid #F6F6F6"><van-icon name="passed" color="green"/> 正品保证</p> -->
        <!-- <p style="margin:15px 0 0 20px; font-size:13px;">请选择花型，尺寸等</p> -->
        <!-- <div style="margin:30px 0 20px 20px; font-size:16px;  display: flex; justify-content: space-between;"><span>孕奇科技商城</span><span style="border:1px solid #CC3333; color:#CC3333; margin-right:10px; border-radius:25px; width:80px; text-align:center; height:30px; line-height:30px">进店逛逛</span></div> -->
        <div class="goodscon" v-html="goods.goods_content"/>
      </van-tab>
      <van-tab title="详情">
        <div class="goodscon" v-html="goods.goods_content"/>
      </van-tab>
      <van-tab title="评价">
        <div class="goodsrating">
          <ul>
            <li v-for="item in commlist" :key="item.id">
              <div class="leftavatar">
                <img :src="item.user.head_pic" alt="" width="40px" height="40px">
              </div>
              <div class="rightratedetail">
                <div class="useridinfo">
                  <div class="nickname">{{ item.username }}   <span class="ratingtime">{{ parseTime(item.add_time) }}</span> </div>
                  <div class="rateout">
                    <van-rate v-model="item.goods_rank" readonly/>
                  </div>
                </div>

                <p>{{ item.content }}</p>
                <div class="userrateimg">
                  <img v-for="(pic,ipic) in item.img" :key="'p'+ipic" :src="pic" >
                </div>
              </div>
            </li>
          </ul>

        </div>
      </van-tab>
    </van-tabs>

    <van-sku
      v-model="showSkuDialog"
      :sku="sku"
      :goods="skugoods"
      :goods-id="id"
      :hide-stock="2>1"
      :quota="1-1"
      :quota-used="1-1"
      :reset-stepper-on-hide="1>2"
      :reset-selected-sku-on-hide="1>2"
      :close-on-click-overlay="2>1"
      :disable-stepper-input="1>2"
      :show-add-cart-btn="2>1"
      :message-config="{}"
      @add-cart="onAddCartClicked"
      @buy-clicked="onBuyClicked"
    />

    <van-goods-action>
      <van-goods-action-mini-btn icon="contact" @click="kfguid=1">
        客服
      </van-goods-action-mini-btn>

      <van-goods-action-mini-btn :style="isCollect?'color:red':''" :text="isCollect?'已收藏':'收藏'" icon="like-o" @click="collectGoods">
        <!-- ({{ goods_collect_count }}) -->
      </van-goods-action-mini-btn>

      <van-goods-action-mini-btn icon="cart-o" @click="toCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="showSkuDialog=true">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showSkuDialog=true">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>

    <div v-if="kfguid>0" class="zhe">
      <img v-show="kfguid===1" src="../../../public/images/kfguid1.png" alt="" @click="kfguid=2">
      <img v-show="kfguid===2" src="../../../public/images/kfguid2.png" alt="" @click="kfguid=3">
      <img v-show="kfguid===3" src="../../../public/images/kfguid3.png" alt="" @click="kfguid=4">
      <img v-show="kfguid===4" src="../../../public/images/kfguid4.png" alt="" @click="kfguid=0">
    </div>
  </div>
</template>

<script>
import { getGoodsShow, setCollect, getCommentList } from '@/api/goods'
import { parseTime } from '@/utils/index'
import { addToCart } from '@/api/cart'
import request from '@/utils/request'
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  // Toast,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Sku,
  Tab,
  Tabs,
  Field, Rate
} from 'vant'

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
    [Sku.name]: Sku,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Rate.name]: Rate,
    [Field.name]: Field
  },

  data() {
    return {
      id: this.$route.query.id,
      goodsline: 80,
      activetab: '商品',
      showSkuDialog: false,
      goods_images_list: [],
      goods: {
        goods: {},
        line: 200,
        title: '无印羽绒被90白鹅绒良品全棉被子双人',
        price: 2399,
        express: '免运费',
        remain: 250

      },
      kfguid: 0,
      goods_collect_count: 0,
      skugoods: {},
      goods_num: 0,
      goods_spec: {},
      isCollect: 0,
      commlist: [],
      parseTime: parseTime,
      sku: {
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [],
        hide_stock: false // 是否隐藏剩余库存
      }

    }
  },
  created() {
    this.getgoodsshow()
    this.commentList()
  },
  methods: {
    async getwxconfig() {
      // const res = await request.get('/wechat/get_js_config?url=' + encodeURIComponent(location.href))
      const res = await request.get('/wechat/get_js_config?url=' + encodeURIComponent('http://wx.fafasc.cn/#/goods?id=' + this.id))
      const reswxconf = res.data
      const vm = this
      reswxconf.jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareTimeline']
      reswxconf.debug = false
      wx.config(reswxconf)
      wx.ready(function() {
        console.log('wx ready')

        if (wx.onMenuShareTimeline) {
          // Toast('support onMenuShareTimeline')
          wx.onMenuShareTimeline({
            title: vm.goods.goods_name, // 分享标题
            link: 'http://wx.fafasc.cn/#/goods?id=' + vm.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vm.goods.original_img, // 分享图标
            success: function() {
              // 设置成功
            },
            error: function(res) {
              console.log('error', res)
            }
          })
        }
        if (wx.onMenuShareAppMessage) {
          // setTimeout(() => {
          //   Toast('support onMenuShareAppMessage')
          // }, 3000)

          // Toast('support onMenuShareAppMessage')
          wx.onMenuShareAppMessage({
            title: vm.goods.goods_name, // 分享标题
            desc: vm.goods.goods_remark, // 分享描述
            link: 'http://wx.fafasc.cn/#/goods?id=' + vm.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vm.goods.original_img, // 分享图标
            success: function() {
              // 设置成功
            }
          })
        }

        if (wx.updateTimelineShareData) {
          // setTimeout(() => {
          //   Toast('support updateTimelineShareData')
          // }, 6000)
          // Toast('support updateTimelineShareData')
          wx.updateTimelineShareData({
            title: vm.goods.goods_name, // 分享标题
            link: 'http://wx.fafasc.cn/#/goods?id=' + vm.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vm.goods.original_img, // 分享图标
            success: function() {
              // 设置成功
            },
            error: function(res) {
              console.log('error', res)
            }
          })
        }

        if (wx.updateAppMessageShareData) {
          // setTimeout(() => {
          //   Toast('support updateAppMessageShareData')
          // }, 9000)

          // Toast('support updateAppMessageShareData')
          wx.updateAppMessageShareData({
            title: vm.goods.goods_name, // 分享标题
            desc: vm.goods.goods_remark, // 分享描述
            link: 'http://wx.fafasc.cn/#/goods?id=' + vm.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            // link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vm.goods.original_img, // 分享图标
            success: function() {
              // 设置成功
            }
          })
        }
      })
    },
    async commentList() {
      const res = await getCommentList({ goods_id: this.id })
      if (res === 'err') return
      this.commlist = res.data
    },
    async getgoodsshow() {
      let res = await getGoodsShow({ id: this.id })
      res = res.data
      this.isCollect = res.collect
      this.goods = res.goods
      this.goods_images_list = res.goods_images_list
      this.skugoods = { title: this.goods.goods_name, picture: this.goods_images_list[0]['image_url'] }

      const tmpsku = {}
      const jsontree = []
      let i = 0
      for (const key in res.filter_spec) {
        jsontree.push({
          k: key,
          v: res.filter_spec[key].map(vv => {
            return { id: vv.item_id, name: vv.item, imgUrl: vv.src }
          }),
          k_s: 's' + (++i)
        })
      }
      const jsonlist = []
      for (const key in res.spec_goods_price) {
        const ars = key.split('_')
        jsonlist.push({
          id: key,
          price: res.spec_goods_price[key]['price'] * 100,
          stock_num: res.spec_goods_price[key]['store_count'],
          s1: ars.length > 0 ? ars.filter(vv => { return jsontree.filter(v => { return v.k_s === 's1' })[0]['v'].some(vvv => { return vvv.id.toString() === vv.toString() }) })[0] : '0',
          s2: ars.length > 1 ? ars.filter(vv => { return jsontree.filter(v => { return v.k_s === 's2' })[0]['v'].some(vvv => { return vvv.id.toString() === vv.toString() }) })[0] : '0',
          s3: ars.length > 2 ? ars.filter(vv => { return jsontree.filter(v => { return v.k_s === 's3' })[0]['v'].some(vvv => { return vvv.id.toString() === vv.toString() }) })[0] : '0'
        })
      }
      tmpsku.tree = jsontree
      tmpsku.list = jsonlist
      tmpsku.price = this.goods.shop_price
      tmpsku.stock_num = this.goods.store_count
      tmpsku.none_sku = jsontree.length === 0
      tmpsku.collection_id = jsontree.length === 0 ? res.goods.goods_id : jsonlist[0]['id']
      tmpsku.hide_stock = true
      tmpsku.messages = []
      this.sku = tmpsku
      this.goods_collect_count = res.goods_collect_count

      this.getwxconfig()
    },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2)
    },

    onClickCart() {
      this.$router.push('cart')
    },

    purchase() {
      this.$router.push({ path: './order_confirm' })
    },

    async collectGoods() {
      const res = await setCollect({ goods_id: this.id })
      if (res === 'err') return
      this.isCollect = !this.isCollect
    },
    toCart() {
      this.$router.push({ name: 'cart' })
    },
    async addToCart(obj, acttype) {
      console.log('tocart', obj)
      this.goods_num = obj.selectedNum
      const tmpspec = {}
      if (this.sku.tree.length) {
        const skuid = obj.selectedSkuComb.id
        const ars = skuid.split('_')

        this.sku.tree.forEach(v => {
          tmpspec[v.k] = v.v.filter(vv => { return ars.indexOf(vv.id.toString()) > -1 })[0]['id']
        })
      }

      const res = await addToCart({
        goods_id: this.id,
        goods_num: this.goods_num,
        goods_spec: tmpspec
      })
      if (res === 'err') { return }
      this.showSkuDialog = false
      if (acttype === 'buy') {
        this.$router.push('cart')
      }
      console.log(res)
    },
    onBuyClicked(obj) {
      this.addToCart(obj, 'buy')
    },
    onAddCartClicked(obj) {
      this.addToCart(obj, 'cart')
    }
  }
}
</script>

<style lang="less" >
.zhe{
  position: fixed; left: 0; right: 0; top: 0; bottom:0; right: 0; background: rgba(0,0,0,0.5); z-index: 999;

}
.goods_indexbox{
  width:100%;
  height:200px;
  margin-top: 40px;
  position: relative;
}
.goods_indexsun{
  width:80%;
  height:200px;
  margin-left: 20%;

}
.goods-swipe{background: #fff;}
.goods {
  padding-bottom: 50px;
  .aback{ width: 24px; height: 24px;padding: 4px 0px 0px 4px; left: 4px; top: 10px;;
  ; border-radius: 50%; position: fixed; z-index: 998; text-align: ceenter; background: rgba(0,0,0, 0.5); }
  .swpout{
    position: relative;width: 100%; height: 0;padding-top:100%; overflow: hidden;
    .swpin{
      position: absolute; width: 100%; top: 0;left: 0;
    }
  }
  .goodscon{
    p{margin: 0; padding: 0;}
    img{ display: block; max-width: 100%;}
  }
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 17px;
  }

  &-price {
    color:#CC3333; font-size:20px; display: inline-block; margin-bottom: 6px;
  }
  &-oriprice{
    font-size:12px; color:#9999A5;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  .shopname{
    padding: 10px 12px; background: #fff; display: flex; color: #c33; align-items:center; font-size: 14px; font-weight: normal; line-height: 18px;
    img{ width: 18px; height: 18px;; vertical-align: middle; margin-right: 3px; border-radius: 50%;}
  }
  &-remark{
    color:#9999A5; font-size:13px; padding: 3px 0px 8px;
  }
  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
.goods_indeximg{
  width:100%;
}
.goods_indeximages{
  width:33%;
}
.goodscon{
  img{ max-width: 100%; display: block;}
  p{ }
}
.goodsrating{
  background-color: #fff;
  li{
    margin: 5px 5px; padding: 12px 0px 2px; font-size: 14px;
    display: flex;
    .leftavatar{
      text-align: center;
      padding: 0 5px;
      img{
        border-radius: 50%;
      }

    }
    .rightratedetail{
      padding-left: 10px;
      .rateout{ padding: 5px 0;}
      .useridinfo{
        flex-grow:1;
        .nickname{
          font-size: 14px; display: flex; justify-content: space-between;
        }
        .ratingtime{
         font-size: 14px; margin-left: 20px;
          color: #999;
        }
      }
      p{
        font-size: 15px;
        padding: 10px 0; margin: 0;
      }
      .userrateimg{
        img{
           margin: 0 5px;
           width: 90px;
           height: 90px;
        }

      }
    }

  }
}
</style>
