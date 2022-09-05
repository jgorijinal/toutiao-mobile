<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="confirm"
    @cancel="cancel"
/>
</template>

<script>
import { updateProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async confirm () { // 确定
      this.$toast.loading({ // 加载动画
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateProfile({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))

        this.$toast.success('更改成功')

        this.$emit('click-close')
      } catch (err) {
        console.log(err)
        this.$toast.success('操作失败, 请稍后重试')
      }
    },
    cancel () { // 取消
      this.$emit('click-close')
    }
  }
}
</script>

<style>

</style>
