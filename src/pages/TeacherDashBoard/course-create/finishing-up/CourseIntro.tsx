/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { Text } from '@mantine/core';

const CourseIntro = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <section className="mt-md">
      <div>
        <Text className="text-lg font-semibold">Introduction</Text>
      </div>
      <div>
        {/* <p className="text-gray-500 ">
          {courseCreateData.category ??
            'Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id. '}
        </p> */}
        <p>{parse(courseCreateData?.longDescription ?? '')}</p>
      </div>
    </section>
  );
};

export default CourseIntro;
