/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Card, ActionIcon } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

const EnrolledCoursesCard = () => {
  return (
    <Card className={'h-full flex flex-col'}>
      <div>
        <div className="text-base mb-sm text-primary-700  font-medium  ">Enrolled Courses</div>
        <div className="overflow-auto flex-1 w-full">
          <div className="flex items-center">
            <div className="bg-blue-600 w-[4px] h-[35px]"></div>
            <div className="px-xs flex-grow">
              <p className="text-sm  font-medium  tracking-[0.25px] ">
                Data Structure and Algorithm
              </p>
              <p className="text-sm  font-normal  ">8:00 pm - 10:00 am </p>
            </div>
            <ActionIcon color={'primary'} variant={'subtle'}>
              <IconArrowRight />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnrolledCoursesCard;
