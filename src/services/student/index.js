import api from '../index.js'

export default {
  name: 'Student API',
  // 获取个人信息（用户登陆后）
  getDetail() {
    return api.get('/user/user');
  },
  // 修改个人信息（用户登陆后）
  updateDetail(params) {
    return api.put('/user/user', params);
  },
  // 获取所有籍贯列表
  getBirthPlace() {
    return api.get('/birthplace/birthplace');
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
}
