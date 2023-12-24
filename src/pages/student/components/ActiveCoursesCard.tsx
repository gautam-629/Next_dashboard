/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import Button from '../../../components/Button';
import { Assessment, Assignment, Avatar, Clock, Lesson } from '../../../utils/assets/image';
import { Card, Group, RingProgress, Text } from '@mantine/core';

const ActiveCoursesCard = () => {
  return (
    <Card className={'h-full'}>
      <div className="">
        <p className="text-base   ">Active Courses</p>
        <div className="flex  items-center">
          <div className="mr-sm">
            <RingProgress
              sections={[{ value: 40, color: '#147aa6' }]}
              label={
                <Text className="font-semibold  text-primary-200  text-base  " align="center">
                  40%
                </Text>
              }
            />
          </div>
          <div className="text-base font-semibold   text-secondary-dark  ml-[18px]">
            <p> Data Structure and Algorithm</p>
            <Group position="apart" className="mt-[12px]">
              <div className="flex content-center items-center">
                <img src={Lesson} />

                <Text size="sm" className="ml-[4px] text-[12px] font-normal   ">
                  12 Lesson
                </Text>
              </div>
              <div className="flex  items-center ">
                <img src={Assignment} />

                <Text size="sm" className="ml-[4px] text-[12px] font-normal   ">
                  4 Assignments
                </Text>
              </div>
            </Group>
            <Group position="apart" className="my-[12px]">
              <div className="flex items-center">
                <img src={Clock} />

                <Text size="sm" className="ml-[4px] text-[12px] font-normal   ">
                  08:00 - 10:00
                </Text>
              </div>
              <div className="flex items-center">
                <img src={Assessment} />

                <Text size="sm" className="ml-[4px] text-[12px] font-normal   ">
                  0 Assessments
                </Text>
              </div>
            </Group>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={Avatar} alt="" className="w-[26px] h-[26px]  font-normal text-sm" />
            <p className="ml-[8px] font-normal text-sm  leading-[18px] tracking-[0.25px]">
              Prof. Rawan Sharma
            </p>
          </div>
          <Button variant="secondary">Continue</Button>
        </div>
      </div>
    </Card>
  );
};

export default ActiveCoursesCard;
