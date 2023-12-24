/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { getLatestBlogsCourses } from '../../../utils/mockdata/mockData';
import { Button, Grid } from '@mantine/core';
import { CourseCard } from '../course/CourseCard';
import { APIGetLatestBlog } from '../../../api/blog';
import { errorNotification } from '../../../plugins/notification';
import { useEffect, useState } from 'react';
import { BlogCard } from '../../common/BlogCard';
import { LandingBlogCard } from '../../common/LandingBlogCard';
import { useNavigate } from 'react-router-dom';

const LatestBlogsCourses = () => {
  const [courses, setCourses] = useState([] as any);
  const navigate = useNavigate();
  useEffect(() => {
    loadLatestCourses();
  }, []);
  const loadLatestCourses = async () => {
    try {
      const res = await APIGetLatestBlog();
      setCourses(res.data);
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: 'Cannot load latest courses',
      });
    }
  };

  return (
    <div className="">
      {' '}
      <section className={' wrapper-x py-md md:py-2xl  dark:bg-blueGray-800  '}>
        <div className="flex flex-row-reverse">
          <Button size="md" variant="outline" className="md:flex" onClick={() => navigate(`/blog`)}>
            Explore Blogs
          </Button>
        </div>
        <div className="text-area flex justify-between">
          <div>
            {/* <p className="text-base font-semibold text-[#D05730]">Our Blogs</p> */}
            <div className="text-4xl font-semibold md:text-3xl lg:text-4xl">
              Our Latest Blogs courses
            </div>
            <div className="text-lg font-normal mt-normal text-[#667085]">
              Tool and strategies modern teams need to help their companies grow.
            </div>
          </div>{' '}
        </div>

        <Grid className=" w-full" gutterXl={50}>
          {courses.map((v: any, index: any) => (
            <Grid.Col key={index} md={3} sm={6} lg={6} xs={12} xl={3} className={'h-full mt-lg'}>
              <LandingBlogCard data={v} className="w-full" />
            </Grid.Col>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default LatestBlogsCourses;
