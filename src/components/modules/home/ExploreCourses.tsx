/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ExploreCard } from '../course/ExploreCard';
import { DefaultImage } from '../../../utils/assets/image';
import { useSelector } from 'react-redux';
import { ICourse } from '../../../utils/interfaces/Course.model';
import { Button } from '@mantine/core';
// import { topCategory } from '../../../utils/mock/topCategoryMockData';
import { useEffect, useState } from 'react';
import { APIGetFeaturedCategories } from '../../../api/categories';
import { AxiosResponse } from 'axios';
import { Category } from '../../../utils/interfaces/Category.model';
import { CategoryType } from '../../../utils/interfaces/type';

export const ExploreCourses = () => {
  const courseList = useSelector((state: any) => state.courseReducer.courseList);
  const [list, setList] = useState<Category[]>([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    try {
      const response: any = await APIGetFeaturedCategories();
      const categoryList: Category[] = response.data; // Assuming response.data is an array of category objects
      const slicedCategories = categoryList.slice(0, 6);
      // console.log(slicedCategories, 'slicedCategories');
      setList(slicedCategories);
    } catch (error) {
      // console.log(error, 'errors');
    }
  };
  // console.log(list, '@list');

  return (
    <div className=" ">
      <section className={' wrapper-x py-md lg:py-2xl dark:bg-blueGray-800 '}>
        <div className="text-area flex justify-between items-center mb-lg">
          <div className="text-4xl font-semibold">Browse Top Categories</div>
          {/* <Button> View All Categories </Button> */}
        </div>
        <div className="grid md:grid-cols-3 gap-normal course-list mt-lg rounded-lg ">
          {list?.map((data: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-orange-700">
              <ExploreCard course={data} DefaultImage={DefaultImage} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
