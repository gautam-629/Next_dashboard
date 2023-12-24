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
import { Button } from '@mantine/core';
import TextEditorComponent from '../../../TeacherDashBoard/course-create/input-field/TextEditorComponent';

// import axios from 'axios';
export const TaskSubmit = (props: any) => {
  const form = useForm({
    initialValues: {
      ...INITIAL_SUBMIT_TASK,
    },
    validate: {
      description: (value) => value.length === 0 && 'Description cannot be empty',
    },
  });
  const { values } = form;
  const { reload, setReload } = props;

  // const { id } = useParams();
  const { batch } = useParams();
  const [item, setItem] = useState({
    assignmentTitle: '',
    course: '',
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
  });
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  useEffect(() => {
    (async () => {
      try {
        const res = (await axios.get(`assignment/assignment-list/${props.id}`)) ?? [];
        setItem(res.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  const submit = async () => {
    // const [{ batch }] = task;
    // values.batch = batch[0];
    values.batch = batch ?? '';
    values.assignment = props.id ?? '';
    // values.batch = {batch";
    // values.fileUrl = 'www.image.com';
    values.fileUrl = fileUrl;

    const { hasErrors, errors } = form.validate() || {};
    console.log(hasErrors, 'HasErrors');
    console.log(errors, 'errors');
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    if (hasErrors === false) {
      try {
        const Response = await axios.post(`task-submit/submit`, values);

        console.log(batch, '@batch');
        setReload(!reload);

        navigate(`/student/classroom/${batch}`);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      props.setSubmitFormOpened(false);
      console.log('close');
    }
  };

  return (
    <>
      {/* <div className="mb-sm">
        <PageTitleSm title="Assignment Details" />
      </div> */}

      {
        <div className="task-content rounded-md">
          {/* <div className="flex justify-between items-center">
            <div className=" font-medium  tracking-wider">{item.assignmentTitle}</div>
            <RedPill title="Not Submitted" />
          </div> */}
          <div className="flex justify-between items-center ">
            <div className="  tracking-wider font-normal text-gray-700">
              Check out the attached file below.
            </div>
            <div className=" text-sm font-medium  tracking-wide text-gray-700">{item.deadLine}</div>
          </div>
          <div className="flex justify-between items-center mt-sm">
            <div className="flex items-center gap-xs">
              <div className="flex">
                <a href={item.imageUrl}>
                  <img src={FileSvg} alt="" className="h-lg w-lg " />
                </a>
              </div>
              <input
                type="hidden"
                placeholder="Your Task Title goes here"
                className="bg-[#EFF0F7] text-[#A0A3BD py-sm px-sm rounded-lg  border-transparent"
                defaultValue={item.batch}
                {...form.getInputProps(`batch`)}
              />
              <div className="">
                <p className="font-semibold   tracking-wider m-none ">pdf</p>
                {/* <p className="text-xs   tracking-wider text-gray-600 m-none">200KB</p> */}
              </div>
            </div>
            <Button
              className=" grid items-center tracking-wider py-xs px-md rounded-lg font-bold text-sm"
              onClick={submit}
            >
              Submit
            </Button>
          </div>
          <div className="text-buttonColor-500 text-xs  mt-xs mb-sm">
            {/* 20:13:59 hrs left for Submission */}
          </div>
          <div className="mb-md">
            <File setFileUrl={setFileUrl}></File>

            {/* <FileUploads /> */}
          </div>
          <TextEditorComponent
            form={form}
            title="Description"
            courseModel={'description'}
            errorMessage={''}
            placeholder={'Description'}
            className={formErrors.description ? 'form-error-field' : ''}
          />
          {/* <RichTextEditor placeholder="" id="rte" {...form.getInputProps(`description`)} /> */}
          <div className="form-errors">{formErrors.description}</div>
        </div>
      }
    </>
  );
};
