import api from '../index.js'

export default {
  name: 'Administrator API',
  // 删除用户
  deleteProfessor(userId) {
    return api.delete(`/user/user/${userId}`);
  },
  // 老师信息列表
  getTeachers() {
    return api.get('/user/teacher');
  },
}
