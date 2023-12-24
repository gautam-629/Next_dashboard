/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { CourseCard } from '../course/CourseCard';
import { DefaultImage } from '../../../utils/assets/image';
import { useSelector } from 'react-redux';
import { ICourse } from '../../../utils/interfaces/Course.model';
import { Button, Tabs } from '@mantine/core';
import { CategoriesSection } from './CategoriesSection';
import CourseByCatergory from '../../../pages/home/coursebycategory';
import { CategoryType } from '../../../utils/interfaces/type';

export const FeaturedCourses = () => {
  const courseList = useSelector((state: any) => state.courseReducer.courseList);
  // console.log(courseList, '@courseList');

  return (
    <section className={'wrapper-x mt-xl'}>
      <div className="text-area flex justify-between">
        <div>
          <p className="font-semibold text-4xl leading-10 tracking-wider text-secondary-dark">
            Explore through our vast array of courses
          </p>
          <p className="font-normal text-xl mt-sm lg:mt-none leading-10 tracking-wider text-secondary-dark">
            {' '}
            The latest news, technologies, and resources from our team.
          </p>
        </div>
        {/* <div>
          <Button variant="outline">View All Categories </Button>
        </div> */}
      </div>
      {/* <div className="course-list grid gap-lg md:grid-cols-2 lg:grid-cols-3 mt-lg">
        {courseList?.courses?.map((v: ICourse, index: number) => (
          <div key={index}>
            <CourseCard course={v} DefaultImage={DefaultImage} />
          </div>
        ))}
      </div> */}

      <CourseByCatergory />
    </section>
  );
};
