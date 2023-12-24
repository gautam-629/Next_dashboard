/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const createBatchAPI = (data: any) => {
  const { course } = data;

  delete data.course;
  return PostRequest(`batch/${course}/add`, data);
};

export const updateBatchAPI = (id: string, data: any) => {
  const { course } = data;

  delete data.course;
  return PutRequest(`batch/` + id, data);
};

export const APIGetSingleBatch = (batch: any) => {
  return GetRequest(`batch/${batch}`);
};
export const APIGetSingleBatchCourse = (id: any) => {
  return GetRequest(`batch/course-details/${id}`);
};

export const APIUpdateCompletedCourses = (id: any, body: any) => {
  return PutRequest(`batch/completed-courses/${id}`, body);
};

export const enrollToBatch = (batch: any, course: any) => {
  return PostRequest(`enrollment-requests`, {
    batch,
    course,
  });
};

export const APIRequestBatchChange = ({ batch, course }: { batch: string; course: string }) => {
  return PutRequest(`enrollment-requests/request-batch-change`, {
    batch,
    course,
  });
};

export const getAllBatch = (status = 'ongoing', page: number = 1, limit: number = 8) => {
  // status can be ongoing, upcoming or completed
  return GetRequest(`batch/my-batches/?page=${page}&limit=${limit}&status=${status}`);
};

export const getAllBatchByCourseId = (
  course: string,
  status = 'ongoing',
  page: number = 1,
  limit: number = 8,
) => {
  // status can be ongoing, upcoming or completed
  return GetRequest(
    `batch/my-batches-by-course/${course}/?page=${page}&limit=${limit}&status=${status}`,
  );
};
export const DeleteBatchAPI = (batch: string) => {
  return DeleteRequest(`batch/${batch}`);
};
