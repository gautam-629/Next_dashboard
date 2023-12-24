/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  SET_CLASSROOM_RUNNING_STATUS,
  SET_WILDCARD_CLASSROOM_COMPONENT,
  SET_ACTIVE_TOPIC,
  SET_SYLLABUS,
  SET_BATCH_DETAILS,
  SET_COURSE_DETAILS,
  SET_DRAWER,
  SET_ACTIVE_TOPIC_DETAILS,
  SET_CLASSROOM_ENDING_DIALOG_STATUS,
  SET_CLASSROOM_VIDEO_STATUS,
  SET_FORUMS,
  SET_COMMENTS_DRAWER,
  SET_SELECTED_FORUM,
  SET_FORUM_COMMENTS,
} from './actionTypes';
import { APIGetTopicDetailsById } from '../../../api/topic';
import { APILoadForumByCourse } from '../../../api/forum';

export const setClassroomStatus = (payload: any) => ({
  type: SET_CLASSROOM_RUNNING_STATUS,
  payload: payload,
});

export const showEndClassRoomDialog = (payload: any) => ({
  type: SET_CLASSROOM_ENDING_DIALOG_STATUS,
  payload: payload,
});

export const showClassVideoStatus = (payload: any) => ({
  type: SET_CLASSROOM_VIDEO_STATUS,
  payload: payload,
});

export const setClassroomWildcardComponent = (payload: any) => ({
  type: SET_WILDCARD_CLASSROOM_COMPONENT,
  payload: payload,
});

export const setClassroomActiveTopic = (payload: any) => ({
  type: SET_ACTIVE_TOPIC,
  payload: payload,
});

export const setClassroomSyallbus = (payload: any) => ({
  type: SET_SYLLABUS,
  payload: payload,
});

export const setBatchDetails = (payload: any) => ({
  type: SET_BATCH_DETAILS,
  payload: payload,
});

export const setForums = (payload: any) => ({
  type: SET_FORUMS,
  payload: payload,
});
export const setDrawer = (payload: any) => {
  return {
    type: SET_DRAWER,
    payload: payload,
  };
};
export const setCourseDetails = (payload: any) => ({
  type: SET_COURSE_DETAILS,
  payload: payload,
});
export const setCommentsDrawer = (payload: any) => ({
  type: SET_COMMENTS_DRAWER,
  payload: payload,
});
export const setSelectedForum = (payload: any) => ({
  type: SET_SELECTED_FORUM,
  payload: payload,
});
export const setForumComments = (payload: any) => ({
  type: SET_FORUM_COMMENTS,
  payload: payload,
});

export const setActiveTopicDetails = (payload: any) => ({
  type: SET_ACTIVE_TOPIC_DETAILS,
  payload: payload,
});

export const setWildCardDetails = (topicId: string, component: string) => (dispatch: any) => {
  dispatch(setClassroomActiveTopic(topicId));
  dispatch(setClassroomWildcardComponent(component));
};

export const loadActiveTopicDetails = (active: string, batch: string) => async (dispatch: any) => {
  const res: any = await APIGetTopicDetailsById(active, batch);
  dispatch(setActiveTopicDetails(res.data));
};

export const loadForumData = (course: string) => async (dispatch: any) => {
  const res = await APILoadForumByCourse(course);
  dispatch(setForums(res.data));
};
