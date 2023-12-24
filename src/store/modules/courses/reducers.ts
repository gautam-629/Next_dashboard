/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ICourse, INITIAL_COURSE } from '../../../utils/interfaces/Course.model';
import { SET_ALL_COURSES, SET_COURSE_CREATE_DATA, SET_MY_COURSES } from './actionTypes';

export type CourseList = {
  courses: ICourse[] | [];
  count: number;
};
interface CourseState {
  allCourseList: CourseList;
  courseCreateData: ICourse;
  myCourses: CourseList;
}

type CourseAction = {
  type: string;
  payload: any;
};

const initialState: CourseState = {
  allCourseList: {
    courses: [],
    count: 0,
  },
  courseCreateData: {
    ...INITIAL_COURSE,
  },
  myCourses: {
    courses: [],
    count: 0,
  },
};

export const courseReducer = (state = initialState, action: CourseAction) => {
  switch (action.type) {
    case SET_ALL_COURSES:
      return {
        ...state,
        courseList: action.payload,
      };
    case SET_COURSE_CREATE_DATA:
      return {
        ...state,
        courseCreateData: {
          ...state.courseCreateData,
          ...action.payload,
        },
      };
    case SET_MY_COURSES:
      return {
        ...state,
        myCourses: action.payload,
      };

    default:
      return state;
  }
};
