import api from '../index.js'

export default {
  name: 'Administrator API',
  // 学生信息列表
  getStudents() {
    return api.get('/user/student');
  },
  // 设置用户为老师
  setTeacher(userId) {
    return api.put(`/user/teacher/account/${userId}`);
  },
  // 删除用户
  deleteStudent(userId) {
    return api.delete(`/user/user/${userId}`);
  },
}
