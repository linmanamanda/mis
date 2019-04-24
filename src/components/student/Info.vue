<template>
  <el-form label-position="right">
    <el-form-item label="名字">
      <el-input v-model="userName"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-input v-model="userGender"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  import service from '../../services/login/index';
  
  export default {
    name: 'Info',
    data() {
      return {
        userClassName: "1502",
        userCollegeName: "计算机科学与技术学院",
        userBirthplace: "安徽省",
        userMajorName: "智能科学与技术",
        userAccount: "xs173657",
        userGender: "男",
        userEmail: "qwer@xx.com",
        userEnterSchoolTime: "21198121164518",
        userName: "小王",
        userPhotoUrl: "xxxxxx"
      }
    },
    methods: {
      login() {
        service.login({ userAccount: this.userAccount, userPassword: this.userPassword })
        .then(res => {
          if (res.result) {

          } else {

          }
        })
        .catch(err => {
          this.$message(err.message)
        })
      },
      // 找回密码
      navigatePassword() {
        this.$router.push('/login/password')
      },
      // 注册
      navigateRegister() {
        this.$router.push('/login/register')
      },
    }
  }  
</script>

<style scoped>
.login {
  position: absolute;
  left: 0;
  right: 0;
  width: 400px;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
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