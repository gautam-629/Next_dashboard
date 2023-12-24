/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { MultiSelect, Divider, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
interface TagsProps {
  form: any;
  errorMessage: string;
  courseModel: string;
}
const Tools = (props: TagsProps) => {
  const [toolsAndLanguage, setTags] = useState<any>([]);
  const { value } = props.form.getInputProps('toolsAndLanguage');

  useEffect(() => {
    setTags(value);
  }, [value]);

  return (
    <>
      <div className="my-sm">
        <div className="flex flex-col justify-between ">
          <Text className="text-2xl text-secondary-dark font-semibold mb-xs">
            {/* Tag <span className="text-red-600 "> *</span> */}
            Add Tools and Technology
          </Text>{' '}
          {/* <Divider className="mt-xs mb-[12px]" /> */}
          <div className="">
            <MultiSelect
              size="lg"
              className="w-full"
              data={toolsAndLanguage}
              placeholder="Tools and Technology"
              searchable
              creatable
              getCreateLabel={(query) => `+ Add ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setTags((current: any) => [...current, item]);
                return item;
              }}
              {...props.form.getInputProps('toolsAndLanguage')}
            />
          </div>
          {/* <span className="text-red-600 mt-sm">{props.errorMessage ? props.errorMessage : ''}</span> */}
        </div>
      </div>
    </>
  );
};

export default Tools;
