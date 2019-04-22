<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/student/detail">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/student/updation">
            <i class="el-icon-document"></i>
            <span slot="title">信息修改</span>
          </el-menu-item>
          <el-menu-item index="/student/homework">
            <i class="el-icon-setting"></i>
            <span slot="title">作业提交</span>
          </el-menu-item>
          <el-menu-item index="/student/student">
            <i class="el-icon-menu"></i>
            <span slot="title">成绩查询</span>
          </el-menu-item>
          <el-menu-item index="/student/lesson">
            <i class="el-icon-document"></i>
            <span slot="title">课表查询</span>
          </el-menu-item>
          <el-menu-item index="/student/lab">
            <i class="el-icon-setting"></i>
            <span slot="title">实验室</span>
          </el-menu-item>
          <el-menu-item index="/student/announcement">
            <i class="el-icon-setting"></i>
            <span slot="title">公告</span>
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
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
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
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item)
    }
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

