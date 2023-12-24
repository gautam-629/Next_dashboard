/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../store/modules/auth/actions';
import { Navigate } from 'react-router-dom';
import { Loader } from '@mantine/core';

export const RoutePrivateBecomeTeacher: any = ({ component: Component, ...rest }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [validated, setValidated] = useState(false);

  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const dispatch = useDispatch() as any;

  const isAuthenticated = !!localStorage.getItem('access_token');
  const isStudent = (): boolean => userProfile?.roles?.includes('STUDENT') ?? false;
  const isTeacher = (): boolean => userProfile?.roles?.includes('TEACHER') ?? false;

  const checkValidate = () => {
    if (Object.keys(userProfile).length === 0) {
      setIsLoading(true);
      return;
    }

    if (isAuthenticated && isTeacher()) {
      setValidated(false);
    }
    if (isAuthenticated && isStudent()) {
      setValidated(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    checkValidate();
  });

  if (isLoading || !Object.keys(userProfile).length) return;
  <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
    <Loader variant="bars" size="lg" />
  </div>;
  return validated ? <Component /> : <Navigate to="/auth/teacher-signup" />;
};

export default RoutePrivateBecomeTeacher;
