/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Image, Input, Loader, Pagination } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import BatchCard from './BatchCard';
import { useDispatch } from 'react-redux';
import { Tabs } from '@mantine/core';
import { Button, Group } from '@mantine/core';
import { Card, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import Course from '../../../assets/DefaultImage.jpg';
import { IconSearch } from '@tabler/icons-react';
import { APICourseCreate } from '../../../api/course';
import {
  getAllCourses,
  getAllPublishCourses,
  setCourseData,
} from '../../../store/modules/courses/actions';
import {
  Assessment,
  Assignment,
  Clock,
  DefaultImage,
  Lesson,
  image,
} from '../../../utils/assets/image';
import { errorNotification } from '../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../components/common/StackTitleComponent';
const Batch = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openModal, setOpenModal] = useState(false);
  const theme = useMantineTheme();
  const [modalData, setModalData] = useState({ id: '', courseTitle: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coursIsLoading, setCourseIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const [draftList, setDraftList] = useState([]);
  const [publishCourse, setPublishCourse] = useState([]);
  const [courseType, setCourseType] = useState('draft');

  const createNewCourse = async () => {
    try {
      setIsLoading(true);
      try {
        const response = await APICourseCreate({});
        const draftId = response?.data?.data?.draftId;
        dispatch(setCourseData({}));
        if (draftId) {
          navigate(`/teacher/batches/create`);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const course = await dispatch(getAllCourses());
        try {
          const publishCourse = await dispatch(getAllPublishCourses());
          setPublishCourse(publishCourse.data);
          setDraftList(course.data);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      } catch (error: any) {
        errorNotification(error?.toString());
      }

      setCourseIsLoading(true);
    })();
  }, []);

  return (
    <div>
      <section className=" p-sm">
        <div className="flex justify-between">
          <StackTitleComponent>Batches</StackTitleComponent>

          <Group position="apart">
            <Input
              variant="filled"
              icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
              placeholder="Your email"
            />

            <Button size={'md'} onClick={createNewCourse}>
              {!isLoading ? ' Create New Batch' : <Loader color="white" size="sm" />}
            </Button>
          </Group>
        </div>

        {/* {drafList.map((v: any, index: number) => (
    <CourseListTable data={course} key={index} index={index} />
  ))} */}

        <Tabs defaultValue="drafts">
          <Tabs.List>
            <Tabs.Tab value="ongoing">Ongoing</Tabs.Tab>
            <Tabs.Tab value="publishCourses" onClick={() => setCourseType('publishCourses')}>
              To be Started
            </Tabs.Tab>

            <Tabs.Tab value="completed">Completed</Tabs.Tab>

            <Tabs.Tab value="all" onClick={() => setCourseType('all')}>
              All
            </Tabs.Tab>
          </Tabs.List>
          {!coursIsLoading ? (
            <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
              <Loader variant="bars" size="lg" />
            </div>
          ) : (
            <div>
              <BatchCard
                value={'publishCourses'}
                data={publishCourse}
                lessonimg={Lesson}
                assignmentImg={Assignment}
                clockImg={Clock}
                assessmentImg={Assessment}
                image={image}
                defaultImage={DefaultImage}
                theme={theme}
              />
              <BatchCard
                value={'settings'}
                data={publishCourse}
                lessonimg={Lesson}
                assignmentImg={Assignment}
                clockImg={Clock}
                assessmentImg={Assessment}
                image={image}
                defaultImage={DefaultImage}
                theme={theme}
              />

              <Tabs.Panel value="settings" pt="xs">
                Settings tab content
              </Tabs.Panel>
              <Pagination total={10} className="mt-md " />
            </div>
          )}
        </Tabs>
      </section>
    </div>
  );
};

export default Batch;
