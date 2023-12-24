/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { CalenderIcon } from '../../../utils/assets/image';
import { Card, Badge, Button, Grid } from '@mantine/core';
import { IconClockHour4 } from '@tabler/icons-react';

const UpComing = () => {
  return (
    <>
      <Card>
        <div className="text-base  font-medium   text-primary-700 ">Upcoming Assessment</div>
        <div className={'mt-xs'}>
          <p className="text-md  font-normal   ">The Engineering Process</p>
          <Grid my={'xs'} p={0}>
            <Grid.Col md={6} xs={6} py={0}>
              <div className="flex items-center">
                <img src={CalenderIcon} alt="" className="w-[16px] h-[16px]" />
                <div className="ml-[12px]">
                  <p className=" text-xs ">Friday, 12 Sept 2022</p>
                  <p className=" text-base   font-medium">12:00 - 14:00</p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col md={6} xs={6} py={0}>
              <div className="flex items-center mt-[10px]">
                <div className={'text-primary-700'}>
                  <IconClockHour4 />
                </div>
                <div className="ml-[12px]">
                  <p className=" text-xs ">Duration</p>
                  <p className=" text-base   font-medium">2 hours</p>
                </div>
              </div>
            </Grid.Col>
          </Grid>
          <div className="flex items-center mt-sm">
            <div className="flex-grow">
              <div className={'text-xs'}>Starts in 15:00 minutes</div>
              <div className="flex justify-between items-center">
                <Badge color={'red'}>Not Started</Badge>
              </div>
            </div>
            <Button variant={'light'} size={'xs'}>
              Start Assessment
            </Button>
          </div>
        </div>
      </Card>
      <Card mt={'sm'}>
        <div className="text-base font-bold text-primary-700">Upcoming Deadline</div>
        <div className={'mt-sm'}>
          <div className="text-base  font-normal">Data Structure and Algorithm</div>
          <div className="flex items-center mt-[10px]">
            <div className={'text-primary-700'}>
              <IconClockHour4 />
            </div>
            <div className=" font-normal text-primary-200 px-xs">15hrs left for Submission</div>
          </div>
          <div className="flex justify-between">
            <Badge color={'red'}>Not Started</Badge>
            <div>
              <Button variant={'light'} size={'xs'}>
                Start Assessment
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default UpComing;
