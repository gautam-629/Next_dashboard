/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Box,
  Modal,
  MultiSelect,
  Progress,
  Text,
  TextInput,
  Textarea,
  Button,
  Badge,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from '../../../plugins/axios';
import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
// import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { useForm } from '@mantine/form';
import {
  INITIAL_SUBMIT_TASK,
  INITIAL_UPDATE_TASK,
} from '../../../utils/interfaces/SubmitTask.model';
import { IconChevronDown } from '@tabler/icons-react';
import moment from 'moment';
import { Clock, FileSvg } from '../../../utils/assets/image';
import { errorNotification } from '../../../utils/helpers/notifications';

interface TaskProps {
  //   form: any;
  AssignmentDetail: any;
  setOpened: any;
  setReloadCount: any;
}
const StudentTaskDetail = (props: TaskProps) => {
  const { AssignmentDetail, setOpened, setReloadCount } = props;
  const navigate = useNavigate();

  const [detail, setDetail] = useState<any>({
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
        const res = await axios.get(`task-submit/detail/${AssignmentDetail}`);
        setDetail(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
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
      const Response = await axios.put(`task-submit/update/${AssignmentDetail}`, values);
      setReloadCount((prev: number) => ++prev);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
    setOpened(false);
  };

  return (
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
            <a href={detail.fileUrl} className="cursor-pointer" target="_blank" rel="noreferrer">
              <img src={FileSvg} className="w-[37px] h-[30px] flex " />
            </a>
          </div>
          {/* <td>
          <img src={FileSvg} className="h-[50px] w-[50px]" alt="pdf" />
        </td> */}
          {/* </div> */}

          <div className="ml-[12px]  popup-detail">
            <Text className="mb-[4px] title-assignment   ">
              {detail.assignment.assignmentTitle}
            </Text>

            {/* <div className="flex justify-between items-center w-full mt-[12px] ">
              <Text className=" section-title">{detail.assignment.assignmentTitle}</Text>
              <Text className=" lesson-title ">Lesson:{detail.assignment.assignmentTitle}</Text>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-[12px] ">
        <div className="w-full ">
          <div className="flex justify-between items-center w-full mt-[12px] ">
            {/* <Text className="text-[10px] leading-3   font-normal text-primary-200 ">
              view all
            </Text> */}
            <Box className="mt-xs">
              <Text className="text-md   font-normal  ">
                <span className="font-medium">Submitted By:</span> {detail.student.firstName}{' '}
                {detail.student.lastName}
              </Text>
              <Text className="text-md  flex items-center mt-xs font-normal  ">
                {/* <img src={Clock} className="mr-xs" /> */}
                <span className="font-medium">Submission Date:&nbsp;</span>
                {moment(detail.submittedAt).format('YYYY/MM/DD')}
              </Text>
            </Box>

            <Text>
              {(() => {
                if (detail.status == 'Completed') {
                  return (
                    <Badge variant="gradient" gradient={{ from: 'green', to: 'green' }}>
                      Completed
                    </Badge>
                  );
                } else if (detail.status == 'Received') {
                  return (
                    <Badge variant="gradient" gradient={{ from: 'indigo', to: 'blue' }}>
                      Received
                    </Badge>
                  );
                } else if (detail.status == 'Review') {
                  return (
                    <Badge variant="gradient" gradient={{ from: '#077E8C', to: '#077E8C' }}>
                      Review
                    </Badge>
                  );
                } else {
                  return (
                    <Badge variant="gradient" gradient={{ from: '#F7CB73', to: '#F7CB73' }}>
                      Pending
                    </Badge>
                  );
                }
              })()}{' '}
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
      <div className="  w-full mt-md ">
        <Text className="font-medium text-lg">Answer</Text>
        <Text className=" ">{parse(detail.description)}</Text>
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
      <div className="">
        <Text className="mt-md font-semibold ">Status</Text>
        <Select
          placeholder={'Select'}
          rightSectionWidth={30}
          className="my-xs"
          size="md"
          radius={'md'}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          data={['Received', 'Review', 'Completed']}
          {...form.getInputProps(`status`)}
        />
      </div>
      {/* </div> */}
      <div className=" mt-md">
        <Text>Remarks</Text>
        <Textarea
          {...form.getInputProps(`remarks`)}
          name="remarks"
          className=" w-full min-h-[60px] my-xs"
          placeholder="Enter Remarks Here:"
          radius={'md'}
        >
          Enter Remarks Here
        </Textarea>
      </div>
      <Button onClick={submit} radius={'md'} className="px-md py-xs cursor-pointer">
        Submit
      </Button>
    </div>
  );
};

export default StudentTaskDetail;
