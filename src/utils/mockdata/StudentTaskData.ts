/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface ITaskData {
  title: string;
  subject: string;
  deadline: string;
  overdue: string;
  submitted: string;
  submissionTime: string;
  status: string;
  editTask: string;
}

export interface ITask {
  title: string;
  data: ITaskData[];
}

export const INITIAL_STUDENT_TASK_DATA: ITask[] = [
  {
    title: 'All Assignment',
    data: [
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Pending Review',
        editTask: '/editTsak',
      },
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Pending Review',
        editTask: '/editTsak',
      },
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Pending Review',
        editTask: '/editTsak',
      },
    ],
  },
  {
    title: 'Submitted',
    data: [
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: '',
        submitted: 'Submitted',
        submissionTime: '',
        status: 'Reviewed',
        editTask: '/editTsak',
      },
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Reviewed',
        editTask: '/editTsak',
      },
    ],
  },
  {
    title: 'Not Submitted',
    data: [
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Pending Review',
        editTask: '/editTsak',
      },
      {
        title: 'The Design Principle',
        subject: 'Data Structure and algorithm',
        deadline: '12 September, 2022 - 15:00',
        overdue: 'Overdue by 50 minutes',
        submitted: '',
        submissionTime: '',
        status: 'Pending Review',
        editTask: '/editTsak',
      },
    ],
  },
];
