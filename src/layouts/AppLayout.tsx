/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Outlet } from 'react-router-dom';
import AppNavBar from '../components/common/AppNavbar';
import { FooterLanding } from '../components/common/AppFooter';
import ScrollToTop from '../components/common/ScrollToTop';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../store/modules/auth/actions';
import { useEffect } from 'react';

const AppLayout = () => {
  const dispatch = useDispatch() as any;
  useEffect(() => {
    dispatch(getUserProfile());
  });
  return (
    <div className="">
      <ScrollToTop />
      <AppNavBar />
      <Outlet />
      <FooterLanding />
    </div>
  );
};

export default AppLayout;
