import { getCookie, setCookie } from '@/helpers/Helpers';
import { BASE_URL } from '@/lib/getEnvs';
import axios, { AxiosError } from 'axios';

const isTokenRequired = (url?: string) => {
  if (!url) return false;
  // Example: skip login or public endpoints
  return !url.includes('/login') && !url.includes('/public');
};

const jsonApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

jsonApi.interceptors.request.use(
  (config: any) => {
    const token = getCookie('aAcc');

    if (isTokenRequired(config.url) && token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

//Response interceptor
jsonApi.interceptors.response.use(
  (response) => {
    if (response.config.url?.includes('/login')) {
      const { access_token, expires_at, user } = response.data.data;

      if (access_token) {
        setCookie('aAcc', access_token, { expires: 1 / 24 });
        setCookie('user', JSON.stringify(user), { expires: 1 / 24 });
        setCookie('aExp', expires_at, { expires: 1 / 24 });
      }
    }

    return response;
  },
  (error) => {
    console.error('API Error:', error?.response || error);
    return Promise.reject(error);
  }
);
export default jsonApi;
