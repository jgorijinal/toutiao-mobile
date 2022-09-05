<template>
  <div class="update-name">
    <van-nav-bar title="修改昵称"  left-arrow @click-left="$emit('click-close')">
      <template #right>
        <span class="text" @click="onSave">保存</span>
      </template>
    </van-nav-bar>
    <van-field
      v-model="name"
      rows="2"
      autosize
      label="昵称"
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user'
export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    originalName: {
      type: String,
      required: true
    }
  },
  created () {
    this.name = this.originalName
  },
  methods: {
    async onSave () {
      try {
        await updateProfile({
          name: this.name
        })
        this.$emit('update:originalName', this.name)
        this.$emit('click-close')
        this.$toast.success('已更改昵称')
      } catch (err) {
        if (err.response) {
          this.$toast('操作失败, 请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    color:white;
  }
</style>
