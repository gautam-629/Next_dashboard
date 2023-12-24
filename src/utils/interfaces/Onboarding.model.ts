/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface IOnboarding {
  // industry: [
  //   {
  //     preferedIndustry: string[];
  //     // preferedStuNum: string;
  //     currentPosition: string;
  //   },
  // ];

  index: number;

  education: Ieducation[];
  // experience: Iexperience[];
  experience: Iexperience;
  certification: Icertification[];
}
export interface Ieducation {
  index: 0;
  level: string;
  university: string;
  subject: string;
  passingYear: string;
}
export interface Iexperience {
  // index: 0;
  // organization: string;
  // designation: string;
  // period: string;
  // description: string;
  bio: string;
  // title: string;
  socialMedia: {
    facebook: string;
    linkedin: string;
    github: string;
  };
}

export interface Icertification {
  index: 0;
  title: string;
  cvUrl: string;
  description: string;
}
export const INITIAL_EDUCATION: Ieducation = {
  index: 0,
  level: '',
  university: '',
  subject: '',
  passingYear: '',
};
export const INITIAL_EXPERIENCE: Iexperience = {
  bio: '',
  // title: '',
  socialMedia: {
    facebook: '',
    linkedin: '',
    github: '',
  },
};
export const INITIAL_CERTIFICATION: Icertification = {
  index: 0,
  title: '',
  cvUrl: '',
  description: '',
};

export const INITIAL_ONBOARDING: IOnboarding = {
  education: [{ ...INITIAL_EDUCATION }],
  index: 0,
  // industry: [
  //   {
  //     preferedIndustry: [],

  //     currentPosition: '',
  //   },
  // ],

  // qualification: [{ level: '', university: '', major: '', passingYear: '' }],
  experience: { ...INITIAL_EXPERIENCE },
  certification: [{ ...INITIAL_CERTIFICATION }],
};
