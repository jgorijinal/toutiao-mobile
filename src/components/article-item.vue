<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId:article.art_id
      }
    }"
  >
    <template #title>
      <span class="title van-multi-ellipsis--l2">{{article.title}}</span>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(image,index) in article.cover.images"
            :key="index">
          <van-image
            fit="cover"
            :src="image"
            class="cover-item-image"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name === '黑马程序员(改不了)' ? '善良的程序员作家' : article.aut_name}}</span>
        <span>{{article.comm_count+'评论'}}</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </template>
    <van-image
      class="right-cover"
      v-if="article.cover.type  === 1"
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
  .article-item {
    .title {
      font-size:32px;
    }
    .van-cell__value {
      flex:unset;
      width:232px;
      height:146px;
      padding-left:25px;
    }
    .right-cover {
      width:232px;
      height:146px;
    }
    .label-info-wrap span {
      font-size:22px;
      color:#b4b4b4;
      margin-right:25px;
    }
    .cover-wrap {
      display:flex;
      padding:30px 0;
      .cover-item{
        flex:1;
        height:146px;
        &:not(:last-child){
          margin-right:4px;
        }
        .cover-item-image {
          width:100%;
          height:146px;
        }
      }
    }
  }
</style>
