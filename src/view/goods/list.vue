<template>
  <div>
    <!-- 搜索框 -->
    <div class="index_indexbox">
      <van-search
        v-model="searkey"
        class="search"
        shape="round"
        placeholder="请输入关键字"
        show-action
        background="#FF0238"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div v-show="!searkey" class="nodata">
      <img src="../../../public/images/nodata.svg" alt="">
      <div class="txt">请输入关键词搜索</div>
    </div>
    <div v-show="!list.length && searched && searkey" class="nodata">
      <img src="../../../public/images/nodata.svg" alt="">
      <div class="txt">没有相关数据</div>
    </div>

    <div class="ulglist" style="padding-top:60px;">
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

  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
import { Search, Badge, BadgeGroup, Tabbar, TabbarItem, Card, Toast } from 'vant'
import buttomnav from '../buttomnav/index.vue'
export default {
  components: {
    [Search.name]: Search,
    [Badge.name]: Badge,
    [BadgeGroup.name]: BadgeGroup,
    [Card.name]: Card,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    buttomnav
  },
  data() {
    return {
      searkey: this.$route.query.key,
      list: [],
      searched: false
    }
  },
  watch: {
    searkey(newval, curval) {
      this.searched = false
      this.list = []
    }
  },
  created() {
    if (this.searkey) {
      this.onSearch()
    }
  },
  methods: {
    async onSearch() {
      if (this.searkey === '') { Toast.fail('请输入关键字'); return }
      const res = await getGoodsList({ keywords: this.searkey })
      if (res === 'err') { return }
      this.list = res.data
      this.searched = true
    },
    togoods(item) {
      this.$router.push({ name: 'goods', query: { id: item.goods_id }})
    }

  }
}
</script>

<style lang="less">
// #app{
//   width:100%;
//   height:100%;
// }
.van-search{ padding: 8px 2px 8px 12px;}
.van-search__action{
    color:white;
  }

  html,body{
    width:100%;
    height:100%;
  }
  .classmainwrap{
    position: absolute; top: 58px; left: 0; bottom: 55px;
    .category_tab{
      width:30%;height:100%;overflow-y: scroll;
    }
    .rightbox{
      width:70%; height: 100%; overflow-y: scroll; padding-right: 1%;
    }
  }

  .index_indexbox{
    width:100%;
    position: fixed;
    top:0;
    left:0;
    z-index:100;
  }

</style>
