import axios from 'axios';
import {
  AUTH_TOKEN_KEY,
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from './storage-manager';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  const authToken = getStorageItem(AUTH_TOKEN_KEY);
  if (authToken) {
    request.headers['Authorization'] = `Bearer ${authToken}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response.data, // success handler
  async (request) => {
    // error handler
    const requestConfig = request.config;

    if (!requestConfig || !request.response) {
      return Promise.reject('Something went wrong');
    }

    if (request.response.status === 401) {
      if (
        requestConfig.url == '/auth/refresh' ||
        requestConfig.url === '/auth/login'
      ) {
        removeStorageItem(AUTH_TOKEN_KEY);
      } else {
        const response = await axiosInstance.post('/auth/refresh');
        setStorageItem(AUTH_TOKEN_KEY, response.data.accessToken);
        return axiosInstance(requestConfig);
      }
    }

    const error = {
      ...(request?.response?.data?.error || {}),
      message: request?.response?.data?.error.message || 'Something went wrong',
    };
    return Promise.reject(error);
  }
);

export default axiosInstance;
