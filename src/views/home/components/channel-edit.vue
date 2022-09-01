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
      <van-grid-item class="grid-item" v-for="channel in myChannels" :key="channel.id" :text="channel.name" icon="close"/>
    </van-grid>
    <!--推荐频道部分-->
    <van-cell :border="false">
      <template #title>
        <span class="title-text">频道推荐</span>
      </template>
    </van-cell>
    <van-grid gutter="10" class="recommend-grid">
      <van-grid-item icon="plus" class="grid-item" v-for="value in 8" :key="value" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
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
