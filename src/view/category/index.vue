<template>
  <div class="category">
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
    <div class="scrollcategory">
      <ul id="ulcate">
        <li v-for="item in catelist" :id="'licate'+item.id" :key="item.id" :class="{'on':catid===item.id}" @click="catid!==item.id && onChange(item.id)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div v-infinite-scroll="loadMore" class="categorylist" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul>
        <li v-for="item in goodslist" :key="'goo'+item.goods_id" class="listgoods">
          <div class="leftgoodsimg">
            <router-link :to="{name:'goods',query:{id:item.goods_id}}"><img :src="item.thumb" :alt="item.goods_name" width="106px" height="106px"></router-link>
          </div>
          <div class="rightgoodsdescription">
            <router-link :to="{name:'goods',query:{id:item.goods_id}}">
              <div class="name">{{ item.goods_name }}</div>
              <div class="goodsprice">会员价：￥{{ (parseFloat(item.shop_price)-parseFloat(item.exchange_integral)).toFixed(2) }}+{{ item.exchange_integral }}积分</div>
              <div class="originprice">原价：￥{{ item.market_price }}</div>
            </router-link>
          </div>
        </li>
        <div class="txtloadmore">{{ doneall?'已加载全部':'正在加载更多...' }}</div>
      </ul>
    </div>
    <buttom-nav :actindex="1?1:0"/>
  </div>
</template>

<script>
import { getCateList, getGoodsList } from '@/api/goods'
import { Search, Badge, BadgeGroup, Tabbar, TabbarItem } from 'vant'
import buttomnav from '../buttomnav/index.vue'
import { setTimeout } from 'timers'
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
      catid: this.$route.query.id,
      page: 1,
      catelist: [],
      goodslist: [],
      busy: true,
      doneall: false
    }
  },
  created() {
    this.getcatelist()
  },
  mounted() {
    setTimeout(() => {
      document.querySelector('#ulcate').scrollLeft = document.querySelector('#licate' + this.catid).offsetLeft - 80
    }, 200)
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'glist', query: { key: this.searkey }})
    },
    onChange(catid) {
      this.catid = catid
      this.doneall = false
      this.page = 1
      this.goodslist = []
      this.getcategoodslist()
    },
    async getcategoodslist() {
      const res = await getGoodsList({ category_id: this.catid, page: this.page })
      if (res.data.length === 0) this.doneall = true
      if (this.page++ > 1) {
        this.goodslist = this.goodslist.concat(res.data)
      } else {
        this.goodslist = res.data
      }
      this.busy = false
    },
    async getcatelist() {
      const res = await getCateList()
      this.catelist = res.data
      if (this.catelist.length) {
        if (!this.catid) this.catid = this.catelist[0]['id']
        this.loadMore()
      }
    },
    loadMore() {
      if (this.doneall) return
      this.busy = true
      this.getcategoodslist()
    }
  }
}
</script>

<style lang="less">
.txtloadmore{ text-align: center; padding: 10px 0; font-size: 14px;color: #999;}
.category{
  padding-bottom: 60px;
  .van-search{ padding: 8px 2px 8px 12px;}
  .van-search__action{
    color:white;
  }
  .index_indexbox{
    width:100%;
    // position: fixed;
    top:0;
    left:0;
    // z-index:100;
  }
  .scrollcategory{
    ul{
      background-color: #fff;display: flex;align-items: center;overflow:scroll;
      li{
        white-space: nowrap; line-height: 49px;  padding: 0 10px;
      }
      .on{color: red;}
    }
  }
  .categorylist{
    position: absolute; top: 105px; bottom: 50px; left: 0; right: 0; overflow-y:scroll;
    ul{
      li{
        margin: 0px 0 8px;display: flex; background: #fff; padding: 10px 0;
        .leftgoodsimg{
          padding :0 10px;
          img{ width:80px; height: 80px;;}
        }
        .rightgoodsdescription{
          a{
            color: #000;
            .name{font-size: 16px;}
            .goodsprice{color: #c33; padding: 5px 0;}
            .originprice{font-size: 14px;color: #999999;}
          }
        }
      }

    }
  }
}
</style>
