<template>
  <div class="password">
    <el-card shadow="always" class="box-card">
      <div slot="header" class="clearfix">
        <span>找回密码</span>
      </div>
      <el-form :model="formData" :rules="rules" label-width="80px" label-position="left" ref="ruleForm" status-icon>
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="formData.userAccount"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="formData.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="userPassword">
          <el-input v-model="formData.userPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userPasswordAgain">
          <el-input v-model="formData.userPasswordAgain" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="save">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import service from '../../services/login/password';

export default {
  name: 'Password',
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        if (this.formData.userPasswordAgain) {
          this.$refs.ruleForm.validateField('userPasswordAgain');
        }
        callback();
      }
    };
    var validatePassAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.userPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      formData: {
        userAccount: '',
        userEmail: '',
        userPassword: '',
        userPasswordAgain: '',
      },
      rules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        userPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        userPasswordAgain: [
          { required: true, validator: validatePassAgain, trigger: 'blur' }
        ],
      },
      isLoading: false,
    }
  },
  methods: {
    save() {
      this.$refs.ruleForm.validate()
      .then(() =>{
        const { userAccount, userEmail, userPassword } = this.formData;
        this.isLoading = true;
        
        return service.password({ userAccount, userEmail, userPassword })
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
    height: 400px;
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

  .box-card {
    width: 480px;
  }
</style>