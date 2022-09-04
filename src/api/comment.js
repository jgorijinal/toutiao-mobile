// 请求评论模块
import request from '@/utils/request'

// 获取评论或评论回复
export function getComments (params) {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 评论点赞
export function addCommentLike (commentId) {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}
// 取消点赞
export function deleteCommentLike (commentId) {
  return request({
    url: `/v1_0/comment/likings/${commentId}`,
    method: 'delete'
  })
}

// 对文章或者评论进行评论
export function addComment (data) {
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data
  })
}
