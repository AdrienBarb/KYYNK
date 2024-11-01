import axios from 'axios';
import { store } from '../../store/store';
import {
  setToastError,
  setStatusCode,
} from '../../features/error-handling/errorHandlingSlice';
import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('🚀 ~ error:', error);
    const errorStatus = error?.response?.status;

    if (errorStatus === 404) {
      if (isServer) {
        redirect('/404');
      } else {
        store.dispatch(setStatusCode(errorStatus));
      }

      return Promise.reject(error.response?.data?.message || 'not_found');
    }

    if (errorStatus >= 500) {
      let message = error.response?.data?.message || 'server_error';
      if (isServer) {
        redirect('/500');
      } else {
        store.dispatch(setToastError(message));
        store.dispatch(setStatusCode(errorStatus));
      }
      return Promise.reject(message);
    }

    if (errorStatus === 400) {
      let message = error.response?.data?.message || 'bad_request';

      if (isServer) {
        redirect('/500');
      } else {
        store.dispatch(setToastError(message));
        store.dispatch(setStatusCode(errorStatus));
      }

      return Promise.reject(message);
    }

    if (errorStatus === 401) {
      let message = error.response?.data?.message || 'need_login';
      if (isServer) {
        redirect('/401');
      } else {
        store.dispatch(setStatusCode(errorStatus));
        store.dispatch(setToastError(message));
      }
      return Promise.reject(message);
    }

    return Promise.reject(
      error.response?.data?.message || 'Something went wrong',
    );
  },
);

axiosInstance.interceptors.request.use(async (config) => {
  let session;

  if (isServer) {
    session = await auth();
  } else {
    session = await getSession();
  }

  if (session?.user?.accessToken) {
    config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

export default axiosInstance;
