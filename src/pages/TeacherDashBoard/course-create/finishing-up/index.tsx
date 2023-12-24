/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Grid } from '@mantine/core';
import React, { useEffect } from 'react';
import SecondaryDetails from '../SecondaryDetails';
import CourseContent from './CourseContent';

import CourseImage from './CourseImage';
import CourseIntro from './CourseIntro';
import { TeacherProfile } from './TeacherProfile';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyCourseById } from '../../../../store/modules/courses/getMyCourseById';
import CourseDetails from '../../../coursedetails';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../coursedetails/BreadCrumb';
import CourseDescription from '../../../coursedetails/CourseDescription';
import Tags from '../../../coursedetails/Tags';
import moment from 'moment';
import LearningObjective from '../../../coursedetails/LearningObjective';
import TabsList from '../../../coursedetails/TabsList';
import CourseOverView from '../../../coursedetails/CourseOverView';
import Requirements from '../../../coursedetails/Requirements';
import SideSection from '../../../coursedetails/SideSection';

const FinishingUp = () => {
  const { courseId } = useParams();
  const course = courseId;
  const dispatch = useDispatch() as any;
  const coursedetails = useSelector((state: any) => state.courseReducer.courseCreateData);
  useEffect(() => {
    if (course) {
      dispatch(getMyCourseById(course));
    }
  }, []);

  return (
    <section className="p-normal bg-white rounded-lg">
      {/* <CourseImage />
      <CourseDetails />

      <TeacherProfile />
      <CourseIntro />
      <CourseContent /> */}
      {/* <Grid p={0} gutter={0}>
        <Grid.Col span={8}>
          <div className="px-md mb-md">
            <div className="text-2xl font-bold mb-md">Finishing Up (Course Preview)</div>
            <CourseImage />
            <CourseDetails />
            <TeacherProfile />
            <CourseIntro />
            <CourseContent />
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="pt-sm sticky top-xl bg-courseCreateBg-500">
            <SecondaryDetails />
          </div>
        </Grid.Col>
      </Grid> */}
      <Grid className="">
        <Grid.Col lg={9} md={8} sm={8} xs={12}>
          <BreadCrumb courseTitle={coursedetails?.courseTitle} />
          <CourseDescription
            courseDescription={coursedetails?.longDescription}
            courseTitle={coursedetails?.courseTitle}
          />
          <Tags tags={coursedetails?.tags} />
          <TeacherProfile teacher={coursedetails?.teacher} />
          <p className="text-base font-semibold text-primary-1000 my-normal">
            Last Updated:
            {moment(coursedetails?.updatedAt).format('YYYY/MM/DD') ?? ''}
          </p>
          <Divider my="sm" />
          <LearningObjective />
          <TabsList />
          <CourseOverView />
          <Requirements requirements={coursedetails?.requirements} />
        </Grid.Col>
        <Grid.Col lg={3} md={4} sm={4} xs={12}>
          <SideSection />
        </Grid.Col>
      </Grid>
    </section>
  );
};

export default FinishingUp;
