/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { errorImageHandler } from '../../utils/assets/imageurl';
import { Assessment, DefaultImage } from '../../utils/assets/image';
import {
  Button,
  Group,
  Card,
  Text,
  Grid,
  Image,
  Switch,
  useMantineTheme,
  Modal,
} from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import { IconEdit, IconBook2, IconUsers, IconNotes, IconGraph } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { IconCheck, IconX } from '@tabler/icons-react';
import useSwitch from '../../utils/hooks/useSwitch';
import { boolean } from 'yup';
import { APIDeleteUnpublishedCourse } from '../../api/course';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
export const MyCourseCard = (props: any) => {
  const { course, changeStatus } = props;
  console.log(course, 'id');
  const [checked, setChecked] = useState(course.status === 'PUBLISHED' ? true : false);
  const theme = useMantineTheme();
  const courseStatus = course.status === 'PUBLISHED' ? true : false;
  const [opened, { open, close }] = useDisclosure(false);
  // const toggleCourseActiveBtnHandler = (e: any) => {
  //   useCourseSwitch(checked, course, changeStatus);
  //   // setChecked(e.currentTarget.checked);

  // };

  //   useEffect(() => {
  //   (async () => {
  //     await requestEnrolledStatus();
  //   })();
  // }, []);

  const switchState = useSwitch(courseStatus, props);

  const redirectToEdit = (e: any, course: string) => {
    e.stopPropagation();
    navigate(`/teacher/add-course/${course}`);
  };
  const redirectToEditDraft = (e: any, course: string) => {
    e.stopPropagation();
    navigate(`/teacher/add-course/edit/${course}`);
  };
  const viewTask = (course: string) => {
    navigate(`/teacher/assignment/list/${course}`);
  };
  const deleteCourse = async (course: string) => {
    console.log(course, 'id');

    try {
      const response = await APIDeleteUnpublishedCourse(course);
      props.setRefresh(true);
      close();

      console.log('inside try block');
    } catch (error) {
      console.log(error, 'errors');
    }
  };
  const deleteModal = () => {
    open();
  };

  const navigate = useNavigate();
  return (
    <div className="course-card h-full rounded-lg shadow-xs hover:shadow-sm">
      <Card className="p-sm bg-white" radius="md" withBorder>
        <Card.Section component="div">
          <img
            style={{ aspectRatio: '350 / 200' }}
            onError={errorImageHandler}
            src={course?.courseImageUrl ?? ''}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </Card.Section>
        <div className="">
          <div className="mt-[12px]">
            <div className="flex justify-between items-center">
              <div className="font-medium two-line-fixed-height " title={`course.courseTitle`}>
                {' '}
                {course.courseTitle ?? 'Untitled'}
              </div>
              <div className="flex items-center gap-xs">
                {course.status === 'DRAFT' ? (
                  <IconEdit
                    className="cursor-pointer text-primary-700"
                    size={24}
                    strokeWidth={1.5}
                    onClick={(e: any) => redirectToEditDraft(e, course?._id ?? '')}
                  />
                ) : (
                  <IconEdit
                    className="cursor-pointer text-primary-700"
                    size={24}
                    strokeWidth={1.5}
                    onClick={(e: any) => redirectToEdit(e, course?._id ?? '')}
                  />
                )}
                {course.status === 'DRAFT' ? (
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faTrash}
                    style={{ color: '#ec274f' }}
                    size="lg"
                    onClick={deleteModal}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* <Group position="apart" className="mt-[12px]"></Group> */}
          <Group position="apart" className="my-[12px]">
            <div className="flex content-center items-center">
              <IconBook2 size={16} strokeWidth={2} color={'#1ea7dc'} />
              {/* <img onError={errorImageHandler} src={lessonimg} /> */}
              <Text
                size="sm"
                className="ml-[4px] text-[12px] font-normal font-outfit  tracking-[0.75px]"
              >
                Lesson: {course.lessons ?? '0'}
              </Text>
            </div>
            <div className="flex items-center">
              <IconUsers size={16} strokeWidth={2} color={'#1ea7dc'} />
              <Text
                size="sm"
                className="ml-[4px] text-[12px] font-normal font-outfit  tracking-[0.75px]"
              >
                Batches: {course.batches ?? '0'}
              </Text>
            </div>
          </Group>
          <Group position="apart" className="my-[12px]">
            <div className="flex items-center">
              <IconNotes size={16} strokeWidth={2} color={'#1EA7DC'} />
              <Text
                size="sm"
                className="ml-[4px] text-[12px] font-normal font-outfit  tracking-[0.75px] cursor-pointer"
                onClick={() => viewTask(course._id)}
              >
                Assignment:{course?.assignments ?? '0'}
              </Text>
            </div>
            <div className="flex items-center">
              <IconGraph size={16} strokeWidth={2} color={'#1EA7DC'} />
              <Text
                size="sm"
                className="ml-[4px] text-[12px] font-normal font-outfit  tracking-[0.75px]"
              >
                Assessment:0
              </Text>
            </div>
          </Group>
        </div>

        <div className="flex justify-between mt-[18px]">
          {/* <Button
            className="text-[12px] font-semibold"
            variant={'light'}
            onClick={(e: any) => redirectToEdit(e, course?._id ?? '')}
          >
            Edit Course
          </Button> */}

          <div className="flex justify-between items-center w-full">
            <Switch
              size="lg"
              {...switchState}
              title="active"
              thumbIcon={
                switchState.checked ? (
                  <IconCheck size="0.8rem" color="teal" stroke={3} />
                ) : (
                  <IconX size="0.8rem" color="red" stroke={3} />
                )
              }
            />
            <Modal opened={opened} onClose={close} title="" centered>
              <p> Are you want to delete this course ?</p>
              <div className="flex justify-between my-normal">
                <Button>Cancel</Button>
                <Button onClick={(e: any) => deleteCourse(course?._id)}>Delete</Button>
              </div>
            </Modal>

            <Button
              className="text-[12px] font-semibold ml-xs text-primary-700 p-none m-none hover:text-primary-200"
              variant="text"
              onClick={() => navigate(`/teacher/course/${course._id}`)}
            >
              View Details
            </Button>
            {/* <p>{course.status ?? 'helo'}</p> */}
          </div>
        </div>
      </Card>
    </div>
  );
};
