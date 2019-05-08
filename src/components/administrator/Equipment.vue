<template>
  <div class="Lab">
    <el-tabs>
      <el-tab-pane label="实验室信息">
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
                @click="fetchEquipments(scope.row.laboratoryId)">查看设备</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="反馈信息">
        <el-table
          :data="feedbacks"
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="suggestDeviceName" label="设备名称"></el-table-column>
          <el-table-column prop="suggestDeviceNumber" label="设备编号"></el-table-column>
          <el-table-column
            prop="suggestContent"
            label="反馈内容"
            width="180">
          </el-table-column>
          <el-table-column prop="suggestUserName" label="反馈人"></el-table-column>
          <el-table-column label="反馈时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.suggestTime | timestampTransfer }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteFeedback(scope.row.suggestId, scope.$index)">删除反馈</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="设备列表" :visible.sync="equipmentsVisible">
      <el-table
        :data="equipments"
        style="width: 100%">
        <el-table-column
          prop="deviceName"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deviceNumber"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="equipmentIndex !== scope.$index">
              <el-tag v-if="scope.row.deviceStatus == '正常'">{{ scope.row.deviceStatus }}</el-tag>
              <el-tag v-if="scope.row.deviceStatus == '故障'" type="warning">{{ scope.row.deviceStatus }}</el-tag>
              <el-tag v-if="scope.row.deviceStatus == '报废'" type="danger">{{ scope.row.deviceStatus }}</el-tag>
            </span>
            <el-select v-else v-model="equipmentStatus">
              <el-option label="正常" value="0"></el-option>
              <el-option label="故障" value="1"></el-option>
              <el-option label="报废" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button 
              v-if="equipmentIndex !== scope.$index"
              size="mini" 
              @click="equipmentIndex = scope.$index">修改</i></el-button>
            <el-button 
              v-else
              size="mini" 
              type="warning"
              @click="updateEquipment(scope.row.deviceId, scope.$index)">保存</i></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteEquipments(scope.row.deviceId, scope.$index)">删除设备</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </el-dialog>
  </div>
</template>

<script>
import service from '../../services/administrator/equipment';

export default {
  name: 'Lab',
  data() {
    return {
      list: [],
      equipments: [],
      feedbacks: [],
      equipmentsVisible: false,
      equipmentStatus: "0",
      equipmentIndex: -1,
    }
  },
  mounted() {
    this.fetchLabs();
    this.fetchFeedbacks();
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
          this.equipments = res.data;
          this.equipmentsVisible = true;
          this.equipments.forEach(item => {
            item.isEditing = false;
          });
        } 
      })
    },
    updateEquipment(deviceId, index) {
      const { equipmentStatus } = this;
      return service.updateEquipments(deviceId, equipmentStatus)
      .then(res => {
        if (res.result) {
          this.$message({ message: '修改成功', type: 'success' });
          if (equipmentStatus == 0) {
            this.equipments[index].deviceStatus = '正常';
          } else if (equipmentStatus == 1) {
            this.equipments[index].deviceStatus = '故障';
          } else{
            this.equipments[index].deviceStatus = '报废';
          }
          this.equipmentIndex = -1;
          this.equipmentStatus = '0';
        } 
      })

    },
    deleteEquipments(deviceId, index) {
      return service.deleteEquipment(deviceId)
      .then(res => {
        if (res.result) {
          this.equipments.splice(index, 1);
        } 
      })
    },
    fetchFeedbacks() {
      return service.getFeedback()
      .then(res => {
        if (res.result) {
          this.feedbacks = res.data;
          this.feedbacksVisible = true;
        } 
      })
    },
    deleteFeedback(suggestId, index) {
      return service.deleteFeedback(suggestId)
      .then(res => {
        if (res.result) {
          this.$message({ message: '删除成功', type: 'success' });
          this.feedbacks.splice(index, 1);
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

  .el-dialog {
    width: 80% !important;
  }
</style>

