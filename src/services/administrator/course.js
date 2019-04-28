import api from '../index.js'

export default {
  name: 'Course API',
  // 获取课表
  getCourse() {
    return api.get('/course/course');
  },
  // 老师信息列表
  getTeachers() {
    return api.get('/user/teacher');
  },
  // 获取实验室列表
  getLabs() {
    return api.get('/laboratory/laboratory');
  },
  // 获取所有学院信息
  getCollege() {
    return api.get('/class/college');
  },
  // 通过学院ID获取专业列表
  getMajor(collegeId) {
    return api.get(`/class/major/${collegeId}`);
  },
  // 通过专业ID获取班级列表
  getClass(majorId) {
    return api.get(`/class/class/${majorId}`);
  },
  // 添加课程
  addCourse(params) {
    return api.post('/course/course', params);
  },
}
