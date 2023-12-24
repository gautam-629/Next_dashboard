/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  APIGetAllCourseList,
  APIGetAllCourses,
  APIGetCourseById,
  APIGetMyCourseById,
  APIGetMyCourses,
} from '../../../api/course';
import { APIGetPublishCourses } from '../../../api/course';
import { ICourse, INITIAL_COURSE } from '../../../utils/interfaces/Course.model';
import { SET_ALL_COURSES, SET_COURSE_CREATE_DATA, SET_MY_COURSES } from './actionTypes';
import { AnyAction, Dispatch } from 'redux';
import { CourseList } from './reducers';
import { errorNotification } from '../../../utils/helpers/notifications';
import { any } from 'prop-types';

export const setAllCourses = (courseList: CourseList) => {
  return {
    type: SET_ALL_COURSES,
    payload: courseList,
  };
};

export const setCourseData = (data: any) => {
  console.log('Insid actions.ts', data);
  return {
    type: SET_COURSE_CREATE_DATA,
    // type: any,
    payload: data,
  };
};

export const setMyCourses = (data: CourseList) => {
  return {
    type: SET_MY_COURSES,
    payload: data,
  };
};

export const getAllCourses = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res = await APIGetAllCourses();
    const allCourseList = {
      courses: res?.data?.results ?? [],
      count: res?.data?.count ?? 0,
    };
    if (res) {
      dispatch(setAllCourses(allCourseList));
    }
    return res;
  } catch (error: any) {
    //
  }
};

export const getMyCourses = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: any = await APIGetMyCourses();
    const myCourseList = {
      courses: res?.data?.results ?? [],
      count: res?.data?.count ?? 0,
    };
    if (res) {
      dispatch(setMyCourses(myCourseList));
    }
    return res;
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};

// export const getAllCourseList =
//   (page: any, limit: any) => async (dispatch: Dispatch<AnyAction>) => {
//     const res: any = await APIGetAllCourseList(page, limit);
//     const myCourseList = {
//       courses: res?.data?.results ?? [],
//       count: res?.data?.count ?? 0,
//     };
//     if (res) {
//       dispatch(setMyCourses(myCourseList));
//     }
//     return res;
//   };

export const getMyCourseById = (draftId: string) => {
  console.log('triggered action');
  return async (dispatch: Dispatch<AnyAction>) => {
    // dispatch(setCourseData(INITIAL_COURSE));
    try {
      const response = await APIGetMyCourseById(draftId);
      console.log('Initial cours details', response?.data);

      dispatch(setCourseData(response?.data ?? {}));
    } catch (error: any) {
      // errorNotification(error?.toString() + 'Error in Actions');

      //  When creating new course id exists but data doesnt in that case
      // Api doesnt return data so set redux to initial course
      dispatch(setCourseData(INITIAL_COURSE));
    }
  };
};

export const getCourseById = (course: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await APIGetCourseById(course);
      dispatch(setCourseData(response?.data?.data ?? {}));
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};

export const getAllPublishCourses = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: any = await APIGetPublishCourses();
    if (res) {
      dispatch(setAllCourses(res.data));
    }
    return res;
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};
