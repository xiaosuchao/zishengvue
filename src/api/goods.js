import request from '@/utils/request'

export function getCateList(data) {
  return request({
    url: '/goods/category',
    method: 'POST',
    data
  })
}

export function getCategory_v2(data) {
  return request({
    url: '/goods/category_v2',
    method: 'POST',
    data
  })
}

export function getGoodsList(data) {
  return request({
    url: '/goods/lists',
    method: 'POST',
    data
  })
}

export function getGoodsShow(data) {
  return request({
    url: '/goods/show',
    method: 'POST',
    data
  })
}

export function setCollect(data) {
  return request({
    url: '/goods/collect_goods',
    method: 'POST',
    data
  })
}

export function getCollectList(data) {
  return request({
    url: '/goods/collect_lists',
    method: 'POST',
    data
  })
}

export function getCommnetList(data) {
  return request({
    url: '/goods/comment_lists',
    method: 'POST',
    data
  })
}

export function getCommentList(data) {
  return request({
    url: '/goods/comment_lists',
    method: 'post',
    data
  })
}
