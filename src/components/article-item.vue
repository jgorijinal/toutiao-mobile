<template>
  <van-cell  class="article-item">
    <template #title>
      <span>{{article.title}}</span>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-item">
        <van-image
            v-for="(image,index) in article.cover.images"
            :key="index"
            width="100"
            height="100"
            fit="cover"
            :src="image"
    />
      </div>
      <div>
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count+'评论'}}</span>
        <span>{{article.pubdate}}</span>
      </div>
    </template>
    <van-image
      v-if="article.cover.type  === 1"
      width="100"
      height="100"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
