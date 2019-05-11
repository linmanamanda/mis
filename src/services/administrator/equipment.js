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
  addEquipment(params) {
    return api.post(`/device/device`, params);
  },
  // 删除设备
  deleteEquipment(deviceId) {
    return api.delete(`/device/device/${deviceId}`);
  },
  // 修改设备状态
  updateEquipments(deviceId, deviceStatus) {
    return api.put(`/device/deviceStatus/${deviceId}/${deviceStatus}`);
  },
  // 获取反馈列表
  getFeedback() {
    return api.get('/suggest/suggest');
  },
  // 删除反馈
  deleteFeedback(suggestId) {
    return api.delete(`/suggest/suggest/${suggestId}`);
  },
}
