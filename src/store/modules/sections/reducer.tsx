/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { SET_sections_DATA } from './actionTypes';

const initialState: any = {
  sectionsList: [],
};

export const sectionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_sections_DATA:
      return {
        ...state,
        sectionsList: action.payload,
      };

    default:
      return state;
  }
};
