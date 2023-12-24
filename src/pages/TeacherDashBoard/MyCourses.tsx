/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Tabs,
  Input,
  Grid,
  Group,
  Loader,
  Pagination,
  Text,
  useMantineTheme,
  ActionIcon,
} from '@mantine/core';

import { useDispatch } from 'react-redux';

import { CourseNotFound } from '../../utils/assets/image';
import { IconChevronLeft, IconSearch } from '@tabler/icons-react';
import { APICourseCreate, APIGetAllCourseList, APIUpdateCourseStatus } from '../../api/course';
import { useNavigate } from 'react-router-dom';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { ICourse } from '../../utils/interfaces/Course.model';
import { setCourseData } from '../../store/modules/courses/actions';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { errorNotification } from '../../utils/helpers/notifications';
import { useDisclosure } from '@mantine/hooks';
import { MyCourseCard } from './MyCourseCard';
import { INITIAL_COURSE } from '../../utils/interfaces/Course.model';

export const MyCourses = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch() as any;
  const [isCourseLoading, setCourseIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string | null>('active');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [courseList, setCourseList] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [refresh, setRefresh] = useState(false);
  const createNewCourse = async () => {
    try {
      setIsLoading(true);
      dispatch(setCourseData({ INITIAL_COURSE }));
      const response = await APICourseCreate({});
      const course = response?.data?.id;
      if (course) {
        navigate(`/teacher/add-course/${course}`);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [activeTab, page, refresh]);

  const getAllData = () => {
    (async () => {
      setCourseIsLoading(true);
      try {
        const limit = 8;
        const res = await APIGetAllCourseList(page, limit, activeTab);
        setCourseList(res.data.results);
        const totalPage = Math.ceil(res.data.count / 8);
        setCount(totalPage);
        setCourseIsLoading(false);
      } catch (error: any) {
        errorNotification(error?.toString() ?? 'Cannot get course list');
      }
    })();
  };

  const changeCourseStatus = async (id: string, status: string) => {
    try {
      const update = await APIUpdateCourseStatus(id, status);
      if (update) getAllData();
    } catch (error) {
      errorNotification(error?.toString() ?? 'Cannot updatet');
    }
  };

  const redirectToEdit = (e: any, course: string) => {
    e.stopPropagation();
    navigate(`/teacher/add-course/${course}`);
  };

  const notFoundComponent = () => {
    return (
      <div>
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center">
            <img onError={errorImageHandler} src={CourseNotFound} className="w-[145px] h-[145px]" />
            <Text className="text-center mt-[24px]  font-normal text-lg leading-[38px] ">
              Your Course list is empty.
            </Text>
            <Text className="text-center mt-[8px]  font-normal text-base  ">
              Please go to Add course to create course, and it will be listed here
            </Text>
            <Button size={'md'} onClick={createNewCourse} className="mt-[24px]">
              {!isLoading ? ' Add Course +' : <Loader color="white" size="sm" />}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const tabGridComponent = (myCourseList: any) => {
    if (isCourseLoading) {
      return <LoadingSpinner />;
    } else if (myCourseList.length === 0) {
      return notFoundComponent();
    } else {
      return (
        <Grid>
          {myCourseList?.map((v: ICourse, index: number) => (
            <Grid.Col key={index} md={4} sm={6} lg={3} xs={12} xl={3} className={'h-full '}>
              <MyCourseCard
                key={index}
                course={v}
                changeStatus={changeCourseStatus}
                setRefresh={setRefresh}
              />
            </Grid.Col>
          ))}
        </Grid>
      );
    }
  };

  if (isCourseLoading) return <LoadingSpinner />;
  return (
    <>
      <Card mt={'xs'} className="rounded-lg">
        <section className="tabs">
          <div className="flex justify-between items-center mb-md">
            <div className="flex items-center">
              <ActionIcon onClick={() => navigate(-1)}>
                <IconChevronLeft />
              </ActionIcon>
              <div className="text-2xl font-normal ml-sm text-secondary-dark">My Courses</div>
            </div>
            <Group position="apart">
              <Input
                variant="filled"
                icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
                placeholder="Search"
                className="search-btn"
              />
            </Group>
          </div>

          <Tabs
            radius="xs"
            defaultValue="active"
            value={activeTab}
            onTabChange={(value) => {
              setActiveTab(value);
              setPage(1);
            }}
          >
            <div className="flex justify-between">
              <Tabs.List>
                <Tabs.Tab value="active">Approved</Tabs.Tab>
                <Tabs.Tab value="inactive">Pending</Tabs.Tab>
                <Tabs.Tab value="all">All</Tabs.Tab>
              </Tabs.List>
              <Button size={'md'} onClick={createNewCourse} className="btn-gradient">
                {!isLoading ? ' Add Course +' : <Loader color="white" size="sm" />}
              </Button>
            </div>

            <Tabs.Panel value="active" pt="sm">
              <div>{tabGridComponent(courseList)}</div>
            </Tabs.Panel>
            <Tabs.Panel value="inactive" pt="sm">
              <div>{tabGridComponent(courseList)}</div>
            </Tabs.Panel>
            <Tabs.Panel value="all" pt="sm">
              <div>{tabGridComponent(courseList)}</div>
            </Tabs.Panel>
          </Tabs>
        </section>
        <div className="flex justify-center mt-lg">
          <Pagination
            total={count}
            size="sm"
            mt={'md'}
            value={+page}
            onChange={(pageNumber: any) => setPage(pageNumber)}
            className="rounded-lg"
          />
        </div>
      </Card>
    </>
  );
};
