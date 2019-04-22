import api from '../index.js'

export default {
  name: 'Student API',
  // 获取个人信息（用户登陆后）
  getDetail() {
    return api.get('/user/user');
  },
}
