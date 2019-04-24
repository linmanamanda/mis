import api from '../index.js'

export default {
  name: 'Course API',
  // 获取学生课表（用户登陆后）
  getCourseXS() {
    return api.get('/course/schedule/xs');
  },
  // 获取老师课表（用户登录后）
  getCourseLS() {
    return api.get('/course/schedule/ls');
  },
  // 添加公告
  addAnnouncement(params) {
    return api.post(`/notice/notice`, params);
  },
}
