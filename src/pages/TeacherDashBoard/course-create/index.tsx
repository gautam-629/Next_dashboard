/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button, Group, Loader, Space, Stepper, Text } from '@mantine/core';

import IntroducingCourse from './Introducing-Course';
import PlanYourCourse from './plan-your-course';
import CourseMessage from './faqs';
import PublishingInfo from './Publishing-Info';
import CheckBox from '../../../assets/Checkbox.png';
import FinishingUp from './finishing-up';

import { getMyCourseById, getMyDraftById } from '../../../store/modules/courses/getMyCourseById';
import { IconCircleCheck } from '@tabler/icons-react';

const TeacherDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as any;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [active, setActive] = useState(0);
  const { courseId } = useParams();
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const location = useLocation();
  console.log(location.pathname.includes('edit'), 'path');
  useEffect(() => {
    if (courseId) {
      if (location.pathname.includes('edit')) {
        dispatch(getMyDraftById(courseId));
        setIsLoading(false);
        console.log('draft edit logic');
      } else {
        console.log('normal edit logic');
        dispatch(getMyCourseById(courseId));

        setIsLoading(false);
      }
    }
  }, []);

  const onSubmit = () => {
    nextStep();
  };

  const TeacherDashBoard = () => {
    navigate('/teacher');
  };

  return (
    <>
      <div className="flex h-full w-full ">
        {isLoading ? (
          <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
            <Loader variant="bars" size="lg" />
          </div>
        ) : (
          ''
        )}

        <Stepper
          active={active}
          onStepClick={setActive}
          orientation="vertical"
          iconSize={32}
          className="flex add-course-stepper w-full "
          color="cyan"
          styles={{ verticalSeparator: { display: 'none' } }}
        >
          <Stepper.Step
            label="Introducing Course"
            className=""
            icon={<div className="flex h-full w-full bg-Grayscale-400 rounded-full"></div>}
          >
            <IntroducingCourse nextStep={nextStep} prevStep={prevStep} setActive={setActive} />
          </Stepper.Step>

          <Stepper.Step
            label="Plan your course "
            icon={<div className="flex h-full w-full bg-Grayscale-400 rounded-full"></div>}
          >
            <PlanYourCourse nextStep={nextStep} prevStep={prevStep} setActive={setActive} />
          </Stepper.Step>

          <Stepper.Step
            label="Publishing Info"
            icon={<div className="flex h-full w-full bg-Grayscale-400 rounded-full"></div>}
          >
            <PublishingInfo nextStep={nextStep} prevStep={prevStep} setActive={setActive} />
          </Stepper.Step>

          <Stepper.Step
            label="FAQs"
            icon={<div className="flex h-full w-full bg-Grayscale-400 rounded-full"></div>}
          >
            <CourseMessage nextStep={nextStep} prevStep={prevStep} setActive={setActive} />
          </Stepper.Step>

          {/* <Stepper.Step
            label="Finishing up"
            icon={<div className="flex h-full w-full bg-Grayscale-400 rounded-full"></div>}
          >
            <div className="grid grid-cols-2 p-sm  lg:grid-cols-3">
              <div className="col-span-2 lg:col-span-3">
                <FinishingUp />
                <Group
                  position="right"
                  py="xs"
                  px="md"
                  className="sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400"
                >
                  <Button variant="outline" onClick={() => navigate('/teacher')}>
                    Discard
                  </Button>
                  <div>
                    <Button variant="default" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type={'submit'} className="bg-buttonColor-500 ml-xs" onClick={onSubmit}>
                      Finish
                    </Button>
                  </div>
                </Group>
              </div>
            </div>
          </Stepper.Step> */}

          <Stepper.Completed>
            <div className="grid grid-cols-2 p-xs  bg-courseCreateBg-500 h-full lg:grid-cols-3">
              <div className=" rounded-md m-auto w-[68%] h-[490px] col-span-2 lg:col-span-3 flex flex-col justify-center items-center">
                {/* <img src={CheckBox} className="w-[100px]" /> */}
                <IconCircleCheck size={120} className="text-primary-1000 " />
                <Text className="text-3xl font-semibold text-secondary-default">Successful!</Text>
                <Text className="text-secondary-default">Course Created Successfully.</Text>
                <Space h="xs" />
                <Button
                  variant="outline"
                  type="button"
                  className="mt-sm"
                  radius={'md'}
                  onClick={TeacherDashBoard}
                >
                  Go To Dashboard
                </Button>

                <div className="mt-lg">
                  <Text className="text-secondary-default mb-xs flex justify-center">
                    Create Batch or Assignment for this Course
                  </Text>
                  <Group position="apart" className=" mb-lg">
                    <Button
                      onClick={() => {
                        navigate(`/teacher/course/${courseId}/create-batch`);
                      }}
                      radius={'md'}
                    >
                      Create Batch
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(`/teacher/course/${courseId}/create-assignment`);
                      }}
                      radius={'md'}
                    >
                      Create Assignment
                    </Button>
                  </Group>
                </div>
              </div>
            </div>
          </Stepper.Completed>
        </Stepper>
      </div>
    </>
  );
};

export default TeacherDashBoard;
