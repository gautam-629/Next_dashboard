/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest } from '../plugins/https';

export const APICreateTeacher = (data: any) => {
  return PostRequest('/users/register/teacher', data);
};
export const APICreateStudent = (data: any) => {
  return PostRequest('/users/register/student', data);
};

export const APIResendEmail = (data: any) => {
  return PostRequest('/resend-email', data);
};

export const APIGetTeacherProfile = (id: string) => {
  return GetRequest(`/users/teacher-detail/${id}`);
};

export const APIGetFeaturedTeacher = () => {
  return GetRequest('/users/tutors');
};
