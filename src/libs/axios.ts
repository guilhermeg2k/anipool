import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
});

export default axiosClient;
