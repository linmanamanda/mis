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
  getHomeworkURL(courseId, userId) {
    return api.get(`/work/url/${courseId}/${userId}`);
  },
  downloadScore() {
    return api.get(`/file/scoreExcel`);
  },
  downloadFile(params) {
    return api.post(`/file/download`, params, {
      responseType: 'blob',
    });
  },
}
