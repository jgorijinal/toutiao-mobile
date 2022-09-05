<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()"/>
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
      <van-cell title="昵称" :value="profile.name" is-link @click="isUpdateNameShow = true"/>
      <van-cell title="性别" :value="profile.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true"/>
      <van-cell title="生日" :value="profile.birthday" is-link  @click="isUpdateBirthdayShow = true"/>
    </van-cell-group>
    <!--(修改昵称)弹出层-->
    <van-popup
      v-model="isUpdateNameShow"
      :style="{height:'100%'}"
      position="bottom"
      get-container="body"
      >
      <update-name :originalName.sync="profile.name" @click-close="isUpdateNameShow = false"/>
    </van-popup>
    <!--(修改性别)弹出层-->
    <van-popup
      v-model="isUpdateGenderShow"
      :style="{height:'50%'}"
      position="bottom"
      get-container="body"
      >
      <update-gender :originalGender.sync="profile.gender" @click-close="isUpdateGenderShow = false"/>
    </van-popup>
    <!--(修改生日)弹出层-->
    <van-popup
      v-model="isUpdateBirthdayShow"
      :style="{height:'50%'}"
      position="bottom"
      get-container="body"
      >
      <update-birthday v-if="isUpdateBirthdayShow" v-model="profile.birthday" @click-close="isUpdateBirthdayShow = false"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updateBirthday from './components/update-birthday.vue'
export default {
  name: 'UserProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday
  },
  data () {
    return {
      profile: {},
      isUpdateNameShow: false, // 修改昵称弹出层 显示/隐藏
      isUpdateGenderShow: false, // 修改性别弹出层 显示/隐藏
      isUpdateBirthdayShow: false // 修改生日
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
        console.log(this.profile)
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
