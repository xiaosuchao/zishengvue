import request from '@/utils/request'

export function indexData(data) {
  return request({
    url: '/index/index',
    method: 'POST',
    data
  })
}

export function indexV3(data) {
  return request({
    url: '/index/index_v3',
    method: 'POST',
    data
  })
}

export function indexList(data) {
  return request({
    url: '/goods/lists',
    method: 'POST',
    data
  })
}

export function getMedia(data) {
  return request({
    url: '/index/get_media',
    method: 'POST',
    data
  })
}

