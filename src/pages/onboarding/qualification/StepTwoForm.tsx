/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Box, Card, Text, TextInput } from '@mantine/core';
import { MouseEvent, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

interface StepTwoFormProps {
  form: any;
  education: any;
  index: any;
  deleteEducation: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const StepTwoForm = (props: StepTwoFormProps) => {
  const [data, setData] = useState([
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
  ]);

  return (
    <div>
      <div className={props.index >= 1 ? 'rounded-md mt-md relative' : 'black relative'}>
        {props.index >= 1 ? (
          <div className="absolute top-none right-none px-lg  py-md z-10">
            <IconTrash
              size={25}
              strokeWidth={2}
              color={'#bf4b40'}
              onClick={(e: any) => props.deleteEducation(e, props.index)}
            />
          </div>
        ) : (
          ''
        )}
        {/* props.index >= 1 ? 'border-solid border-2 border-gray-300' : '' */}
        <Box className={`rounded-md pt-lg mb-xl`}>
          <div
            className={`grid grid-cols-1 gap-4  gap-lg w-full ${
              props.index >= 1 ? 'm-[0px !important] p-[20px]' : 'py-xs py-[10px] '
            }  `}
          >
            {/* <div>
              <Text className="font-bold font-poppin text-secondary-dark text-base  mb-[4px]">
                Level
              </Text>
              <TextInput
                variant="filled"
                placeholder="Enter your level"
                {...props.form.getInputProps(`education.${props.index}.level`)}
              ></TextInput>
            </div> */}
            <div>
              <Text className="font-normal  text-secondary-default text-sm  leading-6 mb-xs tracking-wider">
                Major Subject
              </Text>
              <TextInput
                variant="filled"
                placeholder="Enter your major"
                className="mb-xs"
                size="lg"
                radius="md"
                {...props.form.getInputProps(`education.${props.index}.subject`)}
              />
            </div>
            {/* <div className="">
              <Text className="font-bold font-poppin text-secondary-dark text-base   mb-[4px]">
                Board/University
              </Text>
              <TextInput
                variant="filled"
                placeholder="Enter Board/University"
                {...props.form.getInputProps(`education.${props.index}.university`)}
              ></TextInput>
            </div> */}
            <div>
              <Text className="font-normal  text-secondary-default text-sm  leading-6 mb-xs tracking-wider">
                Passing Year
              </Text>
              <TextInput
                variant="filled"
                placeholder="Enter the Passing Year"
                className=""
                size="lg"
                radius="md"
                {...props.form.getInputProps(`education.${props.index}.passedYear`)}
              ></TextInput>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default StepTwoForm;
