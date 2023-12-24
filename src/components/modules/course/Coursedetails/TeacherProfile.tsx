/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Space, Text } from '@mantine/core';

import Avatar from '../../../../assets/Avatar.png';

import { useNavigate } from 'react-router-dom';
import {
  DefaultImage,
  DummyProfile,
  Facebook,
  LinkedIn,
  TeacherImage,
  TwitterIcon,
} from '../../../../utils/assets/image';

interface TeacherProps {
  teacher?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    currentPosition?: string;
    avatar?: string;
    bio?: string;
    socialMedia?: {
      facebook?: string;
      linkedIn?: string;
      gitHub?: string;
    };
  };
  updatedAt?: Date;
}

export const TeacherProfile = (teacherDetails: any) => {
  console.log(teacherDetails, '@teacherDetails');
  const firstName = teacherDetails?.teacher?.firstName ?? '';
  const lastName = teacherDetails?.teacher?.lastName ?? '';
  const fullName = firstName.concat(' ', lastName);
  const currentPosition = teacherDetails?.teacher?.currentPosition || 'Profession';
  const updatedAt = teacherDetails?.updatedAt || '';
  const navigate = useNavigate();
  console.log(teacherDetails?.updatedAt, '@date');
  const faceBookUrl = teacherDetails?.teacher?.socialMedia?.facebook || '';
  const linkedInUrl = teacherDetails?.teacher?.socialMedia?.linkedIn || '';
  const gitHubUrl = teacherDetails?.teacher?.socialMedia?.gitHub || '';
  const teacherProfile = (id: string) => {
    console.log(id, '@id');
  };
  return (
    <div>
      <div className="flex justify-between">
        {' '}
        <div
          className="flex w-full items-center"
          onClick={() => navigate(`/profile/teacher/${teacherDetails?.teacher?._id}`)}
        >
          {' '}
          <img
            className="cursor-pointer"
            src={teacherDetails.teacher?.avatar ?? DummyProfile}
            width="50px"
            height="50px"
            // onClick={() => navigate(`/course/teacher`)}
            style={{ borderRadius: '50%' }}
            onError={DummyProfile}
            onClick={() => navigate(`profile/teacher/${teacherDetails?.teacher?._id}`)}
          />
          <div className="flex flex-col mx-sm">
            <span className="text-lg font-semibold">{fullName ?? 'Anoop Sahi'}</span>
            <span className="text-base font-semibold">{currentPosition ?? ''}</span>
          </div>
        </div>
        <div className="flex gap-sm">
          <img
            onClick={() => window.open(gitHubUrl, '_blank')}
            src={TwitterIcon}
            className="w-[45px] h-[45px] border-2 p-[5px] rounded-md border-solid border-Grayscale-400 cursor-pointer "
          ></img>
          <img
            onClick={() => window.open(faceBookUrl, '_blank')}
            src={Facebook}
            className="w-[45px] h-[45px] border-2 p-[5px] rounded-md border-solid border-Grayscale-400 cursor-pointer  "
          ></img>
          <img
            onClick={() => window.open(linkedInUrl, '_blank')}
            src={LinkedIn}
            className="w-[45px] h-[45px] p-[5px] border-2 rounded-md border-solid border-Grayscale-400 cursor-pointer  "
          ></img>
        </div>
      </div>

      {/* <p className="text-base font-semibold text-primary-1000 my-normal">
        Last Updated:
        {moment(updatedAt).format('YYYY/MM/DD') ?? ''}
      </p> */}

      {/* <div className="flex justify-between">
        <Text size={'xl'} weight={'bold'}>
          {course.currency}. {course.coursePrice?.toLocaleString()}
        </Text>
      </div> */}
    </div>
  );
};
