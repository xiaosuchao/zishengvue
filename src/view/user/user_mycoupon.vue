<template>
  <div style="text-align:center">
    <van-tabs
      v-model="active"
      title-active-color="red"
    >
      <van-tab title="全部">
        <div class="user_couponbox">
          <van-icon name="point-gift-o" class="user_couponicon"/>
          <span>赶紧去领卷中心看看更多优惠卷</span>
        </div>
        <div>
          <van-icon name="info-o" class="user_mycouponicon"/>
        </div>
        <div style="margin-top:10px; font-size:18px; color:#BFBFBF">
          您还没有优惠卷
        </div>
      </van-tab>
      <van-tab title="已使用">内容 2</van-tab>
      <van-tab title="已过期">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Icon } from 'vant'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style>
.user_couponbox{
    width:94%;
    height:50px;
    color:#BFBFBF;
    border:1px solid #BFBFBF;
    text-align: center;
    line-height: 50px;
    margin:10px auto;
    border-radius: 25px;
}
.user_couponicon{
    font-size: 25px;
    vertical-align: middle;
    margin-right: 5px;
}
.user_mycouponicon{
    font-size: 110px;
    color:#BFBFBF;

}
</style>
