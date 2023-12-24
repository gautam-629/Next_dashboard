/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Avatar,
  Card,
  Grid,
  Group,
  Modal,
  MultiSelect,
  Progress,
  Text,
  TextInput,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { useForm } from '@mantine/form';
import axios from '../../../../plugins/axios';
import { Clock, Email, Emily, FileIcon, FileSvg } from '../../../../utils/assets/image';
import Alisa from '../../../../../src/assets/Anna.png';

import moment from 'moment';
import PdfM from '../../../TeacherDashBoard/assignments/PdfM';
import { MdImportContacts } from 'react-icons/md';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../../components/common/StackTitleComponent';

const TaskDetail = (props: any) => {
  const { batch } = useParams();

  const navigate = useNavigate();
  const [pdfData, setPdfId] = useState();
  const [pdfopened, setPdfOpened] = useState(false);
  const theme = useMantineTheme();

  const [detail, setDetail] = useState<any>({
    assignmentTitle: '',
    longDescription: '',
    course: [],

    lessonId: '',
    sectionId: [],
    student: '',
    imageUrl: '',
    StartDate: '',
    endDate: '',
    submitDate: '',
    isActive: false,
    dueTime: '',
    deadLine: '',
    remarks: '',
    taskSubmitted: {
      description: '',
      remarks: '',
      fileUrl: '',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`assignment/submit-detail/${props.id}`);
        setDetail(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const pdf = (pdfUrl: any) => {
    if (pdfUrl[0] == '') {
      return false;
    } else {
      setPdfId(pdfUrl);
    }

    setPdfOpened(true);
  };
  const submitAssignment = (taskId: any) => {
    navigate(`/student/tasks/${batch}/${taskId}`);
  };

  const editAssignment = (taskId: any) => {
    navigate(`/student/tasks/edit/${batch}/${taskId}`);
  };

  return (
    <>
      <Card withBorder shadow="sm" radius="md">
        <div className=" ">
          <div>
            <h1 className="font-medium text-base  text-secondary-dark ">
              <StackTitleComponent> Assignment / {detail.course.courseTitle}</StackTitleComponent>
            </h1>
            {(() => {
              if (detail.taskSubmitted == null) {
                return (
                  <div
                    className="grid items-center py-xs px-md text-white bg-buttonColor-500 rounded-lg font-semibold text-sm cursor-pointer ml-[1100px]"
                    onClick={() => submitAssignment(detail._id)}
                  >
                    Submit Assignment
                  </div>
                );
              } else if (detail.taskSubmitted.status != 'Completed') {
                return (
                  <div
                    className="grid items-center py-xs px-md text-white bg-buttonColor-500 rounded-lg font-semibold text-sm cursor-pointer ml-[1097px]"
                    onClick={() => editAssignment(detail._id)}
                  >
                    Edit Assignment
                  </div>
                );
              }
            })()}
          </div>

          <div className="w-full  ">
            <div className="text-left font-medium text-2xl  text-secondary-dark ">
              {detail.assignmentTitle}{' '}
            </div>
            <p className="font-semibold text-left mt-[12px]">Assignment Description</p>
            <p className="task_description my-xs p-sm">{parse(detail.longDescription)}</p>
            <div
              className="flex  items-center "
              onClick={() => pdf([detail.imageUrl ?? '', detail.assignmentTitle ?? ''])}
            >
              {/* <a
              href={detail.imageUrl}
              className="cursor-pointer flex no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <img src={FileIcon} className=" flex mr-xs"/>
              <div className=" font-normal   no-underline ">
                <p className="text-sm text-secondary-dark ">task.pdf</p>
                <p className=" text-xs text-secondary-default">200kb</p>
              </div>
            </a> */}

              <p className="mr-xs">
                File: <span className="text-blue-500 cursor-pointer">Click Here</span>
              </p>
              {(() => {
                if (detail.imageUrl.split('.').pop() == 'pdf') {
                  return (
                    <img src={FileSvg} className="h-[20px] w-[20px] cursor-pointer" alt="pdf" />
                  );
                } else if (detail.imageUrl == '') {
                  return <p className="disabled">No File Available</p>;
                } else if (detail.imageUrl.split('.').pop() == 'docx') {
                  return (
                    <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="docs" />
                  );
                } else {
                  return (
                    <img
                      src={detail.imageUrl}
                      className="h-[30px] w-[30px] cursor-pointer"
                      alt="images"
                    />
                  );
                }
              })()}
            </div>
          </div>

          <div>
            <div>
              <Card withBorder shadow="sm" radius="md" className="my-lg">
                {' '}
                <Grid justify="space-between" align="center" className="w-full   font-normal">
                  {/* <Grid.Col span="content" className="">
                    <div className="flex flex-col text-center items-center ">
                      <Group noWrap>
                        <Avatar src={Emily} size={94} radius="md" />
                        <div>
                          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                            Software Engineer
                          </Text>

                          <Text fz="lg" fw={500} className="text-[1.1125rem] font-medium">
                            Robert Glassbreaker
                          </Text>

                          <Group noWrap spacing={10} mt={3}>
                            <Mail size={24} strokeWidth={1} color={'black'} />
                            <Text fz="xs" c="dimmed">
                              email :robert@glassbreaker.io
                            </Text>
                          </Group>

                          <Group noWrap spacing={10} mt={5}>
                            <Phone size={24} strokeWidth={1} color={'black'} />
                            <Text fz="xs" c="dimmed">
                              phone :+11 (876) 890 56 23sss
                            </Text>
                          </Group>
                        </div>
                      </Group>
                    </div>
                  </Grid.Col> */}
                  <Grid.Col span="content" className="">
                    <div>
                      <label className="font-normal text-xs  text-secondary-default">
                        Assignment Date
                      </label>
                      <p className="text-base  text-secondary-dark">
                        {moment(detail.createdAt).format('YYYY/MM/DD')}
                      </p>
                    </div>
                    <div className="mt-md">
                      <label className="font-normal text-xs  text-secondary-default">
                        Assignment Deadline
                      </label>
                      <p className="text-base  text-secondary-dark">
                        {moment(detail.deadLine).format('YYYY/MM/DD')}
                      </p>
                    </div>
                  </Grid.Col>
                  <Grid.Col span="content" className="">
                    <div>
                      <label className="font-normal text-xs  text-secondary-default">Lesson</label>
                      <p className="text-base  text-secondary-dark">
                        {detail?.lessonId?.lectureTitle ?? 'no lesson Title'}
                      </p>
                    </div>
                    <div className="mt-md">
                      <label className="font-normal text-xs  text-secondary-default">Section</label>
                      <p className="text-base  text-secondary-dark">
                        {detail?.sectionId?.sectionTitle ?? 'no section title'}
                      </p>
                    </div>
                  </Grid.Col>
                  <Grid.Col span="content" className="">
                    <div>
                      <label className="font-normal text-xs  text-secondary-default">
                        Submission Date
                      </label>
                      {(() => {
                        if (detail.taskSubmitted == null) {
                          return <p className="text-base  text-secondary-dark">Null</p>;
                        } else {
                          return (
                            <p className="text-base  text-secondary-dark">
                              {moment(detail?.taskSubmitted?.submittedAt ?? 'null').format(
                                'YYYY/MM/DD',
                              )}
                            </p>
                          );
                        }
                      })()}
                    </div>
                    <div className="mt-md">
                      <label className="font-normal text-xs  text-secondary-default ">Status</label>
                      {(() => {
                        if (detail.taskSubmitted == null) {
                          return <p className="text-base  text-secondary-dark">Null</p>;
                        } else {
                          return (
                            <p className="text-base  text-secondary-dark">
                              {detail?.taskSubmitted?.status ?? 'null'}
                            </p>
                          );
                        }
                      })()}
                      {/* <p className="text-base  text-secondary-dark ">
                {detail.taskSubmitted.status}
              </p> */}
                    </div>
                  </Grid.Col>
                </Grid>
              </Card>
            </div>
          </div>
          <div className=" text-left font-medium text-2xl h-full items-center">
            Submission Overview
          </div>
          <div className="submission_start ">
            <div className=" font-normal ">
              <div className=" text-base text-secondary-dark">Submission Description</div>
              {(() => {
                if (detail.taskSubmitted == null) {
                  return <p className="text-xs text-secondary-default my-sm"></p>;
                } else {
                  return (
                    <p className="text-xs text-secondary-default my-sm">
                      {parse(detail.taskSubmitted.description)}
                    </p>
                  );
                }
              })()}

              {(() => {
                if (detail.taskSubmitted != null) {
                  if (detail.taskSubmitted.fileUrl.split('.').pop() == 'pdf') {
                    return (
                      <div
                        className="flex  items-center "
                        onClick={() =>
                          pdf([detail.taskSubmitted.fileUrl ?? '', detail.assignmentTitle ?? ''])
                        }
                      >
                        <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="pdf" />
                      </div>
                    );
                  } else if (detail.taskSubmitted.fileUrl == '') {
                    return <p className="disabled">No File Available</p>;
                  } else if (detail.taskSubmitted.fileUrl.split('.').pop() == 'docx') {
                    return (
                      <div
                        className="flex  items-center "
                        onClick={() =>
                          pdf([detail.taskSubmitted.fileUrl ?? '', detail.assignmentTitle ?? ''])
                        }
                      >
                        <img
                          src={FileSvg}
                          className="h-[30px] w-[30px] cursor-pointer"
                          alt="docs"
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="flex  items-center "
                        onClick={() =>
                          pdf([detail.taskSubmitted.fileUrl ?? '', detail.assignmentTitle ?? ''])
                        }
                      >
                        <img
                          src={detail.taskSubmitted.fileUrl}
                          className="h-[30px] w-[30px] cursor-pointer"
                          alt="images"
                        />
                      </div>
                    );
                  }
                }
                // } else {
                //   return <p className="disabled">No File Available</p>;
                // }
              })()}
              {/* </div> */}
            </div>
            <div>
              <Text className="font-semibold text-lg "> Teacher Review</Text>
              <Text>{detail?.taskSubmitted?.remarks ?? 'No remarks'}</Text>
            </div>
          </div>
        </div>
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
              opened={pdfopened}
              onClose={() => setPdfOpened(false)}
              radius="lg"
              title={<div className="font-bold text-lg">View Document</div>}
              className="pop-modal assign-task-modals"
              size={'1000px'}
            >
              <PdfM pdfData={pdfData} setOpened={setPdfOpened} />
            </Modal>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TaskDetail;
