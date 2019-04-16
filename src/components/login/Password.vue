<template>
  <div class="password">
    <el-row>
      <el-col :span="18" :offset="6">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>找回密码</span>
          </div>
          <el-form label-width="80px" label-position="left" ref="ruleForm" status-icon :rules="rules">
            <el-form-item label="账号" >
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="rules.pass">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rules.checkPass">
              <el-input v-model="form.checkPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Password',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.checkPassword !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          name: '',
          email: '',
          password: '',
          checkPassword: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      
    }
  }  
</script>

<style scoped>
  .password {
    margin-top: 160px;
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