/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Grid, Select } from '@mantine/core';

import { useEffect, useState } from 'react';
import { SearchCard } from '../../components/modules/course/SearchCard';
import Avatar from '../../assets/Avatar.png';

import SearchResult from '../../assets/searchresult.png';
import { Badge } from '@mantine/core';
import { searchCourseList } from '../../utils/mockdata/mockData';
import { useLocation } from 'react-router-dom';
import { APIGetSearchCourses } from '../../api/searchresults';
import { errorNotification } from '../../utils/helpers/notifications';
import SearchPagination from './SearchPagination';

export const SearchResultsContainer = (props: any) => {
  const { courseList, form }: { courseList: any; form: any } = props;

  return (
    <section className={'searchresults bg-white p-sm rounded-lg'}>
      <div className="flex justify-between">
        <div className="text-lg font-normal">
          Showing {courseList?.length} Courses on Your Search{' '}
          <span className="font-bolder text-primary">{form.keyword}</span>
        </div>
        <div className="flex gap-xs items-center">
          {' '}
          <span>Sort By</span>
          <Select
            variant="filled"
            placeholder="Select"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
        </div>
      </div>

      {/*<div className="text-area flex ">*/}
      {/*  <div className="text-3xl m-2.5">*/}
      {/*    <img src={SearchResult} />*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col items-start ml-xs">*/}
      {/*    <Badge>*/}
      {/*      Design <Badge color="red ">8 min read </Badge>*/}
      {/*    </Badge>*/}
      {/*    <div className="text-3xl mt-sm">UX review presentations</div>*/}
      {/*    <div className="flex mt-lg">*/}
      {/*      <img src={Avatar} width="40px" height="40px" />*/}
      {/*      <div className={'pl-xs'}>*/}
      {/*        <div className="text-md">Olivia Rhye</div>*/}
      {/*        <div className="text-sm text-gray-500">20 Jan 2022</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {courseList.length > 0 ? (
        <Grid className="mt-md">
          {courseList?.slice(0, 4).map((v: any, index: number) => (
            <Grid.Col md={4} sm={6} lg={4} xs={12} key={index}>
              <SearchCard course={v} index={index + 1} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <section>
          <div className="text-2xl py-xl">No Results Found</div>
        </section>
      )}
      {/* <div className="mt-md">
        {' '}
        <SearchPagination />
      </div> */}
    </section>
  );
};
