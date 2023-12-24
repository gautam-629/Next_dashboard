/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { MultiSelect, Divider, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
interface TagsProps {
  form: any;
  errorMessage?: string;
  courseModel?: string;
  label: string;
  placeholder: string;
}
const TagsInput = (props: TagsProps) => {
  const [tags, setTags] = useState<any>([]);
  const { value } = props.form.getInputProps(`${props.courseModel}`);

  useEffect(() => {
    setTags(value);
  }, [value]);

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-between ">
          <Text className="text-2xl text-secondary-dark font-semibold mb-xs">
            {/* Tag <span className="text-red-600 "> *</span> */}
            {/* Tags */}
            {props.label}
          </Text>{' '}
          {/* <Divider className="mt-xs mb-[12px]" /> */}
          <div className="">
            <MultiSelect
              variant="unstyled"
              rightSection={<></>}
              styles={{
                rightSection: { pointerEvents: 'none' },
                value: {
                  padding: '1rem',
                  margin: '0.5rem ',
                  fontSize: '1rem',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: '1.75rem',
                  letterSpacing: '0.04688rem',
                  color: '#414141',
                },
                input: { padding: '0.5rem' },
              }}
              rightSectionWidth={40}
              size="lg"
              radius="md"
              className="w-full"
              data={tags}
              placeholder={props.placeholder}
              searchable
              creatable
              getCreateLabel={(query) => `+ Add ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setTags((current: any) => [...current, item]);
                return item;
              }}
              {...props.form.getInputProps(`${props.courseModel}`)}
            />
          </div>
          {/* <span className="text-red-600 mt-sm">{props.errorMessage ? props.errorMessage : ''}</span> */}
        </div>
      </div>
    </>
  );
};

export default TagsInput;
