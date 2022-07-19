import request from '@/utils/request'
// 登录
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: { username, password }
  })
}

// 侧边栏权限
export const menus = () => request({ url: 'menus' })

// 用户数据列表
export const userList = (data) => request({ url: 'users', params: data })

// 添加用户
export const adduser = (data) => request({ method: 'POST', url: 'users', data })

// 删除用户
export const delUserById = (id) => request({ method: 'DELETE', url: `users/${id}` })

// 根据 ID 查询用户信息
export const editUserById = (id) => request({ url: `users/${id}` })

// 编辑用户提交
export const commitUserEdit = (data) => request({ method: 'PUT', url: `users/${data.id}`, data })
