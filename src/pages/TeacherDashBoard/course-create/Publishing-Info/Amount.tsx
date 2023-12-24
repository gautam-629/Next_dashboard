/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { NumberInput, Text } from '@mantine/core';
import React from 'react';
interface AmountProps {
  form: any;
}
const Amount = (props: AmountProps) => {
  return (
    <div className="w-full">
      <Text className="text-base font-medium  text-secondary-dark   mb-[4px]">
        Amount
        <span className="text-red-600 "> *</span>
      </Text>
      <NumberInput placeholder="0" {...props.form.getInputProps('coursePrice')}></NumberInput>
    </div>
  );
};

export default Amount;
