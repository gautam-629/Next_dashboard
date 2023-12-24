/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { SET_sections_DATA } from './actionTypes';
import {
  APICourseCreate,
  APICourseMessage,
  APICoursePlanning,
  APICoursePricing,
  APIUpdateCourse,
} from '../../../api/course';
import { errorNotification } from '../../../utils/helpers/notifications';

export const setsectionsData = (data: any) => {
  return {
    type: SET_sections_DATA,
    payload: data,
  };
};

export const createCourse = () => {
  return async (dispatch: any, getState: any) => {
    const stateData = getState();
    const response = await APICourseCreate(stateData.courseReducer.courseCreateData);
    localStorage.setItem('course', response.data.course);

    // ...
  };
};

export const createCourseUpdateCourse = (courseData: any) => {
  try {
    return async (dispatch: any, getState: any) => {
      const { isPublished, ...rest } = courseData;
      const response = await APIUpdateCourse(rest);
    };
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};
export const createCoursePlanning = (courseData: any) => {
  return async (dispatch: any, getState: any) => {
    const { isPublished, ...rest } = courseData;
    try {
      const response = await APICoursePlanning(rest);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};
export const createCoursePricing = (courseData: any) => {
  return async (dispatch: any, getState: any) => {
    const { isPublished, ...rest } = courseData;
    try {
      const response = await APICoursePricing(rest);
      localStorage.setItem('course', response.data.draftId);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};
export const createCourseMessage = (courseData: any) => {
  return async (dispatch: any, getState: any) => {
    const { isPublished, ...rest } = courseData;
    try {
      const response = await APICourseMessage(rest);
      localStorage.setItem('course', response.data.draftId);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};
