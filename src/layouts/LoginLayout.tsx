/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { FooterLanding } from '../components/common/AppFooter';
import AppNavBar from '../components/common/AppNavbar';
import ScrollToTop from '../components/common/ScrollToTop';
import Login from '../assets/LoginImg.jpg';
import { errorImageHandler } from '../utils/assets/imageurl';
import { Avatar } from '@mantine/core';
import User from '../assets/user10.png';
import User2 from '../assets/user11.png';
import User3 from '../assets/user12.png';

const LoginLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <AppNavBar />
      <section className="w-full flex gap-lg auth-section">
        <div className="hidden lg:block relative w-1/2">
          <div className="login-content relative z-50 flex flex-col justify-center h-full  gap-lg w-11/12">
            <p className="text-4xl xxl:text-5xl text-white font-medium p-none m-none">
              Transforming Learning for Tomorrow.
            </p>
            <p className="text-white font-normal text-xl p-none m-none">
              Empower your future with e-learning. Explore, learn, and excel on your terms. Join us
              today
            </p>
            <div className=" flex items-center gap-sm ">
              <Avatar.Group spacing="sm">
                <Avatar className="border border-white " src={User} radius="xl" />
                <Avatar className="border border-white " src={User2} radius="xl" />
                <Avatar className="border border-white " src={User3} radius="xl" />
              </Avatar.Group>
              <p className="text-white text-base font-normal m-none p-none">
                200+ Experienced Teachers
              </p>
            </div>
          </div>
          <img
            onError={errorImageHandler}
            className="w-full object-center object-cover h-full absolute z-10 top-none left-none"
            src={Login}
            alt=""
          />

          <div
            className="absolute h-full w-full z-20 top-none left-none "
            style={{ backgroundColor: 'rgba(26, 150, 234, 0.80)' }}
          ></div>
        </div>
        <div className="w-full lg:w-1/2">
          <Outlet />
        </div>
      </section>
      <FooterLanding />
    </div>
  );
};

export default LoginLayout;
