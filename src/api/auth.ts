/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { CredentialResponse } from '@react-oauth/google';
import { GetRequest, PostRequest, PutRequest } from '../plugins/https';
import { ILoginUser, IUpdatePassword, IUserEmail } from '../utils/interfaces/LoginUser.interface';
import { SignUpValues } from '../utils/interfaces/SignUpValues';

export const APIAuthenticateUser = (data: ILoginUser) => {
  return PostRequest('login', {
    email: data.email,
    password: data.password,
  });
};

export const APIAuthenticateGoogleSignin = (
  credentialResponse: CredentialResponse,
  register?: string,
) => {
  const path = register
    ? `users/google-authentication?register=${register}`
    : `users/google-authentication`;
  {
    return PostRequest(path, {
      token: credentialResponse.credential,
    });
  }
};

export const APIRegisterUser = (userDetails: SignUpValues) => {
  return PostRequest('users/register/student', userDetails);
};

export const APIForgetPassword = (data: IUserEmail) => {
  return PutRequest('users/forget-password', data);
};

export const APIVerifyEmail = (data: { access_token: string }) => {
  return PostRequest('verify-email', data);
};

export const APIUpdatePassword = (data: IUpdatePassword) => {
  return PutRequest('update-password', data);
};

export const APIGetUserProfile = () => {
  return GetRequest(`users/profile`);
};
