/**
 * 此模块封装了token的获取，设置，清除，根据token判断是否登录
 */
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
