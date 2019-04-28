<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="姓名">
      <template slot-scope="scope">{{ scope.row.userName }}</template>
    </el-table-column>
    <el-table-column label="学院" width="180">
      <template slot-scope="scope">{{ scope.row.userCollegeName }}</template>
    </el-table-column>
    <el-table-column label="专业" width="180">
      <template slot-scope="scope">{{ scope.row.userMajorName }}</template>
    </el-table-column>
    <el-table-column label="班级">
      <template slot-scope="scope">{{ scope.row.userClassName }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="setTeacher(scope.row.userId, scope.$index)">作为老师</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteStudent(scope.row.userId, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import service from '../../services/administrator/student';

export default {
  name: 'Student',
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.fetchStudent();
  },
  methods: {
    fetchStudent() {
      return service.getStudents()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    setTeacher(userId, index) {
      return service.setTeacher(userId)
      .then(res => {
        if (res.result) {
          this.list.splice(index, 1);
        }
      })
    },
    deleteStudent(userId, index) {
      return service.deleteStudent(userId)
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

