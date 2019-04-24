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
  export default {
    data() {
      return {
        list: [
          {
              "courseName": "《大学物理下》",
              "scheduleList": [
                  {
                      "beginTime": "1555587062325",
                      "endTime": "1555597062325"
                  },
                  {
                      "beginTime": "1555589062325",
                      "endTime": "1555590062325"
                  }
              ],
              "laboratoryId": 1,
              "laboratoryName": "多媒体实验室",
              "laboratoryNumber": "S011",
              "courseId": 2
          },
          {
              "courseName": "《线性代数》",
              "scheduleList": [],
              "laboratoryId": 4,
              "laboratoryName": "信息安全实验室01",
              "laboratoryNumber": "S021",
              "courseId": 6
          }
        ],
      }
    }
  }
</script>