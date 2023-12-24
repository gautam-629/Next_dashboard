/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Card } from '@mantine/core';
import { AI, DefaultImage } from '../../../utils/assets/image';
import { errorImageHandler } from '../../../utils/assets/imageurl';

export const ExploreCard = ({ course, index, defaultImage }: any) => {
  return (
    <div
      className=" flex gap-sm justify-center items-center  cursor-pointer p-xs py-sm"
      style={{ boxShadow: '0px 8px 16px 0px rgba(17, 17, 17, 0.06' }}
    >
      {/* <img
        onError={errorImageHandler}
        src={course?.courseImageUrl ?? ''}
        alt=""
        className={'w-[60px] h-[60px] object-cover'}
        style={{ aspectRatio: '16 / 9' }}
      />
      <div className="">
        <div className="  ">
          <div className="text-lg one-line-fixed-height font-semibold text-secondary-dark ">
            {course?.courseTitle ?? `Course ${index}`}
          </div>
          <p className="text-base font-normal text-secondary-default">8 Courses</p>
        </div>
      </div> */}

      <div className="my-sm">
        {' '}
        <div className="flex justify-center">
          {' '}
          <img src={AI} style={{ aspectRatio: '30 / 30' }} className="w-lg h-lg"></img>
        </div>
        <p className="text-xl font-bold text-center mt-sm">{course.title}</p>
      </div>
    </div>
  );
};
