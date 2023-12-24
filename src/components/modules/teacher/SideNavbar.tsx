/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Menu,
  Text,
  Button,
  Group,
  Avatar,
} from '@mantine/core';
import {
  IconLayoutDashboard,
  IconBook,
  IconSettings,
  IconLogout,
  IconBook2,
  IconUsers,
  Icon,
} from '@tabler/icons-react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoTransparent from '../../../assets/logo_small_transparent.svg';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import axios from '../../../plugins/axios';
import { logoutUser } from '../../../store/modules/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getInitials } from '../../../utils/helpers/typo';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      // backgroundColor: theme.fn.lighten(
      //   theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      //   0.1,
      // ),
      backgroundColor: 'rgba(0,0,0,0.12)',
      color: 'white',
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      // backgroundColor: theme.fn.lighten(
      //   theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      //   0.15,
      // ),
      backgroundColor: 'white',
      color: theme.colors.primary['7'],
    },
  },
}));

function NavbarLink(props: any) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={props.label} position="right">
      <UnstyledButton
        onClick={props.onClick}
        className={cx(classes.link, { [classes.active]: props.active })}
      >
        {props.children}
      </UnstyledButton>
    </Tooltip>
  );
}

type SidebarMenu = {
  icon: Icon;
  label: string;
  link: string;
};

const sidebarMenu: SidebarMenu[] = [
  { icon: IconLayoutDashboard, label: 'Dashboard', link: '/teacher' },
  { icon: IconBook, label: 'My Courses', link: '/teacher/mycourses' },
  { icon: IconUsers, label: 'Class Rooms', link: '/teacher/batches' },
  { icon: IconBook2, label: 'Assignment', link: '/teacher/assignment' },
];

export const SideNavbar = ({ opened }: { opened: boolean }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  const location = useLocation();
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const access_token = localStorage.getItem('access_token');

  const changeRoute = (index: number, link: string) => {
    navigate(link);
  };

  const links = sidebarMenu.map((link, index) => (
    <NavbarLink
      label={link.label}
      key={link.label}
      active={link.link === location.pathname}
      onClick={() => changeRoute(index, link.link)}
      className="teacher-nav"
    >
      <link.icon />
    </NavbarLink>
  ));
  const dispatch = useDispatch() as any;
  const roles = localStorage.getItem('roles');
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
    <Navbar
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        height: 'calc(100vh - 86px)',
        borderRadius: '8px',
        background: 'linear-gradient(#21a8db, #34c5b8)',
      }}
      hiddenBreakpoint="sm"
      width={{ sm: 82, lg: 82, md: 82 }}
      p="sm"
      m={'xs'}
      className={`${location.pathname.includes('/add-course') ? 'hidden' : ''} fade-in`}
      sx={(theme) => ({
        backgroundColor: '#1ea7dc',
      })}
    >
      <Navbar.Section mt={0} className={'flex items-center justify-center gap-[16px]'}>
        {/*<Center>*/}
        {/*  <Link to="/" className="no-underline logo-small">*/}
        {/*    <img onError={errorImageHandler} src={LogoTransparent} alt="" width="50" />*/}
        {/*  </Link>*/}
        {/*</Center>*/}
        {access_token && userProfile && Object.keys(userProfile).length && (
          <Avatar radius={'xl'} onClick={() => navigate('/teacher/profile')}>
            {getInitials(userProfile.firstName, userProfile.lastName)}
          </Avatar>
        )}
      </Navbar.Section>
      <Navbar.Section grow mt={50} className={'settings-btn '}>
        <Stack justify="center" spacing={0} className="gap-xs">
          {links}
          <div
            className={
              'hidden:md hidden:sm hidden:lg hidden:xl sidebar-settings-menu-stack block:xs'
            }
          >
            <NavbarLink
              label={'Settings'}
              active={'/teacher/settings' === location.pathname}
              onClick={() => changeRoute(-1, '/teacher/settings')}
            >
              <IconSettings className={'text-white'} />
            </NavbarLink>
          </div>
        </Stack>
      </Navbar.Section>
      <Navbar.Section className={'hidden:xs hidden:sm sidebar-settings-menu'}>
        <Stack justify="center" spacing={0}>
          {/* <Settings /> */}
          <Group position="center">
            <Menu position="right-end" trigger="hover">
              <Menu.Target>
                <div>
                  <NavbarLink label="Jitsi Config">
                    <IconSettings className={'text-white'} />
                  </NavbarLink>
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => navigate(`/teacher/settings`)}>GITSI Config</Menu.Item>
                {/* Other items ... */}
              </Menu.Dropdown>
            </Menu>
          </Group>
          <div className={'sidenav-logout-btn'}>
            <NavbarLink label="Logout">
              <IconLogout color={'white'} onClick={handleLogout} />
            </NavbarLink>
          </div>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
