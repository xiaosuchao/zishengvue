<template>
  <div>
    <!-- 搜索框 -->
    <div class="index_indexbox">
      <van-search
        v-model="searkey"
        class="search"
        shape="round"
        placeholder="搜索"
        show-action
        background="#FF0238"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>

    <!-- 导航栏 -->
    <div class="classmainwrap" style="width:100%; display:flex;">

      <van-badge-group :active-key="activeKey" class="category_tab" @change="onChange">
        <van-badge v-for="item in catelist" :key="item.id" :title="item.name" @click="getcategoodslist(item.id)" />
      </van-badge-group>
      <div class="rightbox">
        <ul class="ulgoods">
          <li v-for="item in goodslist" :key="item.goods_id" class="listgoods">
            <router-link :to="{name:'goods',query:{id:item.goods_id}}">
              <div class="imgbox">
                <img :src="item.thumb" alt="">
              </div>
              <div class="name">{{ item.goods_name }}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <buttom-nav :actindex="1?1:0"/>
  </div>
</template>

<script>
import { getCateList, getGoodsList } from '@/api/goods'
import { Search, Badge, BadgeGroup, Tabbar, TabbarItem } from 'vant'
import buttomnav from '../buttomnav/index.vue'
export default {
  components: {
    [Search.name]: Search,
    [Badge.name]: Badge,
    [BadgeGroup.name]: BadgeGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    buttomnav
  },
  data() {
    return {
      searkey: '',
      activeKey: 0,
      catelist: [],
      goodslist: []
    }
  },
  created() {
    this.getcatelist()
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'glist', query: { key: this.searkey }})
    },
    onChange(key) {
      this.activeKey = key
    },
    async getcategoodslist(catid) {
      const res = await getGoodsList({ category_id: catid })
      this.goodslist = res.data
    },
    async getcatelist() {
      const res = await getCateList()
      this.catelist = res.data
      if (this.catelist.length) {
        this.getcategoodslist(this.catelist[0]['id'])
      }
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
  .ulgoods{ display: flex; flex-wrap:wrap;}
  .listgoods{
    width:46%; margin-bottom: 12px;
    margin-left: 7px;
    text-align: center;
  }
  .listgoods a {
    width:100%;color:black;font-size: 13px; cursor: pointer;
  }
  .listgoods a .imgbox{
    width: 100%; padding-top: 100%; position: relative; height: 0; border: 1px solid #e4e4e4; margin-bottom: 4px;
  }
  .listgoods a img{
    width:100%; position: absolute; left: 0; top: 0; height: 100%;;
  }
  .listgoods .name{margin: 4px 0px 6px; max-height: 36px; overflow: hidden;}
</style>
