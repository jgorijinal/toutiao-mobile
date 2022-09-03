<template>
  <van-button
    v-if="is_followed"
    class="follow-btn"
    :loading="followLoading"
    round
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    :loading="followLoading"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  props: {
    is_followed: { // 是否关注
      type: Boolean,
      required: true
    },
    aut_id: { // 用户 id
      type: String,
      required: true
    }
  },
  data () {
    return {
      followLoading: false // 关注按钮的 loading 动画
    }
  },
  methods: {
    async onFollow () { // 添加关注 , 取消关注
      this.followLoading = true
      try {
        if (this.is_followed) {
          // 已关注 , 点击取消关注
          await deleteFollow(this.aut_id)

          this.$emit('update:is_followed', false) // 通知父组件, 改
        } else {
        // 未关注 , 点击添加关注
          await addFollow(this.aut_id)
          this.$emit('update:is_followed', true) // 通知父组件, 改
        }
        this.followLoading = false
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己哦')
        } else if (err.response && err.response.status === 401) {
          this.$toast.fail('您还没有登录, 请登录后再试')
        } else {
          this.$toast.fail('操作失败, 请稍后重试')
        }
        this.followLoading = false
      }
    }
  }
}
</script>

<style></style>
