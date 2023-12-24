/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Select, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
interface SelectInputFieldProps {
  form: any;
  title: string;
  placeholder: string;
  courseModel: string;
  data: string[];
  errorMessage: string;
}
const SelectInputField = (props: SelectInputFieldProps) => {
  console.log(props?.data, '@testttt data');
  console.log(props.errorMessage, 'errorMEsssage');
  console.log(props.form.getInputProps(`${props?.courseModel}`), 'testttt');
  return (
    <div className="rounded-md">
      <Text className="text-2xl font-semibold mb-xs">
        {props?.title}
        {/* <span className="text-red-600 "> *</span> */}
      </Text>

      <Select
        size="lg"
        radius="md"
        placeholder={props.placeholder}
        rightSection={<IconChevronDown size={14} />}
        rightSectionWidth={30}
        styles={{
          rightSection: { pointerEvents: 'none' },
          input: {
            fontSize: '1rem',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '1.75rem',
            letterSpacing: '0.04688rem',
            color: '#414141',
          },
        }}
        data={props?.data}
        value={props.form?.values?.category}
        {...props.form.getInputProps(`${props?.courseModel}`)}
      />
    </div>
  );
};

export default SelectInputField;
