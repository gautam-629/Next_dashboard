/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { createBatchAPI, getAllBatch, updateBatchAPI } from '../../../api/batch';
import { SET_BATCH_CREATE_DATA } from './actionTypes';
import { BatchList } from './reducers';
import { errorNotification } from '../../../utils/helpers/notifications';

export const setBatchData = (data: any) => {
  return {
    type: SET_BATCH_CREATE_DATA,
    payload: data,
  };
};

export const setBatchList = (data: BatchList) => {
  return {
    type: 'SET_BATCH_LIST',
    payload: data,
  };
};

export const createBatch = (data: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await createBatchAPI(data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};
export const editBatch = (id: string, data: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await updateBatchAPI(id, data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
};

export const getAllBatches = () => async (dispatch: any) => {
  const res: any = await getAllBatch();
  const batchList = {
    batches: res?.data?.results ?? [],
    count: res?.data?.count ?? 0,
  };
  dispatch(setBatchList(batchList));
};
