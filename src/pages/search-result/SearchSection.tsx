/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Grid } from '@mantine/core';
import { SearchResultsContainer } from './SearchResultsContainer';
import SideNavbar from './SideNavbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIGetSearchCourses } from '../../api/searchresults';
import { errorNotification } from '../../utils/helpers/notifications';
import { useForm } from '@mantine/form';
import PriceFilter from './PriceFilter';

export default function SearchSection() {
  const [courseList, setCourseList] = useState([]);
  const location = useLocation();

  const form = useForm({
    initialValues: {
      category: [],
      keyword: new URLSearchParams(location.search).get('keyword'),
      // createdStart: null,
      // createdEnd: null,

      // // priceFrom: '',
      priceRange: '',
    },
  });

  const keyword = new URLSearchParams(location.search).get('keyword') as string;

  // useEffect(() => {
  //   loadCourse();
  // }, [form]);

  useEffect(() => {
    form.setFieldValue('keyword', keyword);
    loadCourse();
  }, [keyword]);
  useEffect(() => {
    loadCourse();
  }, [form.values]);

  console.log(form.values, 'values');
  const loadCourse = async () => {
    try {
      const result = await APIGetSearchCourses(form.values);
      console.log(result, '@searchResults');
      setCourseList(result.data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  /// coursefilterbyPrice

  // useEffect(() => {
  //   pricefilterloadCourse();
  // }, [form.values.priceTo]);

  // const pricefilterloadCourse = async () => {
  //   console.log('select price');
  //   try {
  //     const { priceTo, ...valuesWithoutPriceTo } = form.values;
  //     const result = await APIGetSearchCourses(valuesWithoutPriceTo);

  //     // Check if a price range is selected
  //     if (form?.values?.priceTo) {
  //       console.log(form?.values?.priceTo, 'priceto');
  //       const priceToValue = form?.values?.priceTo;

  //       let minPrice: number | undefined;
  //       let maxPrice: number | undefined;

  //       if (priceToValue) {
  //         const priceRange = priceToValue.split('-').map(Number);
  //         console.log(priceRange, 'pricerange');
  //         if (priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
  //           [minPrice, maxPrice] = priceRange;
  //         } else {
  //           // Handle incorrect format or invalid data
  //           console.error('Invalid priceTo format:', priceToValue);
  //         }
  //       } else {
  //         // Handle the case where priceTo is undefined
  //         console.error('priceTo is undefined');
  //       }

  //       console.log(minPrice, 'minPrice');
  //       console.log(result, 'results');
  //       // Filter the result.data based on the selected price range
  //       const filteredCourses = result.data.filter(
  //         (course: any) =>
  //           (minPrice === undefined || course?.minMaxPrice?.minPrice >= minPrice) &&
  //           (maxPrice === undefined || course?.minMaxPrice?.maxPrice <= maxPrice),
  //       );
  //       console.log(filteredCourses, 'filteredCourses');
  //       setCourseList(filteredCourses);
  //     } else {
  //       setCourseList(result.data); // No price range selected, display all courses
  //     }
  //   } catch (error: any) {
  //     errorNotification(error?.toString());
  //   }
  // };

  return (
    <div className="wrapper-x py-2xl">
      <Grid>
        <Grid.Col md={3} sm={4} lg={3} xl={3}>
          <SideNavbar loadCourse={loadCourse} form={form} />
        </Grid.Col>
        <Grid.Col md={8} sm={8} lg={9} xl={9}>
          <SearchResultsContainer courseList={courseList} form={form} />
        </Grid.Col>
      </Grid>
    </div>
  );
}
