<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="发布人">
            <span>{{ props.row.noticeUserName }}</span>
          </el-form-item>
          <el-form-item label="发布时间">
            <span><el-tag>{{ props.row.noticePublishTime | timestampTransfer }}</el-tag></span>
          </el-form-item>
          <el-form-item label="内容">
            <span>{{ props.row.noticeContent }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      label="公告标题"
      prop="noticeTitle">
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
              "noticeContent": "这里是关于计算机的相关事宜，请同学们注意这个通知，并在后天内完成！",
              "noticeUserName": "小李",
              "noticePublishTime": "1555567673675",
              "noticeId": 2,
              "noticeTitle": "《关于计算机上课安排通知》"
          },
          {
              "noticeContent": "这里是关于选课的相关事宜，请同学们注意这个通知，并在后天内完成！",
              "noticeUserName": "小李",
              "noticePublishTime": "1555567701176",
              "noticeId": 3,
              "noticeTitle": "《关于选课通知》"
          },
        ],
      }
    }
  }
</script>