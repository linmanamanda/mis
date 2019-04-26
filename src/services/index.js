import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://62.234.57.192:8080/laboratory/',
  timeout: 10000,
});

// 拦截器
instance.interceptors.response.use(res => {
  return res.data;
});

export default instance;

