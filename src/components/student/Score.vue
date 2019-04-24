<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="课程名称">
      <template slot-scope="scope">{{ scope.row.courseName }}</template>
    </el-table-column>
    <el-table-column label="平时成绩">
      <template slot-scope="scope">{{ scope.row.hasScore ? scope.row.scoreNormal : '待定' }}</template>
    </el-table-column>
    <el-table-column label="期末成绩">
      <template slot-scope="scope">{{ scope.row.hasScore ? scope.row.scoreFinal : '待定' }}</template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    data() {
      return {
        list: [
          {
            "courseName": "《大学物理下》",
            "scoreFinal": "80",
            "hasScore": true,
            "scoreNormal": "71"
          },
          {
              "courseName": "《线性代数》",
              "hasScore": false
          }
        ],
      }
    }
  }
</script>