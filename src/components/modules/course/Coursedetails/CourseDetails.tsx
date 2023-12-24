/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { Badge, Space, Text } from '@mantine/core';
import { useSelector } from 'react-redux';

export const CourseDetails = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  console.log(course, '@courseTitle');
  return (
    <section>
      {/* <h4 className="text-xs text-blue-500">{course?.createdAt ?? 'Published 20 Jan 2022'}</h4> */}
      <Text className=" text-5xl font-semibold">{course?.courseTitle}</Text>
      <Space h="xs" />
      {course?.shortDescription && <Text className="text-lg">{course?.shortDescription}</Text>}
      <Space h="xs" />
      <div>
        {course?.tags?.map((tag: string, index: number) => (
          <Badge key={index} className="mr-xs">
            {tag ?? 'tag'}
          </Badge>
        ))}
      </div>
    </section>
  );
};
