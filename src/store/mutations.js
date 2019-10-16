import * as types from './mutation-types'
const matations = {

  [types.SET_TOKEN](state, v) {
    state.token = v
  },
  [types.setopenid](state, v) {
    state.openId = v
  },
  [types.setwechatinfo](state, v) {
    state.wechatinfo = Object.assign({}, v)
  },
  [types.setuserinfo](state, v) {
    state.userinfo = v
  },
  [types.setaccinfo](state, v) {
    state.accinfo = v
  }

}

export default matations
