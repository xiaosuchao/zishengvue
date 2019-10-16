<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @select = "selectAddr"
      @add="onAdd"
      @edit="onEdit"
    />

    <van-popup v-model="showInfo" :overlay="true" position="top" >
      <addredit :addrinfo="addrinfo" @opsuccess="opsuccess" />
    </van-popup>
  </div>
</template>

<script>
import { AddressList, Popup } from 'vant'
import { addrList } from '@/api/addr'
import addredit from './addredit'
export default {
  components: {
    [AddressList.name]: AddressList,
    [Popup.name]: Popup,
    'addredit': addredit
  },
  props: {
    propAddrId: {
      type: Number,
      default: 0
    },
    isprop: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chosenAddressId: 0,
      list: [
      ],
      addrinfo: {},
      showInfo: false

    }
  },

  created() {
    console.log(this.isprop)
    this.getAddrList()
    this.chosenAddressId = this.propAddrId
  },
  methods: {
    opsuccess(obj) {
      if (obj.op === 'update') {
        console.log(obj.jaddr)
        this.list = this.list.map(v => {
          return v.id === obj.jaddr.id ? obj.jaddr : v
        })
      } else if (obj.op === 'add') {
        this.list.unshift(obj.jaddr)
      } else if (obj.op === 'del') {
        this.list = this.list.filter(v => {
          return v.id !== obj.jaddr.id
        })
      }
      this.showInfo = false
    },
    async getAddrList() {
      const res = await addrList()
      console.log(res)
      const artmp = res.data
      this.list = artmp.map((v) => {
        const jv = {}
        jv.id = v.address_id
        jv.addressDetail = v.address
        jv.name = v.consignee
        jv.tel = v.mobile
        jv.isDefault = v.is_default === 1
        jv.city = v.city
        jv.county = v.district
        jv.province = v.province
        jv.areaCode = v.district.toString()
        return jv
      })
    },
    selectAddr(val) {
      if (this.isprop) {
        this.$emit('emitChooseAddr', val)
      }
    },
    onAdd() {
      this.addrinfo = {}
      this.showInfo = true
    },

    onEdit(item, index) {
      console.log('isprop', item)
      this.addrinfo = item
      this.showInfo = true
    }
  }
}
</script>

<style>
.van-address-list__add{z-index: 100;}
</style>
