/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { INITIAL_BATCH } from '../../../utils/interfaces/Batch.model';
import { SET_BATCH_CREATE_DATA } from './actionTypes';

export type BatchList = {
  batches: any[] | [];
  count: number;
};
interface BatchState {
  batchCreateData: any;
  batchList: BatchList;
}

const initialState: BatchState = {
  batchCreateData: {
    ...INITIAL_BATCH,
  },
  batchList: {
    batches: [],
    count: 0,
  },
};

export const batchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BATCH_CREATE_DATA:
      return {
        ...state,
        batchCreateData: {
          ...state.batchCreateData,
          ...action.payload,
        },
      };

    case 'SET_BATCH_LIST':
      return {
        ...state,
        batchList: { ...action.payload },
      };

    default:
      return state;
  }
};
