import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: '/api',
  timeout: 100000,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message =
      (error.response?.data as any)?.error ||
      (error.response?.data as any)?.message ||
      error.message ||
      'Request failed';

    return Promise.reject(new Error(message));
  }
);
