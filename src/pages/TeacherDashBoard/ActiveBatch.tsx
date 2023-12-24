/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';
import image from '../../assets/image.png';
import lessonimg from '../../assets/lesson.svg';
import assignmentImg from '../../assets/assignment.svg';
import assessmentImg from '../../assets/assessment.svg';
import { Avatar, Button, Card, Grid, Group, Progress, Text } from '@mantine/core';

import { useDispatch } from 'react-redux';
import { getAllPublishCourses } from '../../store/modules/courses/actions';
import { DefaultImage } from '../../utils/assets/image';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { errorNotification } from '../../utils/helpers/notifications';
import { useNavigate } from 'react-router-dom';
import { getAllBatch } from '../../api/batch';
import BatchCard from './BatchCard';

const ActiveBatch = () => {
  const [publishCourse, setPublishCourse] = useState([] as any);
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;
  useEffect(() => {
    (async () => {
      try {
        const publishCourseTemp: any = await getAllBatch();
        setPublishCourse(publishCourseTemp.data.results);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      // setCourseList(course.data.map(v=> GetCourseDTO(v)));
    })();
  }, []);
  return publishCourse?.length > 0 ? (
    <Card mt={'sm'} className=" ">
      <div className="flex justify-between items-center">
        <Text className="text-lg font-normal">Active Classes</Text>
        <Button variant={'light'} onClick={() => navigate('/teacher/batches')}>
          View All
        </Button>
      </div>
      <div className="h-[450px] overflow-y-auto mt-sm">
        {' '}
        <Grid className={'mt-md w-full'}>
          {publishCourse?.map((v: any, index: any) => (
            <Grid.Col key={index} className="bg-GrayscaleB-500 rounded-lg p-md">
              <BatchCard
                image={image}
                batchDetails={v}
                defaultImage={DefaultImage}
                open={open}
                close={close}
              />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Card>
  ) : (
    <div></div>
  );
};

export default ActiveBatch;
