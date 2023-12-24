/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { JaaSMeeting } from '@jitsi/react-sdk';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIGetClassSession } from '../../api/classRoom';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';
import { Participants, image } from '../../utils/assets/image';
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Loader,
  Space,
  Tabs,
  Text,
} from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { RedPill } from '../../components/common/RedPill';
import { errorNotification } from '../../utils/helpers/notifications';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const CommonClassRoom = () => {
  const navigate = useNavigate();
  const [classRoomJwt, setClassRoomJwt] = useState('');
  const query = useQuery();
  const ClassRoomId = query.get('classRoom') as string;

  useEffect(() => {
    (async () => {
      try {
        const jwtToken = await APIGetClassSession(ClassRoomId);
        setClassRoomJwt(jwtToken.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

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
                  <Group className="items-center">
                    <ActionIcon onClick={() => navigate(-1)} className="ml-sm bg-slate-200">
                      <IconChevronLeft />
                    </ActionIcon>
                    <Text className="text-sm font-medium ">Topic: {ClassRoomId}</Text>
                    <Badge color="gray">
                      <div className="flex items-center w-">
                        <img src={Participants} alt="" className="h-[16px] w-[16px] " />
                        <Text className="ml-xs">Team</Text>
                      </div>
                    </Badge>
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
                <JaaSMeeting
                  appId={'vpaas-magic-cookie-cd153e69b4dd4123a206650cfbffccde'}
                  roomName={ClassRoomId}
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
                  getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = '90vh';
                  }}
                  spinner={LoadingSpinner}
                  onReadyToClose={() => navigate('/')}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
