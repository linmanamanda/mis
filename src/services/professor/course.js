import api from '../index.js'

export default {
  name: 'Course API',
  // 获取老师课表（用户登录后）
  getCourse() {
    return api.get('/course/schedule/ls');
  },
}
