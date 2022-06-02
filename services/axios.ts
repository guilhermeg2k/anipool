import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export let api = axios.create({
  baseURL: `${API_URL}/api`,
});

export const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

export default api;