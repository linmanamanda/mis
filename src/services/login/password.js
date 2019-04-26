import api from '../index.js'

export default {
  name: 'Password API',
  // 修改密码
  password(params) {
    return api.put('/user/user/password', params);
  },
}
