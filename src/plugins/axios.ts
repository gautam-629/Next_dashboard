/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../config/baseURL';
import { logoutUser, setUserProfile } from '../store/modules/auth/actions';
import { store } from '../store/store';
import { errorNotification } from './notification';
import { redirect } from 'react-router-dom';
import { removeTokens, saveTokens } from '../utils/helpers/tokenStorage.helper';
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = localStorage.getItem('access_token');
  if (config.headers) {
    config.headers['Authorization'] = `Bearer ${access_token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): any => {
  return {
    data: response.data.data,
    status: response.status,
  };
};

const onResponseError = async (error: any): Promise<AxiosError> => {
  if (error.response.data?.messageCode === 'TOKEN_EXPIRED') {
    const storedToken = localStorage.getItem('refresh_token');
    if (storedToken) {
      try {
        const res = await axios.post(
          `${BASE_URL}/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );
        const access_token = res.data.data.access_token;
        const refresh_token = res.data.data.refresh_token;

        saveTokens({ access_token, refresh_token });
        const userProfile = res?.data?.data?.userProfile ?? {};
        if (Object.keys(userProfile).length > 0 && !Object.is(userProfile, {})) {
          store.dispatch(setUserProfile(userProfile));
        }
        location.reload();
        return error;
      } catch (error) {
        removeTokens();
        store.dispatch(logoutUser());
        redirect('/');
        return Promise.reject(error);
      }
    }
  }

  const errorVal = error?.response?.data?.error;
  //
  // if ([403, 401].includes(error?.response?.status)) {
  //   store.dispatch(logoutUser());
  //
  //   redirect('/');
  // } else {
  //   // errorNotification({
  //   //   title: errorVal?.name ?? 'Error',
  //   //   message: errorVal?.message ?? 'Action could not be completed',
  //   // });
  // }
  return Promise.reject(error?.response?.data?.message);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

const baseAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const baseApi = setupInterceptorsTo(baseAxios);

export default baseApi;
