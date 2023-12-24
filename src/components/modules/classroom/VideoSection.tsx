/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { JaaSMeeting } from '@jitsi/react-sdk';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';
import { ActionIcon, Badge, Button, Divider, Group, Loader, Text } from '@mantine/core';
import { IconMenu } from '@tabler/icons-react';
import { APIGetClassSession } from '../../../api/classRoom';
import { errorNotification } from '../../../utils/helpers/notifications';
import { Participants } from '../../../utils/assets/image';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useSelector } from 'react-redux';
import { setDrawer } from '../../../store/modules/classroom/actions';
import { useDispatch } from 'react-redux';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const VideoSection = (props: any) => {
  const navigate = useNavigate();
  const [classRoomJwt, setClassRoomJwt] = useState('');
  const batch = useSelector((state: any) => state.classRoomReducer.batch);
  // const query = useQuery();
  // const ClassRoomId = query.get('classRoom') as string;
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const showDrawer = useSelector((state: any) => state.classRoomReducer.showDrawer);

  const { videoSize, setVideoSize } = props;

  const dispatch = useDispatch() as any;

  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);
  const wildcardClassroomComponent = useSelector(
    (state: any) => state.classRoomReducer.wildcardClassroomComponent,
  );

  const showSidebarDrawerAction = () => {
    if (isClassroomRunning && wildcardClassroomComponent !== 'default') {
      // if (isClassroomRunning) {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      if (batch?.classRoom !== '-1') {
        try {
          const jwtToken = await APIGetClassSession(batch.classRoom);
          setClassRoomJwt(jwtToken.data);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      }
    })();
  }, [batch]);

  return (
    <div>
      {classRoomJwt?.length === 0 ? (
        <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
          <Loader variant="bars" size="lg" />
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-3">
              <div className="col-span-3">
                <div className="my-xs">
                  <Group className="items-center flex justify-between items-center">
                    {/*<ActionIcon onClick={() => navigate(-1)} className="ml-sm bg-slate-200">*/}
                    {/*  <ChevronLeft />*/}
                    {/*</ActionIcon>*/}
                    <div className="flex">
                      {/* <Text className="text-sm font-medium ">
                        Topic: {'64a62fab973bf7abf9d49789'}
                      </Text>
                      <Badge color="gray">
                        <div className="flex items-center w-">
                          <img src={Participants} alt="" className="h-[16px] w-[16px] " />
                          <Text className="ml-xs">Team</Text>
                        </div>
                      </Badge> */}
                      {videoSize == 'small' ? (
                        <ActionIcon
                          onClick={() => {
                            setVideoSize('fullscreen');
                          }}
                        >
                          <BiFullscreen size={24} />
                        </ActionIcon>
                      ) : (
                        <ActionIcon
                          onClick={() => {
                            setVideoSize('small');
                          }}
                        >
                          <BiExitFullscreen size={24} />
                        </ActionIcon>
                      )}
                    </div>
                    <div>
                      {/* {location.pathname.includes('/teacher/classroom/') && */}
                      {showSidebarDrawerAction() && (
                        <Button
                          variant="outline"
                          onClick={() => dispatch(setDrawer(!showDrawer))}
                          className="flex items-center"
                        >
                          {/* <LayoutSidebar /> */}
                          {/* <Menu /> Course Details */}
                          <IconMenu className="mr-xs" />
                          <Text>Course Details</Text>
                        </Button>
                      )}
                    </div>
                  </Group>{' '}
                  <Divider className="my-xs" />
                  {/* <div className="ml-sm flex items-center">
                    <img src={Participants} alt="" className="h-[20px] w-[20px] mr-xs" />
                    <Text className="flex mr-lg">
                      Invited to call: <RedPill title="20" color="green-pill"></RedPill>
                    </Text>
                    <Text className="flex items-center">
                      Absent People: <RedPill title="10"></RedPill>
                    </Text>
                  </div> */}
                </div>
                {batch.classRoom !== '-1' && (
                  <JaaSMeeting
                    appId={'vpaas-magic-cookie-cd153e69b4dd4123a206650cfbffccde'}
                    roomName={batch?.classRoom}
                    jwt={classRoomJwt}
                    configOverwrite={{
                      disableThirdPartyRequests: true,
                      disableLocalVideoFlip: true,
                      backgroundAlpha: 0.5,
                    }}
                    interfaceConfigOverwrite={{
                      VIDEO_LAYOUT_FIT: 'nocrop',
                      MOBILE_APP_PROMO: false,
                      TILE_VIEW_MAX_COLUMNS: 4,
                    }}
                    userInfo={{
                      displayName: userProfile?.firstName ?? '' + ' ' + userProfile?.lastName ?? '',
                      email: userProfile?.email ?? '',
                    }}
                    getIFrameRef={(iframeRef) => {
                      iframeRef.style.height = '90vh';
                    }}
                    spinner={LoadingSpinner}
                    onReadyToClose={() => navigate('/')}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
