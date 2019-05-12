import api from '../index.js'

export default {
  name: 'Announcement API',
  // 获取公告列表
  getAnnouncement() {
    return api.get('/notice/notice');
  },
  // 删除公告
  deleteAnnouncement(noticeId) {
    return api.delete(`/notice/notice/${noticeId}`);
  },
  // 添加公告
  addAnnouncement(params) {
    return api.post(`/notice/notice`, params);
  },
  getAttachment(noticeId) {
    return api.get(`/file/notice/${noticeId}`);
  },
  downloadFile(params) {
    return api.post(`/file/download`, params, {
      responseType: 'blob',
    });
  },
}
