import api from '../index.js'

export default {
  name: 'Score API',
  // 获取老师课表（用户登录后）
  getCourse() {
    return api.get('/course/schedule/ls');
  },
  getScores(courseId) {
    return api.get(`/course/student/${courseId}`);
  },
  setScore(params) {
    return api.post(`/score/score`, params);
  },
  downloadScore() {
    return api.get(`/file/scoreExcel`);
  },
}
