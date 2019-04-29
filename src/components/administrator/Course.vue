<template>
  <div class="Course">
    <div><el-button type="primary" style="margin-bottom: 16px;" @click="dialogFormVisible = true;">添加课程</el-button></div>

    <el-table
      :data="list"
      style="width: 100%">
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="时间">
              <div v-if="props.row.scheduleList.length == 0"><el-tag type="warning">待定</el-tag></div>
              <div v-for="item in props.row.scheduleList">
                <span>开始时间：<el-tag style="width: 140px;">{{ item.beginTime | timestampTransfer }}</el-tag></span>
                <span style="margin-left: 16px;">结束时间：<el-tag style="width: 140px;">{{ item.endTime | timestampTransfer }}</el-tag></span>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="courseName">
      </el-table-column>
      <el-table-column
        label="教师"
        prop="courseTeacherName">
      </el-table-column>
      <el-table-column
        label="实验室"
        prop="courseLaboratoryName">
      </el-table-column>
      <el-table-column
        label="实验室编号"
        prop="courseLaboratoryNumber">
      </el-table-column>
    </el-table>

    <el-dialog title="添加课程" :visible.sync="dialogFormVisible">
      <el-form label-position="top">
        <el-form-item label="课程名称">
          <el-input v-model="courseForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="老师">
          <el-select v-model="courseForm.courseUserId">
            <el-option v-for="item in teacherList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实验室">
          <el-select v-model="courseForm.courseLaboratoryId">
            <el-option v-for="item in labList" :key="item.laboratoryId" :label="item.laboratoryName + item.laboratoryNumber" :value="item.laboratoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <div v-for="(courseItem, courseIndex) in courseForm.courseClassList" style="margin-bottom: 8px;">
            <el-select v-model="courseItem.collegeId" placeholder="学院" @change="fetchMajor(courseItem, courseIndex)">
              <el-option v-for="item in college" :key="item.collegeId" :label="item.collegeName" :value="item.collegeId"></el-option>
            </el-select>
            <el-select v-model="courseItem.majorId" placeholder="专业" @change="fetchClass(courseItem, courseIndex)" style="margin-left: 12px;">
              <el-option v-for="item in major" :key="item.majorId" :label="item.majorName" :value="item.majorId"></el-option>
            </el-select>
            <el-select v-model="courseItem.classId" placeholder="班级" style="margin-left: 12px;">
              <el-option v-for="item in classes" :key="item.classId" :label="item.className" :value="item.classId"></el-option>
            </el-select>
            <el-button v-if="courseIndex == courseForm.courseClassList.length - 1" @click="addCourseItem" style="margin-left: 8px;">新增班级</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="addCourse">确定</el-button>
        
      </div>
    </el-dialog>
  </div>  
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import service from '../../services/administrator/course';

export default {
  data() {
    return {
      list: [
        {
            "collegeNames": [
                "计算机科学与技术学院",
                "计算机科学与技术学院",
                "计算机科学与技术学院",
                "自动化学院",
                "自动化学院"
            ],
            "courseName": "《大学物理上》",
            "courseTeacherName": "王老师",
            "courseLaboratoryName": "信息安全实验室02",
            "courseLaboratoryNumber": "S022",
            "classNames": [
                "1501",
                "1502",
                "1502",
                "1502",
                "1503"
            ],
            "majorNames": [
                "计算机科学与技术",
                "智能科学与技术",
                "空间信息与数字技术",
                "自动化",
                "测控技术与仪器"
            ],
            "courseId": 1
        },
      ],
      teacherList: [],
      labList: [],
      dialogFormVisible: false,
      courseForm: {
        courseName: '',
        courseUserId: '',
        courseLaboratoryId: '',
        courseClassList: [
          {
            collegeId: '',
            majorId: '',
            classId: '',
          }
        ],
      },
      college: [],
      major: [],
      classes: [],
    }
  },
  mounted() {
    this.fetchList();
    this.fetchTeacherList();
    this.fetchLabList();
    this.fetchCollege();
  },
  methods: {
    fetchList() {
      return service.getCourse()
      .then(res => {
        if (res.result) {
          const list = res.data;
          list.forEach(item => {
            const courseClassNames = [];

            for (let i = 0; i < item.collegeNames.length; i++) {
              courseClassNames.push(item.collegeNames[i] + item.majorNames[i] + item.classNames[i]);
            }

            item.courseClassNames = courseClassNames;
          });

          this.list = list;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
    },
    fetchTeacherList() {
      return service.getTeachers()
      .then(res => {
        if (res.result) {
          this.teacherList = res.data;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
    },
    fetchLabList() {
      return service.getLabs()
      .then(res => {
        if (res.result) {
          this.labList = res.data;
        } else {
          this.$message({ message: res.msg, type: 'error' });
        }
      })
      .catch(err => { console.log(err) })
    },
    fetchCollege() {
      return service.getCollege()
      .then(res => {
        if (res.result) {
          this.college = res.data;
        }
      })
    },
    fetchMajor(item, index) {
      this.major = [];
      item.majorId = '';
      this.classes = [];
      item.classId = '';

      if (item.collegeId) {
        return service.getMajor(item.collegeId)
        .then(res => {
          if (res.result) {
            this.major = res.data;
          }
        })
      }

    },
    fetchClass(item, index) {
      this.classes = [];
      item.classId = '';

      if (item.majorId) {
        return service.getClass(item.majorId)
        .then(res => {
          if (res.result) {
            this.classes = res.data;
          }
        })
      }
    },
    addCourseItem() {
      this.major = [];
      this.classes = [];
      this.courseForm.courseClassList.push(
        {
          collegeId: '',
          majorId: '',
          classId: '',
        }
      );
    },
    addCourse() {
      const { courseName, courseUserId, courseLaboratoryId, courseClassList } = this.courseForm;
      const courseClassIdList = courseClassList.map(item => { return item.classId });

      return service.addCourse({ courseName, courseUserId, courseLaboratoryId, courseClassIdList })
      .then(res => {
        if (res.result) {
          this.dialogFormVisible = false;
          this.$message({ message: '添加成功', type: 'success' });
        }
      })
    },
  },
}
</script>