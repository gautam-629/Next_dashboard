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
import { Navigate } from 'react-router-dom';
import { getUserProfile } from '../../store/modules/auth/actions';
import { BASE_ROUTES } from '../../routes/constants';
import { Loader } from '@mantine/core';

export const RoutePrivateTeacher: any = ({ component: Component, ...rest }: any) => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const dispatch = useDispatch() as any;

  const token = localStorage.getItem('access_token');

  const [isAuthenticated, setAuthenticated] = useState(!!token);

  const isTeacher = (): boolean => userProfile?.roles?.includes('TEACHER') ?? false;
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const checkValidate = () => {
    setLoading(true);
    if (isAuthenticated && isTeacher() && Object.keys(userProfile).length) {
      setIsValid(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  useEffect(() => {
    setAuthenticated(!!token);
    checkValidate();
  }, [userProfile]);

  if (isLoading)
    return (
      <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
        <Loader variant="bars" size="lg" />
      </div>
    );
  return isValid ? <Component /> : <Navigate to={BASE_ROUTES.ROOT} />;
};

export default RoutePrivateTeacher;
