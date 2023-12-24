/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Avatar, Card } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { courseDateFormatter } from '../../../utils/helpers/datetime';
import { RightUpArrow } from '../../../utils/assets/image';
import { DefaultImage } from '../../../utils/assets/image';
import { errorImageHandler } from '../../../utils/assets/imageurl';

export const CourseCard = ({ course, index, defaultImage }: any) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
      <div className="">
        <img
          src={course?.courseImageUrl ?? ''}
          style={{ aspectRatio: '385 / 240' }}
          className={'w-full md:min-h-[200px] md:max-h-[240px] h-full object-fill'}
          onError={errorImageHandler}
        />
        <div>
          <div className="card-details w-ful ">
            <div className="text-sm font-semibold text-[#D05730] mt-lg">
              {course?.category ?? 'Engineering'}
            </div>
            <div className="flex justify-between items-center">
              <div className="font-semibold text-2xl  md:mt-[12px]  md:mb-xs ">
                {course?.courseTitle ?? `Course ${index}`}
              </div>
              <div className="">
                <img src={RightUpArrow} alt="" />
              </div>
            </div>
            <div className={' font-normal text-[#667085] leading-6 two-line'}>
              {course?.shortDescription?.substring(0, 50) ??
                'How do you create compelling presentations that wow your colleagues and impress your managers?'}
            </div>

            <div className="couse-tutor flex items-center justify-start mt-sm md:mt-sm">
              {/* <Avatar
                src={
                  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                }
              /> */}
              <div className="">
                <img
                  onError={errorImageHandler}
                  src={course?.courseImageUrl}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className={'pl-xs'}>
                <div className="text-sm font-medium">
                  {course?.teacher?.firstName ?? 'Tutor 1oe'}
                </div>
                <div className="text-sm text-gray-500 font-normal">
                  {course?.createdAt ? courseDateFormatter(course?.createdAt) : '12 July, 2022'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
