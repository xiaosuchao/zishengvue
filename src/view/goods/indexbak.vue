<template>
  <div class="goods">

    <van-tabs v-model="active" :line-width="line" background="#FF0238" title-active-color="white" >
      <van-tab title="商品">
        <van-swipe :autoplay="3000" class="goods-swipe">
          <van-swipe-item v-for="umb in goods.headlist" :key="umb">
            <img :src="umb" >
          </van-swipe-item>
        </van-swipe>

        <van-cell-group>
          <van-cell>
            <div class="goods-title">{{ goods.title }}</div>
            <p style="color:#9999A5; font-size:12px;">轻盈透气 弹性蓬松 消除抗菌 入浴阳光般温暖</p>
            <div class="goods-price" style="color:#CC3333; font-size:20px;">&yen;{{ goods.price }}</div>
          </van-cell>
        </van-cell-group>
        <p style="font-size:12px; color:#9999A5; text-decoration:line-through; margin-left:13px;">&yen;2500</p>
        <p style="color:#999B99; font-size:12px; display: flex; justify-content:space-around;margin-top:10px;">
          <span>快递：包邮</span>
          <span>库存：400</span>
          <span>销量：5000</span>
          <span>上海市</span>
        </p>
        <p style="font-size:14px; margin:20px 0 0 20px; color:#999B99">活动 <span style="color:#CC3333; border:1px solid #CC3333; border-radius:5px; margin-left:10px;">包邮</span>本商品包邮：全场满<span style="color:#CC3333;">&yen;298</span>包邮</p>
        <p style="margin:15px 0 20px 20px; font-size:14px; border-bottom:5px solid #F6F6F6"><van-icon name="passed" color="green"/>正品保证</p>
        <p style="margin:15px 0 0 20px; font-size:13px;">请选择花型，尺寸等</p>
        <div style="margin:30px 0 20px 20px; font-size:16px;  display: flex; justify-content: space-between;"><span>孕奇科技商城</span><span style="border:1px solid #CC3333; color:#CC3333; margin-right:10px; border-radius:25px; width:80px; text-align:center; height:30px; line-height:30px">进店逛逛</span></div>
      </van-tab>
      <van-tab title="详情">
        <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg" alt="" class="goods_indeximg">
        <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg" alt="" class="goods_indeximg">
        <img src="https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg" alt="" class="goods_indeximg">
      </van-tab>
      <van-tab title="参数">
        <van-cell-group>
          <van-field
            value="60"
            label="面粉主要成分量"
            disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value="白鸭绒"
            label="填充物主成分"
            disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value="棉"
            label="面料材质"
            disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value="合格品"
            label="产品等级"
            disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value="白色"
            label="花型"
            disabled
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            value="2.0*2.3*2.4"
            label="尺寸规格"
            disabled
          />
        </van-cell-group>
      </van-tab>
      <van-tab title="评价">
        <div v-for="ins in list" :key="ins.id" class="goods_indexbox">
          <img :src="ins.message" alt="" style="position:absolute;left:0; top:0; width:10%; margin:5px 5px 0 20px;">
          <div class="goods_indexsun">
            <div style="font-size:18px;">{{ ins.name }}</div>
            <div style="color:#999999; font-size:12px;">{{ ins.data }}</div>
            <p style="margin:15px 0">{{ ins.text }}</p>
            <img :src="ins.imgone" alt="" class="goods_indeximages">
            <img :src="ins.imgtwo" alt="" class="goods_indeximages">
            <img :src="ins.imgthree" alt="" class="goods_indeximages">
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- <van-sku
    v-model="showBase"
    :sku="sku"
    :goods="goods"
    :goods-id="goodsId"
    :hide-stock="sku.hide_stock"
    :quota="quota"
    :quota-used="quotaUsed"
    :reset-stepper-on-hide="resetStepperOnHide"
    :reset-selected-sku-on-hide="resetSelectedSkuOnHide"
    :close-on-click-overlay="closeOnClickOverlay"
    :disable-stepper-input="disableStepperInput"
    :message-config="messageConfig"
    @buy-clicked="onBuyClicked"
    @add-cart="onAddCartClicked"
  /> -->

    <van-goods-action>
      <van-goods-action-mini-btn icon="like-o" @click="sorry">
        关注
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="chat-o" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="sorry">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="purchase">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>

  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn,
  Sku,
  Tab,
  Tabs,
  Field
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
    [Field.name]: Field
  },

  data() {
    return {
      goods: {
        line: 200,
        title: '无印羽绒被90白鹅绒良品全棉被子双人',
        price: 2399,
        express: '免运费',
        remain: 250,
        headlist: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        ]
      },
      list: [
        {
          id: '1',
          message: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          name: '下雨天4728888',
          data: '2017-03-06 尺码:43 颜色:白色',
          text: '面料不行 样子可以',
          imgone: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgtwo: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgthree: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        },
        {
          id: '2',
          message: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          name: '下雨天4728888',
          data: '2017-03-06 尺码:43 颜色:白色',
          text: '面料不行 样子可以',
          imgone: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgtwo: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgthree: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        },
        {
          id: '3',
          message: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          name: '下雨天4728888',
          data: '2017-03-06 尺码:43 颜色:白色',
          text: '面料不行 样子可以',
          imgone: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgtwo: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgthree: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        },
        {
          id: '4',
          message: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          name: '下雨天4728888',
          data: '2017-03-06 尺码:43 颜色:白色',
          text: '面料不行 样子可以',
          imgone: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgtwo: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          imgthree: 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'
        }
      ]

    }
  },

  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2)
    },

    onClickCart() {
      this.$router.push('cart')
    },

    purchase() {
      this.$router.push({ path: './order_confirm' })
    },
    sorry() {}
  }
}
</script>

<style lang="less">

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
.goods {
  padding-bottom: 50px;

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
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
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
</style>
