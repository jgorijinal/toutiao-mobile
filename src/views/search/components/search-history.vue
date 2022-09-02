<template>
  <div class="search-history">
    <van-cell title="搜索历史" icon="underway-o">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete-o" size="18px"/>
    </van-cell>
    <van-cell v-for="item in 4" :key="item" :title="`历史${item}`"><van-icon name="close" /></van-cell>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
