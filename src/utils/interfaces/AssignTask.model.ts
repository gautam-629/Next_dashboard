/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface Assign {
  taskId: string;
  endDate: string;
  endTime: string;
  course: string;
}

export const INITIAL_TASK_ASSIGN: Assign = {
  taskId: '',
  endDate: '',
  endTime: '',
  course: '',
};
