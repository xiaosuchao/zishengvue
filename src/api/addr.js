import request from '@/utils/request'

export function addrList(data) {
  return request({
    url: '/address/lists',
    method: 'POST',
    data
  })
}

export function addrAdd(data) {
  return request({
    url: '/address/add',
    method: 'POST',
    data
  })
}

export function addrUpdate(data) {
  return request({
    url: '/address/edit',
    method: 'POST',
    data
  })
}

export function addrSetDefault(data) {
  return request({
    url: '/address/set_default',
    method: 'POST',
    data
  })
}

export function addrDel(data) {
  return request({
    url: '/address/delete',
    method: 'POST',
    data
  })
}

export function addrRegion(data) {
  return request({
    url: '/address/region',
    method: 'POST',
    data
  })
}

