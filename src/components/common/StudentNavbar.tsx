/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Divider,
  ActionIcon,
  Header,
  Menu,
  useMantineColorScheme,
  Text,
  Avatar,
  MediaQuery,
  Center,
  Button,
  Badge,
} from '@mantine/core';
import axios from '../../plugins/axios';
import { setTailwindDarkMode } from '../../utils/helpers/darkMode';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../store/modules/auth/actions';
import { IconBell, IconMoonStars, IconSun } from '@tabler/icons-react';

import { formatName } from '../../utils/helpers/stringHelper';
import { Logo } from './Logo';
import { getInitials } from '../../utils/helpers/typo';
import { errorImageHandler } from '../../utils/assets/imageurl';
import LogoTransparent from '../../assets/RA_logo.png';
import {
  setClassroomStatus,
  setClassroomWildcardComponent,
  setDrawer,
  setWildCardDetails,
} from '../../store/modules/classroom/actions';
import { Participants } from '../../utils/assets/image';

export const StudentNavbar = () => {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);

  const showDrawer = useSelector((state: any) => state.classRoomReducer.showDrawer);
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);
  const batch = useSelector((state: any) => state.classRoomReducer.batch);
  const wildcardClassroomComponent = useSelector(
    (state: any) => state.classRoomReducer.wildcardClassroomComponent,
  );
  const roles = localStorage.getItem('roles');

  const role = roles?.split(',');
  const location = useLocation();

  const studentRoutes = [
    { label: 'Dashboard', link: '/student/classroom' },
    // { label: 'My Learning', link: '/student' },
  ];
  const teacherRoutes = [
    { label: 'Mentor  Profile', link: '/teacher' },
    { label: 'My Learning', link: '/student' },
    { label: 'Dashboard', link: '/student' },
  ];

  const changeColorScheme = () => {
    setTailwindDarkMode();
    toggleColorScheme();
  };
  const handleLogout = async () => {
    await axios
      .post('/logout', {})
      .then(async (res) => {
        if (res.data?.messageCode === 'LOGOUT_SUCCESS') {
          localStorage.clear();
          dispatch(logoutUser());
          navigate('/auth');
        }
      })
      .catch((res) => {
        console.log(res, '@log error');
      });
  };

  const showSidebarDrawerAction = () => {
    if (isClassroomRunning && wildcardClassroomComponent !== 'default') {
      return true;
    }
  };

  return (
    <Header
      height={{ base: 70, md: 70 }}
      style={{ position: 'sticky', top: 0, left: 0 }}
      px={'sm'}
      py={0}
    >
      <div className="flex justify-between bg-white items-center h-full">
        {/*<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>*/}
        {/*  <div className="student-nav-logo">/!*<Logo />*!/</div>*/}
        {/*</MediaQuery>*/}
        {/*<MediaQuery largerThan="sm" styles={{ display: 'none' }}>*/}
        {/*  <Center>*/}
        {/*    <Link to="/" className="no-underline logo-small">*/}
        {/*      <img onError={errorImageHandler} src={LogoTransparent} alt="" width="50" />*/}
        {/*    </Link>*/}
        {/*  </Center>*/}
        {/*</MediaQuery>*/}
        <div className="right-content w-full flex justify-between items-center">
          <Center>
            <Link to="/" className="no-underline logo-small">
              <img
                onError={errorImageHandler}
                src={LogoTransparent}
                alt=""
                style={{ height: '50px' }}
                height="50"
              />
            </Link>
          </Center>
          <div className="flex items-center">
            {/* {location.pathname.includes('/student/classroom/') && showSidebarDrawerAction() && (
              <ActionIcon onClick={() => dispatch(setDrawer(!showDrawer))}>
                <LayoutSidebar />
              </ActionIcon>
            )} */}
            {location.pathname.includes('/student/classroom/') && (
              <div className={'mr-xs flex items-center'}>
                {/* <Text className="text-xl font-semibold leading-9 tracking-wider text-secondary-dark mr-lg">
                  {batch?.batchName ?? ''}
                </Text> */}
                <Badge color="gray" className="mr-md">
                  <div className="flex items-center w-">
                    <img src={Participants} alt="" className="h-[16px] w-[16px] " />
                    <Text className="ml-xs">{batch?.batchName ?? ''}</Text>
                  </div>
                </Badge>
                {isClassroomRunning ? (
                  <Button
                    onClick={() => {
                      // dispatch(setClassroomWildcardComponent('default'));

                      dispatch(setClassroomStatus(false));
                      // dispatch(showEndClassRoomDialog(true));
                      // dispatch(setWildCardDetails(activeTopic, 'description'));
                    }}
                    className="bg-red-300 mr-md"
                    radius={'md'}
                  >
                    Leave Class
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(setClassroomStatus(true));
                      // dispatch(setClassroomWildcardComponent('default'));
                      dispatch(setWildCardDetails(activeTopic, 'description'));
                    }}
                    className="bg-primary-1000 mr-md"
                    radius={'md'}
                  >
                    Join Class
                  </Button>
                )}
              </div>
            )}
            <div className="notif w-[24px] h-[24px]">
              <ActionIcon variant={'light'}>
                <IconBell />
              </ActionIcon>
            </div>
            <div className="cursor-pointer ml-sm">
              <Menu trigger={'hover'}>
                <Menu.Target>
                  <div className="profile-img">
                    <Avatar color={'primary'} variant={'filled'}>
                      {getInitials(userProfile.firstName, userProfile.lastName)}
                    </Avatar>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>
                    <Link
                      className="menu-link"
                      to={
                        location.pathname.includes('teacher')
                          ? '/teacher/profile'
                          : '/student/profile'
                      }
                    >
                      <div className={'flex'}>
                        <Avatar color={'primary'} variant={'filled'} radius={'xl'}>
                          {getInitials(userProfile.firstName, userProfile.lastName)}
                        </Avatar>
                        <div className={'px-md'}>
                          <Text className="font-bold capitalize dark:text-white">
                            {formatName(userProfile.firstName, userProfile.lastName)}
                          </Text>
                          <Text className={'dark:text-white'}>{userProfile.email}</Text>
                        </div>
                      </div>
                    </Link>
                  </Menu.Item>
                  {role?.includes('TEACHER')
                    ? teacherRoutes.map((v: any, key) => (
                        <Menu.Item key={key}>
                          <Link className="menu-link dark:text-white w-full flex" to={v.link}>
                            {v.label}
                          </Link>
                        </Menu.Item>
                      ))
                    : studentRoutes.map((v: any, key) => (
                        <Menu.Item key={key}>
                          <Link className="menu-link dark:text-white w-full flex" to={v.link}>
                            {v.label}
                          </Link>
                        </Menu.Item>
                      ))}
                  <Divider />
                  <div className={'flex dark-mode-button items-center justify-between'}>
                    <div className={'font-normal dark:text-white'}>Dark mode</div>
                    <ActionIcon
                      variant="outline"
                      id={'theme-toggle'}
                      color={dark ? 'yellow' : 'blue'}
                      onClick={() => changeColorScheme()}
                      title="Toggle color scheme"
                    >
                      {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                    </ActionIcon>
                  </div>
                  <Menu.Item onClick={handleLogout} className={'dark:text-white'}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};
