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
import service from '../../services/administrator/index';

export default {
  name: 'Student',
  data() {
    return {
      list: [
        {
            "userClassName": "1502",
            "userCollegeName": "计算机科学与技术学院",
            "userBirthplaceName": "河南省",
            "userMajorName": "智能科学与技术",
            "userAccount": "xs173657",
            "userGender": "女",
            "userEmail": "xxx@xx.com",
            "userEnterSchoolTime": "2651216132312",
            "userName": "小李",
            "userId": 1
        },
        {
            "userClassName": "1502",
            "userCollegeName": "计算机科学与技术学院",
            "userBirthplaceName": "浙江省",
            "userMajorName": "计算机科学与技术",
            "userAccount": "xs186523",
            "userGender": "女",
            "userEmail": "xx@66.com",
            "userEnterSchoolTime": "1812131661132",
            "userName": "小张",
            "userId": 4
        }
      ],
    }
  },
  methods: {
    fetchStudetn() {
      service.getStudents()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    setTeacher(userId, index) {
      this.list.splice(index, 1);
      service.setTeacher(userId)
      .then(res => {
        if (res.result) {
          this.list.splice(index, 1);
        }
      })
    },
    deleteStudent(userId, index) {
      service.deleteStudent(userId)
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

