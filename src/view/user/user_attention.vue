<template>
  <div class="user_attentionhome">
    <div class="ulglist" style="padding-top:20px;">

      <van-card
        v-for="item in list"
        :key="item.goods_id"
        :thumb="item.thumb"
        :price="item.shop_price + ' + ' + item.exchange_integral+'积分'"
        :desc="item.goods_remark"
        :title="item.goods_name"

        @click="togoods(item)"
      />

    </div>
</div></template>

<script>
import { getCollectList } from '@/api/goods'
import { Icon, Card } from 'vant'
export default {
  components: {
    [Icon.name]: Icon,
    [Card.name]: Card
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getCollectList()
      if (res === 'err') { return }
      this.list = res.data
      console.log(this.list)
    },
    togoods(item) {
      this.$router.push({ name: 'goods', query: { id: item.goods_id }})
    }
  }
}
</script>

<style lang="less">
ul,body,li{
    margin:0;
    padding:0;
}
body{

}
ul,li{ list-style: none}
.ulattentionbox{

  font-size: 14px;
  .van-card{
    font-size:14px; background: #fff;
    .van-card__title{
      font-size: 15px;
    }
  }
}
</style>
