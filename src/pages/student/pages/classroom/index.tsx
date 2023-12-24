/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Card, Text, Tabs } from '@mantine/core';
import { ActiveTeams } from '../../../../components/modules/classroom/ActiveTeams';
import { PendingTeams } from '../../../../components/modules/classroom/PendingTeams';

const courseData = [
  { classRoomTitle: 'Total Assignment', number: '5' },
  { classRoomTitle: 'Submitted', number: '3' },
  { classRoomTitle: 'Left Submission', number: '1' },
  { classRoomTitle: 'Reviewed', number: '8' },
];
const ClassRoom = () => {
  return (
    <Card className="w-full rounded-lg">
      <div className="text-2xl mb-xs">ClassRooms</div>
      <Tabs defaultValue={'Active'}>
        <Tabs.List>
          <Tabs.Tab value="Active">Approved ClassRooms</Tabs.Tab>
          <Tabs.Tab value="Pending Requests">Pending ClassRoom</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Active" pt="xs">
          <ActiveTeams />
        </Tabs.Panel>
        <Tabs.Panel value="Pending Requests" pt="xs">
          <PendingTeams />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};

export default ClassRoom;
