/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, Box, Button, Grid, Group, Notification, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MouseEvent, SyntheticEvent, useEffect, useState } from 'react';
import Section from './Section';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IconPlus } from '@tabler/icons-react';
import { setCourseData } from '../../../../store/modules/courses/actions';
import { getMyCourseById } from '../../../../store/modules/courses/getMyCourseById';

import {
  ISection,
  INITIAL_SECTION,
  INITIAL_LESSON,
} from '../../../../utils/interfaces/Course.model';
import SecondaryDetails from '../SecondaryDetails';
import { createCoursePlanning } from '../../../../store/modules/sections/action';
import { useNavigate, useParams } from 'react-router-dom';
import { AccordionItem } from '@mantine/core/lib/Accordion/AccordionItem/AccordionItem';
import { APIDeleteTopic, APIPostCourseDetails } from '../../../../api/course';
import { useDisclosure } from '@mantine/hooks';
import Preview from '../Preview';
import { errorNotification } from '../../../../plugins/notification';

const pattern =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

interface IPermission {
  [key: string]: any;
}

const PlanYourCourse = (props: any) => {
  console.log('Triggred Role is ', props?.role);
  const role = props?.role;
  const passedTopics = props?.passedTopics;

  const permission: IPermission = {
    teacher: '',
    user: 'hidden',
    student: 'hidden',
  };

  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  // console.log(courseCreateData.topics, 'coursecreatedata topics');
  const { courseId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  console.log('Insid plan your course index', courseCreateData);
  const { setActive } = props;

  const course = courseId;
  const [accordionValue, setAccordionValue] = useState<string | null>(null);

  const initialSections = courseCreateData?.topics?.length
    ? [
        courseCreateData?.topics.map((topic: any) => {
          return {
            ...topic,
            // lessons: section?.lessons?.length ? section.lessons : [INITIAL_LESSON],
          };
        }),
      ]
    : [INITIAL_SECTION];

  const form = useForm({
    initialValues: {
      ...courseCreateData,
      topics: courseCreateData?.topics,
    },
    // validate: {
    //   description: (value) => value.length === 0 && 'Description cannot be empty',
    //   topics: [{ title: (value) => value.length === 0 && 'sections cannot be empty' }],
    //   videoUrl: (value) => !pattern.test(value) && 'url should be valid',
    // },
    validate: {
      topics: {
        title: (value) => value == undefined || value == '',
        // description: (value) => value == '' && 'Description cannot be empty',
        creditHours: (value) => value == 0 || value == 'undefined' || value == '',

        topics: {
          title: (value) => value == undefined || value == '',

          // description: (value) => value == '' && 'Description cannot be empty',
          creditHours: (value) => value == 0 || value == 'undefined' || value == '',

          topics: {
            title: (value) => value == undefined || value == '',
            // description: (value) => value == '' && 'Description cannot be empty',
            creditHours: (value) => value == 0 || value == 'undefined' || value == '',
          },
        },
      },
    },
    // Validate each topic in the array

    // useEffect(() => {
    //   if (course) {
    //     dispatch(getMyCourseById(course));
    //   }
    // }, []);
  });

  useEffect(() => {
    passedTopics
      ? form.setValues({
          ...courseCreateData,
          topics: passedTopics,
        })
      : form.setValues({
          ...courseCreateData,
          topics: courseCreateData?.topics,
        });
  }, [courseCreateData]);

  const { values } = form;

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { hasErrors, errors } = form.validate();
    if (hasErrors) {
      return;
    }
    dispatch(createCoursePlanning({ values, course }));
    // permission[role] == 'hidden' ? '' : props.nextStep();
    props.nextStep();
  };

  const addNewSection = () => {
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      return;
    }
    form.insertListItem('topics', {
      ...INITIAL_SECTION,
      // index: values.sections.length,
      course: courseId,
    });
    setAccordionValue(values.topics.length.toString());
  };

  const deleteSection = (e: MouseEvent<HTMLButtonElement>, index: number, id: string) => {
    e.stopPropagation();
    form.removeListItem('topics', index);
    id ? APIDeleteTopic(id) : '';

    // console.log(response);
    // console.log('Deleted item with id ', id);
  };

  const hanldleNextStep = async (e: any) => {
    e.preventDefault();
    console.log('Submitted Values', values?.topics);
    try {
      form.validate();

      await APIPostCourseDetails(values?.topics);
      // console.log(response);
      dispatch(setCourseData({ topics: values?.topics }));
      // dispatch(createCoursePlanning({ values, course }));

      console.log('@Submitted Course', values.topics);

      props.nextStep();
    } catch (error: any) {
      console.log(error);
      // errorNotification(error);
    }

    // dispatch(setCourseData(values?.sections));
  };

  return (
    <>
      <form onSubmit={submit} className={'pt-sm bg-white w-full'}>
        {/* <Grid p={0} gutter={0}>
        <Grid.Col span={8}> */}
        <div className="px-md mb-md ">
          <div className="font-poppin text-xl font-semibold   text-secondary-dark mb-md">
            Plan your course
          </div>
          <div className="font-poppin text-lg font-semibold   text-secondary-dark ">
            Course Content
          </div>

          <Accordion
            chevronPosition="left"
            defaultValue={accordionValue}
            value={accordionValue}
            onChange={setAccordionValue}
            variant="separated"
            className="mt-lg"
            styles={{
              label: {
                paddingTop: '0',
                paddingBottom: '0',
              },
            }}
            // key={index}
          >
            {values?.topics?.map((section: ISection, index: number) => (
              <Accordion.Item value={index.toString()} className="bg-white " key={index}>
                <Section
                  section={section}
                  key={index}
                  SectionIndex={index}
                  deleteSection={deleteSection}
                  form={form}
                  permission={permission}
                  role={role}
                />
              </Accordion.Item>
            ))}
          </Accordion>

          <Button
            className={` w-[100%] text-secondary-dark font-poppin font-medium text-lg mt-md border-dashed border-2 border-primary-1000 ${permission[role]}`}
            variant="unstyled"
            size="lg"
            color="blue"
            fullWidth
            radius="md"
            onClick={addNewSection}
          >
            <IconPlus
              size={24}
              strokeWidth={1.5}
              className=" rounded-full  mr-xs text-primary-1000 "
            />
            Add New Section
          </Button>
        </div>
        {/* </Grid.Col> */}
        {/* <Grid.Col span={4}>
          <div className="pt-sm sticky top-xl bg-courseCreateBg-500">
            <SecondaryDetails />
          </div>
        </Grid.Col> */}
        {/* </Grid> */}
        <Group
          position="right"
          py="xs"
          px="md"
          className={`sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400 ${permission[role]}`}
        >
          <div>
            <Button variant="outline" onClick={() => navigate('/teacher')} className="mr-xs">
              Discard
            </Button>
            <Button onClick={open}>Preview</Button>
          </div>

          <div>
            <Button variant="outline" onClick={props.prevStep}>
              Back
            </Button>
            <Button
              // type={'submit'}
              className="bg-primary-1000 ml-xs"
              onClick={(e) => hanldleNextStep(e)}
            >
              Next step
            </Button>
          </div>
        </Group>
      </form>
      <Preview opened={opened} close={close} setActive={setActive} />
    </>
  );
};

export default PlanYourCourse;
