/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use((config) => {
  if (store.state.user.user) {
    config.headers.Authorization = `Bearer ${store.state.user.user.token}` // 让每个请求携带 token
  }
  return config
}, (err) => {
  console.log(err)
})

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
}, (err) => {
  console.log(err)
  return Promise.reject(err)
})

export default request
