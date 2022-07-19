import { login } from '@/api/user'
import { Message } from 'element-ui'
const state = {
  token: null
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  removeToken (state) {
    state.token = null
  }
}
const actions = {
  async login (context, data) { // 判断放在了拦截器里面
    const res = await login(data)
    context.commit('setToken', res.token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
