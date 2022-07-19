// 控制权限
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
