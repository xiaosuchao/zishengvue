<template>
  <div class="vipwrap">

    <div class="vipacchead">
      VIP会员账户
      <van-button type="danger" @click="handleCreate">添加账户</van-button>
    </div>
    <div class="vipaccwarp">
      <van-panel v-for="item in list" :title="'账户：'+item.vip_user_code" :key="item.id" :status="parseTime(item.bind_time)">
        <div class="accamount">
          <div v-show="item.e1" class="e1">E1积分余额：{{ item.e1 }}</div>
          <div v-show="item.b2" class="b2">B2积分余额{{ item.b2 }}</div>
        </div>
        <div class="cellcon">
          <ul v-if="item && item.transfer_log && item.transfer_log.length">
            <li v-for="(log,ilog) in item.transfer_log" :key="log.log_id">
              <template v-if="ilog<3">
                <span>{{ parseTime(log.change_time) }}: </span> <strong>转入{{ log.pay_points }}积分</strong>
              </template>

            </li>
          </ul>
          <div v-else style="color:#666; font-weight:normal;font-size:13px;">
            暂无积分转入记录
          </div>
        </div>
        <div slot="footer">
          <!-- <van-button size="small" >移除账户</van-button> -->
          <van-button size="small" type="primary" @click="getAccountAmount(item)">查询余额</van-button>
          <van-button size="small" type="danger" @click="handleTransfer(item)">转积分到商城</van-button>
        </div>
      </van-panel>
    </div>
    <van-popup v-model="showAccEdit" class="popAccEdit" >
      <div class="formaccedit">
        <div class="accedithead">
          添加VIP账户
        </div>
        <van-cell-group>
          <van-field
            v-model="accform.user_code"
            placeholder="请填写用户名"
            label="用户名"
            required
          />
          <van-field
            v-model="accform.password"
            placeholder="请填写密码"
            label="密码"
            required
          />
        </van-cell-group>
        <div class="btns">
          <van-button type="danger" @click="accAdd()">提交</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showPointsTransfer" class="popPointsTransfer" >
      <div class="formaccedit">
        <div class="accedithead">
          转移积分到商城
        </div>
        <van-cell-group>
          <van-field
            v-model="tranferform.money"
            placeholder="转移数额"
            label="转移数额"
            required
          />
          <van-field
            v-model="tranferform.password"
            placeholder="请填写密码"
            label="密码"
            required
          />
          <van-cell title="账户类别" class="memtypecell" title-class="memtypecelltit" >
            <template slot>
              <van-radio-group v-model="tranferform.account_type" >
                <van-radio name="E1" >E1</van-radio>
                <van-radio name="B2" >B2</van-radio>
              </van-radio-group>
            </template>
          </van-cell>
          <van-cell class="trantip">
            积分转入商城后不可退回原账户内
          </van-cell>
        </van-cell-group>
        <div class="btns">

          <van-button type="danger" @click="submTransfer()">我已知悉，确认转移</van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>

import { Icon, Button, Panel, Popup, Cell, Dialog, CellGroup, Field, RadioGroup, Radio, Toast, Checkbox, CheckboxGroup } from 'vant'
// import { accountList, accountAdd, pointTransfer } from '@/api/zsy'
import { accountList, accountAdd, pointTransfer, accountAmount } from '@/api/zsy'
import { parseTime } from '@/utils'
import store from '@/store'
import { mapState } from 'vuex'
// import { getOpenid } from '@/utils/auth'
export default {
  components: {
    [Button.name]: Button,
    [Panel.name]: Panel,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data() {
    return {
      tabindex: 0,
      datalist: 60,
      init5: 5,
      list: [],
      ordertype: '',
      paystr: {},
      showAccEdit: false,
      accform: {},
      showPointsTransfer: false,
      tranferform: {
        user_code: '',
        account_type: 'B2'
      },
      jOrderStatus: {
        'WAITPAY': '待付款',
        'WAITSEND': '待发货',
        'WAITRECEIVE': '待收货',
        'WAITCCOMMENT': '待评价'
      }
    }
  },
  computed: {
    ...mapState([
      'accinfo'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    async getAccountAmount(item) {
      const resb2 = await accountAmount({ account_type: 'B2', user_code: item.vip_user_code })
      if (resb2 === 'err') { return }
      const rese1 = await accountAmount({ account_type: 'E1', user_code: item.vip_user_code })
      if (rese1 === 'err') { return }
      this.list = this.list.map(v => {
        if (v.vip_user_code === item.vip_user_code) {
          v.b2 = resb2.data
          v.e1 = rese1.data
        }
        return v
      })
    },
    async getList() {
      const res = await accountList()
      if (res === 'err') { return }
      this.list = res.data.map(v => {
        v.transfer_log = v.transfer_log.reverse()
        return v
      })
      console.log(this.list.length === 0)
    },
    async accAdd() {
      const res = await accountAdd(this.accform)
      if (res === 'err') { return }
      Toast.success('添加成功')
      this.getList()
      this.showAccEdit = false
    },
    handleCreate() {
      this.accform = {
        user_code: '',
        password: ''
      }
      this.showAccEdit = true
    },
    async submTransfer() {
      const res = await pointTransfer(this.tranferform)
      if (res === 'err') { return }

      if (this.accinfo.is_paypwd) {
        Toast.success('转移积分成功')
        setTimeout(() => {
          store.dispatch('loadaccinfo')
        }, 600)
      } else {
        Dialog.confirm({
          title: '转移积分成功',
          message: '为便于使用积分购物，请设置支付密码'
        }).then(() => {
          store.dispatch('loadaccinfo')
          this.$router.push({ name: 'paypwd' })
        }).catch(() => {
        // on cancel
        })
      }

      this.showPointsTransfer = false
    },
    handleTransfer(item) {
      this.tranferform = {
        user_code: item.vip_user_code,
        password: '',
        money: '',
        account_type: 'B2'
      }
      this.showPointsTransfer = true
    },
    parseTime(v, fmt) {
      return parseTime(v, fmt)
    }

  }
}
</script>

<style>
.memtypecelltit{max-width: 80px;}
</style>

<style lang="less" scoped>

.vipwrap{
    .vipacchead{ padding: 8px; display: flex; justify-content: space-between;align-items: center;}
    .vipaccwarp{
        .van-panel__header .van-panel__header-value{ color: #999; font-size: 13px;}
        .accamount{
          display: flex; font-size: 14px; padding: 10px 15px 0px; color: #f44;
          div{ margin-right: 20px;}
        }
        .cellcon{
            padding:10px 12px;
            ul{
              font-weight: normal; font-size: 13px; color:#666;
                li{ line-height: 24px;
                strong{ font-weight: normal;}
                }
            }

        }
        .van-panel__footer{
            text-align: right;
            .van-button{ margin-left:10px;}
        }
    }
}
.popAccEdit,.popPointsTransfer{
    width:80%;
    .van-radio-group{
      display: flex;
      .van-radio{ margin-left: 16px;}
    }
}
.formaccedit{
    padding: 15px;
    .accedithead{ padding: 0 0 16px;}
    .btns{
        padding: 25px 0 10px; text-align: center;
        .van-button{ width: 100%;}
    }
}
.trantip{
  .van-cell__value--alone{color:red;}
}
</style>
