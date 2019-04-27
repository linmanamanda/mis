<template>
  <div class="Lab">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="课程名">
        <template slot-scope="scope">{{ scope.row.courseName }}</template>
      </el-table-column>
      <el-table-column label="实验室名称">
        <template slot-scope="scope">{{ scope.row.laboratoryName }}</template>
      </el-table-column>
      <el-table-column label="实验室编号">
        <template slot-scope="scope">{{ scope.row.laboratoryNumber }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList">
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import service from '../../services/student/homework';

export default {
  name: 'Homework',
  data() {
    return {
      list: [],
      fileList: [],
    }
  },
  mounted() {
    this.fetchHomeworks();
  },
  methods: {
    fetchHomeworks() {
      return service.getHomeworks()
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

