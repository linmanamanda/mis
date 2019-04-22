<template>
  <div class="password">
    <el-row>
      <el-col :span="18" :offset="6">
        <el-card shadow="always" class="box-card">
          <div slot="header" class="clearfix">
            <span>注册</span>
          </div>
          <el-form label-width="80px" label-position="left">
            <el-form-item label="姓名">
              <el-input v-model="userName"></el-input>
            </el-form-item>
            <el-form-item label="学号">
              <el-input v-model="userAccount"></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-select v-model="userBirthplaceId">
                <el-option v-for="item in birthplaces" :label="item.birthplaceName" :value="item.birthplaceId" :key="item.birthplaceId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userGender">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userEmail" type="password"></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="userClassId">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="userPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="userPasswordAgain" type="password"></el-input>
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
  import service from '../../services/login/index';

  export default {
    name: 'Register',
    data() {
      return {
        userName: '',
        userAccount: '',
        userPassword: '',
        userPasswordAgain: '',
        userGender: '',
        userEmail: '',
        userClassId: '',
        userBirthplaceId: '',
        userEnterSchoolTime: '',
        birthplaces: [
          {
            birthplaceName: "北京市",
            birthplaceId: 1
          },
        ]
      }
    },
    methods: {
      fetchBirthPlaces() {
        return service.getBirthPlace()
          .then(res => {
            if (res.result) {
              this.birthplaces = res.data;
            }
          })
      },
      submit() {

      },
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