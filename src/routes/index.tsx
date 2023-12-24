/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Routes, Route } from 'react-router-dom';
import {
  AppRoutes,
  AuthRoutes,
  StudentRoutes,
  ShowMessageRoutes,
  TeacherDashboardRoutes,
} from './routes';
import AppLayout from '../layouts/AppLayout';
import { RouteElement } from './routes';
import TeacherLayout from '../layouts/TeacherLayout';
import RoutePrivateTeacher from '../components/common/RoutePrivateTeacher';

import TeacherNotValid from '../pages/teacher-not-valid';
import LoginLayout from '../layouts/LoginLayout';
import RouteAuth from '../components/common/RouteAuth';
import RoutePrivateStudent from '../components/common/RoutePrivateStudent';
import { StudentLayout } from '../layouts/StudentLayout';
import ClassRoomLayout from '../layouts/ClassRoomLayout';
import OnBoarding from '../pages/onboarding';
import { BASE_ROUTES } from './constants';
import BecomeTeacherLayout from '../layouts/BecomeTeacherLayout';
import RoutePrivateBecomeTeacher from '../components/common/RoutePrivateBecomeTeacher';
import SuccessMessageLayout from '../layouts/SuccessMessageLayout';
import { LinkedInCallback } from '../components/Button/LinkedInCallback';

const MainRoute = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.ROOT} element={<AppLayout />}>
        {AppRoutes.map((appRoute: RouteElement, index: number) => {
          return <Route path={appRoute.path} element={appRoute.element} key={index} />;
        })}
      </Route>

      <Route
        path={BASE_ROUTES.BECOME_TEACHER}
        element={<RoutePrivateBecomeTeacher component={BecomeTeacherLayout} />}
      ></Route>

      <Route path={BASE_ROUTES.TEACHER} element={<RoutePrivateTeacher component={TeacherLayout} />}>
        {TeacherDashboardRoutes.map((appRoute: RouteElement, index: number) => {
          return (
            <Route
              path={appRoute.path}
              element={appRoute.element}
              key={index}
              index={appRoute.path === ''}
            />
          );
        })}
      </Route>

      <Route path={BASE_ROUTES.STUDENT} element={<RoutePrivateStudent component={StudentLayout} />}>
        {StudentRoutes.map((appRoute: RouteElement, index: number) => {
          return (
            <Route
              path={appRoute.path}
              element={appRoute.element}
              key={index}
              index={appRoute.path === ''}
            />
          );
        })}
      </Route>

      <Route path={BASE_ROUTES.AUTH} element={<RouteAuth component={LoginLayout} />}>
        {AuthRoutes.map((authRoute: RouteElement, index: number) => {
          return <Route path={authRoute.path} element={authRoute.element} key={index} />;
        })}
      </Route>

      <Route path={BASE_ROUTES.SUCCESS} element={<SuccessMessageLayout />}>
        {ShowMessageRoutes.map((successMessageRoute: RouteElement, index: number) => {
          return (
            <Route
              path={successMessageRoute.path}
              element={successMessageRoute.element}
              key={index}
            />
          );
        })}
      </Route>
      <Route path="/linkedin-callback" element={<LinkedInCallback />} />
      <Route path="error" element={<div>Error</div>} />
      <Route path="not-valid-teacher" element={<TeacherNotValid />} />
      <Route path="class-room/:id" element={<ClassRoomLayout />}></Route>
      {/* <Route path="onboarding" element={<OnBoarding />}></Route> */}
    </Routes>
  );
};

export default MainRoute;
