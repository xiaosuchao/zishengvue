<template>
  <div class="formaccedit">
    <div class="accedithead">
      设置支付密码
    </div>
    <van-cell-group>
      <van-field
        v-model="paypwdform.new_password"
        placeholder="设置支付密码"
        label="支付密码"
        required
      />
      <van-field
        v-model="paypwdform.confirm_password"
        placeholder="再次输入支付密码"
        type="password"
        label="确认支付密码"
        required
      />
      <van-field
        v-model="paypwdform.mobile_code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >

        <van-button v-if="!issending" slot="button" class="btnsend" size="small" type="primary" inline="true" @click="sendcode" >发送验证码</van-button>
        <van-button v-else slot="button" disabled class="btnsend" size="small" type="primary" inline="true" >{{ codesecendsleft }}s后可重发</van-button>
      </van-field>

    </van-cell-group>
    <div class="btns">
      <van-button :block="2>1" type="danger" @click="submPayPwd()">提 交</van-button>
    </div>
  </div>
</template>

<style>
.accedithead{ padding: 20px 0px 12px 10px; background: #fff;}
.btns{padding: 40px 12px; text-align: center}
</style>

<script>
import { Toast, Button, Cell, CellGroup, Field } from 'vant'
import { mapState } from 'vuex'
import { payPwdSet } from '@/api/user'
import store from '@/store'
import md5 from 'md5'
export default {
  components: {

    [Toast.name]: Toast,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  data() {
    return {
      paypwdform: {},
      issending: false,
      codesecendsleft: 60
    }
  },
  computed: {
    ...mapState([
      'userinfo',
      'accinfo'
    ])
  },
  created() {

  },

  methods: {
    async submPayPwd() {
      const res = await payPwdSet(this.paypwdform)
      if (res === 'err') { return }
      Toast.success('设置支付密码成功')
      setTimeout(() => {
        store.dispatch('loadaccinfo')
        this.$router.push({ name: 'user' })
      }, 600)
    },
    sendcode() {
      const vm = this
      const time = Math.round(new Date().getTime() / 1000).toString()
      const sign = (md5('SwsF$4DdJ*s2i7SS' + time)).substring(8, 24)
      this.$http.post('/auth/send_mobile_code', { type: 'user_auth', sign: sign, time: time }).then(
        (res) => {
          if (res === 'err') {
            return
          }
          console.log(res)
          vm.issending = true
          vm.decseconds()
        }
      )
    },
    decseconds() {
      if (!this.issending) { return }
      setTimeout(() => {
        this.codesecendsleft--
        if (this.codesecendsleft === 0) { this.issending = false; this.codesecendsleft = 60 } else { this.decseconds() }
      }, 1000)
    }
  }
}
</script>

