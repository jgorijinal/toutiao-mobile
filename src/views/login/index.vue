<template>
  <div class="login-container">
    <van-nav-bar title="登录"   left-arrow @click-left="$router.back()"/>
    <van-form @submit="onSubmit" ref="formRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="phone-o"
        clearable
        :rules="userFormRules.mobile"
        type="number"
        maxLength="11"
      />
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        left-icon="shield-o"
        :rules="userFormRules.code"
      >
        <template #button>
          <van-count-down :time="1000 * 60" v-if="countDownVisible" format="ss s" @finish="countDownVisible = false"/>
          <van-button v-if="!countDownVisible" native-type="button" class="send-cms-btn" round size="small" type="primary" @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'onBlur' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码格式不正确', trigger: 'onBlur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确', trigger: 'onBlur' }
        ]
      },
      countDownVisible: false
    }
  },
  methods: {
    onSendSms () { // 发送验证码
      // 1. 只校验手机号
      // 2. 验证通过就显示倒计时
      // 3. 调接口
      this.$refs.formRef.validate('mobile').then(() => {
        // 校验通过
        this.countDownVisible = true // 打开倒计时
        return getSmsCode(this.user.mobile) // 验证码请求
      }).then((res) => {
        console.log(res)
        this.$toast('发送验证码成功')
      }).catch(err => {
        // 校验不通过
        console.log(err)
        // 429 请求频繁
        if (err && err.response && err.response.status === 429) { // 处理频发请求问题(只能没分钟一次)
          this.$toast.fail('发送请求太频繁, 请稍后重试')
        }
      })
    },
    async onSubmit () {
      // 一开始弹出 loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast, 默认为 2000ms
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 1. 表单验证
      // 2. 提交表单请求登录
      try {
        await this.$store.dispatch('user/loginAction', this.user) // 登录 action

        this.$toast.success('登录成功')
        this.$router.push('/my') // 这里不严谨, 后面再优化
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          console.log(err.response.data.message)
          this.$toast.fail(err.response.data.message + ',请重新输入')
        } else {
          this.$toast.fail('登陆失败, 请稍后尝试')
        }
      }
      // 3. 后续跳转操作
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn {
    background-color: #2a4363;
  }
  .send-cms-btn {
    background-color:#ededed;
    border:none;
    color:#223752;
  }
}
</style>
