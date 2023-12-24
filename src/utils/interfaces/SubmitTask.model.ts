/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface SubmitTask {
  fileUrl: string;
  description: string;
  batch: string;
  assignment: string;
}

export const INITIAL_SUBMIT_TASK: SubmitTask = {
  fileUrl: '',
  description: '',
  batch: '',
  assignment: '',
};

export interface UpdateTask {
  status: string;
  remarks: string;
}

export const INITIAL_UPDATE_TASK: UpdateTask = {
  status: '',
  remarks: '',
};
