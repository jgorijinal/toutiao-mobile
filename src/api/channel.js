import request from '@/utils/request'

// 获取所有的频道
export function getAllChannels () {
  return request({
    url: '/v1_0/channels'
  })
}

// 添加频道接口
export function addUserChannel (channels) {
  return request({
    url: '/v1_0/user/channels',
    method: 'patch',
    data: {
      channels
    }
  })
}

// 删除用户频道
export function deleteUserChannel (channelId) {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
