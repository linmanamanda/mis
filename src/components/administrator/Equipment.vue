<template>
  <div class="Lab">
    <div><el-button type="primary" style="margin-bottom: 16px;" @click="fetchFeedbacks">查看反馈</el-button></div>
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

    <el-dialog title="反馈列表" :visible.sync="feedbacksVisible">
      <el-table
        :data="feedbacks"
        style="width: 100%">
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
            <span>{{ scope.row.suggestTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="deleteFeedback(scope.row.laboratoryId, scope.$index)">删除反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

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
            <span v-if="!scope.row.isEditing">
              <el-tag>{{ scope.row.deviceStatus }}</el-tag>
              <a style="margin-left: 8px; cursor: pointer;" @click="updateEquipment(scope.row.deviceId, scope.$index)">修改</a>
            </span>
            <span v-else>
              <el-select v-model="equipmentStatus">
                <el-option label="正常" value="0"></el-option>
                <el-option label="故障" value="1"></el-option>
                <el-option label="报废" value="1"></el-option>
              </el-select>
              <a style="margin-left: 8px; cursor: pointer;" @click="updateEquipment(scope.row.deviceId, scope.$index)">保存</a>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
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
      feedbacksVisible: false,
      equipmentsVisible: false,
      equipmentStatus: "0",
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
          this.equipments = res.data;
          this.equipmentsVisible = true;
          this.equipments.forEach(item => {
            item.isEditing = false;
          });
        } 
      })
    },
    updateEquipment(deviceId, index) {
      const equipment = this.equipments[index];
      if (equipment.isEditing) {

        equipment.isEditing = false;
      } else {
        equipment.isEditing = true;
      }
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

