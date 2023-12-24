/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { INITIAL_ONBOARDING } from '../../../utils/interfaces/Onboarding.model';
import { SET_ONBOARDING_DATA } from './actionTypes';

const initialState: any = {
  onBoardingList: [{ ...INITIAL_ONBOARDING }],
};

export const curriculumReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ONBOARDING_DATA:
      return {
        ...state,
        onBoardingList: { ...state.onBoardingList, ...action.payload },
      };

    default:
      return state;
  }
};
