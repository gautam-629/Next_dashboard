/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Text } from '@mantine/core';
import React from 'react';

const Heading = () => {
  return (
    <div>
      <Text className="text-[32px]  font-bold">Lets, Get Started</Text>
      <Text className="text-lg  font-normal leading-[38px] mt-[24px]">
        {' '}
        Answer these quick questions for personalized recommendations that match your goals.
      </Text>
    </div>
  );
};

export default Heading;
