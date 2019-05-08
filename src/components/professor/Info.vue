<template>
  <el-tabs v-model="tabIndex" @tab-click="tabSwitch">
    <el-tab-pane label="查看" name="detail">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="学号">
          <span>{{ renderData.userAccount }}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ renderData.userName }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ renderData.userGender }}</span>
        </el-form-item>
        <el-form-item label="籍贯">
          <span>{{ renderData.userBirthplace }}</span>
        </el-form-item>
        <el-form-item label="邮箱">
          <span>{{ renderData.userEmail }}</span>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="编辑" name="edition">
      <el-form :model="formData" :rules="rules" label-width="80px" label-position="left" ref="ruleForm" status-icon>
        <el-form-item label="学号">
          <el-input v-model="formData.userAccount" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userGender">
          <el-select v-model="formData.userGender">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯" prop="userBirthplaceId">
          <el-select v-model="formData.userBirthplaceId">
            <el-option v-for="item in birthPlace" :key="item.birthplaceId" :label="item.birthplaceName" :value="item.birthplaceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="formData.userEmail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import service from '../../services/student/index';

export default {
  name: 'Password',
  data() {
    return {
      tabIndex: 'detail',
      renderData: {
        userName: '',
        userAccount: '',
        userGender: '',
        userEmail: '',
        userBirthplace: '',
      },
      formData: {
        userName: '',
        userAccount: '',
        userGender: '',
        userEmail: '',
        userBirthplaceId: '',
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        userGender: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        userBirthplaceId: [
          { required: true, message: '请选择籍贯', trigger: 'blur' },
        ],
        userEmail: [
          { required: true, message: '请选择邮箱', trigger: 'blur' },
        ],
      },
      birthPlace: [],
      dialogFormVisible: false, 
    }
  },
  mounted() {
    this.fetchDetail();
    this.fetchBirthPlace();
  },
  methods: {
    fetchDetail() {
      return service.getDetail()
      .then(res => {
        if (res.result) {
          const { userAccount, userName, userGender, userBirthplace, userEmail, userCollegeName, userMajorName, userClassName, userEnterSchoolTime  } = res.data;

          this.renderData = {
            userName,
            userAccount,
            userGender,
            userEmail,
            userBirthplace,
            userCollegeName, 
            userMajorName, 
            userClassName,
            userEnterSchoolTime,
          };
        }
      })
    },
    tabSwitch() {
      if (this.tabIndex === 'edition') {
        this.renderEdition();
      }
    },
    renderEdition() {
      const { userAccount, userName, userGender, userEmail, userEnterSchoolTime  } = this.renderData;
      this.formData = {
        userName,
        userAccount,
        userGender: userGender === '男' ? '0' : '1',
        userEmail,
        userBirthplaceId: '',
        collegeId: '',
        majorId: '',
        userClassId: '',
        userEnterSchoolTime,
      };
    },
    fetchBirthPlace() {
      return service.getBirthPlace()
      .then(res => {
        if (res.result) {
          this.birthPlace = res.data;
        }
      })
    },
    save() {
      this.$refs.ruleForm.validate()
      .then(() =>{
        const { userName, userEmail, userGender, userBirthplaceId } = this.formData;
        
        return service.updateDetail({ userName, userEmail, userGender, userBirthplaceId, userClassId: 0, userEnterSchoolTime: Date.now() });
      })
      .then(res => {
        if (res.result) {
          this.$message({ message: '修改成功', type: 'success' });
          window.location.reload();
        }
      })
      .catch(err => { console.log(err) })
    },
  }
}  
</script>

<style scoped>
  .el-card {
    width: 730px !important;
    height: 640px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto auto auto auto;
  }

  .el-form {
    width: 730px !important;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>