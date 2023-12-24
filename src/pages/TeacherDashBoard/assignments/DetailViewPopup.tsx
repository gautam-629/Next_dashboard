/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Modal, MultiSelect, Progress, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from '../../../plugins/axios';
import React, { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { Clock, FileSvg } from '../../../utils/assets/image';
import moment from 'moment';
import { errorNotification } from '../../../utils/helpers/notifications';

interface TaskProps {
  //   form: any;
  AssignmentDetail: any;
  setOpened: any;
}
const DetailViewPopup = (props: TaskProps) => {
  const { AssignmentDetail, setOpened } = props;
  const [pdfData, setPdfId] = useState();
  const [pdfopened, setPdfOpened] = useState(false);

  const [detail, setDetail] = useState<any>({
    assignmentTitle: '',
    course: [],
    batch: [],
    lessonId: '',
    sectionId: [],
    longDescription: '',
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
        const res = await axios.get(`assignment/assignment-list/${AssignmentDetail}`);

        setDetail(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const pdf = (pdfUrl: any) => {
    setPdfId(pdfUrl);

    setPdfOpened(true);
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
            {(() => {
              if (detail.imageUrl != '') {
                return (
                  <a
                    href={detail.imageUrl}
                    className="cursor-pointer"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={FileSvg} className="w-[37px] h-[30px] flex " />
                  </a>
                );
              } else {
                return <img src={FileSvg} className="w-[37px] h-[30px] flex " />;
              }
            })()}
          </div>

          <div className="ml-[12px] popup-detail">
            <Text className="mb-[4px] font-medium  text-2xl">{detail.assignmentTitle}</Text>
            <Text className=" text-lg">{detail.course.courseTitle}</Text>
            {/* <div className="flex justify-between items-center w-full mt-[12px] ">
              <Text className=" section-title">
                {detail?.sectionId?.sectionTitle ?? 'no section title'}
              </Text>
              <Text className=" lesson-title ">Lesson:{detail.lessonId}</Text>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-[12px] ">
        <div className="w-full ">
          {/* <div className=" w-full flex items-center">
  
            <Progress value={50} size="sm" className="w-full mr-xs" />
            <span className=" text-secondary-default text-sm font-normal  tracking-[0.25px]">
              50%{' '}
            </span>
          </div> */}
          <div className="flex justify-between items-center w-full mt-[12px] ">
            <Text className="text-md leading-3   font-normal  ">
              Status: {detail.isActive == true ? 'Active' : 'InActive'}
            </Text>
            <Text className="text-md leading-3  flex items-center  font-medium  ">
              <img src={Clock} className="mr-xs" />
              DeadLine: {moment(detail.deadLine).format('YYYY/MM/DD')}
            </Text>
          </div>
        </div>
      </div>
      <div className="ml-[9px] my-[30px] popup-detail">
        <Text className="mb-[4px] title-assignment   ">Description:</Text>
        <div className="flex justify-between items-center w-full mt-[12px] ">
          <Text className=" ">{parse(detail.longDescription)}</Text>
        </div>
      </div>
    </div>
    // <div className="assign-task-details">
    //   <div></div>
    //   <div className="flex justify-between my-sm">Assignment Title: {detail.assignmentTitle}</div>
    //   <div className="flex justify-between my-sm">Course: {detail.course.courseTitle}</div>
    //   <div className="flex justify-between my-sm">Section: {detail.sectionId.sectionTitle}</div>
    //   <div className="flex justify-between my-sm">Lesson: {detail.lessonId}</div>
    //   <div className="flex justify-between my-sm">Deadline: {detail.deadLine}</div>

    //   <div className="flex my-sm justify-start">Description: {parse(detail.longDescription)}</div>

    //   <div className="flex justify-between my-sm">Status: {detail.isActive}</div>

    //   <div className="flex items-center justify-between "></div>
    // </div>
  );
};

export default DetailViewPopup;
