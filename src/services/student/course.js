import api from '../index.js'

export default {
  name: 'Course API',
  // 获取学生课表（用户登陆后）
  getCourse() {
    return api.get('/course/schedule/xs');
  },
}
