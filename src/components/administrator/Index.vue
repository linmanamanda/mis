<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/administrator/student">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="/administrator/teacher">
            <i class="el-icon-document"></i>
            <span slot="title">老师管理</span>
          </el-menu-item>
          <el-menu-item index="/administrator/equipment">
            <i class="el-icon-setting"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <el-menu-item index="/administrator/course">
            <i class="el-icon-menu"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>
          <el-menu-item index="/administrator/announcement">
            <i class="el-icon-document"></i>
            <span slot="title">发布公告</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        
        <el-main>
          <transition>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data() {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style>
  .el-menu {
    height: 100vh;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    height: 100vh;
    color: #333;
  }

  .el-container {
    height: 100vh;
  }
</style>

