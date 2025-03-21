import axios from 'axios';
import { redirect } from 'next/navigation';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorStatus = error?.response?.status;

    if (errorStatus === 404) {
      const message = error.response?.data?.message || 'Server error';

      if (isServer) {
        redirect('/404');
      }

      return Promise.reject(message);
    }

    if (errorStatus >= 500) {
      const message = error.response?.data?.message || 'Server error';
      if (isServer) {
        redirect('/500');
      }
      return Promise.reject(message);
    }

    if (errorStatus === 400) {
      const message = error.response?.data?.message || 'Bad request';

      if (isServer) {
        redirect('/500');
      }

      return Promise.reject(message);
    }

    if (errorStatus === 401) {
      const message = error.response?.data?.message || 'Need to login';
      if (isServer) {
        redirect('/401');
      }
      return Promise.reject(message);
    }

    return Promise.reject(
      error.response?.data?.message || 'Something went wrong',
    );
  },
);

axiosInstance.interceptors.request.use(async (config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const adminSecretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
  console.log(
    '🚀 ~ axiosInstance.interceptors.request.use ~ adminSecretKey:',
    adminSecretKey,
  );
  if (adminSecretKey) {
    config.headers['X-ADMIN-SECRET-KEY'] = adminSecretKey;
  }

  return config;
});

export default axiosInstance;
