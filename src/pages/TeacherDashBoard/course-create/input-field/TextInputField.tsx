/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Text, TextInput } from '@mantine/core';
import React from 'react';

interface TextInputProps {
  form: any;
  title: string;
  courseModel: string;
  placeholder: string;
}

const TextInputField = (props: any) => {
  return (
    <>
      {' '}
      <div className="rounded-md">
        {/* <Text className="text-2xl text-secondary-dark font-semibold mb-xs">
         */}
        <Text className="text-xl mb-xs text-secondary-dark font-semibold">
          {props.title}
          {/* <span className="text-red-600"> *</span> */}
        </Text>

        <TextInput withAsterisk size="lg" radius="md" {...props} className="font-medium w-full" />
      </div>
    </>
  );
};

export default TextInputField;
