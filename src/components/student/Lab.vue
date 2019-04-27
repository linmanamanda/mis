<template>
  <div class="Lab">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="实验室名称">
        <template slot-scope="scope">{{ scope.row.laboratoryName }}</template>
      </el-table-column>
      <el-table-column label="实验室编号">
        <template slot-scope="scope">{{ scope.row.laboratoryNumber }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.laboratoryIdle">使用</el-tag>
          <el-tag type="warning" v-else>未使用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="setfeedBack(scope.row.laboratoryId, scope.$index)">反馈</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="反馈" :visible.sync="dialogFormVisible">
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
          <el-input type="textarea" v-model="feedBackForm.suggestContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitFeedBack">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import service from '../../services/student/lab';

export default {
  name: 'Lab',
  data() {
    return {
      list: [],
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
    this.fetchLabs();
  },
  methods: {
    fetchLabs() {
      return service.getLabs()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    fetchEquipments(laboratoryId) {
      return service.getEquipments(laboratoryId)
      .then(res => {
        if (res.result) {
          this.feedBackForm.equipments = res.data;
        } 
      })
    },
    // 触发反馈
    setfeedBack(laboratoryId, index) {
      const lab = this.list[index];
      this.feedBackForm.lab = `${lab.laboratoryName}${lab.laboratoryNumber}`;

      return this.fetchEquipments(laboratoryId)
      .then(() => {
        this.dialogFormVisible = true;
      })
    },
    // 提交反馈
    submitFeedBack() {
      const { suggestDeviceId, suggestContent } = this.feedBackForm;

      service.addFeedback({ suggestDeviceId, suggestContent })
      .then(res => {
        if (res.result) {
          this.dialogFormVisible = false;
          this.$message({ message: '反馈成功', type: 'success' });
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

