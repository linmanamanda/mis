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

<script>
import service from '../../services/student/score';

export default {
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      return service.getScores()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
    },
  },
}
</script>