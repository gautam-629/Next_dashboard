/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GET_SEARCH_COURSES } from './actionTypes';

const initialState: any = {
  courseList: [],
};

export const courseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_SEARCH_COURSES:
      return {
        ...state,
        courseList: action.payload,
      };

    default:
      return state;
  }
};
