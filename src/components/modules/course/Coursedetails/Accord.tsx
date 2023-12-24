/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion } from '@mantine/core';
import React from 'react';

const Accord = () => {
  return (
    <Accordion.Item value="flexibility">
      <Accordion.Control>Setup</Accordion.Control>
      <Accordion.Panel>
        Configure components appearance and behavior with vast amount of settings or overwrite any
        part of component styles
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default Accord;
