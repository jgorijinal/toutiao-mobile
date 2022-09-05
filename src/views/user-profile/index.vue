<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()"/>
    <van-cell-group>
      <!--表单元素的 hidden 表示隐藏这个表单元素-->
      <input type="file" hidden ref="file" @change="onFileChange">
      <van-cell title="头像" is-link @click="$refs.file.click()">
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
    <!--(修改头像)弹出层-->
    <van-popup
      v-model="isUpdatePhotoShow"
      :style="{height:'100%'}"
      position="bottom"
      get-container="body"
      >
      <update-photo :img="img" @click-close="isUpdatePhotoShow = false" v-if="isUpdatePhotoShow"></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updateBirthday from './components/update-birthday.vue'
import updatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    updateName,
    updateGender,
    updateBirthday,
    updatePhoto
  },
  data () {
    return {
      profile: {},
      isUpdateNameShow: false, // 修改昵称弹出层 显示/隐藏
      isUpdateGenderShow: false, // 修改性别弹出层 显示/隐藏
      isUpdateBirthdayShow: false, // 修改生日
      isUpdatePhotoShow: false, // 修改头像
      img: null
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
    },
    onFileChange () { // file 的 change事件
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)

      // 选择图片后让弹层出现
      this.isUpdatePhotoShow = true

      // file-input 如果处理同一个文件就不会触发 change 事件
      // 解决办法是每次使用完毕, 把他的 value 清空
      this.$refs.file.value = ''
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
