import { error } from 'console';
/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import baseAxios from '../../../plugins/axios';
import { SET_AUTH_DATA, SET_TOKEN, SET_USER_PROFILE } from './actionTypes';
import {
  APIAuthenticateGoogleSignin,
  APIAuthenticateUser,
  APIForgetPassword,
  APIGetUserProfile,
  APIRegisterUser,
  APIUpdatePassword,
} from '../../../api/auth';
import { getToken, saveTokens } from '../../../utils/helpers/tokenStorage.helper';
import {
  ILoginUser,
  IUpdatePassword,
  IUserEmail,
} from '../../../utils/interfaces/LoginUser.interface';
import { SignUpValues } from '../../../utils/interfaces/SignUpValues';
import { errorNotification } from '../../../utils/helpers/notifications';
import { CredentialResponse } from '@react-oauth/google';
import { APIGetTeacherProfile } from '../../../api/users';

interface ILoginResponse {
  authentication: any;
  data: any;
  message: string;
  status: string;
  statusCode: number;
}

const setAuthorizationHeader = (token: string) => {
  baseAxios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
};

const deleteAuthorizationHeader = () => {
  delete baseAxios.defaults.headers.common.Authorization;
};

export const setAuthData = (data: any) => {
  return {
    type: SET_AUTH_DATA,
    payload: data,
  };
};

export const setUserProfile = (data: any) => {
  return {
    type: SET_USER_PROFILE,
    payload: data,
  };
};

export const authenticateUser = (user: ILoginUser) => async (dispatch: any) => {
  try {
    const res: any = await APIAuthenticateUser(user);
    if (res) {
      saveTokenAndId(res.data);
      dispatch(setUserProfile(res.data.userProfile));
    }

    return res;
  } catch (error: any) {
    throw new Error(error?.toString());
  }
};

export const authenticateGoogleSignin =
  (user: CredentialResponse, register?: string) => async (dispatch: any) => {
    try {
      const res = await APIAuthenticateGoogleSignin(user, register);
      if (res) {
        saveTokenAndId(res.data);
        dispatch(setUserProfile(res.data.userProfile));
      }
      return res;
    } catch (error) {
      throw new Error(error?.toString());
    }
  };

export const setLoginCredential = (response: any) => {
  const access_token = response.data.access_token;
  const refresh_token = response.data.refresh_token;
  saveTokens({ access_token, refresh_token });
  localStorage.setItem('user_id', response.data.userProfile._id);
  setAuthorizationHeader(response.data.access_token);
};

export const getUserProfile = () => async (dispatch: any) => {
  const token = getToken();
  if (token) {
    try {
      const response: any = await APIGetUserProfile();
      if (response && response.name === 'AxiosError') {
        throw new Error('Error');
      }
      if (response) {
        dispatch(setUserProfile(response.data));
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }
};

export const getTeacherProfile = (id: string) => async (dispatch: any) => {
  try {
    const response: any = await APIGetTeacherProfile(id);
    if (response) {
      dispatch(setUserProfile(response.data));
    }
  } catch (error) {
    console.log(error, 'error');
  }
};

export const registerUser = (user: SignUpValues) => async (dispatch: any) => {
  try {
    const response = await APIRegisterUser(user);
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};

export const forgetPassword = (data: IUserEmail) => {
  const res = APIForgetPassword(data);
};

export const updatePassword = (data: IUpdatePassword) => {
  const res = APIUpdatePassword(data);
};

export const logoutUser = () => (dispatch: any) => {
  localStorage.clear();
  deleteAuthorizationHeader();
  dispatch(setToken(null));
  dispatch(setUserProfile({}));
};

export const setToken = (token: string | null) => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const checkIfAuthenticated = () => (dispatch: any) => {
  const token: string | null = getToken() ?? null;
  dispatch(setToken(token));
};

//------------- helper function
const saveTokenAndId = (data: any) => {
  const access_token = data.access_token;
  const refresh_token = data.refresh_token;
  saveTokens({ access_token, refresh_token });
  localStorage.setItem('user_id', data.userProfile._id);
  localStorage.setItem('roles', data.userProfile.roles);
  setAuthorizationHeader(data.access_token);
};
