<!--布局页面 头 侧边栏 main-->
<template>
  <div>
    <el-container class="container">
      <!--顶部导航-->
      <el-header>
        <h2>后台刮玻璃系统</h2>
        <el-button plain class="logoutBtn" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!--侧边栏-->
        <el-aside width="isCollapse?'65px':'240px'" v-model="isCollapse">
          <el-button @click="isCollapse = !isCollapse" class="collapse"
            >| | |</el-button
          >
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            text-color="#fff"
            active-text-color="#fff"
            background-color="black"
            :unique-opened="true"
            router
          >
            >
            <!--用户管理-->
            <el-submenu
              :index="item.path"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="item1.path"
                  v-for="item1 in item.children"
                  :key="item1.id"
                >
                  <i class="el-icon-menu"></i>
                  {{ item1.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--内容区-->
        <el-main>
          <!--面包屑-->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta.title" :key='index'>{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!--二级路由-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import SideBar from './components/SideBar'
// import { Breadcrumb } from '@/components/Breadcrumb/index.vue'
import { menus } from '@/api/user'
export default {
  created () {
    this.menus()
  },
  data () {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async logout () {
      // 清除token
      this.$store.commit('setToken')
      this.$router.push('/login')
    },
    async menus () {
      this.menuList = await menus()
      console.log(this.menuList)
    }
  },
  computed: {},
  watch: {},
  filters: {}
  // components: { SideBar }
}
</script>

<style scoped lang='scss'>
.container {
  .el-header {
    height: 60px;
    background-color: rgb(0, 0, 0);
  }
  .el-container {
    .el-aside {
      background-color: rgb(0, 0, 0);
      height: 100vh;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.collapse {
  width: 100%;
  border-radius: 0;
}
.el-header {
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-weight: 400;
    line-height: 20px;
    margin-left: 20px;
  }
  .logoutBtn {
    height: 40px;
  }
}
.el-main {
  background-color: rgb(243, 243, 243);
}
.el-menu {
  border-right: unset;
}
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
