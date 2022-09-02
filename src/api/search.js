import request from '@/utils/request'
// 获取联想建议
export function getSuggestions (q) {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
//  获取搜索结果
export function gerSearchResult (params) {
  return request({
    url: '/v1_0/search',
    params
  })
}
