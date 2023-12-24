/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { GetRequest } from '../plugins/https';

export const APIGetTeacherStats = () => {
  return GetRequest('dashboard/teacher-stats');
};

export const APIGetCurrentTeacherAssignments = () => {
  return GetRequest('dashboard/current-teacher-assignments');
};

export const APIGetUpcomingClasses = () => {
  return GetRequest('dashboard/upcoming-classes');
};
