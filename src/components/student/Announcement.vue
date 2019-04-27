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
import service from '../../services/student/announcement';

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
      return service.getAnnouncement()
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