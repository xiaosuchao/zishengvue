import axios from 'axios'
import { Toast } from 'vant'
// import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://shop.fafasc.cn/api' : '/apidev',
  baseURL: 'http://shop.fafasc.cn/api',
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    Toast.loading({ message: '加载中...' })
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = config.data || {}

      if (process.env.NODE_ENV === 'production') {
        config.data.token = getToken()
      } else {
        config.data.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIiwianRpIjoid2F3YXR1YW4ifQ.eyJpc3MiOiJ3YXdhdHVhbiIsImF1ZCI6ImFwcCIsImp0aSI6Indhd2F0dWFuIiwiaWF0IjoxNTYwMTU3NDkzLCJuYmYiOjE1NjAxNTc0OTMsImV4cCI6MTg3NTUxNzQ5MywidWlkIjozOH0.'
      }
      config.data = qs.stringify(config.data)
    }
    if (getToken()) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    Toast.clear()
    const res = response.data
    if (res.status !== 1 && res.msg !== 'no_reg') {
      Toast.fail(res.msg)

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // MessageBox.confirm(
        //   '你已被登出，可以取消继续留在该页面，或者重新登录',
        //   '确定登出',
        //   {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      }
      // return Promise.reject('error')
      return 'err'
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Toast.fail(error.msg)
    // return Promise.reject(error)
    return 'err'
  }
)

export default service
