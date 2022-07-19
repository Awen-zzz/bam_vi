import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: 'home/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/userlist.vue'),
        meta: {
          title: ['用户管理', '用户列表']
        }
        // meta: { title: '用户列表', icon: 'tree-table' }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/roles.vue'),
        meta: {
          title: ['权限管理', '角色列表']
        }
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/roles/rights.vue'),
        meta: {
          title: ['权限管理', '权限列表']
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/goods/goods.vue'),
        meta: {
          title: ['商品管理', '商品列表']
        }
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('@/views/goods/params.vue'),
        meta: {
          title: ['商品管理', '分类参数']
        }
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('@/views/goods/categories.vue'),
        meta: {
          title: ['商品管理', '商品分类']
        }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/orders/orders.vue'),
        meta: {
          title: ['订单管理', '订单列表']
        }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('@/views/reports/reports.vue'),
        meta: {
          title: ['数据统计', '数据报表']
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
