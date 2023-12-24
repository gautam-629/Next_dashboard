/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  APP_ROUTES,
  AUTHENTICATION_ROUTES,
  APP_AUTHTICATION_ROUTES,
  TEACHER_ROUTES,
  STUDENT_ROUTES,
  SHOW_MESSAGE_ROUTES,
  
} from './constants';
import Home from '../pages/home';
import Contact from '../pages/contact';
import SignupScreen from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PreviewCourseScreen from '../pages/Course/PreviewCourse.screen';
import FAQ from '../pages/faq';
import SearchResults from '../pages/search-result';

import TeacherSignup from '../pages/auth/TeacherSignup';
import LoginForm from '../pages/auth/Login';
import NewPasswordLayout from '../layouts/NewPasswordLayout';

import { TeacherDashboard } from '../pages/TeacherDashBoard/TeacherDashboard';
import { Batches } from '../pages/TeacherDashBoard/Batches';

import { MyCourses } from '../pages/TeacherDashBoard/MyCourses';
import { TeacherAccountSettings } from '../pages/TeacherDashBoard/TeacherAccountSettings';
import { TeacherSettings } from '../pages/TeacherDashBoard/TeacherSettings';
import CreateCourse from '../pages/TeacherDashBoard/course-create';
import { ApplyNow } from '../pages/Course/ApplyNow.screen';
import { Dashboard } from '../pages/student/pages/Dashboard';
import { Task } from '../pages/student/pages/task/Task';
import { TaskSubmit } from '../pages/student/pages/task/TaskSubmit';
import StudentClassRoom from '../pages/student/pages/classroom';
import ClassRoom from '../pages/TeacherDashBoard/class-room';
import ClassRoomDetails from '../pages/student/pages/classroom/ClassRoomDetails';
import CreateBatch from '../pages/TeacherDashBoard/batch/CreateBatch';

import TeacherProfile from '../pages/TeacherDashBoard/profile';
import { ViewBatchDetails } from '../pages/TeacherDashBoard/batch/view-batch-details';
import EditProfile from '../pages/TeacherDashBoard/profile/edit-profile';
import Assignment from '../pages/TeacherDashBoard/assignments';
import { TaskDetailCard } from '../pages/TeacherDashBoard/assignments/TaskDetailCard';
import AssignmentCreate from '../pages/TeacherDashBoard/assignments/AssignmentCreate';
import AssignmentEdit from '../pages/TeacherDashBoard/assignments/AssignmentEdit';
import PasswordUpdateSuccess from '../pages/auth/PasswordUpdateSuccess';
import EmailVerificationSuccess from '../pages/auth/EmailVerificationSuccess';
import { AssignmentSubmit } from '../pages/TeacherDashBoard/assignments/AssignmentSubmit';
import { AssignTask } from '../pages/TeacherDashBoard/assignments/AssignTask';
import TaskDetail from '../pages/student/pages/task/TaskDetail';
import { TaskEdit } from '../pages/student/pages/task/TaskEdit';
import LatestBlogsCourses from '../components/modules/home/LatestBlogsCourses';
import MyCourseDetails from '../pages/TeacherDashBoard/mycourses/MyCourseDetails';
import EditBatch from '../pages/TeacherDashBoard/batch/EditBatch';
import TeacherProfileForStudent from '../pages/student/pages/profile/TeacherProfileForStudent';
import CourseDetails from '../pages/coursedetails';
import DragAndDrop from '../components/modules/dnd';
import { NotificationsScreen } from '../pages/notification/NotificationsScreen';
import { ChatScreen } from '../pages/chat/Chat.screen';
import { ClassroomScreen } from '../pages/classroom/Classroom.screen';

import { TestDND } from '../pages/TestDND';
import { Blog } from '../pages/common/Blog';
import { AddBlog } from '../pages/common/AddBlog';
import { BlogDetails } from '../pages/common/BlogDetails';
import { LandingBlogDetails } from '../pages/common/LandingBlogDetails';
import AllBlogs from '../pages/blog';
export interface RouteElement {
  path:
    | APP_ROUTES
    | AUTHENTICATION_ROUTES
    | SHOW_MESSAGE_ROUTES
    | APP_AUTHTICATION_ROUTES
    | TEACHER_ROUTES
    | STUDENT_ROUTES;
  element: JSX.Element;
}

export const AppRoutes: RouteElement[] = [
  { path: APP_ROUTES.APP_ROOT, element: <Home /> },
  { path: APP_ROUTES.DRAG_DROB, element: <DragAndDrop /> },
  { path: APP_ROUTES.ALL_BLOGS, element: <AllBlogs /> },


  { path: APP_ROUTES.COURSE_DETAILS_PAGE, element: <CourseDetails /> },
  { path: APP_ROUTES.APP_COURSE_ID, element: <PreviewCourseScreen /> },
  // { path: APP_ROUTES.TEST_DND, element: <TestDND /> },
  { path: APP_ROUTES.COURSE_TEACHER_PROFILE, element: <TeacherProfileForStudent /> },
  { path: APP_ROUTES.TEACHER_PROFILE_DETAILS, element: <TeacherProfileForStudent /> },
  { path: APP_ROUTES.APP_COURSE_APPLY_NOW, element: <ApplyNow /> },
  { path: APP_ROUTES.APP_SEARCH_COURSE, element: <SearchResults /> },
  { path: APP_ROUTES.APP_CONTACT, element: <Contact /> },
  { path: APP_ROUTES.APP_FAQ, element: <FAQ /> },
  // { path: APP_ROUTES.APP_BLOGS, element: <LatestBlogsCourses /> },
  { path: APP_ROUTES.BLOG, element: <LandingBlogDetails /> },
];

export const AuthRoutes: RouteElement[] = [
  // { path: AUTHENTICATION_ROUTES.DND_TEST, element: <Dnd /> },
  { path: AUTHENTICATION_ROUTES.AUTH_ROOT, element: <LoginForm /> },
  { path: AUTHENTICATION_ROUTES.AUTH_SIGN_UP, element: <SignupScreen /> },
  { path: AUTHENTICATION_ROUTES.AUTH_TEACHER_SIGNUP, element: <TeacherSignup /> },
  { path: AUTHENTICATION_ROUTES.AUTH_FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: AUTHENTICATION_ROUTES.AUTH_RESET_PASSWORD, element: <NewPasswordLayout /> },
];

export const ShowMessageRoutes: RouteElement[] = [
  { path: SHOW_MESSAGE_ROUTES.PASSWORD_CHANGE_SUCCESS, element: <PasswordUpdateSuccess /> },
  { path: SHOW_MESSAGE_ROUTES.EMAIL_VERIFICATION_SUCCESS, element: <EmailVerificationSuccess /> },
];

export const TeacherRoutes: RouteElement[] = [
  { path: AUTHENTICATION_ROUTES.AUTH_TEACHER_SIGNUP, element: <TeacherSignup /> },
];

export const TeacherDashboardRoutes: RouteElement[] = [
  { path: TEACHER_ROUTES.TEACHER_DASHBOARD, element: <TeacherDashboard /> },
  { path: TEACHER_ROUTES.TEACHER_CLASS_ROOM, element: <ClassRoom /> },
  { path: TEACHER_ROUTES.MY_COURSES, element: <MyCourses /> },
  { path: TEACHER_ROUTES.TEACHER_SETTINGS, element: <TeacherSettings /> },
  { path: TEACHER_ROUTES.TEACHER_ACCOUNT_SETTINGS, element: <TeacherAccountSettings /> },
  { path: TEACHER_ROUTES.TEACHER_PROFILE, element: <TeacherProfile /> },
  { path: TEACHER_ROUTES.TEACHER_EDIT_COURSE, element: <CreateCourse /> },
  { path: TEACHER_ROUTES.TEACHER_ADD_COURSE, element: <CreateCourse /> },
  { path: TEACHER_ROUTES.TEACHER_BATCH, element: <Batches /> },
  { path: TEACHER_ROUTES.VIEW_BATCH_DETAILS, element: <ViewBatchDetails /> },
  { path: TEACHER_ROUTES.TEACHER_BATCH_CREATE, element: <CreateBatch /> },
  { path: TEACHER_ROUTES.TEACHER_BATCH_EDIT, element: <CreateBatch /> },
  { path: TEACHER_ROUTES.TEACHER_EDIT_PROFILE, element: <EditProfile /> },
  { path: TEACHER_ROUTES.TEACHER_ASSIGNMENT, element: <Assignment /> },
  { path: TEACHER_ROUTES.ASSIGNMENT_CREATE, element: <AssignmentCreate /> },
  { path: TEACHER_ROUTES.COURSE_DETAILS, element: <CourseDetails /> },
  { path: TEACHER_ROUTES.COURSE_BATCH_CREATE, element: <CreateBatch /> },
  { path: TEACHER_ROUTES.CONVERSATIONS, element: <ChatScreen /> },
  { path: TEACHER_ROUTES.COURSE_ASSIGNMENT_CREATE, element: <AssignmentCreate /> },
  { path: TEACHER_ROUTES.TASK_DETAIL_COURSE, element: <TaskDetailCard /> },
  { path: TEACHER_ROUTES.TASK_EDIT, element: <AssignmentEdit /> },
  { path: TEACHER_ROUTES.BATCH_EDIT, element: <CreateBatch /> },
  { path: TEACHER_ROUTES.TASK_SUBMIT, element: <AssignmentSubmit /> },
  { path: TEACHER_ROUTES.VIEW_ASSIGN_TASK, element: <AssignTask /> },
  { path: TEACHER_ROUTES.ASSIGNMENT_LIST, element: <AssignTask /> },
  { path: TEACHER_ROUTES.NOTIFICATIONS, element: <NotificationsScreen /> },
  { path: TEACHER_ROUTES.CLASSROOM_DETAILS, element: <ClassroomScreen /> },
];

export const StudentRoutes = [
  { path: STUDENT_ROUTES.COURSE_DETAILS, element: <PreviewCourseScreen /> },
  { path: STUDENT_ROUTES.STUDENT_DASHBOARD, element: <StudentClassRoom /> },
  { path: STUDENT_ROUTES.STUDENT_PROFILE, element: <TeacherProfile /> },
  { path: STUDENT_ROUTES.STUDENT_EDIT_PROFILE, element: <EditProfile /> },
  { path: STUDENT_ROUTES.STUDENT_TASK, element: <Task /> },
  { path: STUDENT_ROUTES.STUDENT_TASK_SUBMIT, element: <TaskSubmit /> },
  { path: STUDENT_ROUTES.STUDENT_TASK_EDIT, element: <TaskEdit /> },
  { path: STUDENT_ROUTES.ASSIGNMENT_LIST, element: <Task /> },
  { path: STUDENT_ROUTES.BLOGS, element: <Blog /> },
  { path: STUDENT_ROUTES.BLOG_DETAILS, element: <BlogDetails /> },
  { path: STUDENT_ROUTES.ADD_BLOG, element: <AddBlog /> },
  { path: STUDENT_ROUTES.EDIT_BLOG, element: <AddBlog /> },
  { path: STUDENT_ROUTES.CLASS_ROOM, element: <StudentClassRoom /> },
  // { path: STUDENT_ROUTES.CLASS_ROOM_DETAILS, element: <ClassroomScreen /> },
  { path: STUDENT_ROUTES.CLASSROOM_DETAILS, element: <ClassroomScreen /> },
  { path: STUDENT_ROUTES.STUDENT_TASK_DETAIL, element: <TaskDetail /> },
  { path: STUDENT_ROUTES.NOTIFICATIONS, element: <NotificationsScreen /> },
];

export const DashboardRoutes = [];
