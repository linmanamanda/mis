<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="时间">
            <div v-if="props.row.scheduleList.length == 0"><el-tag type="warning">待定</el-tag></div>
            <div v-for="item in props.row.scheduleList">
              <span>开始时间：<el-tag style="width: 140px;">{{ item.beginTime | timestampTransfer }}</el-tag></span>
              <span style="margin-left: 16px;">结束时间：<el-tag style="width: 140px;">{{ item.endTime | timestampTransfer }}</el-tag></span>
            </div>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="courseName">
    </el-table-column>
    <el-table-column
      label="老师名称"
      prop="teacherName">
    </el-table-column>
    <el-table-column
      label="教室"
      prop="laboratoryName">
    </el-table-column>
    <el-table-column
      label="教室编号"
      prop="laboratoryNumber">
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
import service from '../../services/student/course';

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
  },
}
</script>