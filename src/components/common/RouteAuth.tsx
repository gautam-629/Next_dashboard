/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const RouteAuth: any = ({ component: Component, ...rest }: any) => {
  const token = !!localStorage.getItem('access_token');

  const [isAuthenticated, setAuthenticated] = useState(token);

  useEffect(() => {
    setAuthenticated(!!token);
  }, [token]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Component />;
  }
};

export default RouteAuth;
