import request from '@/utils/request'

export function payPwdSet(data) {
  return request({
    url: '/user/paypwd',
    method: 'POST',
    data
  })
}

