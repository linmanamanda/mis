import api from '../index.js'

export default {
  name: 'Lab API',
  // 获取实验室列表
  getLabs() {
    return api.get('/laboratory/laboratory');
  },
  // 通过实验室ID获取设备列表
  getEquipments(laboratoryId) {
    return api.get(`/device/device/${laboratoryId}`);
  },
  // 添加反馈（用户登录后）
  addFeedback(params) {
    return api.post('/suggest/suggest', params);
  },
  // 预约实验室
  reserveLab(params) {
    return api.post('/laboratory/reservation', params);
  },
}
