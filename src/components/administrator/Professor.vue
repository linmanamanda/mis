<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="deleteProfessor(scope.row.userId, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import service from '../../services/administrator/professor';

export default {
  name: 'Teacher',
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.fetchTeachers();
  },
  methods: {
    fetchTeachers() {
      return service.getTeachers()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    deleteProfessor(userId, index) {
      return service.deleteProfessor(userId)
      .then(res => {
        if (res.result) {
          this.list.splice(index, 1);
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

