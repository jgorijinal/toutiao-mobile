import request from '@/utils/request'

// 获取所有的频道
export function getAllChannels () {
  return request({
    url: '/v1_0/channels'
  })
}
