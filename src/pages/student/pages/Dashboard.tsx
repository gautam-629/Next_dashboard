/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import EnrolledCoursesCard from '../components/EnrolledCoursesCard';
import ActiveCoursesCard from '../components/ActiveCoursesCard';
import TaskSection from '../components/TaskSection';
import UpComing from '../components/UpComing';
import { Card, Grid } from '@mantine/core';

export const Dashboard = () => {
  return (
    <section>
      <Card>
        <Grid>
          <Grid.Col md={3} xs={6} sm={3} className="text-center  text-lg">
            <p>Hours Spent </p>
            <p className="font-bold text-3xl">12h</p>
          </Grid.Col>
          <Grid.Col md={3} xs={6} sm={3} className="text-center   text-lg">
            <p>Overall scores </p>
            <p className="font-bold text-3xl">80% </p>
          </Grid.Col>
          <Grid.Col md={3} xs={6} sm={3} className="text-center   text-lg">
            <p>Courses Completed </p>
            <p className="font-bold text-3xl">12 </p>
          </Grid.Col>
          <Grid.Col md={3} xs={6} sm={3} className="text-center   text-lg">
            <p>Active Courses</p>
            <p className="font-bold text-3xl">5 </p>
          </Grid.Col>
        </Grid>
      </Card>
      <Grid className="flex mt-sm justify-between">
        <Grid.Col md={8}>
          <Grid className="">
            <Grid.Col md={5} xs={12}>
              <EnrolledCoursesCard />
            </Grid.Col>
            <Grid.Col md={7} xs={12}>
              <ActiveCoursesCard />
            </Grid.Col>
          </Grid>
          <Grid mt={'xs'}>
            <Grid.Col md={12}>
              <Card>
                <div className="flex justify-between col-span-3">
                  <div className="text-base text-primary-700 font-medium    ">Task</div>
                  <div>
                    <div className="text-base  text-primary-200">View All</div>
                  </div>
                </div>
                <TaskSection />
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4}>
          <UpComing />
        </Grid.Col>
      </Grid>
    </section>
  );
};
