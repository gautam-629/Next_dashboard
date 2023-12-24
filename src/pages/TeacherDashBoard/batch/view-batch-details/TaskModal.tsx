/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Modal, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import axios from '../../../../plugins/axios';
import React, { useState } from 'react';
import { Select } from '@mantine/core';

import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';

interface TaskProps {
  form: any;
  courseList: any;

  batch: any;
  values: any;
}
const TaskModal = (props: TaskProps) => {
  const { form, values, batch, courseList } = props;
  const { deadLine, dueTime } = values;
  const navigate = useNavigate();
  // const batchId = [batch];
  const submit = async () => {
    const Response = axios.put(`/assignment/assignment-update/${values.taskId}`, {
      deadLine,
      dueTime,
      batch,
    });

    navigate(`/teacher/batches/${batch}/taskassign`);
  };
  return (
    <div>
      {/* Modal content */}
      <h1>Assign Task</h1>
      <div className="flex justify-between my-lg">
        <Select
          label="Select Task"
          placeholder={'Select Task'}
          rightSectionWidth={30}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          data={courseList}
          {...form.getInputProps(`taskId`)}
        />
        {/* <div>
          <Text className="text-base font-medium ">
            Currency
            <span className="text-red-600 "> *</span>
          </Text>
          <Select
            placeholder="Currency"
            rightSectionWidth={30}
            data={['NPR', 'USD']}
            {...props.form.getInputProps('currency')}
            className="w-full"
          />
        </div> */}

        <DatePicker
          className="ml-xs"
          placeholder="DeadLine"
          label="DeadLine"
          {...form.getInputProps(`deadLine`)}
        />
      </div>
      <div className="flex items-center justify-between mt-sm">
        <div>
          <label htmlFor="title" className="mr-xs">
            Due Time
          </label>
          <input
            type="time"
            placeholder="Your Batch Title goes here"
            className="bg-[#EFF0F7] text-[#A0A3BD   border-transparent"
            {...form.getInputProps(`dueTime`)}
          ></input>
        </div>
      </div>
      <Button className="my-lg" action={submit}>
        Asssign Task
      </Button>
    </div>
  );
};

export default TaskModal;
