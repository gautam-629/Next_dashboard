/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { APIGetCoursesByCategory, APIGetFeaturedCategories } from '../../../api/categories';
import { SET_COURSES_BY_CATEGORY, SET_FEATURED_CATEGORY } from './actionTypes';
import { AnyAction, Dispatch } from 'redux';
import { errorNotification } from '../../../utils/helpers/notifications';
import { Category } from '../../../utils/interfaces/Category.model';
import { ICourse } from '../../../utils/interfaces/Course.model';

export const setFeaturedCategory = (courseList: Category[]) => {
  return {
    type: SET_FEATURED_CATEGORY,
    payload: courseList,
  };
};

export const setCoursesByCategory = (courseList: ICourse[]) => {
  return {
    type: SET_COURSES_BY_CATEGORY,
    payload: courseList,
  };
};

export const getFeaturedCategory = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res: any = await APIGetFeaturedCategories();
    console.log(res, 'res');
    if (res) {
      dispatch(setFeaturedCategory(res.data));
    }
    return res;
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};

export const getCoursesByCategory =
  (categoryId: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const res: any = await APIGetCoursesByCategory(categoryId);
      console.log(res, 'res');
      if (res) {
        dispatch(setCoursesByCategory(res.data));
      }
      return res;
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
