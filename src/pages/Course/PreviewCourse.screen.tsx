/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import CourseImage from '../../components/modules/course/Coursedetails/CourseImage';
import { CourseDetails } from '../../components/modules/course/Coursedetails/CourseDetails';

import CourseIntro from '../../components/modules/course/Coursedetails/CourseIntro';

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { TeacherProfile } from '../../components/modules/course/Coursedetails/TeacherProfile';
import { APIGetSingleCourse } from '../../api/singlecourse';
import { FiLayers } from 'react-icons/fi';

import CourseContent from '../../components/modules/course/Coursedetails/CourseContent';
import { Grid, Tabs, rem } from '@mantine/core';
import { ExploreCourses } from '../../components/modules/home/ExploreCourses';
import BatchList from './BatchList';
import { useScrollIntoView } from '@mantine/hooks';
import { errorNotification } from '../../utils/helpers/notifications';
import BatchEnrollCard from './BatchEnrollCard';
import { TaskDetailCard } from '../TeacherDashBoard/assignments/TaskDetailCard';
import { blue } from 'tailwindcss/colors';

export default function PreviewCourseScreen() {
  const { course } = useParams();
  const [singleCourse, setSingleCourse] = useState<any>([]);
  const [lessoncount, SetCount] = useState('');
  const [targetedAudiences, setTargetAudiences] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const singleCourseData = await APIGetSingleCourse(course);
        SetCount(singleCourseData.data.sections.length);
        setTargetAudiences(singleCourseData.data.targetedAudiences);
        setSingleCourse(singleCourseData.data);
        console.log(singleCourseData.data, 'singledata');
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  return (
    <>
      <section className="pb-xl bg-white">
        <CourseImage course={singleCourse} />

        <div className="wrapper-x">
          {' '}
          <Grid className="" mt={'md'}>
            <Grid.Col md={8} sm={8} xs={12}>
              <CourseDetails course={singleCourse} />
              {/* <TeacherProfile course={singleCourse} /> */}
              <div className="mt-lg">
                {' '}
                <Tabs defaultValue="CourseOverView" className=" text-lg ">
                  <Tabs.List className=" border-none bg-slate-100 h-[54px]">
                    <Tabs.Tab value="CourseOverView" className="text-lg font-base active-tabs">
                      Course Overview
                    </Tabs.Tab>

                    {/* <Tabs.Tab value="Batches" className="text-lg font-base active-tabs">
                      Batches
                    </Tabs.Tab> */}

                    {/* <Tabs.Tab value="Assignments" className="text-lg font-base">
                    Assignments
                  </Tabs.Tab> */}
                  </Tabs.List>
                  <Tabs.Panel value="CourseOverView">
                    {' '}
                    <CourseIntro course={singleCourse} />
                    <CourseContent course={singleCourse} />
                    <div>
                      <div>
                        <h1 className="text-2xl font-normal mt-lg">Requirements</h1>

                        <ol className="text-gray-500 text-base ml-md mt-md">
                          {singleCourse?.requirements?.map((requirement: any, index: number) => (
                            <li key={index}>{requirement}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h1 className="text-2xl font-normal mt-sm">Who is this course for</h1>

                        <ol className="text-gray-500 text-base ml-md mt-md">
                          {singleCourse?.targetedAudiences?.map(
                            (targetedAudience: any, index: number) => (
                              <li key={index}>{targetedAudience}</li>
                            ),
                          )}
                        </ol>
                      </div>
                    </div>
                  </Tabs.Panel>
                  <Tabs.Panel value="Batches">
                    <BatchEnrollCard singleCourse={singleCourse} />
                  </Tabs.Panel>
                  {/* <Tabs.Panel value="Assignments">
                  <TaskDetailCard />
                </Tabs.Panel> */}
                </Tabs>
              </div>
              {/* <div>
              <CourseIntro course={singleCourse} />
              <div>
                {' '}
                <CourseContent course={singleCourse} />
              </div>
            </div> */}

              {/* <div>
              {' '}
              <div>
                <h1 className="text-xl font-semibold mt-sm">Requirements</h1>

                <ol className="text-base ml-md">
                  {singleCourse?.requirements?.map((requirement: any, index: number) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h1 className="text-xl font-semibold mt-sm">Who is this course for</h1>

                <ol className="text-base ml-md">
                  {singleCourse?.targetedAudiences?.map((targetedAudience: any, index: number) => (
                    <li key={index}>{targetedAudience}</li>
                  ))}
                </ol>
              </div>
            </div> */}
            </Grid.Col>
            <Grid.Col lg={4} md={4} sm={4} xs={12} className="text-left text-blue-700 mt-[-124px] ">
              <div className={'sticky top-[86px] w-4/5'}>
                <ul className="text-sm list-none">
                  {/* <li className="mt-sm flex items-center">
                  <FiLayers className="mr-[10px]" />
                  For {targetedAudiences} Level
                </li>
                <li className="mt-sm flex items-center">
                  <Book2 size={16} strokeWidth={1.5} color={'blue'} className="mr-[10px]" />
                  Total {lessoncount} lessons
                </li> */}
                  <div className="mt-lg">
                    {/* <div className="text-lg  font-medium ">Batch List</div> */}
                    <BatchList singleCourse={singleCourse} />
                  </div>
                </ul>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </section>
      {/* <ExploreCourses /> */}
    </>
  );
}
