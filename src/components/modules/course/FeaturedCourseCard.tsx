/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useNavigate } from 'react-router-dom';
import { courseDateFormatter } from '../../../utils/helpers/datetime';
import { errorImageHandler } from '../../../utils/assets/imageurl';
export const FeaturedCourseCard = ({ course, index }: any) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
      <div className="grid grid-cols-2 gap-md p-none">
        <div>
          <img
            src={
              'https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=800'
            }
            className={'w-full   md:min-h-[200px] md:max-h-[200px]  h-full'}
            alt="No way!"
            onError={errorImageHandler}
          />
        </div>
        <div>
          <div className="card-details w-full ">
            <div className="text-sm font-semibold text-[#D05730]">
              {course?.category ?? 'Engineering'}
            </div>
            <div className="font-semibold  md:mt-[12px] text-lg md:mb-xs ">
              {course?.courseTitle ?? `Course ${index}`}
            </div>
            <div className={' font-normal text-[#667085] leading-6 two-line'}>
              {course?.shortDescription?.substring(0, 50) ??
                'How do you create compelling presentations that wow your colleagues and impress your managers?'}
            </div>

            <div className="couse-tutor flex items-center justify-start mt-sm md:mt-md">
              {/* <Avatar
                src={
                  'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'
                }
              /> */}
              <div className="">
                <img
                  src={`https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg`}
                  alt=""
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
              <div className={'pl-xs'}>
                <div className="text-sm font-medium">
                  {course?.teacher?.firstName ?? 'Tutor 1oe'}
                </div>
                <div className="text-sm text-gray-500 font-normal">
                  {course?.createdAt ? courseDateFormatter(course?.createdAt) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
