/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APIGetSingleDraftCourse } from '../../../api/singlecourse';
import CourseImage from '../../../components/modules/course/Coursedetails/CourseImage';
import { CourseDetails } from '../../../components/modules/course/Coursedetails/CourseDetails';
import { Accordion, Button, Card, Divider, Grid, Group, Modal, Tabs, Text } from '@mantine/core';
import { TeacherProfile } from '../../../components/modules/course/Coursedetails/TeacherProfile';
import CourseIntro from '../../../components/modules/course/Coursedetails/CourseIntro';
import CourseContent from '../../../components/modules/course/Coursedetails/CourseContent';
import { FiLayers } from 'react-icons/fi';
import { IconBook2, IconDeviceLaptop } from '@tabler/icons-react';
import { errorNotification } from '../../../utils/helpers/notifications';
import { APIDeleteUnpublishedCourse } from '../../../api/course';
import { TaskDetailCard } from '../assignments/TaskDetailCard';
import BatchesTab from './BatchesTab';
import { Assessment, FileResource, Task, Video } from '../../../utils/assets/image';
import { ISection } from '../../../utils/interfaces/Course.model';

export default function MyCourseDetails(props: any) {
  const navigate = useNavigate();
  const { course } = useParams();
  const [singleCourse, setSingleCourse] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lessoncount, SetCount] = useState('');
  const [targetedAudiences, setTargetAudiences] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const singleCourseData = await APIGetSingleDraftCourse(course);
        console.log(singleCourseData, '@data');
        SetCount(singleCourseData.data.sections.length);
        setTargetAudiences(singleCourseData.data.targetedAudiences);
        setSingleCourse(Object.keys(singleCourseData.data).length > 0 ? singleCourseData.data : []);
        setIsLoading(false);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const createAssignment = () => {
    navigate(`/teacher/course/${course}/create-assignment`);
  };
  const createBatch = () => {
    navigate(`/teacher/course/${course}/create-batch`);
  };

  const deleteCourse = async () => {
    try {
      await APIDeleteUnpublishedCourse(singleCourse._id);
      navigate('/teacher/mycourses');
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  if (isLoading || !Object.keys(singleCourse).length) return 'Loading...';

  return (
    <>
      {' '}
      <CourseImage course={singleCourse} />
      <div className="bg-white rounded-md p-sm">
        <section className=" pb-xl bg-white">
          {/* <StackTitleComponent className="mb-sm">
            {' '}
            <Text className="text-2xl font-medium  text-secondary-dark">Course Overview</Text>
          </StackTitleComponent> */}

          <Grid className="" mt={'md'}>
            <Grid.Col md={8} sm={8} xs={12}>
              <CourseDetails course={singleCourse} />
              {/* <TeacherProfile course={singleCourse} /> */}
              <div className="mt-lg">
                {' '}
                <Tabs defaultValue="CourseOverView" className=" text-lg  ">
                  <Tabs.List className=" border-solid border-2 border-gray-200 h-[54px]">
                    <Tabs.Tab value="CourseOverView" className="text-lg font-base">
                      Course Overview
                    </Tabs.Tab>
                    <Tabs.Tab value="Batches" className="text-lg font-base">
                      Batches
                    </Tabs.Tab>
                    <Tabs.Tab value="Assignments" className="text-lg font-base">
                      Assignments
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="CourseOverView">
                    {' '}
                    {/* <CourseIntro course={singleCourse} /> <CourseContent course={singleCourse} /> */}
                    <div className="">
                      <Text className="text-2xl font-bold mb-sm">Course Content</Text>
                      <div className="flex justify-between mb-xs">
                        <p className="text-base font-normal ">15 Sections</p>
                        <p className="text-base font-semibold text-primary-200 ">
                          Expand All Sections
                        </p>
                      </div>

                      <Accordion
                        variant="contained"
                        chevronPosition="left"
                        styles={{
                          chevron: {
                            width: '3rem',
                            height: '3rem',
                          },
                        }}
                      >
                        {/* {singleCourse.sections.map((section: ISection, index: number) => {
                          <Accordion.Item
                            key={index}
                            value="Chapter1"
                            className="bg-[#F7F7FC] hover:bg-[#F7F7FC] "
                          >
                            <Accordion.Control className="!font-extrabold">
                              <div className="flex justify-between">
                                {' '}
                                <span className="font-extrabold">
                                  {section?.sectionTitle ?? 'Chapter1'}
                                </span>{' '}
                                <span className="text-sm font-normal text-primary-1000">
                                  2 Credit Hours
                                </span>
                              </div>
                            </Accordion.Control>
                            <Accordion.Panel className="bg-white hover:!bg-white">
                              <div className="bg-white hover:!bg-white">
                                <Accordion chevronPosition="right" defaultValue="customization">
                                  <Accordion.Item
                                    value="Introduction to python"
                                    className="border-b-0"
                                  >
                                    <div className="flex flex-start gap-sm items-center">
                                      <div className="flex items-center">
                                        <span className="mr-[4px]">
                                          <img src={FileResource}></img>
                                        </span>
                                        <p>2 Resource files</p>
                                      </div>
                                      <div className="flex items-center">
                                        <span className="mr-[4px]">
                                          <img src={Task}></img>
                                        </span>
                                        <p>2 Resource files</p>
                                      </div>
                                      <div className="flex items-center">
                                        <span className="mr-[4px]">
                                          <img src={Video}></img>
                                        </span>
                                        <p>2 Resource files</p>
                                      </div>
                                      <div className="flex items-center">
                                        <span className="mr-[4px]">
                                          <img src={Assessment}></img>
                                        </span>
                                        <p>2 Resource files</p>
                                      </div>
                                    </div>
                                    <Accordion.Control className="bg-white hover:!bg-white">
                                      <span className=""> Introduction to python</span>
                                    </Accordion.Control>
                                    <Accordion.Panel className="p-xs">
                                      <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Asperiores, nostrum debitis? Ratione odit architecto nulla
                                        numquam pariatur excepturi inventore saepe? Ducimus,
                                        aspernatur natus consequuntur excepturi molestias mollitia
                                        commodi. Mollitia, modi.
                                      </div>
                                    </Accordion.Panel>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            </Accordion.Panel>
                          </Accordion.Item>;
                        })} */}
                        <Accordion.Item
                          value="Chapter1"
                          className="bg-[#F7F7FC] hover:bg-[#F7F7FC] "
                        >
                          <Accordion.Control className="!font-extrabold">
                            <div className="flex justify-between">
                              {' '}
                              <span className="font-extrabold">Chapter1</span>{' '}
                              <span className="text-sm font-normal text-primary-1000">
                                2 Credit Hours
                              </span>
                            </div>
                          </Accordion.Control>
                          <Accordion.Panel className="bg-white hover:!bg-white">
                            <div className="bg-white hover:!bg-white">
                              <Accordion chevronPosition="right" defaultValue="customization">
                                <Accordion.Item
                                  value="Introduction to python"
                                  className="border-b-0"
                                >
                                  <div className="flex flex-start gap-sm items-center">
                                    <div className="flex items-center">
                                      <span className="mr-[4px]">
                                        <img src={FileResource}></img>
                                      </span>
                                      <p>2 Resource files</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="mr-[4px]">
                                        <img src={Task}></img>
                                      </span>
                                      <p>2 Resource files</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="mr-[4px]">
                                        <img src={Video}></img>
                                      </span>
                                      <p>2 Resource files</p>
                                    </div>
                                    <div className="flex items-center">
                                      <span className="mr-[4px]">
                                        <img src={Assessment}></img>
                                      </span>
                                      <p>2 Resource files</p>
                                    </div>
                                  </div>
                                  <Accordion.Control className="bg-white hover:!bg-white">
                                    <span className=""> Introduction to python</span>
                                  </Accordion.Control>
                                  <Accordion.Panel className="p-xs">
                                    <div>
                                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                      Asperiores, nostrum debitis? Ratione odit architecto nulla
                                      numquam pariatur excepturi inventore saepe? Ducimus,
                                      aspernatur natus consequuntur excepturi molestias mollitia
                                      commodi. Mollitia, modi.
                                    </div>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item
                          value="Chapter2"
                          className="bg-[#F7F7FC] hover:bg-[#F7F7FC] "
                        >
                          <Accordion.Control className="!font-extrabold">
                            <div className="flex justify-between">
                              {' '}
                              <span className="font-extrabold">Chapter2</span>{' '}
                              <span className="text-sm font-normal text-primary-1000">
                                2 Credit Hours
                              </span>
                            </div>
                          </Accordion.Control>
                          <Accordion.Panel className="bg-white hover:!bg-white">
                            <div className="bg-white hover:!bg-white">
                              <Accordion chevronPosition="right" defaultValue="customization">
                                <Accordion.Item
                                  value="Introduction to python"
                                  className="border-b-0"
                                >
                                  <Accordion.Control className="bg-white hover:!bg-white">
                                    <span className=""> Introduction to python</span>
                                  </Accordion.Control>
                                  <Accordion.Panel className="p-xs">
                                    <div>
                                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                      Asperiores, nostrum debitis? Ratione odit architecto nulla
                                      numquam pariatur excepturi inventore saepe? Ducimus,
                                      aspernatur natus consequuntur excepturi molestias mollitia
                                      commodi. Mollitia, modi.
                                    </div>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item
                          value="Chapter3"
                          className="bg-[#F7F7FC] hover:bg-[#F7F7FC] "
                        >
                          <Accordion.Control className="!font-extrabold">
                            <div className="flex justify-between">
                              <span className="font-extrabold">Chapter3</span>{' '}
                              <span className="text-sm text-primary-1000 font-normal">
                                2 Credit Hours
                              </span>
                            </div>
                          </Accordion.Control>
                          <Accordion.Panel className="bg-white hover:!bg-white">
                            <div className="bg-white hover:!bg-white">
                              <Accordion chevronPosition="right" defaultValue="customization">
                                <Accordion.Item
                                  value="Introduction to python"
                                  className="border-b-0"
                                >
                                  <Accordion.Control className="bg-white hover:!bg-white">
                                    <span className=""> Introduction to python</span>
                                  </Accordion.Control>
                                  <Accordion.Panel className="p-xs">
                                    <div>
                                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                      Asperiores, nostrum debitis? Ratione odit architecto nulla
                                      numquam pariatur excepturi inventore saepe? Ducimus,
                                      aspernatur natus consequuntur excepturi molestias mollitia
                                      commodi. Mollitia, modi.
                                    </div>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item
                          value="Chapter4"
                          className="bg-[#F7F7FC] hover:bg-[#F7F7FC] "
                        >
                          <Accordion.Control className="!font-extrabold">
                            <div className="flex justify-between">
                              <span className="font-extrabold">Chapter4</span>{' '}
                              <span className="text-sm text-primary-1000 font-normal">
                                2 Credit Hours
                              </span>
                            </div>
                          </Accordion.Control>
                          <Accordion.Panel className="bg-white hover:!bg-white">
                            <div className="bg-white hover:!bg-white">
                              <Accordion chevronPosition="right" defaultValue="customization">
                                <Accordion.Item
                                  value="Introduction to python"
                                  className="border-b-0"
                                >
                                  <Accordion.Control className="bg-white hover:!bg-white">
                                    <div className="flex justify-between">
                                      <span className=""> Introduction to python</span>
                                      <span className="text-sm text-primary-1000 font-normal">
                                        2 Credit Hours
                                      </span>
                                    </div>
                                  </Accordion.Control>
                                  <Accordion.Panel className="p-xs">
                                    <div>
                                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                      Asperiores, nostrum debitis? Ratione odit architecto nulla
                                      numquam pariatur excepturi inventore saepe? Ducimus,
                                      aspernatur natus consequuntur excepturi molestias mollitia
                                      commodi. Mollitia, modi.
                                    </div>
                                  </Accordion.Panel>
                                </Accordion.Item>
                              </Accordion>
                            </div>
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                    </div>
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
                            (targetedAudience: string, index: number) => (
                              <li key={index}>{targetedAudience}</li>
                            ),
                          )}
                        </ol>
                      </div>
                    </div>
                  </Tabs.Panel>
                  <Tabs.Panel value="Batches">
                    <BatchesTab singleCourse={singleCourse} />
                  </Tabs.Panel>
                  <Tabs.Panel value="Assignments">
                    <TaskDetailCard />
                  </Tabs.Panel>
                </Tabs>
              </div>
            </Grid.Col>
            <Grid.Col lg={4} md={4} sm={4} xs={12} className="text-left text-blue-700 mt-[-124px]">
              {' '}
              <div className={'sticky top-[-9px]'}>
                <ul className="text-sm list-none">
                  <div className="mt-lg flex justify-between ">
                    <Card
                      withBorder
                      className=" flex flex-col justify-between rounded-md p-sm w-3/4"
                    >
                      <div>
                        <div className="font-semibold text-base">This Course Includes:</div>
                        <li className="mt-sm flex items-center">
                          <FiLayers
                            size={16}
                            strokeWidth={1.5}
                            color={'blue'}
                            className="mr-[10px]"
                          />
                          5 Batches
                        </li>
                        <li className="mt-sm flex items-center">
                          <IconDeviceLaptop
                            size={16}
                            strokeWidth={1.5}
                            color={'blue'}
                            className="mr-[10px]"
                          />
                          2 Assignments
                        </li>
                        <li className="mt-sm flex items-center">
                          <IconBook2
                            size={16}
                            strokeWidth={1.5}
                            color={'blue'}
                            className="mr-[10px]"
                          />
                          30 Students
                        </li>
                        <Divider className="my-[14px]" />
                        <Group>
                          {' '}
                          <Button fullWidth onClick={createBatch}>
                            {' '}
                            Create Batch{' '}
                          </Button>
                          <Button fullWidth onClick={createAssignment}>
                            {' '}
                            Create Assignment{' '}
                          </Button>
                        </Group>
                      </div>
                      {/* <div className="bg-dark rounded-full text-white items-center">
            <img src={RightArrow} onError={errorImageHandler} alt="" />
          </div> */}

                      {/* </Link> */}
                    </Card>
                  </div>
                </ul>
              </div>
            </Grid.Col>
          </Grid>
        </section>
        {!singleCourse.isPublished && (
          <div className="flex w-full justify-center">
            <Button onClick={() => setShowModal(true)}>Delete this course</Button>
          </div>
        )}
      </div>
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        // eslint-disable-next-line
        // @ts-ignore
        className=""
        title={<div>Confirm Delete?</div>}
      >
        Are you sure you want to delete this course?
        <div className="flex justify-end mt-md">
          <Button onClick={() => setShowModal(false)} className="mx-xs">
            Cancel
          </Button>
          <Button className="mx-xs" onClick={deleteCourse}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
