<template>
  <el-card shadow="always" class="box-card">
    <div slot="header" style="text-align: center; font-size: 24px;">
      <span>实验室管理系统</span>
    </div>
    <el-form :model="formData" :rules="rules" label-width="80px" label-position="left" ref="ruleForm" status-icon>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="formData.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="formData.userPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="primary" @click="login" style="width: 100%;">登录</el-button>
      </el-form-item>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="text" @click="navigatePassword">找回密码</el-button>
        <el-button type="text" @click="navigateRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import service from '../../services/login/index';

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        userAccount: '',
        userPassword: '',
      },
      rules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    login() {
      const { userAccount, userPassword } = this.formData;
      console.log(userAccount)
      
      this.$refs.ruleForm.validate()
      .then(() => {
        return service.login({ userAccount, userPassword });
      })
      .then(res => {
        if (res.result) {
          const role = userAccount.substr(0, 2);
          if (role === 'xs') {
            this.$router.push('/student/score');
          } else if (role === 'ls') {
            this.$router.push('/professor/info');
          } else {
            this.$router.push('/student/info');
          }

        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
      .then(() => { this.isLoading = false });
    },
    // 找回密码
    navigatePassword() {
      this.$router.push('/password')
    },
    // 注册
    navigateRegister() {
      this.$router.push('/register')
    },
  }
}  
</script>

<style scoped>
.el-card {
  width: 600px;
  height: 340px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 140px auto auto auto;
}

.title {
  margin: 0px auto 40px auto;
  font-size: 26px;
  text-align: center;
  font-weight: bold;
}

.input-group {
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding-left: 15px;
  margin-bottom: 22px;
  color: #454545;
  font-size: 14px;
}

.iconfont {
  font-size: 18px;
  color: #889aa4;
}

input {
  flex: 1;
  padding: 12px 15px;
  background-color: transparent;
  outline: none;
  border: none;
  color: #fff;
  font-size: 14px;
}
input::-webkit-input-placeholder {
  color: #889aa4 ;
}
</style>