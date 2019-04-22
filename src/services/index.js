import axios from 'axios';

const instance = axios.create({
  baseURL: '127.0.0.1/v1',
  timeout: 10000,
});

export default instance;

