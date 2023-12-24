/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APILoadForumByTopic = (id: string) => {
  return GetRequest('/forum/topic/' + id);
};

export const APILoadForumByCourse = (id: string) => {
  return GetRequest('/forum/course/' + id);
};

export const APIAddQuestion = (data: any) => {
  return PostRequest('/forum', data);
};

export const APIGetForumById = (id: any) => {
  return GetRequest('/forum/' + id);
};
export const APIPostComment = (id: any, data: any) => {
  return PostRequest('/forum-comment/', data);
};

export const APILoadForumComments = (id: any) => {
  return GetRequest('/forum-comment/forum/' + id);
};

export const APIPostForumUpvote = (data: any) => {
  return PostRequest('/forum-upvote/forum', data);
};

export const APIUpdateComment = (id: any, data: any) => {
  return PutRequest('/forum-comment/forum/' + id, data);
};
export const APIDeleteComment = (id: any) => {
  return DeleteRequest('/forum-comment/' + id);
};
