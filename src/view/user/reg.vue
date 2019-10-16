<template>
  <div class="bod bdreform">
    <div class="reglogobox">
      <img clss="imgreglogo" src="../../../public/images/icon.png">
      发发财富商城
    </div>
    <div class="formreg">

      <div class="accedithead" style="padding:15px 0">
        用户注册
      </div>
      <van-cell-group>
        <van-field
          v-model="form.mobile"
          placeholder="请填写手机号码"
          label="手机"
          required
        />
        <van-field
          v-model="form.mobile_code"
          placeholder="请填写验证码"
          label="验证码"
          required
        >
          <van-button v-if="!issending" slot="button" class="btnsend" inline="true" @click="sendcode" >发送验证码</van-button>
          <van-button v-else slot="button" disabled class="btnsend" inline="true" >{{ codesecendsleft }}s后可重发</van-button>
        </van-field>

      </van-cell-group>
      <van-button class="btnsubmitreg" type="primary" @click="submitform">提 交</van-button>
      <!-- <div class="btns">
        <van-button type="danger" @click="submitform">提交</van-button>
      </div> -->

      <!-- <div class="row">
        <label>密码</label>
        <div class="winput">
          <input v-show="showpwd" v-model="form.password" maxlength="30" type="text" placeholder="请填写密码">
          <input v-show="!showpwd" v-model="form.password" maxlength="30" type="password" placeholder="请填写密码">
        </div>

      </div>
      <div class="row">
        <label>真实姓名</label>
        <div class="winput">
          <input v-model="form.truename" maxlength="30" type="text" placeholder="真实姓名">
        </div>
      </div> -->
      <!-- <div class="row">
        <label>邀请码</label>
        <div class="winput"><input v-model="form.invite_code" max-length="4" type="text" placeholder="请填写邀请码"></div>
      </div> -->

    </div>

  </div>
</template>
<script>
import { Toast, Icon, Button, Cell, Dialog, CellGroup, Field } from 'vant'
import { setToken, getWechatinfo } from '@/utils/auth'
import { mapState } from 'vuex'
import store from '@/store'
import md5 from 'md5'
export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  },

  data() {
    return {
      form: {
        mobile: '',
        mobile_code: '',
        truename: '',
        invite_code: '',
        password: '',
        user_type: 1,
        noNeedLogin: 1
      },
      issending: false,
      codesecendsleft: 60,
      showpwd: false,
      accform: {}
    }
  },
  computed: {
    ...mapState([
      'wechatinfo',
      'userinfo'
    ])
  },
  created() {
    console.log(getWechatinfo())
  },
  methods: {

    submitform() {
      this.$http.post('/auth/register', { platform: 'wechat', mobile: this.form.mobile, mobile_code: this.form.mobile_code, invite_code: this.form.invite_code || '', wechat_info: getWechatinfo(), noNeedLogin: 1 }).then(
        (res) => {
          if (res === 'err') { return }
          console.log(res)
          setToken(res.data.token)
          store.dispatch('setstoretoken', res.data.token)
          store.dispatch('setuserinfo', res.data)
          store.dispatch('loadaccinfo')
          Toast('注册成功')
          this.$router.push({ path: '/' })
        }
      )
    },

    sendcode() {
      const vm = this
      const time = Math.round(new Date().getTime() / 1000).toString()
      const sign = (md5('SwsF$4DdJ*s2i7SS' + this.form.mobile + time)).substring(8, 24)
      this.$http.post('/auth/send_mobile_code', { mobile: this.form.mobile, type: 'user_reg', noNeedLogin: 1, sign: sign, time: time }).then(
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
<style lang="less" scoped>
.van-cell{ line-height: 34px;}
</style>

<style lang="less" >

.bdreform{
  background: #fff; height: 100%;
}
.reglogobox{
  text-align: center; padding: 50px 0 20px; color: #c30;
  img{ width:64px; height: 64px; display: block; margin: 0 auto; border-radius: 8px; margin-bottom: 6px;}
}
.formreg {
  font-size: 14px;
  margin: 0px 14px 20px;
  padding-top: 30px;
  align-items: center;
  .regtit{ padding-bottom: 12px;}
  .btnsubmitreg{ width: 100%; margin-top: 20px; background: #c30 ;border:none;}
}

.formreg .i-col {
  background: #fff;
}

.formreg .row {
  display: flex;
  border-bottom: 1px solid #efefef;
  padding: 15px 0;
}

.formreg .row label {
  width: 72px;
  text-indent: 0px;
  color: #333;
}

.formreg .row .btnsend {
  font-size: 15px;
}

.formreg .btnsend {
  line-height: 32px;
  height: 32px;
  margin: -2px 0;
}

.formreg .winput {
  margin-top: -4px;
}

</style>
