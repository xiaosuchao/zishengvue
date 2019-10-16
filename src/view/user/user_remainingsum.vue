<template>
  <div>
    <van-tabs
      v-model="active"

      title-active-color="red"
    >
      <van-tab title="充值记录">
        <div style="text-align:center">
          <van-icon name="search" class="user_remainingsumicon"/>
        </div>
        <div class="user_remainingsumtext">暂时没有任何记录</div>
      </van-tab>
      <van-tab title="提现记录">内容 2</van-tab>
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
.user_remainingsumicon{
     font-size: 110px;
    color:#BFBFBF;
    margin-top: 100px;
    margin-bottom: 10px;
}
.user_remainingsumtext{
    color:#BFBFBF;
    font-size: 20px;
    text-align: center;
    margin-top:10px;
}
</style>
