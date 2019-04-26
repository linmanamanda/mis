import api from '../index.js'

export default {
  name: 'Login API',
  // 用户登录
  login(params) {
    return api.post('/user/login', params);
  },
}
