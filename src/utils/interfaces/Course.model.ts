/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface ICourse {
  courseTitle: string;
  category: string;
  learningObjective: string[];
  shortDescription: string;
  longDescription: string;
  welcomeMessage: string;
  congratulationMessage: string;
  courseImageUrl: string;
  demoVideoUrl: string;
  tags: string[];
  language: string;
  tools: string[];
  requirements: string[];
  prerequisites: string[];
  targetedAudiences: string[];
  courseDuration: string;
  toolsAndLanguage: string[];
  maxEnrollStudent: number;
  enrollmentEndDate: Date;
  classTime: string;
  status: string;
  teacher?: any;
  topics: ISection[];
  coursePrice: number | string;
  currency: string;
  level: string;
  _id?: string;
  updatedAt?: Date;
  courseFaqs: Ifaq[];
  courseFor: string;
}

export interface ISection {
  index?: number;
  // sectionTitle: string;
  course: string;
  classRoomLink: string;
  description: string;
  creditHours: number;
  videoUrl: [];
  resources: [];
  assignment: [];
  quiz: [];
  topics: [ISection] | [];
}
export interface Ifaq {
  question: string;
  answer: string;
  course: string;
}
export interface ILesson {
  index?: number;
  lessonTitle: string;
  lessonDescription: string;
  videoUrl: string;
  resources: string;
}

export interface ICategory {
  categoryTitle: string;
  _id: string;
}

export const courseCategory: string[] = [
  'Web Development',
  'Data Science',
  'Mobile Development',
  'Programming Language',
  'Game Development',
  'Database Design & Development',
  'Software testing',
  'Software Engineering',
  'Software Development Tools',
];

export const INITIAL_FAQ: Ifaq = {
  course: '',
  question: '',
  answer: '',
};
export const INITIAL_LESSON: ILesson = {
  index: 0,
  lessonTitle: 'Untitled lessons',
  lessonDescription: '',
  videoUrl: '',
  resources: '',
};
export const INITIAL_SECTION: ISection = {
  // index: 0,
  // sectionTitle: '',
  description: '',
  classRoomLink: '',
  creditHours: 0,
  course: '',
  videoUrl: [],
  resources: [],
  assignment: [],
  quiz: [],
  topics: [
    // {
    //   // index: 0,
    //   title: 'Untitled Lesson',
    //   description: '',
    //   classRoomLink: '',
    //   course: '',
    //   topics: [
    //     {
    //       // index: 0,
    //       title: 'Untitled Unit',
    //       description: '',
    //       classRoomLink: '',
    //       course: '',
    //       topics: [],
    //     },
    //   ],
    // },
  ],
};

export const INITIAL_COURSE: ICourse = {
  tools: [],
  courseFaqs: [],
  courseFor: '',
  toolsAndLanguage: [],
  learningObjective: [],
  courseTitle: 'Untitled',
  category: '',
  shortDescription: '',
  demoVideoUrl: '',
  longDescription: 'Write Short Description',
  welcomeMessage: '',
  congratulationMessage: '',
  courseImageUrl: '',
  tags: [],
  language: '',
  requirements: [],
  prerequisites: [],
  targetedAudiences: [],
  courseDuration: '',
  level: 'BEGINNER',
  maxEnrollStudent: 0,
  enrollmentEndDate: new Date(),
  classTime: '',
  status: '',
  topics: [],
  coursePrice: '',
  currency: '',
  updatedAt: new Date(),
};
