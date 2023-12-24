import React from 'react';
import {
  Accessibility,
  AssessmentFeedback,
  Avatar,
  Cover2,
  Gamification,
  LiveSession,
  TeacherBg,
} from '../../../utils/assets/image';
import { Button, Grid } from '@mantine/core';

const EnrollStudent = () => {
  [];
  return (
    <div className="bg-Grayscale-200">
      <div className="wrapper-x w-full h-full">
        <Grid className="flex md:flex-row xs:flex-col mt-md my-md lg:my-2xl">
          <Grid.Col md={6} xs={12} className="my-lg hidden lg:block">
            {' '}
            <div className="flex justify-center relative items-center z-10 ">
              <div className="relative z-10 mr-7xl">
                <img src={TeacherBg} style={{ aspectRatio: '334 / 520 ' }} className="w-full"></img>
              </div>
              <div className="triangle-bottomleft aspect-square absolute left-none bottom-none z-2"></div>
            </div>
          </Grid.Col>
          <Grid.Col md={6} xs={12} className="flex justify-center lg:justify-start items-center">
            <div className="">
              {' '}
              <p className=" text-3xl md:text-5xl text-center lg:text-left font-normal text-secondary-default leading-10 tracking-wider ">
                Start Learning Today!{' '}
              </p>
              <p className="text-xl md:text-2xl text-center lg:text-left font-normal my-sm md:my-lg">
                Empower your future with e-learning. Enroll now!
              </p>
              <div className="flex flex-col xs:flex-row justify-between  mb-lg">
                {' '}
                <div className="">
                  <div className="text-base font-medium  text-center xs:text-left tracking-wider">
                    <span className="ml-xs mr-sm">
                      <img src={Accessibility} alt="" />
                    </span>
                    Accessibility
                  </div>
                  <div className="text-base font-medium  text-center xs:text-left mt-normal tracking-wider">
                    <span className="ml-xs mr-sm">
                      <img src={AssessmentFeedback} alt="" />
                    </span>
                    Assessment/Feedback
                  </div>
                </div>
                <div className="mt-normal xs:mt-none">
                  <div className="text-base font-medium  text-center xs:text-left tracking-wider">
                    <span className=" mr-sm">
                      <img src={Gamification} alt="" />
                    </span>
                    Gamification
                  </div>
                  <div className="text-base font-medium  text-center xs:text-left mt-normal tracking-wider">
                    <span className=" mr-sm">
                      <img src={LiveSession} alt="" />
                    </span>
                    Live Session
                  </div>
                </div>
              </div>
              <Button className="font-semibold tracking-wider" size="lg" radius={'md'} color="cyan">
                Enroll Now
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

export default EnrollStudent;
