import request from '@/utils/request'

export function articleList(data) {
  return request({
    url: '/article/lists',
    method: 'POST',
    data
  })
}

export function articleShow(data) {
  return request({
    url: '/article/show',
    method: 'POST',
    data
  })
}
