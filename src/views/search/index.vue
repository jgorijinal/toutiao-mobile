<template>
  <div class="search-container">
    <!--搜索框-->
    <!--Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。-->
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#496991"
        shape="round"
        @focus="isResultShow = false"
    />
    <!--搜索结果-->
    <search-result v-if="isResultShow"></search-result>
    <!--搜索建议-->
    <search-suggestion v-else-if="value" :value="value"></search-suggestion>
    <!--搜索历史-->
    <search-history v-else></search-history>
</form>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      value: '',
      isResultShow: false // 控制搜索结果显示/隐藏
    }
  },
  methods: {
    onSearch () { // 搜索
      console.log('搜索')
    },
    onCancel () { // 取消
      console.log('取消')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action{
    color:#fff;
  }
}
</style>
