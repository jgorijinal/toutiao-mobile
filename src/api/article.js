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
