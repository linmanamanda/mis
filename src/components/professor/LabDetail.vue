<template>
  <el-form :model="formInline">
    <el-form-item label="实验室">
      <el-select v-model="form.lab" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申请时间">
      <el-date-picker
        v-model="form.time"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'GradeDetail',
  data() {
    return {
      form: {
        lab: '',
        time: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style>
  
</style>

