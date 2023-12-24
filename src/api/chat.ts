/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APILoadMyGroups = () => {
  return GetRequest(`chat/my-rooms`);
};

export const APILoadRecentMessages = (room: string, page = 1, pageSize = 20) => {
  return GetRequest(`chat/${room}/messages?page=${page}&pageSize=${pageSize}`);
};
export const APILoadGroupDetails = (room: string) => {
  return GetRequest(`chat/room/${room}`);
};
export const APISendRoomMessage = (roomId: string, data: any) => {
  return PostRequest(`chat/send-message/${roomId}`, data);
};
