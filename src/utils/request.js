import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/', // 开发环境
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    config.headers.Authorization = store.state.user.token
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data, meta } = response.data
  if (meta.status === 200 || meta.status === 201) {
    return data
  } else {
    Message.error(meta.msg || '操作失败')
    return Promise.reject(new Error(meta.msg))// 手动制造错误让其进入到catch中
  }
}, error => {
  // if (error.response && error.response.data && error.response.data.code === 10002) {
  //   store.dispatch('user/logout')
  //   router.push('/login')
  // }
  // 对响应错误做点什么
  return Promise.reject(error)// 跳出当前执行链，直接进catch
})
export default request
