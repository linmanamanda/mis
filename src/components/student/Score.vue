<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="课程名称">
      <template slot-scope="scope">{{ scope.row.courseName }}</template>
    </el-table-column>
    <el-table-column label="平时成绩">
      <template slot-scope="scope">
        <span v-if="scope.row.hasScore">{{ scope.row.scoreNormal | float2 }}</span>
        <span v-else>待定</span>
      </template>
    </el-table-column>
    <el-table-column label="期末成绩">
      <template slot-scope="scope">
        <span v-if="scope.row.hasScore">{{ scope.row.scoreFinal | float2 }}</span>
        <span v-else>待定</span>
      </template>
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