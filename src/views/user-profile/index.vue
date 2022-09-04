<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow right-text="保存" />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="profile.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="profile.name" is-link />
      <van-cell title="性别" :value="profile.gender === 1 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="profile.birthday" is-link />
      <van-cell title="手机号" :value="profile.mobile" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      profile: {}
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.profile = data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .van-cell__title {
      display: flex;
      align-items: center;
    }
  /deep/.avatar-cell {
      .van-cell__value {
        display: flex;
        flex-direction: row-reverse;
      }
      .avatar {
        width: 60px;
        height: 60px;
      }
    }
    /deep/.van-nav-bar__right {
      .van-nav-bar__text {
        color:white;
      }
    }
  }
</style>
