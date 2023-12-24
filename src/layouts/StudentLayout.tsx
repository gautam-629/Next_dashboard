/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Link, Outlet, useLocation } from 'react-router-dom';

import { StudentNavbar } from '../components/common/StudentNavbar';
import { StudentSidebar } from '../components/common/StudentSidebar';
import { Clock, FordwardArrow, RightArrow, SmallCalender } from '../utils/assets/image';
import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import theme from 'tailwindcss/defaultTheme';
import { SideNavbar } from '../components/modules/teacher/SideNavbar';
import { useState } from 'react';

export const StudentLayout = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const location = useLocation();

  console.log(location);
  return (
    // <AppShell
    //   navbarOffsetBreakpoint="sm"
    //   asideOffsetBreakpoint="sm"
    //   navbar={<StudentSidebar />}
    //   header={<StudentNavbar />}
    // >
    //   <Outlet />
    // </AppShell>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: 0,
        },
        body: {
          navbar: {
            position: 'sticky',
            top: 0,
            left: 0,
          },
        },
      }}
      navbarOffsetBreakpoint="sm"
      header={<StudentNavbar />}
      navbar={!location.pathname.includes('student/classroom/') ? <StudentSidebar /> : <></>}
    >
      <div className={'flex flex-col pr-sm'}>
        <div
          className={'overflow-auto relative p-sm teacher-main-body'}
          style={{
            height: 'calc(100vh - 70px)',
            width: location.pathname.includes('student/classroom/') ? '100%' : 'calc(100vw - 82px)',
          }}
        >
          <Outlet />
        </div>
      </div>
    </AppShell>
  );
};
