/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { AspectRatio, Badge, Image, Progress } from '@mantine/core';
import { Grid, Input, Loader, Pagination, Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import image from '../../assets/image.png';
import { CourseNotFound, DefaultImage } from '../../utils/assets/image';
import { Card, Text, Button, Group } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

import { IconSearch } from '@tabler/icons-react';
import BatchCard from './BatchCard';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { getAllBatch } from '../../api/batch';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { errorNotification } from '../../utils/helpers/notifications';
import { StackTitleComponent } from '../../components/common/StackTitleComponent';
import Course from '../../assets/Anna.png';

import { TeacherBatchCard } from '../../components/modules/teacher/common/TeacherBatch.card';
import { BatchListingTab } from '../../components/modules/teacher/BatchListing.tab';
import { APIGetAllChildParentNodes } from '../../api/categories';

export const Batches = () => {
  const navigate = useNavigate();

  const createNewBatch = () => {
    navigate('/teacher/batches/create');
  };

  return (
    <Card className="bg-white rounded-lg ">
      <div className="flex justify-between mb-md">
        <div className="text-2xl font-normal">
          <StackTitleComponent>Class Rooms</StackTitleComponent>
        </div>
        <Group position="apart">
          {/* <Input
            variant="filled"
            icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
            placeholder="Search classRoom"
          /> */}
          <Button size={'md'} onClick={createNewBatch} variant="outline">
            Create Class Room
          </Button>
        </Group>
      </div>
      <Tabs defaultValue="ongoing">
        <Tabs.List>
          <Tabs.Tab value="ongoing" className="text-2xl">
            Ongoing
          </Tabs.Tab>
          <Tabs.Tab value="upcoming">Upcoming</Tabs.Tab>
          <Tabs.Tab value="pending">Pending</Tabs.Tab>
          {/* <Tabs.Tab value="completed">Completed</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="ongoing">
          <BatchListingTab status={'ongoing'} />
        </Tabs.Panel>
        <Tabs.Panel value="upcoming">
          <BatchListingTab status={'upcoming'} />
        </Tabs.Panel>
        <Tabs.Panel value="pending">
          <BatchListingTab status={'pending'} />
        </Tabs.Panel>
        <Tabs.Panel value="completed">
          <BatchListingTab status={'completed'} />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};
