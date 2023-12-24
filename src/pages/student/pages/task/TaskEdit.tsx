/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { ReactElement, useEffect, useState } from 'react';
import { PageTitleSm } from '../../../../components/common/PageTitleSm';
import { RedPill } from '../../../../components/common/RedPill';
import { FileSvg } from '../../../../utils/assets/image';
import RichTextEditor from '@mantine/rte';
import axios from '../../../../plugins/axios';

// import { FileUploads } from './components/FileUpload';
import { INITIAL_SUBMIT_TASK } from '../../../../utils/interfaces/SubmitTask.model';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import { File } from '../../../../components/File';
import { errorNotification } from '../../../../utils/helpers/notifications';

// import axios from 'axios';
export const TaskEdit = () => {
  const form = useForm({
    initialValues: {
      ...INITIAL_SUBMIT_TASK,
    },
  });
  const { values } = form;

  const { id } = useParams();
  const { batch } = useParams();
  const [tasksolnId, settasksolnId] = useState();
  const [item, setItem] = useState({
    assignmentTitle: '',
    courseId: '',
    batch: [],
    lessonId: '',
    sectionId: '',
    longDescription: '',
    imageUrl: '',
    StartDate: '',
    endDate: '',
    submitDate: '',
    isActive: false,
    dueTime: '',
    deadLine: '',
    taskSubmitted: {
      description: '',
      remarks: '',
      fileUrl: '',
      _id: '',
    },
  });
  const navigate = useNavigate();
  const [filUrl, setFileUrl] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`assignment/submit-detail/${id}`);
        const formData = res.data.taskSubmitted;

        setItem(res.data.data);
        settasksolnId(res.data.taskSubmitted._id);
        form.setValues({ ...formData });
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const submit = async () => {
    if (filUrl != '') {
      values.fileUrl = filUrl;
    }

    // values.imageUrl = fileUrl;
    const { description, fileUrl } = values;
    try {
      await axios.put(`task-submit/update/${tasksolnId}`, {
        description,
        fileUrl,
      });
    } catch (error: any) {
      errorNotification(error?.toString());
    }
    navigate(`/student/classroom/${batch}`);
  };
  console.log(values, '@values');
  return (
    <>
      <div className="mb-sm">
        <PageTitleSm title="Assignment" />
      </div>
      {
        <div className="task-content bg-gray-200 p-[20px] rounded-md">
          <div className="flex justify-between items-center">
            <div className=" font-medium  tracking-wider">{item?.assignmentTitle}</div>
            <RedPill title="Not Submitted" />
          </div>
          <div className="flex justify-between items-center mt-sm">
            <div className="  tracking-wider font-normal text-gray-700">
              Check out the attach file below.
            </div>
            <div className=" text-sm font-medium  tracking-wide text-gray-700">
              {item?.deadLine}
            </div>
          </div>
          <div className="flex justify-between items-center mt-sm">
            <div className="flex items-center gap-xs">
              <div className="flex">
                <a href={item?.imageUrl}>
                  <img src={FileSvg} alt="" className="h-lg w-lg " />
                </a>
              </div>
              <input
                type="hidden"
                placeholder="Your Task Title goes here"
                className="bg-[#EFF0F7] text-[#A0A3BD py-sm px-sm rounded-lg  border-transparent"
                defaultValue={item?.batch}
                {...form.getInputProps(`batch`)}
              />
              <div className="">
                <p className="font-semibold   tracking-wider m-none ">pdf</p>
                {/* <p className="text-xs   tracking-wider text-gray-600 m-none">200KB</p> */}
              </div>
            </div>
            <div
              className=" grid items-center py-xs px-md text-white bg-buttonColor-500 rounded-lg font-semibold text-sm cursor-pointer"
              onClick={submit}
              // onClick={() => submit(item._id)}
            >
              Submit
            </div>
          </div>
          <div className="text-buttonColor-500 text-xs  mt-xs mb-sm">
            {/* 20:13:59 hrs left for Submission */}
          </div>
          <div className="mb-md">
            <File setFileUrl={setFileUrl}></File>
            {item?.taskSubmitted?.fileUrl.split('.').pop() == 'pdf' ? (
              <img src={FileSvg} className="h-[100px] w-[100px]" alt="pdf" />
            ) : (
              <img
                src={item?.taskSubmitted?.fileUrl}
                className="h-[200px] w-[200px]"
                alt="cleaning images"
              />
            )}
            <input
              type="hidden"
              placeholder=""
              className="bg-[#EFF0F7] text-[#A0A3BD py-sm px-sm rounded-lg  border-transparent"
              {...form.getInputProps(`fileUrl`)}
            />

            {/* <FileUploads /> */}
          </div>
          <RichTextEditor placeholder="" id="rte" {...form.getInputProps(`description`)} />
        </div>
      }
    </>
  );
};
