<template>
  <div class="home-container">
    <!--导航栏(搜索)-->
    <van-nav-bar>
      <template v-slot:title>
        <van-button icon="search" type="info" round size="small" class="search-btn">搜索</van-button>
      </template>
    </van-nav-bar>
    <!--标签页-->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <article-list :channel="channel"></article-list>
      </van-tab>
      <template #nav-right>
        <van-icon name="wap-nav" class="hamburg"/>
        <div class="placeholder"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'

export default {
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  created () {
    this.getUserChannels() // 获取频道列表
  },
  methods: {
    async getUserChannels () {
      const { data } = await getUserChannels()
      console.log(data)
      this.channels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    /deep/.van-nav-bar__title {
      max-width: unset;
  }
    .search-btn {
      width:555px;
      height:64px;
      background-color: #496991;
      border:none;
    }
    /deep/ .channel-tabs {
      .van-tabs__wrap {
        height:82px;
        position:relative;
      }
      .van-tab{
        // min-width:200px;
        border-right:1px solid #edeff3;
        color:#777;
      }
      .van-tab--active {
        color:#333;
      }
      .van-tabs__line {
        width:31px;
        background-color:#496991;
        bottom:0;
      }
      .van-tabs__nav{
        padding-bottom:0;
      }
    }
    .hamburg {
      height:82px;
      width:66px;
      position:fixed;
      right:0;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      transition:all 0.3s ease;
      &:active {
        background-color: rgb(148, 144, 144);
      }
    }
    .placeholder {
      height:82px;
      width:66px;
      flex-shrink: 0;
    }
  }
  /deep/.van-tabs__content{
    padding-bottom:100px;
  }
</style>
