/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useState } from 'react';

import { Select, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../../../../store/modules/courses/actions';
interface PricingProps {
  form: any;
}

const PriceUnit = (props: PricingProps) => {
  return (
    <>
      <div className="w-full">
        <Text className="text-base font-medium  text-secondary-dark   mb-[4px]">
          Currency
          <span className="text-red-600 "> *</span>
        </Text>
        <Select
          placeholder="Currency"
          rightSectionWidth={30}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          data={['NPR', 'USD']}
          {...props.form.getInputProps('currency')}
        />
      </div>
    </>
  );
};

export default PriceUnit;
