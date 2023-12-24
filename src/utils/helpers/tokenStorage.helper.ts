/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export const saveToken = (val: string) => {
  localStorage.setItem('access_token', val);
};
export const getToken = () =>
  localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

export const clearStorage = () => localStorage.clear();

export const removeTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.clear();
};

export const saveTokens = ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
};

export const saveUser = (val: string) => localStorage.setItem('user', JSON.stringify(val));
export const getUser = () =>
  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : null;
