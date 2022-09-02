<template>
  <div class="search-history">
    <van-cell title="搜索历史" icon="underway-o">
      <span v-if="isDeleteShow" @click="deleteAll">全部删除</span>
      &nbsp;&nbsp;
      <span v-if="isDeleteShow" @click="isDeleteShow = false">完成</span>
      <van-icon name="delete-o" size="18px" v-if="!isDeleteShow" @click="isDeleteShow = !isDeleteShow"/>
    </van-cell>
    <van-cell v-for="(name, index) in searchHistory" :key="index" :title="name" @click="clickHistorySearch(name, index)">
      <van-icon name="close"  v-if="isDeleteShow"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 可删除历史记录状态
    }
  },
  methods: {
    clickHistorySearch (name, index) { // 点击历史记录 (两种不同状态处理)
      if (this.isDeleteShow) {
        // 可删除状态
        const clonedSearchHistory = [...this.searchHistory]
        clonedSearchHistory.splice(index, 1)
        this.$emit('update:searchHistory', clonedSearchHistory)
      } else {
        // 可直接点击进行搜索的状态
        this.$emit('search', name)
      }
    },
    deleteAll () { // 全部删除
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除全部的历史记录吗?'
      }).then(() => {
        const clonedSearchHistory = [...this.searchHistory]
        clonedSearchHistory.splice(0)
        this.$emit('update:searchHistory', clonedSearchHistory)

        this.isDeleteShow = false
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
