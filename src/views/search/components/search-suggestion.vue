<template>
  <!--搜索联想建议-->
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in suggestions" :key="index" :title="item" icon="search"></van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 得到的联想建议数组
    }
  },
  watch: { // watch 监听父组件传过来的搜索框内容
    value: {
      handler (newValue) {
        this.getSuggestions(newValue)
      },
      immediate: true
    }
  },
  methods: {
    async getSuggestions (q) {
      try {
        const { data } = await getSuggestions(q)
        this.suggestions = data.options
      } catch (err) {
        this.$toast('获取数据失败, 请重试')
      }
    }
  }
}
</script>

<style>

</style>
