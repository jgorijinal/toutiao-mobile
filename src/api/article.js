// 文章模块
import request from '@/utils/request'

// 获取文章新闻推荐
export function getArticles (params) {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 获得文章详情
export function getArticleById (articleId) {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export function addCollect (articleId) {
  return request({
    url: '/v1_0/article/collections',
    method: 'post',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export function deleteCollect (articleId) {
  return request({
    url: `/v1_0/article/collections/${articleId}`,
    method: 'delete'
  })
}

// 点赞文章
export function addLike (articleId) {
  return request({
    url: ' /v1_0/article/likings',
    method: 'post',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
export function deleteLike (articleId) {
  return request({
    url: `/v1_0/article/likings/${articleId}`,
    method: 'delete'
  })
}
