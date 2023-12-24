/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Space, Text } from '@mantine/core';
import { useSelector } from 'react-redux';

export const CourseDetails = () => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  return (
    <section>
      <Text className="font-quicksand text-[48px]">
        {courseCreateData?.courseTitle ?? 'UX review presentations'}{' '}
      </Text>

      <Text className="text-lg mt-[24px]">
        {courseCreateData?.courseSubTitle ?? 'UX review presentations'}
      </Text>
      <Space h="xs" />
      <div>
        {courseCreateData?.tags?.map((tag: string, index: number) => (
          <Badge className="mr-[8px]" key={index}>
            {tag ?? 'tag'}
          </Badge>
        ))}
      </div>
    </section>
  );
};
