<template>
  <div>
    <van-tabs v-model="tabindex" :swipe-threshold="init5" :line-width="datalist" @click="chstatus" >
      <van-tab title="全部"/>
      <van-tab title="待付款"/>
      <van-tab title="待发货"/>
      <van-tab title="待收货"/>
      <van-tab title="待评价"/>
    </van-tabs>

    <div class="ulorderlist">

      <div v-for="(item,index) in list" :key="index" class="cell">
        <div class="order_title">
          订单编号{{ item.order_sn }}
          <span class="orderStatus">{{ item.order_status_desc }}</span>
        </div>
        <ul class="orderInfoList" @click="toorder(item)">
          <li v-for="(goods,key) in item.goods_list" :key="key">
            <div class="orderInfo">
              <div class="orderImg">
                <img :src="goods.thumb" >
              </div>
              <div class="orderName">
                <div class="name">{{ goods.goods_name }}</div>
                <div class="desc">&yen; {{ goods.goods_price }}</div>
              </div>
              <div class="orderValue">
                <span>×{{ goods.goods_num }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="tipcount">
          共 {{ item.count_goods_num }} 件商品，
          <template v-if="item.integral">
            &yen;{{ item.goods_price }} + {{ item.integral }}积分
          </template>
          <template v-else>
            &yen;{{ item.goods_price }} <span v-if="item.discount && item.discount!=='0.00'"> 折扣：{{ item.discount }} 实付：{{ item.order_amount }}</span>
          </template>
        </div>
        <div v-show="list.length===0" style="width:100%; text-align:center;">
          <div class="user_ordersbox">
            <van-icon name="description" class="user_dingdnaicon"/>
          </div>
          <p class="user_ordersp">当前没有订单数据</p>
          <!-- <div class="user_ordersbottom">
            <router-link to="/">去首页逛逛吧</router-link>
          </div> -->
        </div>
        <div v-show="list.length>0" class="orderOperation">
          <van-button v-if="item.order_status_code==='WAITPAY'" type="default" size="small" @click="handleCancle(item)">取消订单</van-button>
          <van-button v-if="item.order_status_code==='WAITPAY'" type="primary" size="small" @click="toPay(item)">订单支付</van-button>
          <van-button v-if="item.order_status_code==='WAITRECEIVE'" type="primary" size="small" @click="handleRecieve(item)">确认收货</van-button>
          <van-button v-if="item.order_status_code==='WAITCCOMMENT'" type="primary" size="small" @click="handleComment(item)">评价</van-button>

        </div>
      </div>
    </div>
    <!-- <buttom-nav :actindex="1?4:0"/> -->
  </div>
</template>

<script>
const jTabStatus = {
  0: '',
  1: 'WAITPAY',
  2: 'WAITSEND',
  3: 'WAITRECEIVE',
  4: 'WAITCCOMMENT'
}

import { Tab, Tabs, Icon, Button, Toast, Dialog } from 'vant'
import { orderList, orderCancle, orderRecieve } from '@/api/order'
import { getOpenid } from '@/utils/auth'
import buttomnav from '../buttomnav/index'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    buttomnav
  },
  data() {
    return {
      tabindex: 0,
      datalist: 60,
      init5: 5,
      list: [],
      ordertype: this.$route.params.ordertype,
      paystr: {},
      jOrderStatus: {
        'WAITPAY': '待付款',
        'WAITSEND': '待发货',
        'WAITRECEIVE': '待收货',
        'WAITCCOMMENT': '待评价'
      }
    }
  },
  created() {
    console.log(this.ordertype)

    for (const item in jTabStatus) {
      if (jTabStatus[item] === this.ordertype) {
        this.tabindex = item
      }
    }
    this.getList()
  },
  methods: {
    onBridgeReady() {
      console.log(this.paystr)

      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', this.paystr,
        res => {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            this.getList()
          }
        })
    },
    toPay(item) {
      this.$http.post('/pay/pay', { item_id: item.order_id, pay_type: 'wechatpay_public', item: 'order', open_id: getOpenid() }).then((res) => {
        this.paystr = res.data
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.onBridgeReady()
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    async getList() {
      const res = await orderList({ type: this.ordertype })
      if (res === 'err') { return }
      this.list = res.data
      console.log(this.list.length === 0)
    },
    async cancelOrders(item) {
      const res = await orderCancle({ id: item.order_id })
      if (res === 'err') { return }
      Toast.success('取消订单成功!')
      this.getList()
    },
    async confirmRecieve(item) {
      const res = await orderRecieve({ id: item.order_id })
      if (res === 'err') { return }
      Toast.success('确认收货成功!')
      this.getList()
    },
    handleRecieve(item) {
      Dialog.confirm({
        title: '是否确认收货'
      }).then(() => {
        this.confirmRecieve(item)
      }).catch(() => {
        // on cancel
      })
    },
    handleCancle(item) {
      Dialog.confirm({
        title: '是否确认取消订单'
      }).then(() => {
        this.cancelOrders(item)
      }).catch(() => {
        // on cancel
      })
    },
    handleComment(item) {
      this.$router.push({ name: 'ordercomment', query: { id: item.order_id }})
    },
    chstatus(index) {
      this.ordertype = jTabStatus[index]
      this.getList()
    },
    toorder(item) {
      this.$router.push({ name: 'orderdetail', query: { id: item.order_id }})
    }
  }
}
</script>

<style lang="less" scoped>

.user_ordersbox {
  width: 35%;
  height: 140px;
  background: #e5e5e5;
  margin: 50px auto;
  text-align: center;
  line-height: 140px;
  border-radius: 50%;
}
.user_dingdnaicon {
  font-size: 80px;
  color: #6c6c6c;
  margin-top: 30px;
}
.user_ordersp {
  font-size: 14px;
  color: #6c6c6c;
}
.user_ordersbottom {
  color: #cc3333;
  width: 30%;
  height: 40px;
  border: 1px solid #cc3333;
  margin: 10px auto;
  border-radius: 25px;
  text-align: center;
  line-height: 40px;
}
.user_ordersbottom a {
  color: #cc3333;
}

.ulorderlist{
	font-size: 13px;
  }
	.cell{
		margin-top: 12px;
		background: #fff;
		.order_title{
			border-bottom: 1px solid #f0f0f0;
			padding: 12px 4%;
			.orderStatus{
				float: right;
			}
		}
		.orderInfo{
			padding: 12px 4%;
			border-bottom: 1px solid #f0f0f0; display: flex;

			.orderImg{
				width: 20%;vertical-align: top; border: 1px solid #e4e4e4; position: relative; padding-top: 20%;
                img{ width: 100%; position: absolute; top: 0;}
			}
			.orderName{
				width: 62%; padding-left:15px;
        vertical-align: top;
        .name{ margin-bottom: 6px;}
			}
			.orderValue{
				width: 8%;
				vertical-align: top;
				text-align: right;
			}
		}
	}
	.orderOperation{
		padding: 15px 0;
		text-align: right;
    margin-right: 4%;
    .van-button{ margin-left: 10px;}
  }
  .tipcount{ padding: 6px 0px 0px 12px;}
</style>
