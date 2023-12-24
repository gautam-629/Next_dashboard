/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Grid, Card, Text, Group, Table, Divider } from '@mantine/core';

import SalesTrend from '../../components/modules/teacher/charts/SalesTrend';
import OrderTrend from '../../components/modules/teacher/charts/OrderTrend';
import axios from '../../plugins/axios';
import { Amy, Anna, Emily, JohnDoe } from '../../utils/assets/image';

import StudentsByCourse from '../../components/modules/teacher/charts/SudentsByCourse';
import ActiveBatch from './ActiveBatch';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { useEffect, useState } from 'react';
import { errorNotification } from '../../utils/helpers/notifications';
import { TeacherStats } from '../../components/modules/teacher/Teacher.stats';
import { CurrentTeacherAssignments } from '../../components/modules/teacher/CurrentTeacherAssignments';
import { UpcomingClasses } from '../../components/modules/teacher/UpcomingClasses';

const elements = [
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={Amy} className="w-[15%]" />{' '}
        <span className="ml-[5px]">Amy</span>
      </div>
    ),
    course: 'Data Structure and Algorithm',
    date: '2022-09-11',
    mark: 12,
    status: (
      <div className="bg-green-500 w-xl h-lg text-center rounded-lg text-white grid items-center">
        Pass
      </div>
    ),
  },
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={Anna} className="w-[15%]" />{' '}
        <span className="ml-[5px]">Anna</span>
      </div>
    ),
    course: 'Introduction to Big Data',
    date: '2022-09-11',
    mark: 12,
    status: (
      <div className="bg-green-500 w-xl h-lg text-center rounded-lg text-white grid items-center">
        Pass
      </div>
    ),
  },
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={Emily} className="w-[15%]" />{' '}
        <span className="ml-[5px]">Emily</span>
      </div>
    ),
    course: 'Data Structure and Algorithm',
    date: '2022-09-11',
    mark: 12,
    status: (
      <div className="bg-red-500 w-xl h-lg text-center rounded-lg text-white grid items-center">
        Fail
      </div>
    ),
  },
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={JohnDoe} className="w-[15%]" />
        <span className="ml-[5px]">JohnDoe</span>
      </div>
    ),
    course: 'Data Structure and Algorithm',
    date: '2022-09-11',
    mark: 12,
    status: (
      <div className="bg-yellow-500 w-xl h-lg text-center rounded-lg text-white grid items-center">
        N/A
      </div>
    ),
  },
];
export const TeacherDashboard = () => {
  const [totalCourse, setTotalCourse] = useState('');
  const [totalStudent, setTotalStudent] = useState('');

  const rows = elements.map((element, index) => (
    <tr key={index}>
      <td>{element.name}</td>
      <td>{element.course}</td>
      <td>{element.date}</td>
      <td>{element.mark}</td>
      <td>{element.status}</td>
    </tr>
  ));

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`users/total-sales-analysis `);
        setTotalCourse(res.data.totalCourse);
        setTotalStudent(res.data.totalStudent);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  return (
    <>
      <Grid className="flex justify-between max-w-full">
        <Grid.Col md={8} lg={9}>
          <section className="">
            <TeacherStats />
            {/*<Card mt={'sm'} className=" ">*/}
            {/*  <Grid>*/}
            {/*    <Grid.Col xs={12} md={6} className={'h-full'}>*/}
            {/*      <SalesTrend />*/}
            {/*    </Grid.Col>*/}
            {/*    <Grid.Col xs={12} md={6} className={'h-full'}>*/}
            {/*      <OrderTrend />*/}
            {/*    </Grid.Col>*/}
            {/*  </Grid>*/}
            {/*</Card>*/} <ActiveBatch />
            {/*<Card mt={'sm'} className="  ">*/}
            {/*  <StudentsByCourse />*/}
            {/*</Card>*/}
            {/* <div className=" bg-white mt-sm">
            
            </div> */}
            <Card mt={'sm'} className=" ">
              <div className="">
                <div className="flex justify-between items-center">
                  <Text className="text-lg  font-normal">Students Assessment</Text>
                  <Text className="font-semibold text-sm mr-[64px] text-blue-500 ">View all</Text>
                </div>

                <Table className="mt-[30px]">
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th> Course Name</th>
                      <th> Date</th>
                      <th>Marks</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>

                <div className="flex justify-end">
                  <div className="mr-[63px] mt-[25px]">
                    <Group>
                      <span className="w-[10px] h-[10px] bg-green-500 rounded-full items-center"></span>{' '}
                      <Text className="  text-sm font-medium">Pass</Text>
                      <span className="w-[10px] h-[10px] bg-red-500 rounded-full items-center"></span>{' '}
                      <Text className="  text-sm font-medium">Fail</Text>
                      <span className="w-[10px] h-[10px] bg-yellow-500 rounded-full items-center"></span>{' '}
                      <Text className="  text-sm font-medium">Not attempted</Text>
                    </Group>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </Grid.Col>
        <Grid.Col md={4} lg={3} xs={12}>
          <Card className={'h-full'} pr={'sm'}>
            <UpcomingClasses />
            {/* <CurrentTeacherAssignments /> */}
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};
