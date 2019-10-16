<template>
  <div style="height:100%; background:#fff; font-size:14px;">

    <div class="ulorderlist">

      <dl class="dlreciever">
        <dt>收件人信息</dt>
        <dd class="reciever">{{ item.consignee }} {{ item.mobile }}</dd>
        <dd>
          {{ item.province_desc }}{{ item.city_desc }}{{ item.district_desc }}
          {{ item.address }}
        </dd>
      </dl>
      <dl class="dlreciever" style="padding:6px 15px;">
        <dt>物流信息</dt>
        <dd class="reciever">{{ item.shipping_name }} {{ item.invoice_no }}</dd>
      </dl>

      <div class="cell">
        <div class="order_title">
          订单编号{{ item.order_sn }}
          <span class="orderStatus">{{ item.order_status_desc }}</span>
        </div>
        <ul class="orderInfoList">
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
          共 {{ item.goods_list.length }} 件商品，
          <template v-if="item.integral">
            &yen;{{ item.goods_price }} + {{ item.integral }}积分
          </template>
          <template v-else>
            &yen;{{ item.goods_price }}
          </template>
        </div>

        <van-steps :active="0" direction="vertical" class="orderaction">
          <van-step v-for="(item,i) in order_action" :key="item.log_time">
            <h3>
              <template v-if="i===order_action.length-1">
                您提交了订单，待支付
              </template>
              <template v-else>
                {{ item.action_note }}
              </template>
            </h3>
            <p>{{ formatdate(item.log_time ) }}</p>
          </van-step>
        </van-steps>

        <!-- <div v-show="list.length>0" class="orderOperation">
          <van-button v-if="item.order_status_code==='WAITPAY'" type="default" size="small" @click="handleCancle(item)">取消订单</van-button>
          <van-button v-if="item.order_status_code==='WAITPAY'" type="primary" size="small" @click="toPay(item)">订单支付</van-button>

        </div> -->

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

import { Tab, Tabs, Icon, Button, Toast, Dialog, Cell, CellGroup, Steps, Step } from 'vant'
import { orderShow, orderCancle } from '@/api/order'
import { getOpenid } from '@/utils/auth'
import buttomnav from '../buttomnav/index'
import { parseTime } from '@/utils'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Steps.name]: Steps,
    [Step.name]: Step,
    [Dialog.name]: Dialog,
    buttomnav
  },
  data() {
    return {
      id: this.$route.query.id,
      item: {
        goods_list: []
      },
      order_action: [],
      paystr: {},
      jOrderStatus: {
        'WAITPAY': '待付款',
        'WAITSEND': '待发货',
        'WAITRECEIVE': '待收货',
        'WAITCCOMMENT': '待评价'
      },
      formatdate: parseTime
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    onBridgeReady() {
      console.log(this.paystr)

    //   WeixinJSBridge.invoke(
    //     'getBrandWCPayRequest', this.paystr,
    //     res => {
    //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
    //         this.loadOrders()
    //       }
    //     })
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
    async getOrder() {
      const res = await orderShow({ id: this.id })
      if (res === 'err') { return }
      console.log(res)
      this.item = res.data.order_info
      this.order_action = res.data.order_action.reverse()
    },
    async cancelOrders(item) {
      const res = await orderCancle({ id: item.order_id })
      if (res === 'err') { return }
      Toast.success('取消订单成功!')
      this.getList()
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
    chstatus(index) {
      this.ordertype = jTabStatus[index]
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
 dl,dt,dd,ul,li,h3,p{margin: 0;padding:0;}
 h3{ font-size: 13px; padding-bottom: 3px;}
 .orderaction{
     p{font-size: 12px;}
 }
 .dlreciever{
    padding:12px 15px; line-height: 22px;
    dt{ padding-bottom: 5px;}
    .reciever{ font-weight: bold;}
 }
 .ulactions{
    padding:18px 15px;
    li{ display: flex; padding: 6px 0 6px 22px; list-style: disc;
        strong{ font-weight: normal; margin-right: 6px;}
    }

 }
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
	font-size: 13px; padding-bottom: 80px;
  }
	.cell{
		margin-top: 12px;
		background: #fff;
		.order_title{
			border-bottom: 1px solid #f0f0f0;
			padding: 12px 15px;
			.orderStatus{
				float: right;
			}
		}
		.orderInfo{
			padding: 12px 15px;
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
  .tipcount{ padding: 8px 12px 20px 12px;}
  .cell{ margin-top:0px;}

</style>
