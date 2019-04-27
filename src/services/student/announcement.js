import api from '../index.js'

export default {
  name: 'Announcement API',
  // 获取公告列表
  getAnnouncement() {
    return api.get('/notice/notice');
  },
}
