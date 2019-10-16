import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return (!Cookies.get(TokenKey) || Cookies.get(TokenKey) === 'undefined') ? '' : Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getOpenid() {
  return (!Cookies.get('openid') || Cookies.get('openid') === 'undefined') ? '' : Cookies.get('openid')
}
export function setOpenid(openid) {
  return Cookies.set('openid', openid)
}

export function getWechatinfo() {
  return (!Cookies.get('wechatinfo') || Cookies.get('wechatinfo') === 'undefined') ? '' : Cookies.get('wechatinfo')
}
export function setWechatinfo(openid) {
  return Cookies.set('wechatinfo', openid)
}
