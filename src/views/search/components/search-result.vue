<template>
  <div class="search-result">
    <!--list 组件-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { gerSearchResult } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10, // 每页数量
      error: false
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求数据
        const { data } = await gerSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.value
        })
        // 2. 数据追加到 list数组
        const { results } = data
        this.list.push(...results)
        console.log(results)
        // 3. 请求完了关闭 loading
        this.loading = false
        // 4.  判断是否还有数据
        if (results.length) {
          // 如果有, 就更新页码
          this.page++
        } else {
          // 如果没有 finished 设置为结束
          this.finished = true
        }
      } catch (err) {
        // 出错
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
