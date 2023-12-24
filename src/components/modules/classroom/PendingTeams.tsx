/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';
import axios from '../../../plugins/axios';
import { errorNotification } from '../../../utils/helpers/notifications';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { CourseNotFound } from '../../../utils/assets/image';
import { Badge, Button, Card, Grid, Progress, Text } from '@mantine/core';
import LoadingSpinner from '../../common/LoadingSpinner';
import ClassRoomCard from '../../../pages/TeacherDashBoard/class-room/ClassRoomCard';
import { APIGetPendingBatches } from '../../../api/enrollment-requests';
import { IconBook2, IconClockHour2, IconGraph, IconNotes } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const PendingTeams = () => {
  const [isCourseLoading, setCourseIsLoading] = useState<boolean>(true);
  const [courseData, setCourseData] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    loadActiveCourses();
  }, []);

  const loadActiveCourses = async () => {
    setCourseIsLoading(true);
    try {
      const res = await APIGetPendingBatches();
      const batches = res?.data
        ?.filter((v: any) => {
          return !!v.batch;
        })
        .map((v: any) => ({ ...v.batch, course: v.course }));
      setCourseData(batches ?? []);
      setCount(batches.length);
      setCourseIsLoading(false);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  const notFoundComponent = () => {
    return (
      <div>
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center">
            <img
              onError={errorImageHandler}
              src={CourseNotFound}
              alt=""
              className="w-[145px] h-[145px]"
            />
            <Text className="text-center mt-[24px]  font-normal text-lg leading-[38px] ">
              You are not enrolled in any Batch
            </Text>
            <Text className="text-center mt-[8px]  font-normal text-base  ">
              Go to home page and start getting enrolled
            </Text>
            {/* <Link className="no-underline" to={'/teacher/assignment/create'}>
              <Button type="button" variant="primary" className="mt-sm">
                Create New Assignment
              </Button>
            </Link> */}
          </div>
        </div>
      </div>
    );
  };
  if (isCourseLoading) return <LoadingSpinner />;

  return (
    <>
      {count === 0 ? (
        notFoundComponent()
      ) : (
        <div>
          {/* {courseData.map((data: any, index: any) => (
            <ClassRoomCard classRoom={data} key={index} />
          ))} */}
          {courseData.map((data: any, index: any) => (
            <Card withBorder className="rounded-lg mt-md" key={index}>
              <Grid align="center" justify="center" gutter="md">
                <Grid.Col span={5} className="p-none">
                  <div className="flex gap-xs items-center">
                    <div className="h-full w-3/4 flex items-center my-auto">
                      <img
                        onError={errorImageHandler}
                        style={{ aspectRatio: '420 / 240' }}
                        src={data?.course?.courseImageUrl ?? errorImageHandler}
                        className="batch-image rounded-lg w-full object-fill aspect-video cursor-pointer"
                        onClick={() => navigate(`/student/course/${data?.course?._id}`)}
                      ></img>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-5 font-medium text-secondary-dark">
                        {data?.batchName ?? 'Untitled'}
                      </p>

                      <p className="text-xs font-normal leading-5 text-secondary-default ">
                        {data?.course?.courseTitle ?? 'Untitled'}
                      </p>
                      <div className="flex justify-between mt-xs ">
                        <div className="flex gap-xs items-center">
                          <IconBook2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                          <p className="text-xs font-normal leading-5 text-secondary-default ">
                            12 lessons
                          </p>
                        </div>
                        <div className="flex gap-xs items-center">
                          <IconNotes size={16} strokeWidth={2} color={'#1EA7DC'} />
                          <p className="text-xs font-normal leading-5 text-secondary-default ">
                            12 Assignments
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between mt-xs">
                        <div className="flex gap-xs items-center">
                          <IconClockHour2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                          <p className="text-xs font-normal leading-5 text-secondary-default ">
                            {data.startTime}- {data.endTime}
                          </p>
                        </div>
                        <div className="flex gap-xs items-center">
                          <IconGraph size={16} strokeWidth={2} color={'#1EA7DC'} />
                          <p className="text-xs font-normal leading-5 text-secondary-default ">
                            0 Assessments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid.Col>
                <Grid.Col span={4} className="flex flex-col justify-center items-center ">
                  <div className="flex gap-xs w-3/4 items-center justify-center">
                    <Progress value={50} className="w-full " />
                    <p className="text-sm font-normal leading-5 text-secondary-default ">100%</p>
                  </div>
                  <span className="text-sm text-primary-200 leading-5 font-normal w-3/4 text-left">
                    10 days To Complete
                  </span>
                </Grid.Col>
                <Grid.Col span={3} className="flex justify-between items-center p-none">
                  <Badge className="normal-case">Pending</Badge>
                  <Button
                    className="ml-sm btn-gradient"
                    onClick={() => navigate(`/student/classroom/${data.id}`)}
                  >
                    View Details{' '}
                  </Button>
                </Grid.Col>
              </Grid>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
