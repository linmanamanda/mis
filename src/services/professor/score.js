import api from '../index.js'

export default {
  name: 'Score API',
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
