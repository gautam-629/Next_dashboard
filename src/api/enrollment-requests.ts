/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest } from '../plugins/https';

export const APIGetPendingBatches = () => {
  return GetRequest('/enrollment-requests/pending-status');
};
