/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Card, Grid, Text } from '@mantine/core';
import { IconReport, IconChairDirector, IconUsers, IconBook2 } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { APIGetTeacherStats } from '../../../api/dashboard';
import { useNavigate } from 'react-router-dom';

export const TeacherStats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    assignments: 0,
    batches: 0,
    course: 0,
    students: 0,
  } as any);

  useEffect(() => {
    loadStats();
  }, []);
  const loadStats = async () => {
    const res = await APIGetTeacherStats();
    setStats(res.data);
  };

  return (
    <Card>
      <div className="text-2xl">Stats in summary</div>
      <Grid className={'pt-md'}>
        <Grid.Col sm={6} xs={6} md={3} pt={'sm'}>
          <div>
            <IconReport size={36} strokeWidth={2} color={'#1ea7dc'} />
            <div className="mt-sm font-bold text-md text-gray-600">Assignments</div>
            <Text className="font-bold text-4xl">{stats.assignments}</Text>
            {/*<div className="text-sm">Total Students enrolled</div>*/}
          </div>
        </Grid.Col>
        <Grid.Col sm={6} xs={6} md={3} pt={'sm'}>
          <div>
            <IconChairDirector
              size={36}
              strokeWidth={2}
              color={'#1ea7dc'}
              onClick={() => navigate(`/teacher/batches`)}
              className="cursor-pointer"
            />
            <div
              className="mt-sm font-bold text-md text-gray-600 cursor-pointer"
              onClick={() => navigate(`/teacher/batches`)}
            >
              Running Batches
            </div>
            <Text className="font-bold text-4xl">{stats.batches}</Text>
            {/*<div className="text-sm">Total Courses from June</div>*/}
          </div>
        </Grid.Col>
        <Grid.Col sm={6} xs={6} md={3} pt={'sm'}>
          <div>
            <IconBook2 size={36} strokeWidth={2} color={'#1ea7dc'} />
            <div className="mt-sm font-bold text-md text-gray-600">Total courses</div>
            <Text className="font-bold text-4xl">{stats.course}</Text>
            {/*<div className="text-sm">Total Current Sessions</div>*/}
          </div>
        </Grid.Col>
        <Grid.Col sm={6} xs={6} md={3} pt={'sm'}>
          <div>
            <IconUsers size={36} strokeWidth={2} color={'#1ea7dc'} />
            <div className="mt-sm font-bold text-md text-gray-600">Total students</div>
            <Text className="font-bold text-4xl">{stats.students}</Text>
            {/*<div className="text-sm">Total Sales from June</div>*/}
          </div>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
