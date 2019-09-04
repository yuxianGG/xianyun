<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="form"
  >
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名手机"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/input#fu-he-xing-shu-ru-kuang -->
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
      >
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="你的名字"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input
        v-model="form.checkPassword"
        placeholder="确认密码"
        type="password"
      />
    </el-form-item>

    <el-button
      class="submit"
      type="primary"
      @click="handleRegSubmit"
    >
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        // 代表通过验证
        callback()
      }
    }
    return {
      // 表单数据
      form: {
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        checkPassword: ''
      },
      // 表单规则
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
        captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        checkPassword: [{ validator: checkPassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha () {
      // 判断手机号码为空,不请求
      if (!this.form.username) {
        this.$message.error('请输入手机号码')
      }
      // 发送验证码
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: this.form.username // 手机号码
        }
      }).then((res) => {
        //   解构
        const { code } = res.data
        this.$alert(`模拟手机验证码是${code},"提示"`)
      })
    },
    // 注册
    handleRegSubmit () {
    //   console.log(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 用...+变量名指向剩余的属性
          const { checkPassword, ...rest } = this.form

          // 调用注册接口
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: rest
          }).then((res) => {
            // 注册成功后帮用户自动登录
            this.$store.commit('user/setUserInfo', res.data)
            // console.log(res)
            //   }).catch((err) => {
            //     console.dir(err)
            // 成功提示
            this.$message({
              message: '注册成功,正在跳转',
              type: 'success'
            })
            // 跳转到首页
            setTimeout(() => {
              this.$router.replace('/')
            }, 1000)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }
    .form-item{
        margin-bottom:20px;
    }
    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }
    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
