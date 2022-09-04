<template>
  <div class="my-container">
    <!--未登录状态头部-->
    <div class="header not-login" v-if="!$store.state.user.user">
      <div class="login-btn" @click="$router.push('/login')">
        <div class="icon-wrapper">
          <van-icon name="manager" size="40px" color="#2a4363"/>
        </div>
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!--已登录状态头部-->
    <div class="user-info" v-if="$store.state.user.user">
      <div class="base-info">
        <div class="left">
          <van-image
          class="avatar"
          fit="cover"
          round
          :src="userInfo.photo"/>
        <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!--宫格-->
    <van-grid :column-num="2" clickable>
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="clock-o" text="历史" />
    </van-grid>
    <!--单元格 cell-->
    <van-cell-group>
      <van-cell title="消息通知" is-link icon="comment-o"/>
      <van-cell title="小智同学" is-link icon="service"/>
    </van-cell-group>
    <!--退出登录-->
    <van-button v-if="$store.state.user.user"  block style="margin-top: 10px" @click="logout">退出登录</van-button>
  </div>

</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 初始化的时候，如果用户登录了，我才请求获取当前登录用户的信息
    if (this.$store.state.user.user) {
      this.getUserInfo()
    }
  },
  methods: {
    logout () { // 退出登录
      this.$dialog.confirm({
        title: '提示',
        message: '确定要退出登录吗?'
      }).then(() => {
        this.$store.dispatch('user/logoutAction')
        this.$toast.success('成功退出登录')
      }).catch(err => {
        console.log(err)
      })
    },
    async getUserInfo () { // 获取用户资料
      const { data } = await getUserInfo()
      this.userInfo = data
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header{
    background-color:#2a4363;
    height:361px;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction:column ;
      align-items: center;
      padding: 10px;
      .icon-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width:100px;
        height:100px;
        padding: 20px;
        background: white;
        border-radius:100%;
      }
      .text{
        margin-top:20px;
        font-size:36px;
      }
    }
  }
  .user-info {
    background-color:#2a4363;
    height:361px;
    color:#fff;
    .base-info {
      width:100%;
      height: 231px;
      box-sizing: border-box;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display:flex;
        align-items:center;
        .avatar{
          width:132px;
          height:132px;
          margin-right: 23px;
          border:4px #fff solid;
        }
        .name {
          font-size:30px;
        }
      }
      .right {}
    }
    .data-status{
      display:flex;
      align-items: center;
      .data-item {
        height:131px;
        flex-grow:1;
        display:flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
        .count{
          font-size:40px;
        }
        .text {
          font-size:23px;
        }
      }
    }
  }
}
</style>
