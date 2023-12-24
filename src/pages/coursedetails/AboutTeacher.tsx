import { Button, Grid } from '@mantine/core';
import React from 'react';
import {
  DummyProfile,
  Facebook,
  LinkedIn,
  TeacherImage,
  TwitterIcon,
} from '../../utils/assets/image';

interface TeacherProps {
  teacher: {
    firstName: string;
    lastName: string;
    currentPosition: string;
    bio?: string | undefined;
    avatar?: string;
    socialMedia: {
      facebook?: string;
      linkedIn?: string;
      gitHub?: string;
    };
  };
}
const AboutTeacher = (teacherDetails: TeacherProps) => {
  const firstName = teacherDetails?.teacher?.firstName ?? '';
  const lastName = teacherDetails?.teacher?.lastName ?? '';
  const fullName = firstName.concat(' ', lastName);
  const currentPosition = teacherDetails?.teacher?.currentPosition || '';
  const faceBookUrl = teacherDetails?.teacher?.socialMedia?.facebook || '';
  const linkedInUrl = teacherDetails?.teacher?.socialMedia?.linkedIn || '';
  const gitHubUrl = teacherDetails?.teacher?.socialMedia?.gitHub || '';
  return (
    <div className=" py-2xl">
      <p className="text-2xl font-bold">AboutTeacher</p>
      <Grid className="flex md:flex-row xs:flex-col w-full mt-md">
        <Grid.Col md={8} xs={12} className="flex gap-md items-center">
          <div className="">
            <img
              src={teacherDetails.teacher?.avatar || DummyProfile}
              style={{
                height: '80px',
                width: '80px',
                borderRadius: '50%',
              }}
            />
          </div>
          <div>
            {' '}
            <p className="text-lg font-semibold">{fullName}</p>
            <p className="text-lg font-semibold mb-xs">{currentPosition}</p>
            <p className="text-base font-medium ">
              {teacherDetails?.teacher?.bio ??
                '   Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem'}
            </p>
          </div>
        </Grid.Col>
        <Grid.Col md={4} xs={12} className="flex flex-row-reverse items-center w-full">
          {' '}
          <div className="flex gap-lg">
            <img
              src={TwitterIcon}
              className="w-[45px] h-[45px] border-2 p-[5px] rounded-md border-solid border-Grayscale-400"
              onClick={() => window.open(gitHubUrl, '_blank')}
            ></img>
            <img
              onClick={() => window.open(faceBookUrl, '_blank')}
              src={Facebook}
              className="w-[45px] h-[45px] border-2 p-[5px] rounded-md border-solid border-Grayscale-400"
            ></img>
            <img
              onClick={() => window.open(linkedInUrl, '_blank')}
              src={LinkedIn}
              className="w-[45px] h-[45px] p-[5px] border-2 rounded-md border-solid border-Grayscale-400"
            ></img>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AboutTeacher;
