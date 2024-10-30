import axios from 'axios'
import { message, Modal } from 'ant-design-vue'
import { storeKey } from 'vuex'
import { Rect } from 'zrender'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

// request 拦截器
service.interceptors.request.use(config => {
  if (store.token) {
    config.headers['X-token'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})
// response 拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    message({
      message: res.desc || 'Error',
      type: error,
      duration: 5 * 1000
    })
    if (res.code === 401) {
      Modal.confirm({
        title: '账号已过期，请重新登录',
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          localtion.reload()
        })
      })
    }
    return Promise.reject(new Error(res.desc || 'Error'))
  } else {
    return res
  }
}, error => {
  message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service