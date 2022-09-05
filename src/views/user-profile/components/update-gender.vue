<template>
  <van-picker
    title="修改性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="defaultIndex"
/>
</template>

<script>
import { updateProfile } from '@/api/user'
export default {
  data () {
    return {
      columns: ['男', '女'], // 0 男 , 1 女
      defaultIndex: ''
    }
  },
  props: {
    originalGender: {
      type: Number,
      required: true
    }
  },
  created () {
    this.defaultIndex = this.originalGender
    console.log(this.defaultIndex)
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({ // 加载动画
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateProfile({
          gender: index
        })
        this.$emit('click-close')
        this.$emit('update:originalGender', index)
        this.$toast.success('已修改性别')
      } catch (err) {
        if (err.response) {
          this.$toast.fail('操作失败, 请稍后重试')
        }
      }
    },
    onCancel () {
      this.$emit('click-close')
    }
  }
}
</script>

<style>

</style>
