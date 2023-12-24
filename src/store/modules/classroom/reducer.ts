/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  SET_ACTIVE_TOPIC,
  SET_BATCH_DETAILS,
  SET_CLASSROOM_RUNNING_STATUS,
  SET_COURSE_DETAILS,
  SET_SYLLABUS,
  SET_FORUMS,
  SET_DRAWER,
  SET_WILDCARD_CLASSROOM_COMPONENT,
  SET_ACTIVE_TOPIC_DETAILS,
  SET_CLASSROOM_ENDING_DIALOG_STATUS,
  SET_CLASSROOM_VIDEO_STATUS,
  SET_SELECTED_FORUM,
  SET_COMMENTS_DRAWER,
  SET_FORUM_COMMENTS,
} from './actionTypes';

export const initialState = {
  isClassroomRunning: false,
  wildcardClassroomComponent: 'description',
  showDrawer: false,
  selectedForum: '-1',
  forumComments: [],
  showCommentsDrawer: false,
  classRoomVideoStatus: 'inactive',
  showEndingDialog: false,
  activeTopic: '-1',
  forums: [],
  activeTopicDetails: {
    _id: '',
    title: '',
    description: '',
    classRoomLink: '',
    course: '',
    quiz: [],
    assignment: [],
  } as any,
  syllabus: [],
  completedTopics: [],
  course: {} as any,
  batch: {
    assignments: [],
    batchName: '',
    classRoom: '-1',
    classRoomLink: '',
    course: {} as any,
    endDate: '',
    endTime: '',
    startDate: '',
    startTime: '',
    studentLimit: 0,
    students: 0,
    _id: '-1',
  } as any,
};

export const classRoomReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_CLASSROOM_RUNNING_STATUS:
      return {
        ...state,
        isClassroomRunning: action.payload,
      };
    case SET_WILDCARD_CLASSROOM_COMPONENT:
      return {
        ...state,
        wildcardClassroomComponent: action.payload,
      };
    case SET_ACTIVE_TOPIC:
      return {
        ...state,
        activeTopic: action.payload,
      };
    case SET_ACTIVE_TOPIC_DETAILS:
      return {
        ...state,
        activeTopicDetails: action.payload,
      };
    case SET_SYLLABUS:
      return {
        ...state,
        syllabus: action.payload,
      };
    case SET_BATCH_DETAILS:
      return {
        ...state,
        batch: action.payload,
        completedTopics: action.payload.completedTopics ?? [],
      };
    case SET_DRAWER:
      return {
        ...state,
        showDrawer: action.payload,
      };
    case SET_CLASSROOM_VIDEO_STATUS:
      return {
        ...state,
        classRoomVideoStatus: action.payload,
      };
    case SET_CLASSROOM_ENDING_DIALOG_STATUS:
      return {
        ...state,
        showEndingDialog: action.payload,
      };
    case SET_COURSE_DETAILS:
      return {
        ...state,
        course: action.payload,
      };
    case SET_FORUMS:
      return {
        ...state,
        forums: action.payload,
      };
    case SET_COMMENTS_DRAWER:
      return {
        ...state,
        showCommentsDrawer: action.payload,
      };
    case SET_SELECTED_FORUM:
      return {
        ...state,
        selectedForum: action.payload,
      };
    case SET_FORUM_COMMENTS:
      return {
        ...state,
        forumComments: action.payload,
      };
    default:
      return state;
  }
};
