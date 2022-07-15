<template>
  <div class="login-container">
    <div class="login-box">
      <img
        src="http://ihrm.itheima.net/static/img/login-logo.758b34e9.png"
        alt=""
      />
      <el-form>
        <el-form-item>
          <el-input>
            <template #prefix>
              <SvgIcon name="user"></SvgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            :type="isPassword ? 'password' : ''"
            ><!--密码眼睛没打开，类型就加密，否则相反-->
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
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validateMobile } from '@/utils/validate' // 导入校验手机号规则
export default {
  created () { },
  data () {
    // const validateMobileFn = (rule, value, callback) => { // element函数校验规则
    //   if (validateMobile(value)) { // 如果校验手机号有值value
    //     callback() // 那就执行校验函数
    //   } else {
    //     callback(new Error('手机号格式不正确')) // 否则校验失败提示用户
    //   }
    // }
    return {
      // loginForm: {
      //   mobile: '13800000002',
      //   password: '123456'
      // },
      // rules: { // element里的rule校验规则，不安全，须加上函数校验规则
      //   mobile: [
      //     { required: true, message: '请输入手机号码', trigger: 'blur' }, // blur失去焦点开始校验
      //     { validator: validateMobileFn, trigger: 'blur' } // 调用函数，二次校验
      //   ],
      //   password: [
      //     { required: true, message: '请输入密码', trigger: 'blur' },
      //     { min: 6, max: 16, message: '密码长度在6-16之间', trigger: 'blur' }
      //   ]
      // },
      isPassword: true
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
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
