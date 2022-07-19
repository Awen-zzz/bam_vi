<!--登录页-->
<template>
  <div class="login-container">
    <div class="login-box">
      <img
        src="http://ihrm.itheima.net/static/img/login-logo.758b34e9.png"
        alt=""
      />
      <el-form :model="ruleForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username">
            <template #prefix>
              <SvgIcon name="user"></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="isPassword ? 'password' : ''"
            v-model="ruleForm.password"
            >
            <!-- <template #prefix>
              <SvgIcon name="password"></SvgIcon>
            </template>
            <template #suffix>
              <SvgIcon
                :name="isPassword ? 'eye' : 'eye-open'"
                @click.native="isPassword = !isPassword"
              ></SvgIcon>
            </template> -->
             <template #prefix>
              <SvgIcon name="password"></SvgIcon>
            </template>
            <template #suffix>
              <!--密码眼睛是否为真，如果true就显示闭着，如果false就打开-->
              <SvgIcon
                :name="isPassword ? 'eye' : 'eye-open'"
                @click.native="isPassword = !isPassword"
              ></SvgIcon>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import { login } from '@/api/user'
// import { validateMobile } from '@/utils/validate'
export default {
  created () { },
  data () {
    // 正则手机号格式
    // const validateMobile = (mobile) => {
    //   const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    //   return reg.test(mobile)
    // }
    // 函数校验手机格式
    // const validateMobileFn = (rule, value, callback) => {
    //   if (validateMobile(value)) {
    //     callback()
    //   } else {
    //     callback(new Error('手机号格式不正确'))
    //   }
    // }
    return {
      isPassword: true,
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
          // { validator: validateMobileFn, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须为6-16位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async loginFn () {
      try {
        await this.$refs.loginForm.validate()
        // this.$message.success('校验成功')
        await this.$store.dispatch('user/login', this.ruleForm)
        this.$router.push('/home')
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SvgIcon }
}
</script>

<style scoped lang='scss'>
.login-container {
  //背景
  width: 100vw;
  height: 100vh;
  background: url("@/assets/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    //登录盒子
    width: 450px;
    height: 400px;
    text-align: center;
    img {
      margin-bottom: 20px;
      width: 450px;
    }
    //::v-deep:{} 改版 最新的写法就是 :deep(){}
    .el-input {
      :deep(input) {
        width: 450px;
        height: 50px;
      }
    }
    .el-button {
      width: 450px;
      height: 64px;
    }
  }
}
:deep(.el-form-item__error) {
  color: #fff;
}
:deep(.el-form-item.is-error .el-input__inner) {
  border: none;
}
</style>
