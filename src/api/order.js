import request from '@/utils/request'

export function orderList(data) {
  return request({
    url: '/order/lists',
    method: 'POST',
    data
  })
}

export function orderShow(data) {
  return request({
    url: '/order/show',
    method: 'POST',
    data
  })
}

export function orderCancle(data) {
  return request({
    url: '/order/cancel_order',
    method: 'POST',
    data
  })
}

export function orderDelete(data) {
  return request({
    url: '/order/delete',
    method: 'POST',
    data
  })
}

export function orderRecieve(data) {
  return request({
    url: '/order/confirm',
    method: 'POST',
    data
  })
}

export function orderReturn(data) {
  return request({
    url: '/order/return_goods',
    method: 'POST',
    data
  })
}

export function commentAdd(data) {
  return request({
    url: '/comment/add',
    method: 'POST',
    data
  })
}

