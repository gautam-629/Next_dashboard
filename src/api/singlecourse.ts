/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APIGetSingleCourse = (course: any) => {
  return GetRequest(`courses/${course}`);
};

export const APIGetSingleDraftCourse = (course: any) => {
  return GetRequest(`courses/draft/${course}`);
};
