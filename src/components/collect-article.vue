<template>
  <van-icon
    v-if="!is_collected"
    color="#777"
    name="star-o"
    @click="onCollect"
  />
  <van-icon
    v-else
    color="#fdcb15"
    name="star"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      require: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    async onCollect () { // 收藏/取消收藏文章
      // 这里 loading 不仅仅是为了交互提示，更重要的是请求期间禁用背景点击功能，防止用户不断的操作界面发出请求
      // toast 的 loading没必要特意去关闭, 因为提示成功或失败时这个loading 自动会被取消, 屏幕上只能出现一个 toast
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.is_collected) {
          // 已收藏, 点击取消收藏
          await deleteCollect(this.articleId)
          this.$emit('update:is_collected', false)
          this.$toast.success('已取消收藏')
        } else {
          // 还没有收藏, 点击收藏
          await addCollect(this.articleId)
          this.$emit('update:is_collected', true)
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast.fail('您还没有登录, 请登录后再试')
        } else {
          this.$toast.fail('操作失败, 请重试')
        }
      }
    }
  }
}
</script>

<style>
</style>
