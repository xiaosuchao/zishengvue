<template>
  <div>
    <div class="bianji">
      <a class="btnedit" @click="showEdit=!showEdit">{{ showEdit?'完成':'编辑' }}</a>
    </div>
    <div>

      <van-checkbox-group v-model="checkedGoods" class="card-goods">
        <div v-for="item in list" :key="item.id" >
          <van-checkbox
            v-model = "item.selected"
            :key="item.id"
            :name="item.id"
            class="card-goods__item"
          >
            <van-card
              :title="item.goods_name"
              :desc="item.spec_key_name"
              :num="item.goods_num"
              :price="formatPrice(parseFloat(item.goods_price))"
              :thumb="item.goods_img"
            >
              <div slot="footer">
                <van-stepper v-model="item.goods_num" @click.native.stop />
              </div>
            </van-card>
          </van-checkbox>
        </div>

      </van-checkbox-group>
      <div v-show="showEdit" class="editbtnbox">
        <van-button type="danger" @click="delFromCart">从购物车中删除</van-button>
      </div>
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        class="bottomnav"
        style="margin-bottom:50px;"
        @submit="onSubmit"
      >
        <van-checkbox v-model="chkall" @click="setallchk">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <buttom-nav :actindex="1?3:0"/>

  </div>

</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Tabbar, TabbarItem, Icon, Stepper, Button } from 'vant'
import { getCartList, delFromCart } from '@/api/cart'
import buttomnav from '../buttomnav/index'
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon,
    [Stepper.name]: Stepper,
    [Button.name]: Button,
    buttomnav
  },

  data() {
    return {
      chkall: false,
      show: false,
      checkedGoods: [],
      showEdit: false,
      list: []
    }
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },

    totalPrice() {
      return this.list.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? parseFloat(item.goods_price) * item.goods_num : 0), 0) * 100
    }
  },
  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const res = await getCartList()
      if (res === 'err') return
      this.list = res.data.cartList
      this.checkedGoods = this.list.reduce((prev, cur) => {
        if (cur.selected) { prev.push(cur.id) }
        return prev
      }, []
      )
      console.log(res.data)
    },
    async delFromCart() {
      if (!this.checkedGoods.length) { Toast.fail('请先选择') }
      const res = await delFromCart({ ids: this.checkedGoods.join(',') })
      if (res === 'err') return
      this.list = this.list.filter(v => { return this.checkedGoods.indexOf(v.id) === -1 })
      this.checkedGoods = []
      Toast.success('删除成功！')
    },
    setallchk() {
      this.checkedGoods = this.chkall ? this.list.map(v => { return v.id }) : []
    },
    formatPrice(price) {
      return (price).toFixed(2)
    },

    async onSubmit() {
      const tmplist = {}
      const tmpchked = {}
      this.list.forEach(v => {
        tmplist[v.id] = v.goods_num
      })
      this.checkedGoods.forEach(v => {
        tmpchked[v] = this.list.filter(vv => { return vv.id.toString() === v.toString() })[0]['goods_num']
      })
      const res = await getCartList({ goods_num: tmplist, cart_select: tmpchked })
      if (res === 'err') return
      this.$router.push({ path: './order_confirm' })
    }
  }

}
</script>

<style lang="less">
.btnedit{}
.editbtnbox{ position:fixed; bottom: 50px; height: 50px; background: #fff; padding-top: 3px; box-sizing: border-box; z-index: 99999; left: 100px;; right: 0; text-align: right; padding-right: 10px;}
.card-goods {
  padding:10px 0;background: #fff; position: absolute; left: 0;right: 0;top:50px;bottom:90px; overflow: scroll;
  .van-card{ font-size: 14px; margin-bottom: 10px;  background: #fff;}
  &__item {
    position: relative;
    .van-card__thumb{ width: 72px; height: 72px; border: 1px solid #e4e4e4;}
    .van-card__content{ height: 72px;;}
    .van-card__title{ margin-bottom: 3px;}
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-card__num{display: none}

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
    .van-card__desc{ padding: 6px 0;}
    .van-stepper{ position: absolute; right: 0; bottom: 0; background: #f8f8f8;right: 10px;}
  }
}
.bianji{
  width:100%;
  height:50px;
  // background:#E0F9F6;
  line-height: 50px;
  a{
    display:block;
    font-size: 16px;
    color:black;
    margin-left: 85%;
  }
}

.cart_indexbox{
  width:100%;
  height:50px;
  margin-top: 32%;
}
.active{
  display:none;
}
.cart_indexbox span{
  display: inline-block;
  width:50%;
  height:100%;
  text-align: center;
  line-height: 50px;
}
.van-submit-bar .van-checkbox{ margin-left: 15px;}
</style>
