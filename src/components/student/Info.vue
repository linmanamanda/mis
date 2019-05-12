<template>
  <el-tabs v-model="tabIndex" @tab-click="tabSwitch" id="student_info">
    <el-tab-pane label="查看" name="detail">
      <el-form label-width="80px" label-position="left">
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号">
              <span>{{ renderData.userAccount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名">
              <span>{{ renderData.userName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <span>{{ renderData.userGender }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯">
              <span>{{ renderData.userBirthplace }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <span>{{ renderData.userEmail }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级">
              <span>{{ renderData.userCollegeName }} / {{ renderData.userMajorName }} / {{ renderData.userClassName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入学时间">
              <span>{{ renderData.userEnterSchoolTime | timestampTransfer }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="编辑" name="edition">
      <el-form :model="formData" :rules="rules" label-width="80px" label-position="left" ref="ruleForm" status-icon>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号">
              <el-input v-model="formData.userAccount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="formData.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="userGender">
              <el-select v-model="formData.userGender">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="籍贯" prop="userBirthplaceId">
              <el-select v-model="formData.userBirthplaceId">
                <el-option v-for="item in birthPlace" :key="item.birthplaceId" :label="item.birthplaceName" :value="item.birthplaceId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="userEmail">
              <el-input v-model="formData.userEmail"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班级" prop="userClassId">
              <el-select v-model="formData.userCollegeId" placeholder="学院" @change="fetchMajor">
                <el-option v-for="item in college" :key="item.collegeId" :label="item.collegeName" :value="item.collegeId"></el-option>
              </el-select>
              <el-select v-model="formData.userMajorId" placeholder="专业" @change="fetchClass" style="margin-left: 12px;">
                <el-option v-for="item in major" :key="item.majorId" :label="item.majorName" :value="item.majorId"></el-option>
              </el-select>
              <el-select v-model="formData.userClassId" placeholder="班级" style="margin-left: 12px;">
                <el-option v-for="item in classes" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入学时间" prop="userEnterSchoolTime">
              <el-date-picker
                v-model="formData.userEnterSchoolTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                style="margin-right: 16px;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        userCollegeName: '', 
        userMajorName: '', 
        userClassName: '',
        userEnterSchoolTime: '',
      },
      formData: {
        userName: '',
        userAccount: '',
        userGender: '',
        userEmail: '',
        userBirthplaceId: '',
        userCollegeId: '',
        userMajorId: '',
        userClassId: '',
        userEnterSchoolTime: '',
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
        userEnterSchoolTime: [
          { required: true, message: '请选择入学时间', trigger: 'blur' },
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
    this.renderClass();
  },
  methods: {
    fetchDetail() {
      return service.getDetail()
      .then(res => {
        if (res.result) {
          this.renderData = res.data;
        }
      })
    },
    renderClass() {
      return service.getCollege()
      .then(res => {
        if (res.result) {
          this.college = res.data;
          const { userCollegeId } = this.renderData
          return service.getMajor(userCollegeId)
          .then(res => {
            if (res.result) {
              this.major = res.data;
              const { userMajorId } = this.renderData
              return service.getClass(userMajorId)
              .then(res => {
                if (res.result) {
                  this.classes = res.data;
                }
              })
            }
          })
        }
      })
    },
    tabSwitch() {
      if (this.tabIndex === 'edition') {
        this.renderEdition();
      }
    },
    renderEdition() {
      const { userAccount, userName, userGender, userEmail, userEnterSchoolTime, userCollegeId, userMajorId, userClassId, userBirthplaceId  } = this.renderData;

      this.formData = {
        userName,
        userAccount,
        userGender: userGender === '男' ? '0' : '1',
        userEmail,
        userBirthplaceId,
        userCollegeId,
        userMajorId,
        userClassId,
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
    fetchCollege() {
      return service.getCollege()
      .then(res => {
        if (res.result) {
          this.college = res.data;
        }
      })
    },
    fetchMajor() {
      const { userCollegeId } = this.formData
      this.major = [];
      this.formData.userMajorId = '';
      this.classes = [];
      this.formData.userClassId = '';

      if (userCollegeId) {
        return service.getMajor(userCollegeId)
        .then(res => {
          if (res.result) {
            this.major = res.data;
          }
        })
      }

    },
    fetchClass() {
      const { userMajorId } = this.formData
      this.classes = [];
      this.formData.userClassId = '';

      if (userMajorId) {
        return service.getClass(userMajorId)
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
        const { userName, userEmail, userGender, userClassId, userBirthplaceId, userEnterSchoolTime } = this.formData;
        
        return service.updateDetail({ userName, userEmail, userGender, userClassId, userBirthplaceId, userEnterSchoolTime });
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
  .el-input {
    width: 90%;
  }

  .el-select {
    width: 30%;
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