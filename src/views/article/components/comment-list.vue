<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item v-for="(item, index ) in list" :key="index" :comment.sync="list[index]"
      @click-reply="clickReply"
      />
    </van-list>

    <!--弹出层 (评论回复)-->
    <van-popup
      get-container="body"
      v-model="isReplyShow"
      position="bottom"
      style="height: 94%"
    >
      <comment-reply :comment="currentComment" v-if="isReplyShow"  @click-close="clickClose"></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import commentItem from './comment-item.vue'
import commentReply from './comment-reply.vue'
export default {
  components: {
    commentItem,
    commentReply
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      isReplyShow: false, // 评论回复弹层显示/隐藏
      currentComment: {} // 要回复的评论
    }
  },
  props: {
    source: { // 文章的 id / 评论的 id
      type: String,
      required: true
    }
  },
  created () {
    this.onLoad() // 让父组件评论总数在初始化时一开始显示,在 created 调一次
  },
  methods: {
    async onLoad () {
      // 请求评论
      // 追加到数组中
      // 关闭 loading
      // 如果还有数据, 更新下一页
      //   没有数据, finished 设为结束
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const results = data.results

        this.list.push(...results)

        // 把评论的总数更新到外部组件
        this.$emit('onload-success', data.total_count)

        this.loading = false

        if (results.length > 0) { // 还有数据
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    clickReply (comment) { // 监听子组件事件 , 拿到了 comment 对象
      console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true // 显示弹层
    },
    clickClose () {
      this.isReplyShow = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
