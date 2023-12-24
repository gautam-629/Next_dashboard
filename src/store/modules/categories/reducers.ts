/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Category } from '../../../utils/interfaces/Category.model';
import { ICourse } from '../../../utils/interfaces/Course.model';
import { SET_COURSES_BY_CATEGORY, SET_FEATURED_CATEGORY } from './actionTypes';

interface CategoryState {
  featuredCategory: Category[];
  coursesByCategory: ICourse[];
}

type CourseAction = {
  type: string;
  payload: any;
};

const initialState: CategoryState = {
  featuredCategory: [],
  coursesByCategory: [],
};

export const categoryReducer = (state = initialState, action: CourseAction) => {
  switch (action.type) {
    case SET_FEATURED_CATEGORY:
      return {
        ...state,
        featuredCategory: [...action.payload],
      };
    case SET_COURSES_BY_CATEGORY:
      return {
        ...state,
        coursesByCategory: [...action.payload],
      };
    default:
      return state;
  }
};
