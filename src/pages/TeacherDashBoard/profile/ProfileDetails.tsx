/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import img from '../../../../src/assets/Anna.png';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Button, Card, Grid } from '@mantine/core';
import { formatDate } from '../../../utils/helpers/date.helper';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCalendar,
  IconMail,
  IconMapPin,
  IconPencil,
} from '@tabler/icons-react';
import { FacebookIcon, Linkedin } from '../../../utils/assets/image';

const ProfileDetails = () => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  console.log(userProfile, 'userProfile');
  const location = useLocation();
  const profile = location.pathname.includes('teacher') ? 'teacher' : 'student';
  return (
    <Card radius="md">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-xl text-secondary-dark">My Profile</p>
          <p className="font-normal text-base text-secondary-default  m-[0px] ">
            You can change your account settings here.
          </p>
        </div>
        <div className="flex items-center gap-sm">
          {' '}
          <div>
            <Link to={`/teacher/profile/${userProfile?._id}`}>
              <IconPencil />
            </Link>
          </div>
          {/* <Button> Edit Profile</Button> */}
        </div>
      </div>
      <Grid className={'w-full pt-md'}>
        <Grid.Col md={4} sm={12} lg={4} xl={4}>
          <div className="flex items-center flex-col">
            <Avatar src={img} className="object-cover" size={120} color={'primary'} />
            <div>
              <div className="text-xl font-bold text-center">
                {userProfile?.firstName} {userProfile?.lastName}
              </div>
              <p className="font-medium text-lg text-secondary-default">Software Engineer</p>
            </div>
            <div className="flex py-xs justify-center items-center w-full mt-md">
              <div>
                <a
                  href={userProfile?.socialMedia?.linkedIn ?? ''}
                  className={'profile-social-link'}
                >
                  <IconBrandLinkedin />
                </a>
              </div>
              <div className="">
                <a
                  href={userProfile?.socialMedia?.linkedIn ?? ''}
                  className={'profile-social-link'}
                >
                  <IconBrandFacebook />
                </a>
              </div>

              <div className="">
                <a
                  href={userProfile?.socialMedia?.linkedIn ?? ''}
                  className={'profile-social-link'}
                >
                  <IconBrandGithub />
                </a>
              </div>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col md={4} sm={12} lg={4} xl={4}>
          <div className="mt-md ">
            <div className="flex items-center">
              <IconMail />
              <div className="ml-xs">{userProfile?.email}</div>
            </div>{' '}
            <div className="flex items-center">
              <IconCalendar />
              <div className="ml-xs">{userProfile?.dob ? formatDate(userProfile?.dob) : 'N/A'}</div>
            </div>
            {userProfile?.address &&
              Object.values(userProfile?.address).every((v) => !!v && v !== '') && (
                <div className="flex items-center">
                  <IconMapPin />
                  <div className="ml-xs">
                    {userProfile?.address?.district + ','}
                    {userProfile?.address?.city + ','},{userProfile?.address?.country}
                  </div>
                </div>
              )}
            {/*<div className="grid grid-cols-3   text-base  w-full ">*/}
            {/*  <div className="flex flex-col">*/}
            {/*    <span className="font-bold text-secondary-dark">First Name</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {userProfile?.firstName}{' '}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col">*/}
            {/*    <span className="font-bold text-secondary-dark">Last Name</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {userProfile?.lastName}{' '}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col">*/}
            {/*    <span className="font-bold text-secondary-dark">Date of Birth</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {formatDate(userProfile?.dob)}{' '}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col my-md">*/}
            {/*    <span className="font-bold text-secondary-dark">District</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {userProfile?.address?.district}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col  my-md">*/}
            {/*    <span className="font-bold text-secondary-dark">City</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {userProfile?.address?.city}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col  my-md">*/}
            {/*    <span className="font-bold text-secondary-dark">Country</span>*/}
            {/*    <span className="font-normal text-secondary-default">*/}
            {/*      {userProfile?.address?.country}{' '}*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <div className="flex flex-col">*/}
            {/*    <span className="font-bold text-secondary-dark">Email</span>*/}
            {/*    <span className="font-normal text-secondary-default">{userProfile?.email}</span>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </Grid.Col>
        <Grid.Col md={4} sm={12} lg={4} xl={4}>
          <p className="font-bold text-lg">Bio Information</p>
          <p>
            Writing a short bio is an important part of introducing yourself to potential employers,
            clients or contacts. Your short bio has the potential to help you make positive
            impressions that can impact your professional development and success. If you are
            interested in learning how to write effective short bios, youll need to know what to
            include and what an effective short bio should look like. In this article, we discuss
            the purpose of a short bio, review steps and tips on how to write one and look at some
            short bio examples.
          </p>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ProfileDetails;
