/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import baseAxios from './axios';

export const GetRequest = (url = '', config: any = {}) => {
  return baseAxios.get(url, config);
};
export const PostRequest = (url = '', data = {}, config: any = {}) => {
  return baseAxios.post(url, data, config);
};

export const PutRequest = (url = '', config: any = {}) => {
  return baseAxios.put(url, config);
};

export const DeleteRequest = (url = '', config: any = {}) => {
  return baseAxios.delete(url, config);
};
