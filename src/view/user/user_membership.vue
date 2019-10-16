<template>
  <div class="user_membershiphome">
    <router-link to="" class="user_membershiplink">读取微信资料</router-link>
    <van-uploader :after-read="onRead" style="width:100%">
      <div class="user_membershiptouxiang">
        <span class="user_membershipsp">头像</span>
        <img src="../../../public/images/u670.png" alt="" class="user_membershipimg">
        <van-icon name="arrow" />
      </div>
    </van-uploader>

    <van-cell-group>
      <van-field v-model="value" placeholder="走丢得泼猴" label="修改昵称"/>
    </van-cell-group>
    <router-link to="" class="user_membershiprouter">
      <span>手机号</span>
      <span>18595428132(已绑定)</span>
      <span>更换绑定</span>
    </router-link>

    <van-cell-group>
      <van-field v-model="value" placeholder="请输入您的姓名" label="姓名"/>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="value" placeholder="请输入您的微信号" label="微信号"/>
    </van-cell-group>
    <!-- <van-area :area-list="areaList" /> -->
    <!-- <van-area :area-list="areaList" value="110101" /> -->
    <van-button round type="danger" style="width:80%; margin-left:10%; margin-top:50px">提交审核</van-button>
  </div>
</template>

<script>
import { Uploader, Icon, Field, DatetimePicker, Popup, Button, Area } from 'vant'
export default {
  components: {
    [Uploader.name]: Uploader,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Area.name]: Area
  },
  data() {
    return {
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
      show: false,
      areaList: [
        '北京市', '上海市'
      ],
      value: ''
    }
  },
  methods: {
    onRead(file) {
      console.log(file)
    }
  }
}
</script>

<style>
.user_membershiphome{
    width:100%;
    height:100%;
    background:#F6F6F6;
    overflow: hidden;
}
.user_membershiplink{
    display: block;
   color:red;
   font-size: 16px;
   margin-left: 70%;
   margin-top:10px;
   margin-bottom: 10px;
}
.user_membershiptouxiang{
    width:100%;
    height:70px;
    background:white;
    line-height: 70px;
    margin-bottom: 20px;
}
.user_membershipimg{
    vertical-align:middle;
    margin-left:65%;
}
.user_membershipsp{
    margin-left: 10px;
}
.user_membershiprouter{
    display:block;
    width:100%;
    height:50px;
    background:white;
    margin:10px 0;
    line-height: 50px;
    color:black;
}
.user_membershiprouter span:first-child{
     margin-left: 10px;
     color:#666;
}
.user_membershiprouter span:nth-child(2){
    margin-left: 40px;
}
.user_membershiprouter span:nth-child(3){
    margin-left: 80px;
    color:#666;
    font-size: 14px;
}
</style>
