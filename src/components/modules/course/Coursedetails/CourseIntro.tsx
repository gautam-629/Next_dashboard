/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Text } from '@mantine/core';
import { useSelector } from 'react-redux';

const CourseIntro = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <section className={'mt-lg'}>
      {/* <Divider /> */}
      <div>
        <Text className="text-[24px] mt-lg font-normal mb-[24px]">Introduction</Text>
        <p className="text-base font-normal mt-6">
          <span dangerouslySetInnerHTML={{ __html: course?.longDescription }}></span>
        </p>
      </div>
    </section>
  );
};

export default CourseIntro;
