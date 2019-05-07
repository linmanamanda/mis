import api from '../index.js'

export default {
  name: 'Homework API',
  // 获取未完成作业的课程列表
  getHomeworks() {
    return api.get('/work/course');
  },
  uploadHomeworks(params) {
    return api.post('/file/upload', params);
  },
  // 提交作业（不含文件上传）（用户登陆后）
  postHomeworks(params) {
    return api.post('/work/work', params);
  },
}
