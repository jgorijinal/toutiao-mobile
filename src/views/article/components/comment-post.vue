<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="postMessage"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  data () {
    return {
      postMessage: '' // 输入的评论(双向绑定)
    }
  },
  props: {
    source: { // 文章id / 评论 id
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onPost () {
      if (!this.postMessage) { // 非空校验
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComment({
          target: this.source,
          content: this.postMessage,
          art_id: null
        })

        // 通知父组件修改视图
        this.$emit('post-success', data.new_obj)

        this.$toast.success('评论成功')

        this.postMessage = '' // 清空输入框
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast.fail('登录后才能评论哦')
        } else {
          this.$toast.fail('操作失败, 请重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
