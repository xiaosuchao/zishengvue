<template>
  <div class="myindexwrap">
    <!-- <router-link class="righttop" to="./user_membership">
      <van-icon name="setting-o" class="shezhi"/>
    </router-link> -->
    <div class="unav">
      <div class="box">
        <div>金额</div>
        <span style="color:gold">{{ accinfo.user_money }}</span>
        <br>
        <!-- <a href="">充值</a> -->
      </div>
      <div class="xiaoming">
        <div>
          <div class="acenter">
            <div class="imgbor">
              <img :src="accinfo.head_pic" alt="">
            </div>
            <div>{{ accinfo.nickname }}</div>
          </div>
        </div>
        <span class="memtype">[{{ accinfo.vip_bind_count?'VIP':'普通' }}会员]</span>
        <!-- <router-link to="./user_jinbi" style="width:80px; font-size:13px; margin-left:5px;">
          请绑定单号
        </router-link> -->
      </div>
      <div class="box">
        <div>
          <div>积分</div>
          <span style="color:gold">{{ accinfo.pay_points }}</span>
          <br>
          <!-- <router-link to="./user_jinbi">
            查看
          </router-link> -->
        </div>
      </div>
    </div>
    <div class="quanbu">
      <span>
        <van-icon name="orders-o" style="color:#333333;"/>
        我的订单
      </span>
      <router-link to="./user_orders">
        查看全部订单
      </router-link>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <i v-show="accinfo.wait_pay" class="i">{{ accinfo.wait_pay }}</i>
        <router-link :to="{name:'user_orders',params:{ordertype:'WAITPAY'}}">
          <van-icon name="pending-payment"/>
          <span style="color:black; font-size:12px;">待付款</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <i v-show="accinfo.wait_send" class="i">{{ accinfo.wait_send }}</i>
        <router-link :to="{name:'user_orders',params:{ordertype:'WAITSEND'}}">
          <van-icon name="logistics" />
          <span style="color:black; font-size:12px;">待发货</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <i v-show="accinfo.wait_receive" class="i">{{ accinfo.wait_receive }}</i>
        <router-link :to="{name:'user_orders',params:{ordertype:'WAITRECEIVE'}}">
          <van-icon name="tosend" />
          <span style="color:black; font-size:12px;">待收货</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link :to="{name:'user_orders',params:{ordertype:'WAITCCOMMENT'}}">
          <van-icon name="replay" />
          <span style="color:black; font-size:12px;">退换货</span>
        </router-link>
      </van-col>
      <!-- <van-col span="4">
        <router-link to="./user_orders">
          <van-icon name="underway-o" class="red"/>
          <span style="color:black; font-size:12px;">周期购</span>
        </router-link>
      </van-col> -->
    </van-row>

    <!-- <van-cell-group class="user-group" >
      <van-cell icon="cash-on-deliver" title="领取优惠卷" is-link style="font-size:15px" to="./user_juan"/>
      <van-cell icon="balance-pay" title="我的优惠卷" is-link style="font-size:15px" to="./user_mycoupon"/>
    </van-cell-group> -->

    <van-cell-group class="user-group">
      <van-cell icon="shopping-cart-o" title="购物车" is-link to="../cart" />
      <van-cell icon="like-o" title="我的收藏" is-link to="./user_attention"/>
      <!-- <van-cell icon="gift-o" title="我的足迹" is-link style="font-size:15px" to="./user_attention"/> -->
    </van-cell-group>
    <!-- <van-cell-group class="user-group">
      <van-cell icon="gold-coin-o" title="余额体现" is-link style="font-size:15"/>
      <van-cell icon="gold-coin-o" title="余额明细" is-link style="font-size:15px" to="./user_remainingsum"/>
    </van-cell-group> -->
    <van-cell-group class="user-group" >
      <van-cell :value="accinfo.vip_bind_count" icon="vip-card-o" title="我的VIP账户" is-link to="./vipaccounts"/>
      <van-cell :value="accinfo.is_paypwd ? '已设置' :'未设置'" icon="after-sale" title="我的支付密码" is-link to="./paypwd"/>
      <van-cell icon="location-o" title="收货地址" is-link to="./user_addrlist"/>
      <!-- <van-cell icon="setting-o" title="帮助中心" is-link /> -->
      <van-cell icon="setting-o" title="清除缓存" is-link @click="exitlogin()" />
    </van-cell-group>
    <buttom-nav :actindex="1?4:0"/>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Tabbar, Dialog, TabbarItem } from 'vant'
import buttomnav from '../buttomnav/index.vue'
import store from '@/store'
// import { removeToken, setWechatinfo, setOpenid } from '@/utils/auth'
import { mapState } from 'vuex'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [CellGroup.name]: CellGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    buttomnav
  },
  computed: {
    ...mapState([
      'userinfo',
      'accinfo'
    ])
  },
  created() {
    if (!this.accinfo) { store.dispatch('loadaccinfo') }
  },
  methods: {
    exitlogin() {
      Dialog.confirm({
        title: '是否清除缓存?'
      }).then(() => {
        // store.dispatch('setstoretoken', '')
        // store.dispatch('setuserinfo', '')
        // store.dispatch('setaccinfo', '')
        // removeToken()
        // setWechatinfo('')
        // setOpenid('')
        store.dispatch('logout')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="less">
.myindexwrap{ padding-bottom: 50px;}
.user-group .van-icon {
  font-size: 20px;
}
.unav {
  position: relative;
  width: 100%;
  padding-top: 20px;
  background: #ff0238;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  color: white;
  font-size: 14px;
  a {
    display: inline-block;
    color: white;
    width: 50px;
    height: 20px;
    border: 1px solid #ffff;
    border-radius: 15px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    margin-top: 10px;
  }
  .box {
    text-align: center;
    margin-bottom: 30px;
  }
  .xiaoming {
    margin-bottom: 25px;
    text-align: center;
  }
  .acenter {

    .imgbor{border: 2px solid #fff; border-radius: 50%; width: 58px; height: 58px;  display: inline-block; font-size: 13px;}
    img{ width: 58px; height: 58px;; display: block; border-radius: 50%;margin-bottom: 3px;}
  }
  .memtype{ font-size: 13px;}
}
.quanbu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  background: white;
  font-size: 15px;
  a {
    color: #666;
    margin: 10px;
  }
  span {
    margin: 10px;
  }
}
.red {
  color: red !important;
  border-left: 1px solid #666;
}
.user {
  &-poster {
    width: 100%;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
    font-size: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    .van-col{ position: relative;}
    .i{position: absolute; width: 14px; height: 14px; right: 22%; top:0;line-height: 14px; font-style: normal; font-size: 10px;
     background: #f44; color: #fff; border-radius: 50%; text-align: center; }

    .van-icon {
      display: block;
      font-size: 30px;
      margin-bottom: 10px;
      // color: #e5e5e5;
      color:#BFBFBF;
    }
  }
}
.righttop {
  position: absolute;
  right: 15px;
  top: 12px;
  z-index: 10;
}
.shezhi {
  color: white;
  font-size: 25px;
}
</style>
