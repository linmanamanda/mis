<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" :inline="true" class="demo-table-expand">
          <el-form-item label="作业下载">
            <a href="">{{ props.row.name }}</a>
          </el-form-item>
          <el-form-item label="平时成绩">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期末成绩">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="float: right;">
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="desc">
    </el-table-column>
    <el-table-column
      label="分数"
      prop="desc">
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'GradeDetail',
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    /*width: 90px;*/
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
</style>

