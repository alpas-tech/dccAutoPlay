// lib/axios.ts
import { getCookie } from '@/helpers/Helpers';
import { BASE_URL } from '@/lib/getEnvs';
import axios from 'axios';

const multipartApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Request interceptor
multipartApi.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor

export default multipartApi;
