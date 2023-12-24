/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Avatar,
  Badge,
  Box,
  Divider,
  NavLink,
  Progress,
  Tabs,
  UnstyledButton,
} from '@mantine/core';
import { IconFingerprint, IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { MdOutlineAssessment } from 'react-icons/md';
import { GiRank1 } from 'react-icons/gi';
import { SiCoursera } from 'react-icons/si';
import SearchResult from '../assets/searchresult.png';
import Profile from '../assets/Avatar.png';
import { profile } from 'console';
import { errorImageHandler } from '../utils/assets/imageurl';

const TabSection = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="">
        <div className="flex flex-row-reverse mt-sm ml-lg mr-md">
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
        </div>
        <Divider className="mt-sm" />
        <div className="mt-1xl ml-auto">
          <Tabs defaultValue="chat" className="mt-md">
            <Tabs.List>
              <Tabs.Tab
                rightSection={
                  <Badge
                    sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                    variant="filled"
                    size="xs"
                    p={0}
                  >
                    6
                  </Badge>
                }
                value="All"
              >
                All
              </Tabs.Tab>
              <Tabs.Tab
                rightSection={
                  <Badge
                    sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                    variant="filled"
                    size="xs"
                    p={0}
                  >
                    6
                  </Badge>
                }
                value="Setting"
              >
                Setting
              </Tabs.Tab>
              <Tabs.Tab value="money">Completed</Tabs.Tab>
              <Tabs.Tab value="reassessments">Reassessments</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex mx-lg mt-lg ">
              <div>
                <img src={SearchResult} className=" w-[300px] h-[200px] rounded-lg mr-md" />
              </div>
              <div>
                <p className="text-orange-500">Design</p>
                <div className="text-3xl ">UX review presentations</div>
                <div className="flex mt-lg">
                  <img src={Profile} width="40px" height="40px" onError={errorImageHandler} />
                  <div className={'pl-xs'}>
                    <div className="text-md">Olivia Rhye</div>
                    <div className="text-sm text-gray-500">20 Jan 2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex mx-lg mt-lg ">
              <div>
                <img
                  onError={errorImageHandler}
                  src={SearchResult}
                  className=" w-[300px] h-[200px] rounded-lg mr-md"
                />
              </div>
              <div>
                <p className="text-orange-500">Design</p>
                <div className="text-3xl ">UX review presentations</div>
                <div className="flex mt-lg">
                  <img onError={errorImageHandler} src={Profile} width="40px" height="40px" />
                  <div className={'pl-xs'}>
                    <div className="text-md">Olivia Rhye</div>
                    <div className="text-sm text-gray-500">20 Jan 2022</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
