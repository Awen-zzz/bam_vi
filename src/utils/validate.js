// 校验文件，以下校验手机号
export const validateMobile = (mobile) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(mobile)
}
// 邮箱
export const validateEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}
