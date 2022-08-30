import request from '@/utils/request'

// 用户登录
export function login (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 发送短信验证码
export function getSmsCode (mobile) {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户个人资料
export function getUserInfo () {
  return request({
    url: '/v1_0/user'
  })
}
