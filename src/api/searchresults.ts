/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { PostRequest } from '../plugins/https';

export const APIGetSearchCourses = (req: any) => {
  return PostRequest(`courses/search`, {
    ...req,
  });
};

