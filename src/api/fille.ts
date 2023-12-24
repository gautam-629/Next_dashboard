/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { PostRequest, GetRequest } from '../plugins/https';

export const APIUploadFile = (data: any) => {
  return PostRequest('file/upload-file', data);
};
export const APIDownloadFile = (filename: string) => {
  return GetRequest('file/download-file/' + filename);
};
