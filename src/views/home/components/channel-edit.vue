<template>
  <div class="channel-edit">
    <!--我的频道部分-->
    <van-cell :border="false">
      <template #title>
        我的频道
      </template>
      <van-button size="mini" type="danger" plain round>编辑</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
    <!--推荐频道部分-->
    <van-cell :border="false">
      <template #title>
        频道推荐
      </template>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="value in 8" :key="value" text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.channel-edit {
  padding: 85px 0;
}
</style>
