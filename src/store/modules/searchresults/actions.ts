/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { APIGetSearchCourses } from '../../../api/searchresults';
import { GET_SEARCH_COURSES } from './actionTypes';
import { errorNotification } from '../../../utils/helpers/notifications';

export const setAuthData = (data: any) => {
  return {
    type: GET_SEARCH_COURSES,
    payload: data,
  };
};

export const getSearchCourses = () => async (dispatch: any) => {
  try {
    const res: any = await APIGetSearchCourses('');
    if (res) {
      dispatch(setAuthData(res.data));
    }
    return res;
  } catch (error: any) {
    errorNotification(error?.toString());
  }
};
