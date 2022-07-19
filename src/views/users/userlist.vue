<!--用户列表-->
<template>
  <div>
    <el-card class="box-card">
      <!--搜索框-->
      <el-input
        class="search"
        placeholder="请输入内容"
        v-model="input"
        clearable
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="warning" @click="adduser">添加用户</el-button>
      <!--表格-->
      <el-table :data="userlist" stripe style="width: 100%" border>
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope"
            ><!--TODO 试一下v-slot='{row}',试过了，可以，slot-scope是老写法-->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#a19a9a"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="handle" label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edituser(row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="deluser(row.id)"
            ></el-button>
            <el-button type="info" icon="el-icon-s-tools"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pagenum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.totalpage"
        >
        </el-pagination>
      </div>
      <!--添加用户弹出层-->
      <el-dialog
        title="添加用户"
        :visible.sync="addVisible"
        width="50%"
        @click.native.stop
        @close="handleAddClose"
      >
        <el-form
          ref="addFormRef"
          label-width="100px"
          :model="adduserform"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="adduserform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="adduserform.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="adduserform.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="adduserform.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit"> 确 定 </el-button>
        </span>
      </el-dialog>
      <!--编辑用户弹出层-->
      <el-dialog
        title="编辑用户"
        :visible.sync="editVisible"
        width="50%"
        @click.native.stop
        @close="handleEditClose"
      >
        <el-form
          ref="editFormRef"
          label-width="100px"
          :model="adduserform"
          :rules="rules"
        >
          <el-form-item label="用户名">
            <el-input v-model="editUserInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="editUserInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editUserInfo.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit"> 确 定 </el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { userList, adduser, delUserById, editUserById, commitUserEdit } from '@/api/user'
export default {
  created () {
    this.userList()
  },
  data () {
    return {
      input: '',
      userlist: [],
      currentPage: 5, // 当前显示几条
      addVisible: false, // 添加用户弹出框
      editVisible: false, // 编辑用户弹出框
      editUserInfo: {}, // 编辑-获取用户信息
      page: {
        query: '', // 查询参数
        pagenum: 1, // 当前页码
        pagesize: 5, // 每页显示条数
        totalpage: 0 // 总记录数
      },
      adduserform: { // 表单校验
        username: '', // 用户名
        password: '', // 密码
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '请输入3-8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码长度不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '请输入6-16个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱长度不能为空', trigger: 'blur' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '请输入正确邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号长度不能为空', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 用户列表
    async userList () {
      const res = await userList(this.page)
      // console.log('userlist', res.users)
      console.log('res', res)
      this.userlist = res.users
      this.page.totalpage = res.total
    },
    // 分页
    handleSizeChange (val) { // 每页多少条
      this.page.pagesize = val
      this.userList()
    },
    handleCurrentChange (val) { // 当前页
      this.page.pagenum = val
      this.userList()
    },
    // 添加用户
    async adduser () {
      this.addVisible = true
    },
    // ele内置 关闭对话框事件
    handleAddClose () {
      this.$refs.addFormRef.resetFields()// 表单重置
    },
    handleEditClose () {
      this.$refs.editFormRef.resetFields()// 表单重置
    },
    // 添加用户对话框点击确认
    async addSubmit () {
      try {
        await this.$refs.addFormRef.validate()
        const res = await adduser(this.adduserform)
        console.log(res)
        this.addVisible = false
        this.userList()
        this.$message.success('添加成功')
      } catch (error) {
        this.$message.error('添加失败')
      }
    },
    // 删除用户
    async deluser (id) {
      try {
        await this.$confirm('确定删除用户吗？')
        await delUserById(id)
        this.$message.success('删除成功')
        this.userList()
      } catch (error) {
        this.$message('取消删除')
      }
    },
    // 编辑用户-获取用户信息
    async edituser (id) {
      this.editVisible = true
      try {
        this.editUserInfo = await editUserById(id)
        console.log('1', this.editUserInfo)
      } catch (error) {
        this.$message.error('获取用户信息失败')
      }
    },
    // 编辑用户-提交
    async editSubmit () {
      try {
        await this.$refs.editFormRef.validate()
        console.log('this.editUserInfo', this.editUserInfo)
        await commitUserEdit(this.editUserInfo)
        this.userList()
        this.editVisible = false
        this.$message.success('提交成功')
      } catch (error) {
        this.$message.error('编辑用户信息失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.search {
  margin-bottom: 10px;
  width: 300px;
  margin-right: 20px;
}
.el-table {
  margin-bottom: 10px;
}
</style>
