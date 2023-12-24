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

export const LatestCourses = () => {
  const courses = getLatestCourses();

  return (
    <section className={'wrapper-x py-2xl'}>
      <div className="text-area flex justify-between">
        <div>
          <div className="text-3xl">Our Latest courses</div>
          <div className="text-lg">
            Tool and strategies modern teams need to help their companies grow.
          </div>
        </div>
        <Button variant={'subtle'}>View all</Button>
      </div>
      <Grid className="course-list mt-lg">
        {courses.map((v, index) => (
          <Grid.Col span={4} key={index}>
            <CourseCard course={v} />
          </Grid.Col>
        ))}
      </Grid>
    </section>
  );
};
