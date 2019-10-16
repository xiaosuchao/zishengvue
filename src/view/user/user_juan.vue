<template>
  <div style="width:100%; text-align:center;">
    <div>
      <van-icon name="info-o" class="user_juanicon"/>
    </div>
    <div style="font-size:18px; color:#BFBFBF">还没有发布优惠卷</div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style>
.user_juanicon{
     font-size: 110px;
    color:#BFBFBF;
    margin-top: 100px;
    margin-bottom: 10px;
}
</style>
