/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest } from '../plugins/https';

export const APIGetAllTopicsByCourseId = (courseId: string) => {
  return GetRequest('topic/all-topic/' + courseId);
};

export const APIGetTopicDetailsById = (topicId: string, batchId: string) => {
  return PostRequest('topic/get-topic-by-batch', {
    topicId: topicId,
    batchId: batchId,
  });
};
