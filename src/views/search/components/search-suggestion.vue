<template>
  <!--搜索联想建议-->
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in suggestions" :key="index" icon="search">
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
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
      handler: debounce(function (newValue) {
        this.getSuggestions(newValue)
      }, 500),
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
    },
    highlight (text) {
      const highlightString = `<span style="color:red">${this.value}</span>`

      // 如果根据数据变量动态生成正则 , 需要用 new RegExp()
      // 参数1 : 匹配模式字符串, 根据这个字符串创建正则对象
      const reg = new RegExp(this.value, 'gi')
      return text && text.replace(reg, highlightString)
    }
  }
}
</script>

<style>

</style>
