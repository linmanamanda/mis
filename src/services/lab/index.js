import api from '../index.js'

export default {
  name: 'Lab API',
  // 获取实验室列表
  getLabs() {
    return api.get('/laboratory/laboratory');
  },
  // 预约实验室
  reserveLab(params) {
    return api.post('/laboratory/reservation', params);
  },
}
