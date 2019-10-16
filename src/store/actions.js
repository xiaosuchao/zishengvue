import request from '@/utils/request'
import { setOpenid, setToken, setWechatinfo } from '@/utils/auth'
import { Toast } from 'vant'

const actions = {
  'setwechatinfo'({ commit, state }, action) {
    commit('setwechatinfo', action)
  },

  'setuserinfo'({ commit, state }, action) {
    commit('setuserinfo', action)
  },
  'setaccinfo'({ commit, state }, action) {
    commit('setaccinfo', action)
  },
  'loadaccinfo'({ commit, state }, action) {
    request({ url: '/user/index', method: 'POST' }).then(res => {
      commit('setaccinfo', res.data)
    })
  },
  'setstoretoken'({ commit, state }, action) {
    commit('SET_TOKEN', action)
  },
  'logout'({ commit }) {
    commit('setuserinfo', '')
    commit('setaccinfo', '')
    commit('setwechatinfo', '')
    commit('SET_TOKEN', '')
    commit('setopenid', '')
    setOpenid('')
    setToken('')
    setWechatinfo('')
    Toast('清除成功')
  }

}

export default actions
