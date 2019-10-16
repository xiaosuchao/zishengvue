<template>
  <div class="order_confirmindex">
    <div class="order_confirmhome">
      <div class="order_confirmsite" @click="dizhi">
        <div v-show="addr.id" class="addrbox">
          <div class="addrinbox">
            收货地址：{{ addr.name }} {{ addr.tel }}
            {{ addr.addressDetail }}
          </div>

          <van-icon name="arrow" class="order_confirmvanicon"/>
        </div>
        <div v-show="!addr.id" class="tipaddaddr">
          <van-icon name="add" />
          添加收货地址
        </div>

      </div>

      <div class="cards">
        <van-card
          v-for="item in list"
          :key="item.id"
          :title="item.goods_name"
          :desc="item.spec_key_name"
          :num="item.goods_num"
          :price="formatPrice(parseFloat(item.goods_price))"
          :thumb="item.goods_img"
        />
      </div>

      <div class="order_confirmbottom">
        <van-cell-group>
          <van-field
            v-model="user_note"
            label="买家留言"
            type="textarea"
            placeholder="50字以为(选填)"
            rows="1"
            autosize
            class="order_confirmliuyan"
          />
          <van-cell
            :key="pay_points"
            title-class="usepointtit"
            value-class="usepointv"
            title="使用积分"
            @click="pay_points=!pay_points"
          >
            当前积分{{ accinfo.pay_points }}
            <van-checkbox ref="checkboxes" v-model="pay_points" checked-color="#f44" name="item" />
          </van-cell>
        </van-cell-group>
      </div>
      <div class="order_confirmbottonbox">
        <div>
          <span>商家小计</span>

          <span>￥{{ total_price.total_fee }}+{{ total_price.exchange_integral }}积分</span>
        </div>
        <div>
          <span>运费</span>
          <span>￥0.00</span>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="parseFloat(orderamount)*100 "
      button-text="提交订单"
      @submit="handleSubmit"
    />

    <van-popup v-model="showAddrs" :overlay="false" position="top" style="height:100%" >
      <useraddrlist :prop-addr-id="propAddrId" :isprop="1" @emitChooseAddr="chooseAddr" />
    </van-popup>
    <van-popup v-model="showPayPwd" class="popform" >
      <div class="popformin">
        <div class="poptit">
          请输入支付密码
        </div>
        <van-cell-group>
          <van-field
            v-model="paypwd"
            placeholder="请输入支付密码"
            label="支付密码"
            type="password"
            required
          />
        </van-cell-group>
        <div class="btns">
          <van-button type="danger" @click="handlePayPwd">提交</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Field, SubmitBar, Popup, Icon, Checkbox, Button, Cell, Card, AddressEdit, CellGroup, Toast } from 'vant'
import { addOnCart, confirmCart } from '@/api/cart'
import useraddrlist from '../user/user_addrlist'
import store from '@/store'
import { mapState } from 'vuex'
export default {
  components: {
    [Field.name]: Field,
    [SubmitBar.name]: SubmitBar,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    [AddressEdit.name]: AddressEdit,
    [CellGroup.name]: CellGroup,
    [Card.name]: Card,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    useraddrlist: useraddrlist
  },

  data() {
    return {
      user_note: '',
      show: false,
      showAddrs: false,
      addr: {},
      searchResult: [],
      list: [],
      propAddrId: 0,
      pay_points: true,
      total_price: {},
      paypwd: '',
      showPayPwd: false
    }
  },
  computed: {
    ...mapState([
      'accinfo'
    ]),
    orderamount() {
      return this.pay_points ? (parseFloat(this.total_price.total_fee)).toFixed(2) : (parseFloat(this.total_price.total_market_price)).toFixed(2)
    }
  },
  created() {
    if (!this.accinfo) { store.dispatch('loadaccinfo') }
    this.getList()
  },
  methods: {
    handleSubmit() {
      if (!this.addr.id) { Toast.fail('请先选择地址'); return }
      if (!this.list.length) { Toast.fail('没有选择商品'); return }
      if (this.pay_points) {
        if (parseInt(this.accinfo.pay_points) < parseInt(this.total_price.exchange_integral)) {
          Toast.fail('积分不足，只能使用非会员价购买'); this.pay_points = false; return
        } else {
          if (this.accinfo.is_paypwd) {
            this.showPayPwd = true
          } else {
            Toast('请先设置支付密码')
            this.$router.push({ name: 'paypwd' })
          }
        }
      } else {
        this.submOrder()
      }
    },
    handlePayPwd() {
      if (!this.paypwd) {
        Toast.fail('请输入支付密码'); return
      } else {
        this.submOrder()
      }
    },
    async submOrder() {
      const res = await confirmCart({
        act: 'submit_order',
        address_id: this.addr.id,
        user_note: this.user_note,
        pay_points: this.pay_points ? this.total_price.exchange_integral : 0,
        paypwd: this.paypwd
      })
      if (res === 'err') { return }

      Toast.success('下单成功，请在订单列表完成支付!')
      setTimeout(() => {
        this.$router.replace({ path: './user_orders' })
      }, 1200)
      console.log(res)
    },
    async getList() {
      const res = await addOnCart()
      if (res === 'err') return
      this.list = res.data.cartList.filter(v => { return v.selected })
      // this.orderamount = (parseFloat(res.data.total_price.total_fee)).toFixed(2)
      this.total_price = res.data.total_price
      this.pay_points = this.accinfo.pay_points > this.total_price.exchange_integral
      console.log(res.data)
    },
    formatPrice(price) {
      return (price).toFixed(2)
    },
    dizhi() {
      this.showAddrs = true
    },
    chooseAddr(addr) {
      this.addr = addr
      // let expresscount = 0
      this.showAddrs = false
    },

    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style>

.tipaddaddr{ text-align: left; padding-left: 15px;}
.addrbox{ font-size: 14px; line-height: 24px;  height: 66px;; text-align: left; display: flex;justify-content: space-between; align-items: center;  }
.addrinbox{padding: 0px 46px 0px 15px; color: #111; }
.order_confirmindex{
    background:#F6F6F6;
    width:100%;
    height:100%;
}
.cards{ padding: 15px 0; background: #fff;}
.van-card{ font-size: 14px; background: #fff; padding: 5px 15px;}
.van-card__title{ line-height: 24px; max-height: 48px; margin-bottom: 3px;}
.order_confirmsite{
    width:100%;
    height:66px;
    background:#FFFFFF;
    text-align: center;
    line-height: 66px;
    border-bottom: 1px solid #E4E4E4;
}

.van-card__thumb{ border: 1px solid #e4e4e4;  width: 76px;height: 76px;;}
.van-card__content{ height: 76px;;}
.order_confirmhome{
    /* margin-top:px; */
    width:100%;
    /* height:200px; */

}
.order_confirmhend{
    width:90%;
    height:500px;
    margin:0 auto;
    border-radius: 25px;
}
.order_confirmhomep{
    width:100%;
    height:35px;
    background:#FFFFFF;
    border-bottom: 1px solid #E4E4E4;
    line-height: 35px;
    margin-top:15px;
}
.order_confirmbox{
    height:150px;
    display: flex;
    justify-content: space-around;
}
.usepointtit{ max-width: 90px;}
.usepointv{ display: flex; justify-content: space-between;}
.order_confirmbox div:nth-child(2){
    margin:10px 0 0 10px;
}
.order_confirmbox div:last-child{
    margin:10px 10px 0 40px;
}
.order_confirmbottonbox{
  font-size: 14px;
    width:100%;
    margin-top: 100px;
    background:white;
}
.order_confirmbottonbox div{
       height:40px; padding:0 15px;
       display: flex;
       justify-content: space-between;
       line-height: 40px;
       border-bottom: 1px solid #E4E4E4;
}
.order_confirmliuyan{
    height:50px;
}
.order_confirmvanicon{
    position: absolute; top: 24px;
    right: 15px;
}
.popform{ width: 80%;}
.popformin{ padding: 10px;}
.popform .poptit{ padding: 10px 0px 18px;}
.popform .btns{ padding:18px 0px 5px; text-align: center;}
</style>
