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
// 获取用户个人资料
export function getUserProfile () {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 获取用户的频道
export function getUserChannels () {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 添加关注
export function addFollow (userId) {
  return request({
    url: '/v1_0/user/followings',
    method: 'post',
    data: {
      userId
    }
  })
}
// 删除关注
export function deleteFollow (userId) {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 修改用户个人资料
export function updateProfile (data) {
  return request({
    url: '/v1_0/user/profile',
    method: 'patch',
    data
  })
}
