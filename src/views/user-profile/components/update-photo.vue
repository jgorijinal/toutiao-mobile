<template>
  <div class="update-photo">
    <img class="profile-image" :src="img" ref="image">
    <div class="toolbar">
      <div class="cancel" @click="$emit('click-close')">取消</div>
      <div class="confirm" @click="onConfirm">确定</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null // cropper 实例
    }
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端裁切需要使用 getData
      // console.log(this.cropper.getData())

      // 纯客户端裁切需要使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          // 错误的用法

          // 如果借口是要求 Content-Type 是 application/json
          // 则传递参数是 JavaScript 对象
          // await updateUserPhoto({
          //   photo: blob
          // })

          // 如果接口要求  Content-Type 是 multipart/form-data
          // 则必须是 FormData 对象
          const formData = new FormData()
          formData.append('photo', blob)
          console.log(formData)

          const { data } = await updateUserPhoto(formData) // 调接口
          console.log(data.photo)
          this.$emit('update:img', data.photo)

          this.$emit('click-close') // 关闭弹层

          this.$toast.success('成功上传头像') // 提示
        } catch (err) {
          console.log(err)
          this.$toast('更新失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.profile-image {
  max-width:100%;
  display: block;
}
.update-photo{
  height:100%;
  background-color:black ;
  .toolbar{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    display: flex;
    justify-content: space-between;
    .cancel,.confirm {
      width:90px;
      height:90px;
      font-size:30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color:#fff
    }
  }
}
</style>
