/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useSelector } from 'react-redux';
import PreviewCourse from '../../../../assets/previewcourse.png';
import { errorImageHandler } from '../../../../utils/assets/imageurl';
import { NotFound } from '../../../../utils/assets/image';
const CourseImage = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <section className="mt-xs">
      <img
        src={course?.courseImageUrl ?? NotFound}
        onError={errorImageHandler}
        alt=""
        // className={'w-full absolute top-none left-none rounded-md object-cover h-full'}
        style={{ aspectRatio: '980 / 271' }}
        width={500}
        className={'object-cover object-center w-full '}
      />
    </section>
  );
};

export default CourseImage;
