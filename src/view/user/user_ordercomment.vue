<template>
  <div class="ordercommentwrap">
    <ul class="ulocomments">
      <li v-for="item in goodslist" :key="item.goods_id">
        <div class="goods">
          <img :src="item.thumb" :alt="item.goods_name">
          <div class="name">{{ item.goods_name }}</div>
        </div>
        <div class="ratebox">
          <label>整体评价</label>
          <div class="rateout">
            <van-rate v-model="item.rate"/>
          </div>
        </div>
        <div class="commtxtout">
          <van-field
            v-model="item.content"
            type="textarea"
            placeholder="请输入您的评价"
          />
        </div>
        <div class="picsout">
          <div v-for="(pic,ipic) in item['comment_img_file']" :key="'ipic'+ipic" class="imgcell">
            <img :src="pic" alt="" @click="upimg(item['goods_id'],ipic)">
          </div>
          <div v-show="item['comment_img_file'].length<3" class="van-uploader" @click="upimg(item['goods_id'])">
            <van-icon name="plus" color="#ccc" size="30px" />
          </div>

        </div>
      </li>
    </ul>

    <div class="btnout">
      <van-button type="danger" @click="submitcomm" >提交</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { Rate, Field, Uploader, Icon, Toast, Button } from 'vant'
import { orderShow, commentAdd } from '@/api/order'
import { getMedia } from '@/api/index'

export default {
  components: {
    [Rate.name]: Rate,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Uploader.name]: Uploader
  },
  data() {
    return {
      id: this.$route.query.id,
      goodslist: []
    }
  },
  created() {
    this.getwxconfig()
    this.getOrderDetail()
  },
  methods: {
    async getwxconfig() {
      const res = await request.get('/wechat/get_js_config?url=' + encodeURIComponent('http://wx.fafasc.cn/#/ordercomment?id=' + this.id))
      const reswxconf = res.data
      reswxconf.url = encodeURIComponent(res.data.url)
      reswxconf.jsApiList = ['chooseImage', 'uploadImage']
      reswxconf.debug = false
      wx.config(reswxconf)

      wx.ready(function() {

      })
    },
    beforeRead(file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        Toast('请上传 jpg或png 格式图片')
        return false
      }
      if (file.size > 5000000) {
        Toast('请上传5M以内的图片')
        return false
      }

      return true
    },
    afterRead(file, goods_id) {
      const nowgoods = this.goodslist.filter(v => { return v.goods_id === goods_id })[0]
      nowgoods['comment_img_file'].push(file.file)
      nowgoods.picdatas.push(file.content)
    },
    async getOrderDetail() {
      let res = await orderShow({ id: this.id })
      if (res === 'err') return
      res = res.data
      this.goodslist = res.order_info.goods_list.map(v => { v.rate = 5; v.picdatas = []; v['comment_img_file'] = []; return v })
    },
    upimg(goods_id, ipic) {
      // if (typeof (ipic) !== 'undefined') {
      //   console.log(34234234)
      //   this.goodslist.filter(v => { return v.goods_id === goods_id })[0]['comment_img_file'].splice(ipic, 1, 'http://shop.fafasc.cn/public/upload/wechat/u9UYp0LC4ljPcg30ltkhfzbpiqIRUdc63XzwvWQxOLAx_9k6OXI18BNIOggm1UvK.jpg')
      // } else {
      //   console.log(11112121)
      //   this.goodslist.filter(v => { return v.goods_id === goods_id })[0]['comment_img_file'].push('http://shop.fafasc.cn/public/upload/wechat/u9UYp0LC4ljPcg30ltkhfzbpiqIRUdc63XzwvWQxOLAx_9k6OXI18BNIOggm1UvK.jpg')
      // }
      const vm = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          if (localIds.length) {
            wx.uploadImage({
              localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                var serverId = res.serverId // 返回图片的服务器端ID
                getMedia({ media_id: serverId }).then(res => {
                  if (res.status === 1) {
                    const upurl = res.data
                    if (typeof (ipic) !== 'undefined') {
                      vm.goodslist.filter(v => { return v.goods_id === goods_id })[0]['comment_img_file'].splice(ipic, 1, upurl)
                    } else {
                      vm.goodslist.filter(v => { return v.goods_id === goods_id })[0]['comment_img_file'].push(upurl)
                    }
                  }
                })
              }
            })
          }
        }
      })
    },
    submitcomm() {
      this.goodslist.forEach((v, i) => {
        console.log(v['comment_img_file'], typeof (v['comment_img_file']))
        commentAdd({
          content: v.content,
          goods_id: v.goods_id,
          goods_rank: v.rate,
          order_id: this.id,
          'comment_img_file': v['comment_img_file'].join(',')
        }).then(res => {
          Toast('评价成功，审核通过后会在商品详情页显示！')
          setTimeout(() => {
            this.$router.push({ name: 'user_orders' })
          }, 1000)
        })
      })
    }
  }

}
</script>

<style lang="less" scoped >

.ordercommentwrap{
    padding-bottom: 100px; font-size: 15px;
    .ulocomments{
        background: #fff;
        li{
            .goods{
                display: flex; padding: 12px;
                img{ width: 50px; height: 50px; margin-right: 12px;}
                .name{ line-height: 22px;}
            }
            .ratebox{
                padding: 0px 12px 12px;border-bottom:1px solid #f2f2f2; display: flex;
                label{ margin-right: 12px;}
                .rateout{

                }
            }
            .picsout{
                padding: 12px; display: flex;
                .imgcell{
                    width: 60px; height: 60px;border:1px dashed #e2e2e2; margin-right: 10px;
                    img{ width: 60px; height: 60px; display: block;}
                }
            }
        }
    }
    .btnout{
        position: fixed; left: 20px; right: 20px;bottom: 12px;
        button{ width: 100%;}
    }
}

.van-uploader{
    width: 60px; height: 60px;border:1px dashed #e2e2e2; margin-right: 10px;
    .van-icon-plus{  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%)}
    input{width: 60px; height: 60px; opacity: 0;;}
}
</style>
