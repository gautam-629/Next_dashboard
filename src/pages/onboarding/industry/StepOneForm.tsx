/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { MultiSelect, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';

const StepOneForm = () => {
  const [data, setData] = useState([
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
  ]);
  return (
    <>
      <div>
        <Text className="text-sm  font-normal mt-md">
          What is your current or preferred industry?
        </Text>

        <MultiSelect
          data={data}
          placeholder="Select items"
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setData((current) => [...current, item]);
            return item;
          }}
        />
      </div>
      <div>
        <Text> How many students you want to teach in a Single Class?</Text>
        <TextInput placeholder="Number of Students" className=" my-sm  rounded-md" />
      </div>
      <div>
        <Text>Whats is your current job position? (If any)</Text>
        <TextInput placeholder="position" className=" my-sm  rounded-md" />
      </div>
    </>
  );
};

export default StepOneForm;
