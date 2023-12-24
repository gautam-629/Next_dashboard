/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { NumberInput, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setCourseData } from '../../../../store/modules/courses/actions';
interface PublishingInfoFormProps {
  form: any;
}
const PublishingInfoForm = (props: PublishingInfoFormProps) => {
  return (
    <div className="mt-lg grid grid-cols-1 gap-4 md:grid-cols-2 gap-lg w-[750px]">
      <div>
        <Text className="text-base  font-medium ">
          Course Duration
          <span className="text-red-600 "> *</span>
        </Text>
        <TextInput
          className="mb-lg"
          placeholder="Enter Course Duration"
          withAsterisk
          {...props.form.getInputProps('courseDuration')}
        />
        <Text className="text-base  font-medium ">
          Class Start Date
          <span className="text-red-600 "> *</span>
        </Text>
        <DatePicker
          placeholder="date input"
          withAsterisk
          {...props.form.getInputProps('classTime')}
        />
      </div>
      <div className="">
        <Text className="text-base  font-medium ">
          Total Students to be enrolled
          <span className="text-red-600 "> *</span>
        </Text>
        <NumberInput
          className="mb-lg"
          placeholder="Number of Students"
          withAsterisk
          {...props.form.getInputProps('maxEnrollStudent')}
        />
        <Text className="text-base  font-medium ">
          Enrollment Date
          <span className="text-red-600 "> *</span>
        </Text>
        <DatePicker
          placeholder="Enrollment Date"
          withAsterisk
          {...props.form.getInputProps('enrollmentEndDate')}
        />
      </div>
    </div>
  );
};

export default PublishingInfoForm;
