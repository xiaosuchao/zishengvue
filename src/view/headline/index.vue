<template>
  <div>

    <ul v-if="list.length" class="ulheadlinelist">
      <li v-for="lis in list" :key="lis.id">
        <router-link :to="{name:'newsshow',query:{id:lis.article_id}}">
          <img :src="lis.thumb?lis.thumb:require('../../../public/images/nodata.svg')" alt="">
          <div>{{ lis.title }}</div>
        </router-link>
      </li>
    </ul>
    <div v-else class="nodata">
      <img src="../../../public/images/nodata.svg" alt="">
      <div class="txt">暂无相关内容</div>
    </div>
    <buttom-nav :actindex="2-0"/>
  </div>
</template>
<script>
import { Search, Tabbar, TabbarItem } from 'vant'
import buttomnav from '../buttomnav/index.vue'
import { articleList } from '@/api/article'
export default {
  components: {
    [Search.name]: Search,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    buttomnav
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
      const res = await articleList({ cat_id: 3 })
      if (res === 'err') { return }
      this.list = res.data
    }
  }
}

</script>
<style lang="less">
.van-search__action{
    color:white;
  }
.ulheadlinelist{
   width:100%;
   margin-top:10px; padding-bottom: 50px; overflow: hidden;
   li{
     float: left;
     width:47%;
     height:180px;
     margin-left: 8px;
     img{
       width:100%;
       height:120px;
       border: 1px solid #e4e4e4;
     }
     div{
       font-size: 13px;
       margin-left: 10px;
       color:black;
     }
   }
}
</style>

