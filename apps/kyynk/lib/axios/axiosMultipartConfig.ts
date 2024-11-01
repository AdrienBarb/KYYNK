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

const axiosInstanceMultipartForm = axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstanceMultipartForm.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorStatus = error?.response?.status;

    if (errorStatus === 404) {
      if (isServer) {
        redirect('/404');
      } else {
        store.dispatch(setStatusCode(errorStatus));
      }

      return Promise.reject(error.response?.data || 'not_found');
    }

    if (errorStatus >= 500) {
      let message = error.response?.data || 'server_error';
      if (isServer) {
        redirect('/500');
      } else {
        store.dispatch(setToastError(message));
        store.dispatch(setStatusCode(errorStatus));
      }
      return Promise.reject(message);
    }

    if (errorStatus === 400) {
      let message = error.response?.data || 'bad_request';

      if (isServer) {
        redirect('/500');
      } else {
        store.dispatch(setToastError(message));
        store.dispatch(setStatusCode(errorStatus));
      }

      return Promise.reject(message);
    }

    if (errorStatus === 401) {
      let message = error.response?.data || 'need_login';
      if (isServer) {
        redirect('/401');
      } else {
        store.dispatch(setStatusCode(errorStatus));
        store.dispatch(setToastError(message));
      }
      return Promise.reject(message);
    }

    return Promise.reject(error.response?.data || 'Something went wrong');
  },
);

axiosInstanceMultipartForm.interceptors.request.use(async (config) => {
  let session;

  if (isServer) {
    session = await auth();
  } else {
    session = await getSession();
  }

  if (session?.user?.accessToken) {
    config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
  }

  return config;
});

export default axiosInstanceMultipartForm;
