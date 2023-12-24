/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { SideNavbar } from '../components/modules/teacher/SideNavbar';
import { Outlet } from 'react-router';

import { useState } from 'react';
import { AppShell, Loader, useMantineTheme } from '@mantine/core';
import { TeacherNavBar } from '../components/common/TeacherNavBar';

import OnBoarding from '../pages/onboarding';
import AppNavbar from '../components/common/AppNavbar';
import useOnboardingActiveState from '../pages/onboarding/useOnboardingActiveState';
import { useLocation } from 'react-router-dom';

const TeacherLayout = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [isOnboardingSkipped, setIsOnboardingSkipped] = useState<boolean>(false);
  const { activeState, isLoading } = useOnboardingActiveState();
  const location = useLocation();
  {
    /* {isOnboardingSkipped ? ( */
  }
  if (isLoading)
    return (
      <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
        <Loader variant="bars" size="lg" />
      </div>
    );
  return (
    <>
      {isOnboardingSkipped || activeState < 0 ? (
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
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
          navbar={
            !location.pathname.includes('teacher/classroom/') ? (
              <SideNavbar opened={opened} />
            ) : (
              <></>
            )
          }
          header={<TeacherNavBar opened={opened} setOpened={setOpened} theme={theme} />}
        >
          <div className={'flex flex-col pr-sm'}>
            <div
              className={'overflow-auto relative p-sm teacher-main-body bg-white'}
              style={{
                height: 'calc(100vh - 70px)',
                // width: location.pathname.includes('teacher/classroom/')
                // ? '100%'
                // : 'calc(100vw - 82px)',
                width: '100%',
              }}
            >
              <Outlet />
            </div>
          </div>
        </AppShell>
      ) : (
        <div>
          <AppNavbar />
          <OnBoarding skip={setIsOnboardingSkipped} />
        </div>
      )}
    </>
  );
};

export default TeacherLayout;
