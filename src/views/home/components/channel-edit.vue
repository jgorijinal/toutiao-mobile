<template>
  <div class="channel-edit">
    <!--我的频道部分-->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <van-button class="edit-btn" size="mini" type="danger" plain round>编辑</van-button>
    </van-cell>
    <van-grid gutter="10" class="my-grid">
      <van-grid-item class="grid-item" :class="{ active:activeIndex === channel.id}" v-for="channel in myChannels" :key="channel.id" :text="channel.name" icon="close"/>
    </van-grid>
    <!--推荐频道部分-->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid gutter="10" class="recommend-grid">
      <van-grid-item icon="plus" class="grid-item" v-for="channel in recommendChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 所有频道

    }
  },
  computed: {
    recommendChannels () { // 推荐频道
      const result = this.allChannels.filter(channel => {
        // const res = this.myChannels.find(myChannel => {
        //   return myChannel.id === channel.id
        // })
        // return !res
        return !(this.myChannels.find(myChannel => myChannel.id === channel.id))
      })
      return result
      // const recommendChannels = []
      // this.allChannels.forEach(channel => {
      //   // 遍历全部列表, 找到满足调价的元素
      //   const result = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   // 如果不存在, 就 push
      //   if (!result) {
      //     recommendChannels.push(channel)
      //   }
      // })
      // return recommendChannels
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size:32px;
    color: #333333;
  }
  .edit-btn {
    width:104px;
    height:48px;
    font-size:26px;
  }
  /deep/.grid-item {
    width:160px;
    height:86px;
    .van-grid-item__content{
      background-color: #f4f5f6;
      white-space: nowrap;
      border-radius: 6px;
      .van-grid-item__text{
        font-size:28px;
        margin-top:0;
      }
    }
    &.active {
      .van-grid-item__text{
        color:red;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-close {
        position:absolute;
        right:-6px;
        top:-6px;
        z-index:2;
        font-size:34px;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right:6px;
        }
        .van-grid-item__text {
          margin-top: 0
        }
      }
    }
  }
}
</style>
