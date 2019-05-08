<template>
  <div>
    <el-tabs v-model="tabIndex">
      <el-tab-pane label="课程列表" name="course">
        <el-table
          :data="list"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column label="课程名称">
            <template slot-scope="scope">{{ scope.row.courseName }}</template>
          </el-table-column>
          <el-table-column
            label="教室"
            prop="laboratoryName">
          </el-table-column>
          <el-table-column
            label="教室编号"
            prop="laboratoryNumber">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="checkScore(scope.row.courseId)">查看成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="成绩列表" name="score">
        <el-table
          :data="score"
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="学号">
            <template slot-scope="scope">{{ scope.row.userAccount }}</template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column label="成绩状态">
            <template slot-scope="scope"><el-tag :type="!scope.row.isScore ? 'warning' : ''">{{ scope.row.isScore ? '已打分' : '未打分' }}</el-tag></template>
          </el-table-column>
          <el-table-column label="成绩">
            <template slot-scope="scope">{{ scope.row.isScore ? scope.row.score : '-' }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="!scope.row.isScore"
                @click="triggerScore(scope.row.userId)"
                >提交成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="成绩下载" name="download">
        <el-button @click="fetchScoreDownloadURL">下载</el-button>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="提交成绩" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="作业下载">
          <a style="cursor: pointer; color: #409EFF;" v-if="scoreForm.homeworkURL" @click="downloadHW(scoreForm.homeworkURL)">{{ scoreForm.homeworkURL }}</a>
          <span v-else><el-tag type="warning">未提交</el-tag></span>
        </el-form-item>
        <el-form-item label="平时成绩">
          <el-input v-model="scoreForm.scoreNormal"></el-input>
        </el-form-item>
        <el-form-item label="期末成绩">
          <el-input v-model="scoreForm.scoreFinal"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitScore">确定</el-button>
      </div>
    </el-dialog>
  </div>
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
      tabIndex: 'course',
      list: [],
      score: [],
      dialogFormVisible: false,
      scoreForm: {
        homeworkURL: '',
        scoreNormal: '',
        scoreFinal: '',
        scoreCourseId: '',
        scoreUserId: '',
      },
      downloadURL: '',
    }
  },
  mounted() {
    this.fetchList();
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
    checkScore(courseId) {
      return service.getScores(courseId)
      .then(res => {
        if (res.result) {
          this.scoreForm.scoreCourseId = courseId;
          this.score = res.data;
          this.tabIndex = 'score';
        } 
      })
    },
    triggerScore(userId) {
      this.scoreForm.scoreUserId = userId;
      this.fetchHomeworkURL();
    },
    submitScore() {
      return service.setScore(this.scoreForm)
      .then(res => {
        if (res.result) {
          this.$message({ message: '提交成功', type: 'success' });
          this.dialogFormVisible = false;
        } 
      })
    },
    fetchScoreDownloadURL() {
      return service.downloadScore()
      .then(res => {
        if (res.result) {
          this.downloadScore(res.data);
        } 
      })
    },
    downloadScore(downloadURL) {
      const metaType = downloadURL.split('.')[1];

      return service.downloadFile({ workUrl: downloadURL })
      .then(res => {
        this.downloadFile(res, metaType)
      })
    },
    fetchHomeworkURL() {
      return service.getHomeworkURL(this.scoreForm.scoreCourseId, this.scoreForm.scoreUserId)
      .then(res => {
        if (res.result) {
          this.scoreForm.homeworkURL = res.data.workUrl;
          this.dialogFormVisible = true;
        } 
      })
    },
    downloadHW(downloadURL) {
      const metaType = downloadURL.split('.')[1];

      return service.downloadFile({ workUrl: downloadURL })
      .then(res => {
        this.downloadFile(res, metaType)
      })
    },
  },
}
</script>