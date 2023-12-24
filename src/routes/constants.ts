/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export enum BASE_ROUTES {
  ROOT = '/',
  TEACHER = '/teacher',
  STUDENT = '/student',
  AUTH = '/auth',
  BECOME_TEACHER = '/become-teacher',
  SUCCESS = '/success',
}

export enum APP_AUTHTICATION_ROUTES {
  LOGIN_SCREEN = 'login-screen',
  SIGNUP = 'signup',
  TEACHER_SIGNUP = 'teacher-signup',
  LOGIN_FORM = 'login-form',
  ENTER_CODE = 'enter-code',
  PASSWORD_CHANGE_SUCCESS = 'password-change-success',
  FORGOT_PASSWORD = 'forgot-password',
  NEW_PASSWORD = 'new-password',
  WELCOME_SCREEN = 'welcome-screen',
  TEACHER_DASHBOARD = 'teacher-Dashboard',
  TEACH_ON_REMOTE_AXEL = 'teach-on-remote-axle',
  TEACHER_NOT_VALID = 'teacher-not-valid',
  
}

export enum AUTHENTICATION_ROUTES {
  DND_TEST = 'dnd',
  AUTH_ROOT = '',
  AUTH_LOGIN = 'auth',
  AUTH_FORGOT_PASSWORD = 'forgot-password',
  AUTH_ENTER_CODE = 'enter-code',
  AUTH_RESET_PASSWORD = 'reset-password',
  PASSWORD_CHANGE_SUCCESS = 'password-change-success',
  AUTH_SIGN_UP = 'signup',
  AUTH_TEACHER_SIGNUP = 'teacher-signup',
}

export enum SHOW_MESSAGE_ROUTES {
  EMAIL_VERIFICATION_SUCCESS = 'email-verification-success',
  PASSWORD_CHANGE_SUCCESS = 'password-change-success',
}

export enum APP_ROUTES {
  APP_ROOT = '',
  DRAG_DROB = 'dnd',
  COURSE_DETAILS_PAGE = 'course-details-page/:course',
  TEST_DND = 'test',
  PROFILE_TEACHER = 'course/profile',
  TEACHER_PROFILE_DETAILS = 'profile/teacher/:id',
  APP_COURSE_ID = 'course/:course',
  APP_COURSE_APPLY_NOW = 'course/applynow/:course',
  APP_PREVIEW_COURSE = 'preview-course',
  COURSE_TEACHER_PROFILE = 'course/teacher',
  APP_SEARCH_COURSE = 'search-courses',
  APP_COURSE_PLAYER = 'course-player',
  ALL_BLOGS = 'blog',
  // APP_BLOGS = 'blogs-screen',
  BLOG = 'blog/:slug',
  APP_PROFILE = 'profile-screen',
  APP_CONTACT = 'contact',
  APP_FAQ = 'faq',
  APP_ONBOARDING = 'onboarding',
  APP_BLOG = '',
}

export enum TEACHER_ROUTES {
  TEACHER_ROOT = '',
  TEACHER_AUTH = 'teacher-signup',
  TEACHER_DASHBOARD = '',
  CLASSROOM_DETAILS = 'classroom/:batch',

  ASSIGNMENT_LIST = 'batch/assignment/list/:batch',
  NOTIFICATIONS = 'notifications',
  VIEW_ASSIGN_TASK = 'batches/:batch/taskassign',
  VIEW_BATCH_DETAILS = 'batches/:batch',
  TEACHER_SCHEDULE = 'schedule/:roomId',
  TEACHER_CLASS_ROOM = 'class-room',
  MY_COURSES = 'mycourses',
  TEACHER_SETTINGS = 'settings',
  TEACHER_ACCOUNT_SETTINGS = 'account-settings',
  TEACHING_CENTER = 'teaching-center',
  TEACHER_PROFILE = 'profile',
  TEACHER_EDIT_COURSE = 'add-course/edit/:courseId',
  TEACHER_ADD_COURSE = 'add-course/:courseId',
  APP_ONBOARDING = 'onboarding',
  TEACHER_BATCH = 'batches',
  TEACHER_BATCH_CREATE = 'batches/create',
  TEACHER_BATCH_EDIT = 'batches/edit/:batchId',
  TEACHER_EDIT_PROFILE = 'profile/:id',

  TEACHER_ASSIGNMENT = 'assignment',

  TASK_DETAIL = 'assignment/:id',
  COURSE_DETAILS = 'course/:course',
  COURSE_ASSIGNMENT_CREATE = 'course/:courseid/create-assignment',
  COURSE_BATCH_CREATE = 'course/:courseid/create-batch',
  ASSIGNMENT_CREATE = 'assignment/create',
  TASK_DETAIL_COURSE = 'assignment/list/:course',
  TASK_EDIT = 'assignment/edit/:id',
  BATCH_EDIT = 'batch/edit/:batchId',
  TASK_SUBMIT = 'assignment/submitTask/:id',
  CONVERSATIONS = 'conversations',
}

export enum STUDENT_ROUTES {
  STUDENT_ROOT = '',
  STUDENT_DASHBOARD = 'classroom',
  STUDENT_PROFILE = 'profile',
  BLOGS = 'blogs',
  BLOG_DETAILS = 'blog/:slug',
  ADD_BLOG = 'blog/add',
  EDIT_BLOG = 'blog/edit/:id',
  STUDENT_EDIT_PROFILE = 'profile/:id',
  STUDENT_TASK = 'tasks',
  CLASS_ROOM = 'classroom',
  CLASS_ROOM_DETAILS = 'classroom/:id',
  NOTIFICATIONS = 'notifications',

  ASSIGNMENT_LIST = 'batch/assignments/list/:batch',
  COURSE_DETAILS = 'course/:course',
  CLASSROOM_DETAILS = 'classroom/:batch',
  STUDENT_TASK_SUBMIT = 'tasks/:batch/:id',
  STUDENT_TASK_DETAIL = 'task_detail/:batch/:id',
  STUDENT_TASK_EDIT = 'tasks/edit/:batch/:id',
}
