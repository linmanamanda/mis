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
                >提交成绩</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="提交成绩" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="实验室">
          <el-select v-model="feedBackForm.lab" disabled>
            <el-option :label="feedBackForm.lab" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-select v-model="feedBackForm.suggestDeviceId">
            <el-option v-for="item in feedBackForm.equipments" :key="item.suggestDeviceId" :label="item.deviceName" :value="item.deviceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈内容">
          <el-input v-model="feedBackForm.suggestContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitFeedBack">确定</el-button>
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
      score: [
        {
            "score": 0,
            "isScore": false,
            "userAccount": "xs173651",
            "userClassId": 2,
            "userName": "小李",
            "userId": 1
        },
      ],
      dialogFormVisible: false,
      feedBackForm: {
        lab: '',
        equipments: [],
        suggestDeviceId: '',
        suggestContent: '',
      },
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
          this.score = res.data;
          this.tabIndex = 'score';
        } 
      })
    },
  },
}
</script>