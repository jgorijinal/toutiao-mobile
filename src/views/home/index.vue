<template>
  <div class="home-container">
    <!--导航栏(搜索)-->
    <van-nav-bar fixed>
      <template v-slot:title>
        <van-button to="/search" icon="search" type="info" round size="small" class="search-btn">搜索</van-button>
      </template>
    </van-nav-bar>
    <!--标签页-->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="channel in channels" :key="channel.id" :title="channel.name">
        <article-list :channel="channel"></article-list>
      </van-tab>
      <template #nav-right>
        <van-icon name="wap-nav" class="hamburg" @click="isEditChannelShow = true"/>
        <div class="placeholder"></div>
      </template>
    </van-tabs>
    <!--频道编辑 弹出层-->
    <van-popup v-model="isEditChannelShow"  closeable close-icon-position="top-left" position="bottom" :style="{ height: '80%' }" >
      <!--编辑频道组件-->
      <channel-edit
      :my-channels.sync="channels"
      :active-index="active"
      @update-active="updateActive"
      ></channel-edit>
    </van-popup>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import storage from '@/utils/storage'

export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isEditChannelShow: false // 频道编辑 弹层 显示/隐藏
    }
  },
  created () {
    this.getUserChannels() // 获取频道列表
  },
  methods: {
    async getUserChannels () {
      // 已登录 (调接口)
      // 未登录
      // · 有存储, 就用
      // · 没存储 , 就用默认的频道(调同一个接口)
      try {
        if (this.$store.state.user.user) {
          // 已登录
          const { data } = await getUserChannels()
          this.channels = data.channels
        } else {
        // 未登录
          const localChannels = storage.getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
          // 有存储
            this.channels = localChannels
          } else {
          // 没存储
            const { data } = await getUserChannels()
            this.channels = data.channels
          }
        }
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    updateActive (index, isEditChannelShow = false) { // 子组件的事件
      // 更新当前标签
      this.active = index
      // 关闭弹层
      this.isEditChannelShow = isEditChannelShow
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    padding-top: 174px;
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
        position:fixed;
        z-index:1;
        top:92px;
        left:0;
        right:0;
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
