import request from '@/utils/request'

export function addToCart(data) {
  return request({
    url: '/cart/add',
    method: 'POST',
    data
  })
}

export function delFromCart(data) {
  return request({
    url: '/cart/delete',
    method: 'POST',
    data
  })
}

export function getCartList(data) {
  return request({
    url: '/cart/lists',
    method: 'POST',
    data
  })
}

export function addOnCart(data) {
  return request({
    url: '/cart/cart2',
    method: 'POST',
    data
  })
}

export function confirmCart(data) {
  return request({
    url: '/cart/cart3',
    method: 'POST',
    data
  })
}

