/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest, PutRequest, DeleteRequest } from '../plugins/https';
import { STATUS } from '../utils/enum/status.enum';
import { ISection } from '../utils/interfaces/Course.model';
import { Enquiry } from '../utils/interfaces/Enquiry';

const BASE_URL = `courses`;

export const APIGetAllCourses = () => {
  const skip = 1;
  const limit = 6;
  return GetRequest(`${BASE_URL}/all?page=${skip}&limit=${limit}`);
};

export const APIGetPublishCourses = () => {
  return GetRequest(`${BASE_URL}/all`);
};
export const APICourseCreate = (data: any) => {
  return PostRequest(`${BASE_URL}/create-course`, data);
};

export const APIUpdateCourse = (courseData: any) => {
  const { course, teacher, updatedAt, publishedAt, __v, ...formValues } = courseData;

  return PutRequest(`${BASE_URL}/update/${course}/introduction`, formValues);
};

export const APICoursePlanning = (courseData: any) => {
  const { course, values, ...formValues } = courseData;

  return PutRequest(`${BASE_URL}/update/${course}/plan`, { sections: values.sections });
};
export const APICoursePricing = (courseData: any) => {
  const { course, teacher, updatedAt, publishedAt, __v, ...formValues } = courseData;

  return PutRequest(`${BASE_URL}/update/${course}/requirement-details`, formValues);
};
export const APICourseMessage = (courseData: any) => {
  const { course, teacher, updatedAt, publishedAt, __v, ...formValues } = courseData;

  return PutRequest(`${BASE_URL}/update/${course}/message`, formValues);
};

export const APIOnBoarding = (onBoardData: any) => {
  const { _id, teacher, updatedAt, publishedAt, __v, ...formValues } = onBoardData;

  return PutRequest(`drafts/update-course/${_id}`, formValues);
};
export const APIGetMyCourseById = async (draftId: string) => {
  return GetRequest(`/${BASE_URL}/${draftId}`);
};

export const APIGetMyDraftById = async (draftId: string) => {
  return GetRequest(`/${BASE_URL}/draft/${draftId}`);
};
export const APIGetCourseById = async (course: string) => {
  return GetRequest(`${BASE_URL}/${course}`);
};

export const APIPublishCourse = (course: any) => {
  return GetRequest(`${BASE_URL}/publish/${course}`);
};

export const APIGetMyCourses = () => {
  return GetRequest(`${BASE_URL}/my-courses`);
};

export const APIGetAllCourseList = (page: number = 1, limit: number = 8, status: any) => {
  const courseStatus =
    status === 'all' ? '' : status === 'active' ? STATUS.PUBLISHED : STATUS.DRAFT;
  return GetRequest(`${BASE_URL}/my-courses?status=${courseStatus}&page=${page}&limit=${limit}`);
};
export const APIGetAllCourseListFirst = (page: number = 1, limit: number = 4) => {
  return GetRequest(`${BASE_URL}/list?status=${status}&page=${page}&limit=${limit}`);
};

export const APIUpdateCourseStatus = (courseId: string, status: string) => {
  return PutRequest(`${BASE_URL}/update/${courseId}?status=${status}`);
};

export const APIDeleteUnpublishedCourse = (courseId: string) => {
  return DeleteRequest(`${BASE_URL}/remove-course/${courseId}`);
};

export const APIGetSingleCourseDetails = (course: string) => {
  return GetRequest(`/courses/${course}`);
};

export const APIPostCourseDetails = (course: any) => {
  return PostRequest('/topic', course);
};
export const APIPostCourseEnquiry = (data: Enquiry) => {
  return PostRequest(`/enquiry`, data);
};

export const APIDeleteTopic = (id: string) => {
  return DeleteRequest(`/topic/${id}`);
};

export const APIGetPopularCourses = () => {
  return GetRequest(`/courses/find-course?isPopular=true`);
};
