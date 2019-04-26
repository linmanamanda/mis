import api from '../index.js'

export default {
  name: 'Register API',
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
  // 用户注册
  register(params) {
    return api.post('/user/user', params);
  },
}
