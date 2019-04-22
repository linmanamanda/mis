<template>
  <el-form label-position="top">
    <el-form-item label="实验室">
      <el-select v-model="laboratoryId">
        <el-option v-for="item in list" :key="item.laboratoryId" :label="item.laboratoryName + item.laboratoryNumber" :value="item.laboratoryId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申请时间">
      <el-date-picker
        v-model="startTime"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="timestamp"
        placeholder="开始时间"
        style="margin-right: 16px;">
      </el-date-picker>
      <el-date-picker
        v-model="endTime"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="timestamp"
        placeholder="结束时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="reserveLab">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import service from '../../services/lab/index';

export default {
  name: 'Lab',
  data() {
    return {
      list: [
        {
            "laboratoryIdle": false,
            "laboratoryId": 1,
            "laboratoryName": "多媒体实验室",
            "laboratoryNumber": "S011"
        },
        {
            "laboratoryIdle": true,
            "laboratoryId": 2,
            "laboratoryName": "大数据实验室01",
            "laboratoryNumber": "S012"
        },
      ],
      laboratoryId: '',
      startTime: '',
      endTime: '',    
    }
  },
  methods: {
    fetchLab() {
      return service.getLabs()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    reserveLab() {
      const { laboratoryId, startTime, endTime } = this;

      return service.reserveLab({ laboratoryId, startTime, endTime })
      .then(res => {
        if (res.result) {
          this.$message({ message: '预约成功', type: 'success' });
          this.laboratoryId = '';
          this.startTime = '';
          this.endTime = '';
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
    }
  }
}
</script>

<style>
  
</style>

