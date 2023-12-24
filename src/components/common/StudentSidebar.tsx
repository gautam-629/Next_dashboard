/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IconCalendarStats } from '@tabler/icons-react';

import { Book2, Gauge, CalendarStats, Article } from 'tabler-icons-react';
import { Avatar, Center, Navbar, Tooltip } from '@mantine/core';
import { errorImageHandler } from '../../utils/assets/imageurl';
import LogoTransparent from '../../assets/logo_small_transparent.svg';
import { getInitials } from '../../utils/helpers/typo';
import { useSelector } from 'react-redux';

export const StudentSidebar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  const studentMenu = [
    // { icon: <Gauge />, label: 'Dashboard', link: '/student/' },

    // temporary disable don't remove { icon: <Book2 />, label: 'Courses', link: '/student/tasks' },
    { icon: <CalendarStats />, label: 'Classroom', link: '/student/classroom' },
    { icon: <Article />, label: 'Blogs', link: '/student/blogs' },
  ];
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const access_token = localStorage.getItem('access_token');
  return (
    <div className="sidebar-section student-nav py-xs m-xs rounded-lg ">
      <div className="sidebar-section  h-full">
        <div className="sidebar-content flex justify-center flex-col">
          <Center className={'mt-sm'}>
            {access_token && userProfile && Object.keys(userProfile).length && (
              <Avatar radius={'xl'} onClick={() => navigate('/student/profile')}>
                {getInitials(userProfile.firstName, userProfile.lastName)}
              </Avatar>
            )}
          </Center>
          <ul className="list-none px-sm mt-md">
            {studentMenu.map((data, index) => {
              return (
                <li key={index} title={data.label}>
                  <NavLink
                    to={data.link}
                    className="text-white no-underline student-nav-link flex items-center justify-center rounded-md p-sm my-xs"
                  >
                    <Tooltip label={data.label}>{data.icon}</Tooltip>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
