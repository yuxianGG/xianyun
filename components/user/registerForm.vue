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
    },
    // 注册
    handleRegSubmit () {
    //   console.log(this.form)
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
