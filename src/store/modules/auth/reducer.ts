/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { LOGOUT_USER, SET_AUTH_DATA, SET_TOKEN, SET_USER_PROFILE } from './actionTypes';
import { getToken } from '../../../utils/helpers/tokenStorage.helper';
import { isAuthenticated } from '../../../utils/helpers/checkIfAuthenticated';

interface IAuthenticationState {
  authenticated: any;
  userProfile: any;
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: IAuthenticationState = {
  authenticated: {},
  userProfile: {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    roles: '',
    address: {
      city: '',
      country: '',
      district: '',
    },
  },
  isLoggedIn: isAuthenticated(),
  token: getToken(),
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user: action.payload.user,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: !!action.payload,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};
