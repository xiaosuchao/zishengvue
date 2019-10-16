<template>
  <div>

    <van-address-edit
      :area-list="areaList"
      :search-result="searchResult"
      :show-delete="addressInfo.id?true:false"
      :address-info="addressInfo"
      style="padding-top:20px;  background:#fff;"
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
import { addrUpdate, addrAdd, addrDel } from '@/api/addr'
import areajs from '@/utils/area'

export default {
  components: {
    [AddressEdit.name]: AddressEdit,
    [Toast.name]: Toast
  },
  props: {
    addrinfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      addressInfo: {},
      areaList: {},
      searchResult: []
    }
  },
  created() {
    this.areaList = areajs
    this.addressInfo = this.addrinfo
  },
  methods: {
    async onSave(val) {
      console.log(val)
      // this.addressInfo = val
      const jaddr = {}
      jaddr.id = val.id
      jaddr.address = val.addressDetail
      jaddr.consignee = val.name
      jaddr.mobile = val.tel
      jaddr.is_default = val.isDefault ? 1 : 0
      jaddr.area_code = val.areaCode
      jaddr.province = val.areaCode.substring(0, 2) + '0000'
      jaddr.city = val.areaCode.substring(0, 4) + '00'
      jaddr.district = val.areaCode

      if (jaddr.id) {
        const res = await addrUpdate(jaddr)
        if (res === 'err') return
        Toast.success('更新成功')
        this.$emit('opsuccess', { op: 'update', jaddr: val })
      } else {
        const res = await addrAdd(jaddr)
        if (res === 'err') return
        Toast.success('添加成功')
        val.id = res.data
        this.$emit('opsuccess', { op: 'add', jaddr: val })
      }
    },
    async loadAddrInfo() {
      const res = await addrUpdate(this.addressInfo)
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
    async onDelete() {
      const res = await addrDel(this.addrinfo)
      if (res === 'err') { return }
      Toast.success('删除成功')
      this.$emit('opsuccess', { op: 'del', jaddr: this.addrinfo })
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
