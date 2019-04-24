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
import service from '../../services/homework/index';

export default {
  name: 'Homework',
  data() {
    return {
      list: [
        {
            "courseName": "《大学物理下》",
            "laboratoryName": "多媒体实验室",
            "laboratoryNumber": "S011",
            "courseId": 2
        },
        {
            "courseName": "《线性代数》",
            "laboratoryName": "信息安全实验室01",
            "laboratoryNumber": "S021",
            "courseId": 6
        }
      ],
      fileList: [],
    }
  },
  mounted() {
    this.fetchHomeworks();
  },
  methods: {
    fetchHomeworks() {
      service.getHomeworks()
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

