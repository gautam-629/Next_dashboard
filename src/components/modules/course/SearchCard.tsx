/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Avatar, Card } from '@mantine/core';
import { Link } from 'react-router-dom';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { DummyProfile } from '../../../utils/assets/image';

export const SearchCard = ({ course, index }: any) => {
  console.log(course, '@coursedetails');
  return (
    <Card className="border-none max-h-[500px] h-full" p={'xs'}>
      <Link to={`/course-details-page/${course._id}`}>
        <img
          src={course.courseImageUrl ?? ''}
          onError={errorImageHandler}
          alt="Image"
          className={'w-full object-cover rounded-lg'}
          style={{ aspectRatio: '16 / 9' }}
        />
      </Link>
      <div className="card-details mt-sm">
        <div className="font-normal text-2xl">
          {course?.courseTitle ?? 'UX review presentations'}
        </div>

        <div className={'font-normal text-lg mt-sm'}>
          {course?.shortDescription?.substring(0, 150) ??
            ' Programming Language. an open source programming language that makes it easy to build simple, reliable, and efficient software.'}
        </div>

        <div className="couse-tutor flex mt-sm">
          <Avatar
            src={course?.teacherDetails?.avatar}
            onError={DummyProfile}
            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
          />

          <div className={'pl-xs'}>
            <div className="font-medium text-tiny">
              {course?.teacherDetails?.firstName ??
                'Tutor' + course?.teacherDetails?.lastName ??
                'doe'}
            </div>
            <div className="text-sm text-gray-500">{course?.createdAt ?? 'Teacher'}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
