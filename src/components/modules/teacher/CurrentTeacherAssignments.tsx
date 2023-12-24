/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  Select,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { FileSvg, JohnDoe, RightButton, Task } from '../../../utils/assets/image';
import { APIGetCurrentTeacherAssignments } from '../../../api/dashboard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorNotification } from '../../../utils/helpers/notifications';
import { IconSquareArrowRight } from '@tabler/icons-react';
import axios from '../../../plugins/axios';
import PdfM from '../../../pages/TeacherDashBoard/assignments/PdfM';
import moment from 'moment';
import { INITIAL_UPDATE_TASK } from '../../../utils/interfaces/SubmitTask.model';
import parse from 'html-react-parser';
import { useForm } from '@mantine/form';

export const CurrentTeacherAssignments = () => {
  const navigate = useNavigate();
  const [DetailOpened, setDetailOpened] = useState(false);
  const [assignments, setAssignments] = useState([] as any);
  const [submittedData, setSubmittedData] = useState([] as any);

  const [pdfData, setPdfId] = useState();
  const [pdfopened, setPdfOpened] = useState(false);
  const theme = useMantineTheme();
  const [submittedDataa, setDetail] = useState<any>({
    assignment: '',
    course: [],
    batch: [],
    lessonId: '',
    sectionId: [],
    description: '',
    student: '',
    imageUrl: '',
    StartDate: '',
    endDate: '',
    submitDate: '',
    isActive: false,
    dueTime: '',
    deadLine: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`task-submit/submittedData/${submittedData}`);
        setDetail(res.data);
      } catch (error: any) {
        console.log('');
      }
    })();
  }, []);

  const form = useForm({
    initialValues: {
      ...INITIAL_UPDATE_TASK,
    },
  });
  const { values } = form;

  const submit = async () => {
    try {
      const Response = await axios.put(`task-submit/update/${submittedData}`, values);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
    setDetailOpened(false);
  };
  const openModal = async (id: any) => {
    setDetailOpened(true);
    console.log(id, 'id');
    if (id) {
      try {
        const res = await axios.get(`assignment/submit-detail/${id}`);
        setSubmittedData(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    }
  };
  console.log(submittedData, '@submitted');
  const pdf = (pdfUrl: any) => {
    if (pdfUrl[0] == '') {
      return false;
    } else {
      setPdfId(pdfUrl);
    }

    setPdfOpened(true);
  };
  // const submitAssignment = (taskId: any) => {
  //   navigate(`/student/tasks/${batch}/${taskId}`);
  // };

  const calculateSubmittedTime = (submitDate: string) => {
    const d = new Date(submitDate).getTime(); // Convert submitDate to a timestamp in milliseconds
    const now = Date.now(); // Get the current time in milliseconds

    let timeAgo = now - d;

    const timeAgoInDays = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
    timeAgo = timeAgo % (1000 * 60 * 60 * 24);
    const timeAgoInHours = timeAgo / (1000 * 60 * 60);
    timeAgo = timeAgo % (1000 * 60 * 60);
    const timeAgoInMinutes = Math.floor(timeAgo / (1000 * 60));

    let agoTimes = '';

    if (timeAgoInDays) agoTimes = `${timeAgoInDays} days`;
    else if (timeAgoInHours) agoTimes = `${timeAgoInHours} hrs`;
    else if (timeAgoInMinutes) agoTimes = `${timeAgoInMinutes} min`;
    else agoTimes = `1 min`;
    return `${agoTimes} ago`;
  };

  const loadCurrentAssignments = async () => {
    try {
      const res = await APIGetCurrentTeacherAssignments();
      setAssignments(res.data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  useEffect(() => {
    loadCurrentAssignments();
  }, []);
  console.log(submittedData, '@submittedData');
  return (
    <div>
      <Text className="font-bold text-primary-700 text-lg mb-[5px] flex center">
        <img
          onError={errorImageHandler}
          src={Task}
          className="w-[20px] mr-[10px]"
          alt={'task-list'}
        />{' '}
        Submitted Task
      </Text>
      <Divider />
      {assignments.length > 0 ? (
        assignments.map((v: any, key: number) => (
          <div
            className="mt-sm rounded-xl cursor-pointer hover:bg-blue-500 p-sm hover:text-white !stroke-primary-700 !hover:stroke-white  "
            key={key}
            onClick={() => {
              openModal(v.assignment.id);
            }}
          >
            <div className="flex justify-between">
              <div className="w-4/5">
                <Text className="text-base">
                  {v?.batch?.batchName ?? 'Batch Title'} |{' '}
                  <span className=" text-[12px]">{calculateSubmittedTime(v.submittedAt)}</span>
                </Text>
                <Text className=" text-sm">
                  {v?.assignment?.assignmentTitle ?? 'Assignment Title'}
                </Text>
              </div>
              <div className="w-1/5 flex justify-end items-center">
                {' '}
                <IconSquareArrowRight size={28} strokeWidth={1.5} className="hover:white" />
              </div>
            </div>

            <Divider className="mt-[10px]" />
          </div>
        ))
      ) : (
        <div className="text-center p-xl">No pending assignments.</div>
      )}
      <div className="">
        <Modal
          className="overflow-visible flex-none popup-modal"
          opened={DetailOpened}
          onClose={() => setDetailOpened(false)}
          title={<span>Course: {submittedData?.course?.courseTitle ?? 'Untitled'}</span>}
        >
          <div className="flex justify-between">
            {' '}
            <div className="w-2/5 p-sm bg-gray-100 rounded-md">
              <img src={JohnDoe}></img>
              <p className="mt-xs font-semibold">Student Details</p>
              <p>Name : Kiran shrestha</p>
            </div>
            <div className="w-3/5">
              {' '}
              <p className="text-center text-lg font-medium">
                Batch: {submittedData?.batch?.batchName ?? 'August Batch'}
              </p>
              <div className=" mt-md detail bg-courseCreateBg-200 px-sm py-[20px]  rounded-[12px]">
                {' '}
                <div className="flex items-center">
                  <div className="flex items-center justify-center">
                    {/* <div className="flex filecss items-center justify-center">
    
              <img src={FileSvg} className="w-[37px] h-[30px] flex "/>
            </div> */}

                    {/* <div
              className="h-full"
              onClick={() => pdf([detail.imageUrl ?? '', detail.assignmentTitle ?? ''])}
            > */}
                    <div className="flex filecss items-center justify-center">
                      <a
                        href={submittedData?.imageUrl ?? ''}
                        className="cursor-pointer"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={FileSvg} className="w-[37px] h-[30px] flex " />
                      </a>
                    </div>
                    {/* <td>
            <img src={FileSvg} className="h-[50px] w-[50px]" alt="pdf" />
          </td> */}
                    {/* </div> */}

                    <div className="ml-[12px] popup-detail">
                      <Text className="mb-[4px] title-assignment   ">
                        {submittedData?.assignment?.assignmentTitle ?? ' Assignment111 Title'}
                      </Text>

                      <div className="flex justify-between items-center w-full mt-[12px] ">
                        <Text className=" section-title">
                          {submittedData?.section?.sectionTitle ?? ' Assignment Title'}
                        </Text>
                        <Text className=" lesson-title ">
                          Lesson:{submittedData?.lesson?.lessonTitle ?? 'Lesson'}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full mt-[12px] ">
                  <div className="w-full ">
                    <div className="flex justify-between items-center w-full mt-[12px] ">
                      {/* <Text className="text-[10px] leading-3   font-normal text-primary-200 ">
                view all
              </Text> */}
                      <Text className="text-[12px] leading-3   font-normal text-primary-200 ">
                        Student Name: {submittedData?.student?.firstName ?? 'Anoop'}{' '}
                        {submittedData?.student?.lastName ?? 'Shahi'}
                      </Text>
                      <Text className="text-[12px] leading-3   font-normal text-primary-200 ">
                        Submission Date:
                        {moment(submittedData?.submittedAt ?? '').format('YYYY/MM/DD')}
                      </Text>
                      <Text className="text-[12px] leading-3   font-normal text-primary-200 ">
                        Submission Status:{submittedData?.status ?? ''}
                      </Text>
                    </div>
                  </div>

                  {/* <Avatar.Group spacing="sm" className="ml-xs">
          <Avatar src={image} radius="xl" />
          <Avatar src={image} radius="xl" />
          <Avatar src={image} radius="xl" />
          <Avatar radius="xl">+5</Avatar>
        </Avatar.Group> */}
                </div>
                <div className="flex justify-between items-center w-full mt-[12px] p-sm">
                  <Text className=" ">{parse(submittedData?.longDescription ?? '')}</Text>
                </div>
                {/* <div className="flex justify-between my-sm">
          <Select
            searchable
            placeholder={'--- select status ---'}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            data={['Received', 'Review', 'Completed']}
            {...form.getInputProps(`status`)}
          /> */}
                <div className="flex my-sm items-center justify-between ">
                  <Select
                    label="Status:"
                    placeholder={'Select'}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    data={['Received', 'Review', 'Completed']}
                    {...form.getInputProps(`status`)}
                  />
                  {/* </div> */}
                </div>
                <div className="flex justify-between my-sm">
                  <Textarea
                    className="w-full"
                    placeholder="      Enter Remarks Here"
                    label="Remark"
                    withAsterisk
                    {...form.getInputProps(`remarks`)}
                  />
                </div>
                <Button
                  className=" px-md py-xs text-sm text-white rounded-lg no-underline cursor-pointer"
                  onClick={submit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
