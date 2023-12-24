/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface updateProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  address: { district: string; city: string; country: string };
  socialMedia: {
    facebook: string;
    gitHub: string;
    linkedIn: string;
  };
}
export const INITIAL_UPDATE_PROFILE: updateProfile = {
  firstName: '',
  lastName: '',
  dob: '',

  phoneNumber: '',
  address: {
    district: '',
    city: '',
    country: '',
  },
  socialMedia: {
    facebook: '',
    gitHub: '',
    linkedIn: '',
  },
};

export const INITIAL_TEACHER_PROFILE = {
  firstName: '',
  lastName: '',
  email: '',
  dob: new Date(),
  phoneNumber: '',
  socialMedia: {
    facebook: '',
    gitHub: '',
    linkedIn: '',
  },
  address: {
    district: '',
    city: '',
    country: '',
  },
  education: [],
  experience: [],
  certification: [],
  batches: [],
  courses: [],
  batchCount: 0,
  courseCount: 0,
  totalStudent: 0,
};
