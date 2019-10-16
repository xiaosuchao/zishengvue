<template>
  <van-tabbar v-model="activei" active-color="red">
    <van-tabbar-item icon="home-o" to="index">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="category">分类</van-tabbar-item>
    <van-tabbar-item icon="fire-o" to="headline">头条</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  props: {
    actindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activei: 0
    }
  },
  computed: {

  },
  created() {
    this.activei = parseInt(this.actindex)
  },
  methods: {

  }
}
</script>

<style>

</style>
