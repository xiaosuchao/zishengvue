<template>
  <div>

    <van-address-edit
      :area-list="areaList"
      :search-result="searchResult"
      :show-delete="id"
      :address-info="addressInfo"
      style="padding-top:20px; background:#fff;"
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from 'vant'
import { addrUpdate, addrAdd } from '@/api/addr'
import areajs from '@/utils/area'

export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast
  },
  data() {
    return {
      id: this.$route.query.id,
      addressInfo: {},
      areaList: {},
      searchResult: []
    }
  },
  created() {
    this.areaList = areajs
    if (this.id) {
      this.loadAddrInfo()
    }
  },
  methods: {
    onSave(val) {
      console.log(val)
      // this.addressInfo = val
      const jaddr = {}
      if (this.id) { jaddr.id = this.id }
      jaddr.address = val.addressDetail
      jaddr.consignee = val.name
      jaddr.mobile = val.tel
      jaddr.is_default = val.isDefault ? 1 : 0
      jaddr.area_code = val.areaCode
      jaddr.postcode = val.postalCode
      jaddr.province = val.areaCode.substring(0, 2) + '0000'
      jaddr.city = val.areaCode.substring(0, 4) + '00'
      jaddr.district = val.areaCode

      if (this.id) {
        const res = addrUpdate(jaddr)
        if (res === 'err') return
      } else {
        const res = addrAdd(jaddr)
        if (res === 'err') return
      }
    },
    async loadAddrInfo() {
      const res = await addrUpdate({ id: this.id })
      if (res === 'err') return

      console.log(res)
      const v = res.data.data
      const jv = {}
      jv.id = v.id
      jv.addressDetail = v.addr
      jv.name = v.contact
      jv.tel = v.mobile
      jv.isDefault = v.is_default === 'yes'
      jv.city = v.city_desc
      jv.county = v.district_desc
      jv.province = v.province_desc
      jv.areaCode = v.district
      this.addressInfo = jv
    },
    onDelete() {
      this.$http.post(this.APIURL_PREFIX + '/wx/addr/delete', { id: this.id }).then((res) => {
        if (res.data.status === 1) {
          console.log('删除成功')
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    onChangeArea(val) {
      console.log('change area', val)
    },
    onChangeDetail(val) {

    }

  }
}
</script>

<style>
.user_sitenav{
    width:100%;
    height:40px;
    background:white;
    margin-top:10px;
    margin-bottom: 10px;
    line-height: 40px;
}
</style>
