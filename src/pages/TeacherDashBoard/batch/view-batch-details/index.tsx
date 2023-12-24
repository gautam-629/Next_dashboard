/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Grid,
  Text,
  Group,
  Avatar,
  Progress,
  Table,
  Divider,
  RingProgress,
  Modal,
  Select,
  TextInput,
  Switch,
  Tabs,
  Card,
  Button,
} from '@mantine/core';

import { formatDate } from '../../../../utils/helpers/date.helper';
import { Calendar, DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import {
  Amy,
  Anna,
  CalenderIcon,
  Clock,
  CodingImg,
  Emily,
  FileSvg,
  JohnDoe,
  Participants,
  RightButton,
  Task,
  VideIcon,
  image,
  Assess,
  DefaultImage,
} from '../../../../utils/assets/image';

import { useMantineTheme } from '@mantine/core';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { APIGetSingleBatch } from '../../../../api/batch';
import axios from '../../../../plugins/axios';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import TaskModal from './TaskModal';
import { INITIAL_ASSIGNMENT } from '../../../../utils/interfaces/Task.model';
import { useForm } from '@mantine/form';
import { INITIAL_TASK_ASSIGN } from '../../../../utils/interfaces/AssignTask.model';
import { AssignTask } from '../../assignments/AssignTask';
import { errorImageHandler } from '../../../../utils/assets/imageurl';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../../components/common/StackTitleComponent';

const elements = [
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={Amy} className="w-[15%]" />{' '}
        <span className="ml-[5px]">Amy</span>
      </div>
    ),
    courseName: 'Data Structure and Algorithm',
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
    courseName: 'Introduction to Big Data',
    date: '2022-09-11',
    mark: 12,
    status: <div className="bg-green-500  h-lg text-center rounded-lg text-white grid ">Pass</div>,
  },
  {
    name: (
      <div>
        <img onError={errorImageHandler} src={Emily} className="w-[15%]" />{' '}
        <span className="ml-[5px]">Emily</span>
      </div>
    ),
    courseName: 'Data Structure and Algorithm',
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
    courseName: 'Data Structure and Algorithm',
    date: '2022-09-11',
    mark: 12,
    status: (
      <div className="bg-yellow-500 w-xl h-lg text-center rounded-lg text-white grid items-center m-none">
        N/A
      </div>
    ),
  },
];
export const ViewBatchDetails = (props: any) => {
  const [checked, setChecked] = useState(false);
  const [participantPercent, setParticipantPercent] = useState<number>(0);

  const dispatch = useDispatch() as any;
  const { batch } = useParams();
  const [classRoom, setClassRoomId] = useState();
  const [singleBatch, setSingleBatch] = useState<any>([]);
  const [studentList, setStudentList] = useState<any>([]);
  const theme = useMantineTheme();
  const [value, setValue] = useState<Date | null>(null);
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [course, setId] = useState('');
  const [courseList, setCourse] = useState<any>([]);
  const rows = elements?.map((element, index) => (
    <tr key={index}>
      <td>{element.name}</td>
      <td>{element.courseName}</td>
      <td>{element.date}</td>
      <td>{element.mark}</td>
      <td>{element.status}</td>
    </tr>
  ));
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const singleBatchData = await APIGetSingleBatch(batch);
        console.log(singleBatchData, 'singlebatch');
        const students = singleBatchData.data.students;
        console.log(students, 'student');
        const studentLimit = singleBatchData.data.studentLimit;
        const percentvalue = Math.round((students / studentLimit) * 100);

        console.log(percentvalue, 'percent Value');
        setParticipantPercent(percentvalue);
        setId(singleBatchData.data.course.courseId);
        setSingleBatch(singleBatchData.data);
        setClassRoomId(singleBatchData.data.classRoom);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const startNow = async () => {
    const url = singleBatch.classRoomLink;

    window.open(`${url}?classRoom=${classRoom}`, '_blank');
  };

  const seeAll = () => {
    navigate(`/teacher/batches/${batch}/taskassign`);
  };
  const [opened, setOpened] = useState(false);
  const [element, setElement] = useState<any>();

  useEffect(() => {
    (async () => {
      if (course) {
        try {
          const assignmentlist = await axios.get(`assignment/${course}/list`);
          const list = assignmentlist.data?.results?.map((d: any) => {
            return { value: d._id, label: d.assignmentTitle ?? 'Untitled' };
          });
          setCourse(list);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      }
    })();
  }, [course]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`assignment/lists-by-batch/${batch}`);
        setElement(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`batch/students/${batch}`);
        setStudentList(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const assignTask = () => {
    setOpened(true);
  };
  const form = useForm({
    initialValues: {
      ...INITIAL_TASK_ASSIGN,
    },
  });
  const { values } = form;

  const theader = (
    <tr>
      <th>FirstName</th>
      <th>LastName</th>
      <th>PhoneNumber</th>
      <th>Email</th>
    </tr>
  );

  const rowsData = studentList.map((student: any) => (
    <tr key={student._id}>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.phoneNumber}</td>
      <td>{student.email}</td>
    </tr>
  ));

  return (
    <>
      {' '}
      <div>
        <StackTitleComponent>
          <div className="text-lg cursor-pointer" onClick={() => navigate(-1)}>
            {singleBatch?.batchName ?? 'Untitled'}
          </div>
        </StackTitleComponent>
        <div className="student-list mt-md">
          <Tabs radius="xs" defaultValue="Overview">
            <Tabs.List>
              <Tabs.Tab value="Overview">Overview</Tabs.Tab>
              <Tabs.Tab value="Task">Task</Tabs.Tab>
              <Tabs.Tab value="Participants">Participants</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="Overview" pt="sm">
              <Card className="w-full" p={0}>
                <Grid>
                  <Grid.Col md={8} lg={8} sm={8} xs={12}>
                    <Card p={'sm'}>
                      <div className="text-lg  font-bold text-secondary-dark   mb-md">
                        {singleBatch?.batchName ?? 'UX review presentations'}
                      </div>
                      <div>
                        <img
                          src={singleBatch?.course?.courseImageUrl}
                          alt=""
                          className="w-full rounded-sm object-cover object-center"
                          style={{ aspectRatio: '725 / 300' }}
                        />
                      </div>
                      <div className="text-xl font-bold text-secondary-dark mt-md">
                        {singleBatch?.course?.courseTitle ?? ' Data Structure and Algorithm'}
                      </div>
                      <Group mt={'sm'}>
                        <div className={'flex-grow'}>
                          <div className="flex mb-xs">
                            <img src={CalenderIcon} alt="" className="" />
                            <div className="ml-sm font-semibold ">Start Date</div>
                          </div>
                          <div className=" font-bold text-base text-secondary-default  ">
                            {formatDate(singleBatch?.startDate ?? '')}
                          </div>
                        </div>
                        <div className={'flex-grow'}>
                          <div className="flex mb-xs">
                            <img src={CalenderIcon} alt="" className="" />
                            <div className="ml-sm font-semibold ">End Date</div>
                          </div>
                          <div className=" font-bold text-base text-secondary-default  ">
                            {formatDate(singleBatch?.endDate ?? '')}
                          </div>
                        </div>
                        <div className={'flex-grow'}>
                          <div className="flex mb-xs">
                            <img src={Clock} alt="" className="" />
                            <div className="ml-sm font-semibold ">Time</div>
                          </div>
                          <div className=" font-bold text-base text-secondary-default  ">
                            {singleBatch.startTime}
                          </div>
                        </div>
                      </Group>
                    </Card>
                    <div className="grid grid-cols-2 gap-md my-[32px] rounded-lg  mt-md">
                      <Card>
                        <div className="flex justify-between items-center">
                          <div className="flex mr-xs items-center">
                            <img src={Participants} className="py-xs" />
                            <Text className=" font-normal text-sm text-secondary-dark leading-8 ">
                              Participants
                            </Text>
                          </div>
                          <div className="text-primary-200  font-normal text-base  ">
                            {singleBatch?.students}/{singleBatch?.studentLimit}
                          </div>
                        </div>
                        <div className="flex justify-center items-center mt-md">
                          <Progress value={participantPercent} size="sm" className="w-full mr-xs" />
                          <span className=" text-secondary-default text-sm font-normal  tracking-[0.25px]">
                            {participantPercent}%{' '}
                          </span>
                          <Avatar.Group spacing="sm" className="ml-xs">
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar radius="xl">+5</Avatar>
                          </Avatar.Group>
                        </div>
                      </Card>
                      {/* <Card  className="flex items-center">
                        <div className="flex items-center">
                          <div className="mr-sm">
                            <RingProgress
                              sections={[{ value: 40, color: '#147aa6' }]}
                              label={
                                <Text
                                  className="font-semibold  text-primary-200  text-base  "
                                  align="center"
                                >
                                  40%
                                </Text>
                              }
                            />
                          </div>
                          <div className="text-sm font-semibold   text-secondary-dark ">
                            Syllabus Progress
                          </div>
                        </div>
                      </Card> */}
                    </div>

                    {/* <Card mt={'sm'} >
                      <div className="">
                        <div className="flex justify-between items-center">
                          <Text className="text-lg text-secondary-dark    font-normal">
                            Students Assessment
                          </Text>
                          <Text className="font-semibold text-base text-primary-200 ">
                            View all
                          </Text>
                        </div>

                        <Table className="mt-md justify-between">
                          <thead className="font-bold text-base  text-secondary-dark ">
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
                          <div className=" mt-[24px]">
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
                    </Card> */}
                  </Grid.Col>
                  <Grid.Col md={4} lg={4} sm={4} xs={12}>
                    <Card p={'sm'}>
                      <Group position="apart">
                        <Text className="text-sm font-bold text-secondary-dark   ">
                          Class Time{' '}
                        </Text>{' '}
                        <Text className="text-base font-normal text-secondary-default   ">
                          {singleBatch.startTime}
                        </Text>
                      </Group>
                      <div className="flex items-center mt-[28px]">
                        <img src={VideIcon} className="w-[37px] h-[30px]" />
                        <div className="ml-[12px]">
                          <Text className=" font-semibold text-secondary-dark text-sm   mb-[4px]">
                            The Design Principle
                          </Text>
                          <Text className=" font-normal text-secondary-default   text-[12px] ">
                            Meeting Starts in {singleBatch?.startTime}
                          </Text>
                        </div>
                      </div>
                      <Button className="w-full mt-md" onClick={startNow}>
                        Start Now
                      </Button>
                    </Card>
                    <Card mt={'sm'} p={'sm'}>
                      <Group position="apart">
                        <Text className="text-sm  text-secondary-dark   text-sm font-bold ">
                          Assignment
                        </Text>{' '}
                        <Button variant="subtle" onClick={assignTask}>
                          Assign Assignment{' '}
                        </Button>
                      </Group>
                      {element?.results?.map((item: any, index: any) => (
                        <div
                          key={index}
                          className=" mt-md bg-courseCreateBg-500 px-sm py-[20px]  rounded-[10px]"
                        >
                          <div className="flex items-center">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px]">
                                <img src={FileSvg} className="w-[37px] h-[30px] flex " />
                              </div>

                              <div className="ml-[12px]">
                                <Text className="mb-[4px]  font-semibold text-sm text-secondary-dark  tracing-[0.75px] ">
                                  {item?.assignmentTitle ?? 'No Title'}
                                </Text>
                                <Text className=" text-[12px] text-secondary-default font-normal leading-[16px] tracing-[0.75px] ">
                                  Due date: {formatDate(item?.endDate)}
                                </Text>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center w-full mt-[12px] ">
                            <div className="w-full ">
                              <div className=" w-full flex items-center">
                                <Progress value={50} size="sm" className="w-full mr-xs" />
                                <span className=" text-secondary-default text-sm font-normal  tracking-[0.25px]">
                                  100%{' '}
                                </span>
                              </div>
                              <Text className="text-[10px] leading-3   font-normal text-primary-200 ">
                                {item?.taskSubmittedCount ?? ''} Submission
                              </Text>
                            </div>
                            {/* <Avatar.Group spacing="sm" className="ml-xs">
                      <Avatar src={image} radius="xl" />
                      <Avatar src={image} radius="xl" />
                      <Avatar src={image} radius="xl" />
                      <Avatar radius="xl">+5</Avatar>
                    </Avatar.Group> */}
                          </div>
                        </div>
                      ))}

                      <div className="w-full text-end mt-md">
                        <Button
                          type="button"
                          variant="text"
                          onClick={seeAll}
                          className="text-end  pr-none"
                        >
                          See All Assign Assignment
                        </Button>
                      </div>
                    </Card>
                    {/* <Card  mt={'sm'}>
                      <Group position="apart">
                        <Text className="text-sm  text-secondary-dark   text-sm font-medium ">
                          Assessment
                        </Text>{' '}
                        <Button variant="subtle"> + New Assessment </Button>
                      </Group>
                      <div className=" mt-md bg-courseCreateBg-500 px-sm py-[20px]  rounded-[10px]">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px]">
                              <img src={Assess} className=" flex " />
                            </div>

                            <div className="ml-[12px]">
                              <Text className="mb-[4px]  font-semibold text-sm text-secondary-dark  tracing-[0.75px] ">
                                The Design Principle
                              </Text>
                              <Text className=" text-[12px] text-secondary-default font-normal leading-[16px] tracing-[0.75px] ">
                                Due date: 01/03/2024
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full mt-[12px] ">
                          <div className="w-full ">
                            <div className=" w-full flex items-center">
                              <Progress value={50} size="sm" className="w-full mr-xs" />
                              <span className=" text-secondary-default text-sm font-normal  tracking-[0.25px]">
                                100%{' '}
                              </span>
                            </div>
                            <Text className="text-[10px] leading-3   font-normal text-primary-200 ">
                              26 Submission left
                            </Text>
                          </div>
                          <Avatar.Group spacing="sm" className="ml-xs">
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar radius="xl">+5</Avatar>
                          </Avatar.Group>
                        </div>
                      </div>
                      <div className=" mt-md bg-courseCreateBg-500 px-sm py-[20px]  rounded-[10px]">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px]">
                              <img src={Assess} className=" flex " />
                            </div>

                            <div className="ml-[12px]">
                              <Text className="mb-[4px]  font-semibold text-sm text-secondary-dark  tracing-[0.75px] ">
                                The Design Principle
                              </Text>
                              <Text className=" text-[12px] text-secondary-default font-normal leading-[16px] tracing-[0.75px] ">
                                Due date: 01/03/2024
                              </Text>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full mt-[12px] ">
                          <div className="w-full ">
                            <div className=" w-full flex items-center">
                              <Progress value={50} size="sm" className="w-full mr-xs" />
                              <span className=" text-secondary-default text-sm font-normal  tracking-[0.25px]">
                                100%{' '}
                              </span>
                            </div>
                            <Text className="text-[10px] leading-3   font-normal text-primary-200 ">
                              26 Submission left
                            </Text>
                          </div>
                          <Avatar.Group spacing="sm" className="ml-xs">
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar src={image} radius="xl" />
                            <Avatar radius="xl">+5</Avatar>
                          </Avatar.Group>
                        </div>
                      </div>

                      <div className="w-full text-end mt-md">
                        <Button type="button" variant="text" className="text-end  pr-none">
                          See All
                        </Button>
                      </div>
                    </Card> */}
                  </Grid.Col>
                </Grid>
                <div
                  className="bg-opacity-55 blur-md"
                  style={{
                    backgroundColor:
                      theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    backdropFilter: 'blur(3px)',
                  }}
                >
                  <div className="bg-opacity-55 blur-md">
                    <Modal
                      opened={opened}
                      onClose={() => setOpened(false)}
                      radius="lg"
                      className="pop-modal"
                    >
                      <TaskModal
                        values={values}
                        batch={batch}
                        form={form}
                        courseList={courseList}
                      />
                    </Modal>
                  </div>
                </div>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="Task" pt="xs">
              <AssignTask singleBatch={singleBatch} />
            </Tabs.Panel>

            <Tabs.Panel value="Participants" pt="xs">
              <Card p={'sm'}>
                <div className="mt-sm">
                  <Table
                    captionSide="bottom"
                    striped
                    highlightOnHover
                    withColumnBorders
                    className="bg-white mt-lg"
                  >
                    <caption>Students Details</caption>
                    <thead>{theader}</thead>
                    <tbody>{rowsData}</tbody>
                    <tfoot>{theader}</tfoot>
                  </Table>
                </div>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
};
