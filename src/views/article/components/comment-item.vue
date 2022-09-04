<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{comment.aut_name}}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onLike"
      >{{comment.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{comment.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          @click="$emit('click-reply',comment)"
          round
        >回复 {{comment.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLike () { // 对评论点赞/取消点赞
      try {
        if (this.comment.is_liking) {
          // 已点赞, 点击取消点赞
          await deleteCommentLike(this.comment.com_id)
          this.$emit('update:comment', { ...this.comment, is_liking: false })
          this.$toast.success('已取消点赞')
        } else {
          // 未点赞, 点击点赞
          await addCommentLike(this.comment.com_id)
          this.$emit('update:comment', { ...this.comment, is_liking: true })
          this.$toast.success('成功点赞')
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast.fail('先登录后点赞哦~')
        } else {
          this.$toast.fail('操作失败, 请重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
