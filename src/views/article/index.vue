<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name === '黑马程序员(改不了)' ? '善良的程序员作家' : article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <follow-user :is_followed.sync="article.is_followed" :aut_id="article.aut_id"/>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="articleContent"></div>
        <van-divider>正文结束</van-divider>
        <comment-list ref="commentListRef" :source="articleId" @onload-success="commentTotalCount = $event"></comment-list>
        <!--弹出层 (写评论)-->
        <van-popup
          v-model="isPostShow"
          position="bottom"
        >
          <comment-post :source="articleId" @post-success="postSuccess"></comment-post>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorCode === 404 ">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isPostShow">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="commentTotalCount"
        color="#777"
      />
      <collect-article :is_collected.sync="article.is_collected" :articleId="articleId"/>
      <like-article  :attitude.sync="article.attitude" :articleId="articleId"/>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user.vue'
import collectArticle from '@/components/collect-article.vue'
import likeArticle from '@/components/like-article.vue'
import commentList from './components/comment-list.vue'
import commentPost from './components/comment-post.vue'
export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: false, // 加载动画
      errorCode: 0, // 错误状态码
      commentTotalCount: 0, // 评论总数
      isPostShow: false // 弹出层 显示/隐藏
    }
  },
  created () {
    this.getArticleById(this.articleId)
  },
  methods: {
    async getArticleById (articleId) {
      this.loading = true
      try {
        const { data } = await getArticleById(articleId)
        this.article = { ...data }

        // 图片预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorCode = 404
        }
      }
      this.loading = false
    },
    previewImage () { // 预览图片
      // 遍历dom, 找到 img标签
      // 遍历img标签, 得到 img.src数组, 注册事件 ImagePreview, 并预览图片
      const articleContentRef = this.$refs.articleContent
      const imgs = articleContentRef.querySelectorAll('img') // img标签的数组
      const images = [] // 图片地址的数组
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.oncLick = () => {
          ImagePreview({
            images,
            startPosition: index, // 起始位置, 用索引值
            closeable: true
          })
        }
      })
    },
    postSuccess (newObj) {
      // 关闭弹出层
      // 把 新obj 添加到 list数组前面
      this.isPostShow = false
      this.$refs.commentListRef.list.unshift(newObj)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
