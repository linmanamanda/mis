import api from '../index.js'

export default {
  name: 'Score API',
  // 获取个人成绩列表
  getScores() {
    return api.get('/score/score');
  },
}
