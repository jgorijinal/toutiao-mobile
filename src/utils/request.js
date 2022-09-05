/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://geek.itheima.net' // 基础路径
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
}, async (error) => {
  if (error.response && error.response.status === 401) {
    // 校验是否有 refresh_token
    const user = store.state.user.user
    if (!user || !user.refresh_token) {
      router.push('/login')
      // 代码不要往后执行了
      return
    }
    // 如果有 refresh_token，则请求获取新的 token
    try {
      const res = await axios({
        method: 'put',
        url: 'http://toutiao.itheima.net/v1_0/authorizations/',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      store.commit('user/changeUser', {
        token: res.data.data.token, // 最新获取的可用 token
        refresh_token: user.refresh_token // 还是原来的 refresh_token
      })
      // 把之前失败的用户请求继续发出去
      // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
      // return 把 request 的请求结果继续返回给发请求的具体位置
      return request(error.config)
    } catch (err) {
      // 如果获取失败，直接跳转 登录页
      console.log('请求刷新 token 失败', err)
      router.push('/login')
    }
  }
  return Promise.reject(error)
})

export default request
