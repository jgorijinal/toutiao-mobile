<template>
  <div class="channel-edit">
    <!--我的频道部分-->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">我的频道</span>
      </template>
      <van-button class="edit-btn" size="mini" type="danger" plain round
      @click="isEdit = !isEdit">{{isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid gutter="10" class="my-grid">
      <van-grid-item  class="grid-item"
      :class="{ active:activeIndex ===  index, isEdit :isEdit && !fixeChannels.includes(channel.id)}"
      v-for="(channel,index) in myChannels" :key="channel.id" :text="channel.name"
      :icon="isEdit && !fixeChannels.includes(channel.id) ? 'close' : ''"
      @click="clickMyChannel(channel, index)"
      />
    </van-grid>
    <!--推荐频道部分-->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid gutter="10" class="recommend-grid">
      <van-grid-item @click="addChannel(channel)" icon="plus" class="grid-item" v-for="channel in recommendChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import storage from '@/utils/storage'
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
      allChannels: [], // 所有频道
      isEdit: false, // 是否编辑状态(点击了右上角的编辑按钮)
      fixeChannels: [0] // 不允许删除的频道(固定频道), 比如 "推荐"频道的id : 0
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
    },
    async addChannel (channel) { // 新增频道
      // this.myChannels.push(channel)
      this.$emit('update:myChannels', [...this.myChannels, channel])

      // 数据持久化
      if (this.$store.state.user.user) {
        // 登录状态
        try {
          await addUserChannel([{ // 数组 [{id: , seq : 序号 }]
            id: channel.id,
            seq: this.myChannels.length
          }])
        } catch (err) {
          this.$toast('保存失败, 请稍后重试')
        }
      } else {
        // 未登录状态
        // 需要存储在本地存储
        storage.setItem('TOUTIAO_CHANNELS', [...this.myChannels, channel])
      }
    },
    async clickMyChannel (channel, index) { // 点击我的频道 , 注意第二个参数要接受索引值
      if (this.isEdit) {
        // 编辑状态

        let clonedChannel

        // 3. 处理一个情况: 不能删除 "推荐"频道, 固定的频道
        if (this.fixeChannels.includes(channel.id)) { // 注意:这里需要检查的是id不是索引值, 因为 fixeChannels 它存的是 id
          this.$toast('不能删除此频道哦')
        } else {
          // 1. myChannels 删除点击的元素 ( 主要的逻辑 )
          clonedChannel = [...this.myChannels]
          clonedChannel.splice(index, 1)
          this.$emit('update:myChannels', clonedChannel)

          // 2. 处理一个 bug
          // 如果要删除的频道是激活频道之前的频道, 则更新激活的频道项
          if (index <= this.activeIndex) {
            // 让激活的频道 - 1
            this.$emit('update-active', this.activeIndex - 1, true) // 第三个参数 不关掉弹层
          }
        }

        // 删除频道的 数据持久化
        if (this.$store.state.user.user) {
          // 已登录
          try {
            await deleteUserChannel(channel.id)
          } catch (err) {
            this.$toast('操作失败, 请稍后重试')
          }
        } else {
          // 未登录 , 数据存在本地存储
          storage.setItem('TOUTIAO_CHANNELS', clonedChannel)
        }
      } else {
        // 不是编辑状态

        // 通知父组件改变 它的 active
        this.$emit('update-active', index, false) // 这里要传索引值, 不能用 id
        // 在父组件那里关闭弹层
      }
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
      &.isEdit {
        animation: bounce 0.15s infinite alternate linear
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
@keyframes bounce {
  from {transform:rotate(-1deg)}
  to {transform:rotate(1deg)}
}
</style>
