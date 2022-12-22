import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

const axiosClient = axios.create({
  baseURL,
});

export default axiosClient;
