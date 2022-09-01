<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"  :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: false, // 控制下拉刷新的 loading
      refreshSuccessText: '' // 刷新后提示的字段
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const result = data.results
        // 注意: 数组需要合并, 不可直接赋值
        this.list.push(...result)

        // 数据加载结束之后关掉 loading
        this.loading = false

        if (result.length) {
        // 还有数据, 需要更新下一页所需的时间戳
          this.timestamp = data.pre_timestamp
        } else {
        // 结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 1.请求数据
        // 2.得到的数据 追加 到数组 最前面
        // 3.把 isRefreshLoading 变为 false
        // 4.提示 刷新成功或刷新失败
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now() // 这里要注意, 发请求需要的是最新的时间戳
        })
        const result = data.results // 得到的新数组

        // 追加到数组最前面
        this.list.unshift(...result)

        // 关闭下拉刷新 loading 动画
        this.isRefreshLoading = false

        // 设置提示给用户的字段
        this.refreshSuccessText = `刷新成功, 已成功更新${result.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败, 请再刷新一次'
        this.isRefreshLoading = false // 失败了记得也关闭动画
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list {
    height:79vh;
    overflow-y:auto;
  }
</style>
