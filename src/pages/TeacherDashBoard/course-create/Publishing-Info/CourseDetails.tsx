/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Space, Text } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Publish from '../../../../assets/publish.jpg';

const CourseDetails = () => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <div className="flex items-center ">
      <img src={courseCreateData.courseImageUrl} className="w-[60%] mr-md rounded-[6px]" />
      <div className="flex flex-col justify-center ">
        <div className="mb-md">
          <Text className="  font-medium mb-[4px] text-lg   text-secondary-dark">Course Title</Text>

          <Text className=" font-medium text-base   text-secondary-default">
            {courseCreateData?.courseTitle ?? 'Introduction to Big Data'}
          </Text>
        </div>
        <div>
          <Text className=" font-medium mb-[4px] text-lg   text-secondary-dark">Category</Text>

          <Text className=" font-medium text-base   text-secondary-default">
            {courseCreateData?.category[0]?.categoryTitle ?? 'IT and Telecommunication'}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
