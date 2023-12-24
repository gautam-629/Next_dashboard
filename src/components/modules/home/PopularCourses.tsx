/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { getLatestCourses } from '../../../utils/mockdata/mockData';
import { Button, Grid } from '@mantine/core';
import { CourseCard } from '../course/CourseCard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourses } from '../../../store/modules/courses/actions';
import { DefaultImage } from '../../../utils/assets/image';
import { errorNotification } from '../../../utils/helpers/notifications';
export const PopularCourses = () => {
  const courses = getLatestCourses();
  const [courseList, setCourseList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch() as any;
  useEffect(() => {
    (async () => {
      try {
        const course = await dispatch(getAllCourses());
        setCourseList(course.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, [dispatch]);

  return (
    <section className={'px-sm wrapper-x md:px-[12vw]   py-md md:py-2xl '}>
      <div className="text-area flex justify-between">
        <div>
          <div className="text-2xl md:text-3xl lg:text-3xl">Our Popular courses</div>
          <div className="text-lg  text-[#667085]">
            Tool and strategies modern teams need to help their companies grow.
          </div>
        </div>
        <div className="">
          <Button>View all courses</Button>
        </div>
      </div>
      {/* <div className="course-list grid gap-lg md:grid-cols-2 lg:grid-cols-3 mt-lg">
        {courseList.map((v, index) => (
          <div key={index}>
            <CourseCard course={v} DefaultImage={DefaultImage} />
          </div>
        ))}
      </div> */}
    </section>
  );
};
