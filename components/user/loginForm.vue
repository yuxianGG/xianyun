<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form"
    >
      <el-form-item class="form-item" prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名/手机"
        />
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
        />
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">
          忘记密码
        </nuxt-link>
      </p>

      <el-button
        class="submit"
        type="primary"
        @click="handleLoginSubmit"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单的规则
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit () {
      // 验证表单
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 请求登录
          // this.$axios({
          //   url: '/accounts/login',
          //   method: 'POST',
          //   data: this.form
          // }).then((res) => {
          //   // console.log(res)
          // })
          this.$store.dispatch('user/login', this.form).then((res) => {
            // 成功提示
            this.$message({
              message: '登录成功,正在跳转',
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

<style lang="less" scoped>
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
