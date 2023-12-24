/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APICreateClassRoom = (data: any) => {
  return PostRequest('class-room/create-classroom', data);
};

export const APIGetAllClassRoom = () => {
  return GetRequest('class-room/all');
};

export const APIGetClassRoomById = (roomId: any) => {
  return GetRequest(`class-room/${roomId}`);
};

export const APIGetClassSession = (classRoomId: string) => {
  return GetRequest(`class-room/meeting-session/${classRoomId}`);
};

export const APIGetClassSessionLink = (classRoomId: string) => {
  return GetRequest(`${classRoomId}`);
};

export const APIGetAssignmentsByBatch = (batchId: string) => {
  return GetRequest('/assignments/lists-by-batch/' + batchId);
};
