<template>
  <div class="update-photo">
    <img class="profile-image" :src="img">
    <div class="toolbar">
      <div class="cancel" @click="$emit('click-close')">取消</div>
      <div class="confirm">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.profile-image {
  max-width:100%
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
