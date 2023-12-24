/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useDispatch, useSelector } from 'react-redux';
import axios from '../../plugins/axios';
import { logoutUser } from '../../store/modules/auth/actions';
import {
  ActionIcon,
  Avatar,
  Text,
  useMantineColorScheme,
  Menu,
  Divider,
  Button,
} from '@mantine/core';
import { getInitials } from '../../utils/helpers/typo';
import { formatName } from '../../utils/helpers/stringHelper';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setTailwindDarkMode } from '../../utils/helpers/darkMode';

export const ProfileMenu = () => {
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const roles = localStorage.getItem('roles');
  const access_token = localStorage.getItem('access_token');
  const role = roles?.split(',');

  const studentMenu = [{ label: 'My Learning', link: '/student/classroom' }];
  const teacherMenu = [
    { label: 'Teacher Dashboard', link: '/teacher' },
    { label: 'My Learning', link: '/student/classroom' },
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

  return (
    <>
      <div className="top-0 nav-area lg:flex font-bold px-xs">
        {access_token && userProfile && Object.keys(userProfile).length ? (
          <div className="cursor-pointer">
            <Menu trigger={'hover'}>
              <Menu.Target>
                <Avatar color={'primary'} variant={'filled'} radius={'xl'}>
                  {getInitials(userProfile.firstName, userProfile.lastName)}
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Link
                    className="menu-link"
                    to={role?.includes('TEACHER') ? `/teacher/profile` : '/student/profile'}
                  >
                    <div className={'flex'}>
                      <Avatar color={'primary'} variant={'filled'}>
                        {userProfile?.email[0] ?? ''}
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
                  ? teacherMenu.map((v: any, key) => (
                      <Link className="menu-link dark:text-white w-full flex" to={v.link} key={key}>
                        <Menu.Item>{v.label}</Menu.Item>
                      </Link>
                    ))
                  : studentMenu.map((v: any, key) => (
                      <Link className="menu-link dark:text-white w-full flex" to={v.link} key={key}>
                        <Menu.Item>{v.label}</Menu.Item>
                      </Link>
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
        ) : (
          <div className="hidden lg:flex gap-sm">
            <Button className="" onClick={() => navigate('/auth')}>
              Login
            </Button>
            <Button
              variant="outline"
              className={'ml-xs dark:text-white'}
              onClick={() => navigate('/auth/signup')}
            >
              Sign up
            </Button>{' '}
            <Divider size="md" orientation="vertical" className="mx-xs border-primary-1000" />
          </div>
        )}
      </div>
    </>
  );
};
