import request from '@/utils/request'

export function accountList(data) {
  return request({
    url: '/vip/bind_lists',
    method: 'POST',
    data
  })
}

export function accountAdd(data) {
  return request({
    url: '/vip/bind',
    method: 'POST',
    data
  })
}

export function pointTransfer(data) {
  return request({
    url: '/vip/transfer',
    method: 'POST',
    data
  })
}

export function accountAmount(data) {
  return request({
    url: '/vip/account_type',
    method: 'POST',
    data
  })
}
