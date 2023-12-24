/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { APIOnBoarding } from '../../../api/course';
import { errorNotification } from '../../../utils/helpers/notifications';

export const createOnboarding = (onBoardData: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await APIOnBoarding(onBoardData);
      localStorage.setItem('onboardingId', response.data.draftId);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};
