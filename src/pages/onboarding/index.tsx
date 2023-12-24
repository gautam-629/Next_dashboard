/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Space, Stepper, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Certification from './certification';
import Experience from './experience';
import Industry from './industry';
import Qualification from './qualification';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_ROUTES } from '../../routes/constants';
import useOnboardingActiveState from './useOnboardingActiveState';

interface onBoardingProps {
  skip: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnBoarding = (props: onBoardingProps) => {
  const { activeState } = useOnboardingActiveState();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const nextStep = () => setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    setActive(activeState);
    // if (activeState < 1 || activeState > 2) {
    //   props.skip(true);
    // }
  }, [activeState]);

  return (
    // <div className="flex wrapper-x">
    <div className="wrapper-x mt-lg">
      <Stepper
        active={active}
        onStepClick={setActive}
        // allowNextStepsSelect={false}
        // orientation="vertical"

        className="relative"
        color="cyan"
        iconSize={40}
        styles={{
          steps: { position: 'absolute', right: '5rem', top: '1rem' },
          stepIcon: { color: 'darkgray' },
        }}
        // className="flex flex-1 onboarding-stepper pt-[20px]"
      >
        {/* <Stepper.Step
          // label="Step 3"
          // description="Experience"
          className="pointer-events-non"
        >
          <div className="">
            <Experience nextStep={nextStep} skip={props.skip} />
          </div>
        </Stepper.Step> */}

        <Stepper.Step
          // label="Step 1"
          // description="Industry"
          className="pointer-events-non"
        >
          <div className="">
            <Industry nextStep={nextStep} skip={props.skip} active={active} />
          </div>
        </Stepper.Step>

        <Stepper.Step
          // label="Step 2 "
          // description="Qualification"
          className="pointer-events-non"
        >
          <div className="">
            <Qualification
              nextStep={nextStep}
              prevStep={prevStep}
              skip={props.skip}
              active={active}
            />
          </div>
        </Stepper.Step>

        <Stepper.Step
          // label="Step 4"
          // description="Certification"
          className="pointer-events-non"
        >
          <div className="    ">
            <Certification nextStep={nextStep} prevStep={prevStep} skip={props.skip} />
          </div>
        </Stepper.Step>

        <Stepper.Completed>
          <div className=" h-full lg:grid-cols-3">
            <div className="bg-white rounded-md m-auto w-[40%] h-[300px] col-span-2 lg:col-span-3 flex flex-col justify-center items-center">
              <Text className="text-5xl font-semibold tracking-wider text-primary-1000">
                Success!
              </Text>
              <Text className="tracking-wider text-xl text-secondary-dark">
                Onboarding Completed Successfully.
              </Text>

              <Button
                variant="outline"
                className="mt-md"
                size="lg"
                onClick={() => location.reload()}
                radius="md"
              >
                Go to dashboard
              </Button>
            </div>
          </div>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default OnBoarding;
