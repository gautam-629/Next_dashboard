/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface Assigment {
  assignmentTitle: string;
  course: any;
  section: any;
  lesson: any;
  longDescription: string;
  imageUrl: string;
}

export interface CourseAssignment {
  assignmentTitle: string;
  longDescription: string;
  fileUrl: any[];
  course: string;
}
export interface Task {
  assignmentTitle: string;
  taskId: string;
  sectionId: string;
  lessonId: string;
  longDescription: string;
  imageUrl: string;
  isActive: boolean;
}

export const INITIAL_TASK: Task = {
  assignmentTitle: '',
  taskId: '',
  sectionId: '',
  lessonId: '',
  longDescription: '',
  imageUrl: '',
  isActive: false,
};

export const INITIAL_ASSIGNMENT: Assigment = {
  assignmentTitle: '',
  course: '',
  section: '',
  lesson: '',
  longDescription: '',
  imageUrl: '',
};

export const INITIAL_COURSE_ASSIGNMENT: CourseAssignment = {
  assignmentTitle: '',
  longDescription: '',
  fileUrl: [],
  course: '',
};
