/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface Batch {
  course: string;
  batchName: string;
  startDate: string;
  // endDate: string;
  startTime: string;
  classDuration: string;
  welcomeMessage: string;
  congratulationMessage: string;
  // endTime: string;
  minEnrollStudent: string;
  maxEnrollStudent: string;
  // classRoomLink: string;
  classType: string;
  price: number;
  discount: number;
}

export const INITIAL_BATCH: Batch = {
  course: '',
  batchName: '',
  startDate: '',
  // endDate: '',
  startTime: '',
  classDuration: '',
  welcomeMessage: '',
  congratulationMessage: '',
  minEnrollStudent: '',
  maxEnrollStudent: '',
  price: 0,
  // endTime: '',
  // studentLimit: '',
  // classRoomLink: '',
  classType: 'HYBRID',
  discount: 0,
};
