<template>
  <div class="nav_user">
    <div>
      <van-icon name="info-o" class="user_jinbiicon"/>
    </div>
    <div>没有绑定账号!!</div>
    <div class="user_jinbiqueren">
      <router-link to="./user">
        确认
      </router-link>
    </div>
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
.nav_user{
    width:100%;
    text-align: center;
    font-size: 20px;
    color:black;

}
.user_jinbiqueren{
    width:90%;
    height:50px;
    border:1px solid #BFBFBF;
    line-height: 50px;
    background:#D8F5F1;
    margin:0 auto;
    margin-top:30px;
    border-radius: 25px;
    color:#BFBFBF;
}
 .user_jinbiicon{
    font-size: 110px;
    color:#BFBFBF;
    margin-top: 100px;
    margin-bottom: 10px;
}
</style>
