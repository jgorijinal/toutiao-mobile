<template>
  <van-icon
    v-if="attitude === -1"
    color="#777"
    name="good-job-o"
    @click="onLike"
  />
  <van-icon
    v-else
    color="red"
    name="good-job"
    @click="onLike"
  />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  props: {
    attitude: { // 0 不喜欢, 1 点赞, -1 无态度
      required: true
    },
    articleId: { // 文章 id
      type: String,
      required: true
    }
  },
  methods: {
    async onLike () {
      try {
        if (this.attitude === 1) {
          // 已点赞状态, 点击取消点赞
          await deleteLike(this.articleId)
          this.$emit('update:attitude', -1)
          this.$toast.success('已取消点赞')
        } else {
        // 未点赞或者无态度状态, 点击点赞
          await addLike(this.articleId)
          console.log(2)
          this.$emit('update:attitude', 1)
          this.$toast.success('成功点赞')
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast.fail('您还没有登录, 请登录后再试')
        } else {
          this.$toast.fail('操作失败, 请稍后重试')
        }
      }
    }
  }
}
</script>

<style>

</style>
