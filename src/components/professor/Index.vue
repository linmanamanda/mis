<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/professor/info">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/professor/course">
            <i class="el-icon-document"></i>
            <span slot="title">我的课表</span>
          </el-menu-item>
          <el-menu-item index="/professor/score">
            <i class="el-icon-setting"></i>
            <span slot="title">成绩管理</span>
          </el-menu-item>
          <el-menu-item index="/professor/lab">
            <i class="el-icon-menu"></i>
            <span slot="title">实验室预约</span>
          </el-menu-item>
          <el-menu-item index="/professor/announcement">
            <i class="el-icon-document"></i>
            <span slot="title">发布公告</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
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

