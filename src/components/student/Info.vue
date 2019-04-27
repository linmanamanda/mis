<template>
  <div>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="学号">
        <span>{{ formData.userAccount }}</span>
      </el-form-item>
      <el-form-item label="姓名">
        <span>{{ formData.userName }}</span>
      </el-form-item>
      <el-form-item label="性别">
        <span>{{ formData.userGender }}</span>
      </el-form-item>
      <el-form-item label="籍贯">
        <span>{{ formData.userBirthplaceId }}</span>
      </el-form-item>
      <el-form-item label="邮箱">
        <span>{{ formData.userEmail }}</span>
      </el-form-item>
      <el-form-item label="班级">
        <span>{{ formData.userClassId }}</span>
      </el-form-item>
    </el-form>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
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
        <el-form-item label="班级" prop="userClassId">
          <el-select v-model="formData.collegeId" placeholder="学院" @change="fetchMajor">
            <el-option v-for="item in college" :key="item.collegeId" :label="item.collegeName" :value="item.collegeId"></el-option>
          </el-select>
          <el-select v-model="formData.majorId" placeholder="专业" @change="fetchClass" style="margin-left: 12px;">
            <el-option v-for="item in major" :key="item.majorId" :label="item.majorName" :value="item.majorId"></el-option>
          </el-select>
          <el-select v-model="formData.userClassId" placeholder="班级" style="margin-left: 12px;">
            <el-option v-for="item in classes" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="save">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import service from '../../services/student/index';

export default {
  name: 'Password',
  data() {
    return {
      formData: {
        userName: '',
        userAccount: '',
        userGender: '',
        userEmail: '',
        userClassId: '',
        userBirthplaceId: '',
        userEnterSchoolTime: '',
        collegeId: '',
        majorId: '',
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
        userClassId: [
          { required: true, message: '请选择班级', trigger: 'blur' },
        ],
      },
      birthPlace: [],
      college: [],
      major: [],
      classes: [],
      dialogFormVisible: false, 
    }
  },
  mounted() {
    this.fetchDetail();
    this.fetchBirthPlace();
    this.fetchCollege();
  },
  methods: {
    fetchDetail() {
      return service.getDetail()
      .then(res => {
        if (res.result) {
          this.formData = res.data;
          this.formData.userGender = this.formData.userGender === '男' ? '0' : '1';
        }
      })
    },
    fetchBirthPlace() {
      return service.getBirthPlace()
      .then(res => {
        if (res.result) {
          this.birthPlace = res.data;
        }
      })
    },
    fetchCollege() {
      return service.getCollege()
      .then(res => {
        if (res.result) {
          this.college = res.data;
        }
      })
    },
    fetchMajor() {
      const { collegeId } = this.formData
      this.major = [];
      this.formData.majorId = '';
      this.classes = [];
      this.formData.userClassId = '';

      if (collegeId) {
        return service.getMajor(collegeId)
        .then(res => {
          if (res.result) {
            this.major = res.data;
          }
        })
      }

    },
    fetchClass() {
      const { majorId } = this.formData
      this.classes = [];
      this.formData.userClassId = '';

      if (majorId) {
        return service.getClass(majorId)
        .then(res => {
          if (res.result) {
            this.classes = res.data;
          }
        })
      }
    },
    save() {
      this.$refs.ruleForm.validate()
      .then(() =>{
        const userEnterSchoolTime = Date.now();
        const { userName, userAccount, userEmail, userPassword, userGender, userClassId, userBirthplaceId } = this.formData;
        this.isLoading = true;
        
        return service.register({ userName, userAccount, userEmail, userPassword, userGender, userClassId, userBirthplaceId, userEnterSchoolTime });
      })
      .then(res => {
        if (res.result) {
          this.$router.push('/login');
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
      .then(() => { this.isLoading = false });
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