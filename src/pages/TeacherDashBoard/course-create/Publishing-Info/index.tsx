/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  Grid,
  Group,
  Image,
  Radio,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {
  createCoursePlanning,
  createCoursePricing,
  createCourseUpdateCourse,
} from '../../../../store/modules/sections/action';

import { useNavigate, useParams } from 'react-router-dom';
import AddItemInputField from '../Introducing-Course/AddItemInputField';
import { Beginner, Expert, Intermediate } from '../../../../utils/assets/image';
import TextInputField from '../input-field/TextInputField';

import { Logo } from '../../../../components/common/Logo';
import { TeacherProfile } from '../../../../components/modules/course/Coursedetails/TeacherProfile';
import Tags from '../../../coursedetails/Tags';
import moment from 'moment';
import LearningObjective from '../../../coursedetails/LearningObjective';

import { useDisclosure } from '@mantine/hooks';

import {
  faMicrophoneLines,
  faFile,
  faLayerGroup,
  faDesktop,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Requirements from '../../../coursedetails/Requirements';
import Preview from '../Preview';

const Pricing = (props: any) => {
  const [formErrors, setFormErrors] = useState<any>({});
  const [opened, { open, close }] = useDisclosure(false);
  const { nextStep, prevStep, setActive } = props;
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const [level, setLevelValue] = useState('all');
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const { requirements, prerequisites } = courseCreateData;
  console.log(courseCreateData, 'coursecreatedata');
  const { courseId } = useParams();

  const form = useForm({
    initialValues: {
      level,
      requirements,
      prerequisites,
    },
    validate: {
      level: (value) => value.length === 0 && 'Amount cannot be empty',
      requirements: (value) => {
        const filteredValue = value.filter((str: string) => str.length > 0);
        return filteredValue.length === 0 && 'This field cannot be empty';
      },
      prerequisites: (value) => {
        const filteredValue = value.filter((str: string) => str.length > 0);
        return filteredValue.length === 0 && 'This field cannot be empty';
      },
    },
  });

  useEffect(() => {
    form.setValues({ level, requirements, prerequisites });
  }, [courseCreateData]);
  const { values } = form;

  const submit = async (e: any) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    form.validate();

    await dispatch(createCoursePricing({ ...values, course: courseId }));
    props.nextStep();
  };
  const handleLevelChange = (value: string) => {
    setLevelValue(value); // Update the selected level
    form.setValues({ ...values, level: value }); // Update targetedAudiences in form values
  };
  console.log(values, 'values');

  return (
    <>
      <form onSubmit={submit} className={'pt-sm bg-white'}>
        <Grid p={0} gutter={0}>
          <Grid.Col>
            <div className="px-md mb-md">
              <div className="text-2xl font-semibold text-secondary-dark font-poppin mb-[20px]  ">
                Publishing info
              </div>
              <Text className="text-xl text-secondary-dark mb-xs font-semibold">Level</Text>
              <Radio.Group value={level} onChange={handleLevelChange}>
                <div className="flex gap-md">
                  {' '}
                  <div className="bg-gray-200 pr-lg py-sm pl-md rounded-lg">
                    {' '}
                    <div className="flex items-center gap-normal">
                      {' '}
                      <Radio value="all" size="xl" />
                      <p>All Level</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 pr-lg py-sm pl-md rounded-lg">
                    {' '}
                    <div className="flex items-center gap-normal">
                      {' '}
                      <Radio size="xl" value="beginner" />
                      <img src={Beginner} alt="" />
                      <p>Beginner</p>
                      <img alt="" />
                    </div>
                  </div>
                  <div className="bg-gray-200 pr-lg py-sm pl-md rounded-lg">
                    {' '}
                    <div className="flex items-center gap-normal">
                      {' '}
                      <Radio size="xl" value="intermediate" />
                      <img src={Intermediate} alt="" />
                      <p>Intermediate</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 pr-lg py-sm pl-md rounded-lg">
                    {' '}
                    <div className="flex items-center gap-normal">
                      {' '}
                      <Radio size="xl" value="Expert" />
                      <img src={Expert} alt="" />
                      <p>Expert</p>
                    </div>
                  </div>
                </div>
                <AddItemInputField
                  form={form}
                  title={'Pre- Requisites'}
                  courseModel={'prerequisites'}
                  placeholder={'Add Pre- Requisites'}
                  errorMessage={formErrors.prerequisites}
                />
                <AddItemInputField
                  form={form}
                  title={'Requirements'}
                  courseModel={'requirements'}
                  placeholder={'Add Requirements'}
                  errorMessage={formErrors.requirements}
                />
                {/* <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Requirements</h1>
                <TodoList
                  todos={todos}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onAdd={handleAdd}
                />
              </div> */}
                {/* <AddItems /> */}

                {/* <Box className="mt-lg">
                <TextInputField
                  title="Course For"
                  form={form}
                  courseModel={'courseFor'}
                  placeholder="Course For"
                  {...form.getInputProps(`courseFor`)}
                />
              </Box> */}
              </Radio.Group>
            </div>
          </Grid.Col>
        </Grid>

        <Group
          position="right"
          py="xs"
          px="md"
          className="sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400"
        >
          <div className="flex gap-sm">
            {' '}
            <Button type={'submit'} variant="outline" onClick={() => navigate('/teacher')}>
              Discard
            </Button>
            <Button onClick={open}>Preview</Button>
          </div>
          {/* <Button variant="outline" onClick={() => navigate('/teacher')}>
          Discard
        </Button> */}
          <div>
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type={'submit'} className="bg-primary-1000 ml-xs">
              Next step
            </Button>
          </div>
        </Group>
      </form>
      <Preview opened={opened} close={close} setActive={setActive} />
    </>
  );
};

export default Pricing;
