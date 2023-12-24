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
import { Loader } from '@mantine/core';

export const RoutePrivateStudent: any = ({ component: Component, ...rest }: any) => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const dispatch = useDispatch() as any;
  const token = useSelector((state: any) => state.authReducer.token);

  const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const isStudent = (): boolean => userProfile?.roles?.includes('STUDENT') ?? false;
  const isStudentValid = (): boolean => userProfile?.isVerifiedTeacher ?? false;
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkValidate = () => {
    setLoading(true);
    if (isAuthenticated && isStudent() && Object.keys(userProfile).length) {
      setValidated(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    setAuthenticated(!!token);
    checkValidate();
  }, [token, userProfile]);
  return validated ? (
    <Component />
  ) : (
    <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
      <Loader variant="bars" size="lg" />
    </div>
  );
};

export default RoutePrivateStudent;
