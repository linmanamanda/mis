<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column label="Id">
      <template slot-scope="scope">{{ scope.row.userId }}</template>
    </el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">{{ scope.row.userName }}</template>
    </el-table-column>
    <el-table-column label="账号">
      <template slot-scope="scope">{{ scope.row.userAccount }}</template>
    </el-table-column>
    <el-table-column label="邮箱">
      <template slot-scope="scope">{{ scope.row.userEmail }}</template>
    </el-table-column>
    <el-table-column label="性别">
      <template slot-scope="scope">{{ scope.row.userGender }}</template>
    </el-table-column>
    <el-table-column label="籍贯">
      <template slot-scope="scope">{{ scope.row.userBirthplaceName }}</template>
    </el-table-column>
  </el-table>
</template>

<script>
import service from '../../services/administrator/index';

export default {
  name: 'Teacher',
  data() {
    return {
      list: [
        {
            "userBirthplaceName": "北京市",
            "userAccount": "ls182647",
            "userGender": "男",
            "userEmail": "1852@163.com",
            "userName": "王老师",
            "userId": 2
        },
        {
            "userBirthplaceName": "河北省",
            "userAccount": "ls188965",
            "userGender": "女",
            "userEmail": "22@33.com",
            "userName": "彭老师",
            "userId": 3
        }
      ],
    }
  },
  mounted() {
    this.fetchTeachers();
  },
  methods: {
    fetchTeachers() {
      service.getTeachers()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
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

