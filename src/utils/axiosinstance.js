import axios from 'axios';
import { BASE_URl } from './constants';

const axiosInstance = axios.create({
  baseURL: BASE_URl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(config); // Return a resolved promise
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;