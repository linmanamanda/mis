<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      label="学号"
      prop="userAccount">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="userName">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">{{ scope.row.isScore ? '已打分' : '未打分' }}</template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          v-if="!scope.row.isScore"
          size="mini"
          @click="checkScore(scope.row.userId, scope.$index)">打分</el-button>
      </template>
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
import service from '../../services/professor/score';

export default {
  data() {
    return {
      list: [
        {
          "score": 0,
          "isScore": false,
          "userAccount": "xs173651",
          "userClassId": 2,
          "userName": "小李",
          "userId": 1
        },
      ],
    }
  },
  mounted() {
    this.courseId = this.$route.params.course_id;
    // this.fetchList();
  },
  methods: {
    fetchList() {
      return service.getCourse()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
    },
    checkScore(userId, index) {
      
    },
    setScore(scoreUserId, scoreNormal, scoreFinal) {
      const { courseId } = this;

      return service.setScore({ courseId, scoreUserId, scoreNormal, scoreFinal })

    },
  },
}
</script>