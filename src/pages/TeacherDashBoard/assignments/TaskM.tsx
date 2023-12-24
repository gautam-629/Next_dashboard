/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Modal, MultiSelect, Text, TextInput } from '@mantine/core';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import axios from '../../../plugins/axios';
import React, { useState } from 'react';
import { Select } from '@mantine/core';
// import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { errorNotification } from '../../../utils/helpers/notifications';

interface TaskProps {
  form: any;
  batchdata: any;
  setReload: any;
  setOpened: any;
  taskId: any;
  values: any;
  course: any;
  setReloadCount: any;
  reload: any;
  mainTopic: any;
  setCurrentActive: any;
}
const TaskM = (props: TaskProps) => {
  const {
    form,
    values,
    taskId,
    batchdata,
    course,
    setOpened,
    setReloadCount,
    setReload,
    reload,
    setCurrentActive,
    mainTopic,
  } = props;
  const { deadLine, dueTime } = values;
  const batches = values.batches;
  const isActive = values.isActive == 'Yes' ? true : false;
  const navigate = useNavigate();
  const submit = async () => {
    try {
      const Response = await axios.put(`/assignment/assignment-update/${taskId}`, {
        deadLine,
        dueTime,
        batches,
        isActive,
      });
      setReloadCount((prev: number) => ++prev);
      setCurrentActive(mainTopic);
      setReload(!reload);
    } catch (error: any) {
      errorNotification(error?.toString());
    }

    setOpened(false);
  };
  return (
    <div className="assign-task-details">
      {/* Modal content */}
      <h1 className=" font-semibold  text-secondary-dark text-3xl leading-8 tracking-[1px]">
        Assign Assignment
      </h1>
      <div className="flex justify-between my-sm mt-lg">
        <MultiSelect
          label="Select Batch"
          variant="filled"
          className="w-full multiselect"
          data={batchdata}
          placeholder="Select batch"
          searchable
          size="md"
          creatable
          {...form.getInputProps('batches')}
        />
      </div>
      <div className="flex items-center justify-between ">
        <div>
          <label
            htmlFor="title"
            className="mr-xs font-poppin font-normal text-base   text-secondary-dark "
          >
            Due Time
          </label>
          <input
            type="time"
            placeholder="Your Batch Title goes here"
            className=" text-[#A0A3BD] border-[1px] py-xs px-[12px] py-[6px] border-Grayscale-300 rounded-md "
            {...form.getInputProps(`endTime`)}
          ></input>
        </div>
        <DatePickerInput
          className="ml-xs w-full font-poppin font-normal text-base   text-secondary-dark"
          placeholder="DeadLine"
          label="DeadLine"
          size="md"
          {...form.getInputProps(`endDate`)}
        />
      </div>
      <div className=" my-sm   ">
        <Select
          label="Is Active?"
          placeholder={'Select'}
          fullwidth
          size="md"
          rightSectionWidth={30}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          data={['Yes', 'No']}
          {...form.getInputProps(`isActive`)}
        />
      </div>
      {/* <Button className="" size="lg" action={submit}>
        Assign Assignment
      </Button> */}
      <Button size="md" radius="md" onClick={submit}>
        Assign Assignment
      </Button>
    </div>
  );
};

export default TaskM;
