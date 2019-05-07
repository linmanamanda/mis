<template>
  <div class="Announcement">
    <div><el-button type="primary" style="margin-bottom: 16px;" @click="dialogFormVisible = true;">发布公告</el-button></div>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="公告标题">
        <template slot-scope="scope">{{ scope.row.noticeTitle }}</template>
      </el-table-column>
      <el-table-column label="发布人">
        <template slot-scope="scope">{{ scope.row.noticeUserName }}</template>
      </el-table-column>
      <el-table-column label="公告内容" width="500">
        <template slot-scope="scope">{{ scope.row.noticeContent }}</template>
      </el-table-column>
      <el-table-column label="发布时间" width="200">
        <template slot-scope="scope">{{ scope.row.noticePublishTime | timestamp }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteAnnouncement(scope.row.noticeId, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="发布公告" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="公告标题">
          <el-input type="text" v-model="noticeTitle"></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="noticeContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;">取消</el-button>
        <el-button type="primary" @click="addAnnouncement">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import service from '../../services/professor/announcement';
import moment from 'moment';

export default {
  name: 'Announcement',
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      noticeTitle: '',
      noticeContent: '',
    }
  },
  mounted() {
    this.fetchAnnouncement();
  },
  filters: {
    timestamp: function (value) {
      if (!value) return ''
      return moment(value - '0').format('YYYY-MM-DD HH:mm:ss');  
    }
  },
  methods: {
    fetchAnnouncement() {
      service.getAnnouncement()
      .then(res => {
        if (res.result) {
          this.list = res.data;
        }
      })
    },
    deleteAnnouncement(noticeId, index) {
      service.deleteAnnouncement(noticeId)
      .then(res => {
        if (res.result) {
          this.$message({ message: '删除成功', type: 'success' });
          this.list.splice(index, 1);
        }
      })
    },
    addAnnouncement() {
      const { noticeTitle, noticeContent } = this;

      service.addAnnouncement({ noticeTitle, noticeContent })
      .then(res => {
        if (res.result) {
          this.dialogFormVisible = false;
          this.$message({ message: '发布成功', type: 'success' });
          window.location.reload();
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

