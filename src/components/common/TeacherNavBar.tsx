/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  ActionIcon,
  Badge,
  Burger,
  Button,
  Center,
  Header,
  MediaQuery,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { ProfileMenu } from './ProfileMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconChevronLeft } from '@tabler/icons-react';
import { errorImageHandler } from '../../utils/assets/imageurl';
import LogoTransparent from '../../assets/RA_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  setClassroomStatus,
  setClassroomWildcardComponent,
  setDrawer,
  showEndClassRoomDialog,
  setWildCardDetails,
} from '../../store/modules/classroom/actions';
import { Participants } from '../../utils/assets/image';

export const TeacherNavBar = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch() as any;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);

  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const showDrawer = useSelector((state: any) => state.classRoomReducer.showDrawer);
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);
  const batch = useSelector((state: any) => state.classRoomReducer.batch);
  const wildcardClassroomComponent = useSelector(
    (state: any) => state.classRoomReducer.wildcardClassroomComponent,
  );
  // const showSidebarDrawerAction = () => {
  //   if (isClassroomRunning && wildcardClassroomComponent !== 'default') {
  //     return true;
  //   }
  // };

  return (
    <Header
      height={{ base: 70, md: 70 }}
      className="pt-lg pb-md"
      px={'sm'}
      style={{ position: 'sticky', top: 0, left: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        {/*<MediaQuery largerThan="sm" styles={{ display: 'none' }}>*/}
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
        {/*</MediaQuery>*/}
        {location.pathname.includes('add-course') && (
          <div className="flex items-center">
            <ActionIcon onClick={() => navigate(-1)}>
              <IconChevronLeft />
            </ActionIcon>
            <div className={'font-bold text-xl pl-md'}>Add Course</div>
          </div>
        )}

        <div className="flex flex-grow justify-end">
          {/* {location.pathname.includes('/teacher/classroom/') && showSidebarDrawerAction() && (
            <ActionIcon onClick={() => dispatch(setDrawer(!showDrawer))}>
              <LayoutSidebar />
            </ActionIcon>
          )} */}
          {location.pathname.includes('/teacher/classroom/') && (
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

                    // dispatch(setClassroomStatus(false));
                    dispatch(showEndClassRoomDialog(true));
                    // dispatch(setWildCardDetails(activeTopic, 'description'));
                  }}
                  className="bg-red-300 mr-md"
                  radius={'md'}
                >
                  End Class
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    dispatch(setClassroomStatus(true));
                    // dispatch(setClassroomWildcardComponent('default'));
                    // dispatch(setWildCardDetails(activeTopic, 'description'));
                  }}
                  className="bg-primary-1000 mr-md"
                  radius={'md'}
                >
                  Join Class
                </Button>
              )}
            </div>
          )}
          <div className="ml-xs">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </Header>
  );
};
