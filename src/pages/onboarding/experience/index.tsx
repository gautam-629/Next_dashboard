/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import ExperienceForm from './ExperienceForm';
import AddNew from '../../../assets/newadd.svg';
import axios from '../../../plugins/axios';
import { INITIAL_EXPERIENCE, Iexperience } from '../../../utils/interfaces/Onboarding.model';
import { errorNotification } from '../../../utils/helpers/notifications';

interface expericenceProps {
  nextStep: any;
  skip: any;
}
const Experience = (props: expericenceProps) => {
  const { skip } = props;
  const experienceData = useSelector((state: any) => state.authReducer.userProfile.experience);
  const [formErrors, setFormErrors] = useState<any>({});

  const form = useForm({
    initialValues: {
      experience: experienceData?.length ? [...experienceData] : [INITIAL_EXPERIENCE],
    },
    validate: {
      experience: {
        organization: (value: any) => value.length === 0 && 'Organization cannot be empty',
        designation: (value: any) => value.length === 0 && 'Designation cannot be empty',
        period: (value: any) => value.length === 0 && 'Period cannot be empty',
        description: (value: any) => value.length === 0 && 'Description cannot be empty',
      },
    },
  });

  const { values } = form;

  const submit = async (e: any) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate() || {};
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    form.validate();

    try {
      const response = await axios.put(`users/secondary-details/experience`, {
        experience: [...values.experience],
      });
      props.nextStep();
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  const addForm = () => {
    const experience = values.experience || [];

    form.insertListItem('experience', {
      ...INITIAL_EXPERIENCE,
      index: experience.length,
    });
  };
  const deleteForm = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('experience', index);
  };
  return (
    <>
      <div className="">
        <Text className="text-lg font-bold text-secondary-dark">Experiences</Text>
        <Text className="text-md font-normal mb-md text-secondary-default  ">
          Tell us about your experiences
        </Text>
      </div>
      <div>
        {values?.experience?.map((experience: Iexperience, index: number) => (
          <ExperienceForm
            experience={experience}
            key={index}
            index={index}
            deleteForm={deleteForm}
            form={form}
          />
        ))}
        <div className=" flex justify-center mt-md mb-md rounded-md">
          <Button onClick={addForm} fullWidth>
            Add More
          </Button>
        </div>
        <Group
          position="right"
          className="sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400"
        >
          <Button variant="outline" onClick={() => skip(true)}>
            Skip
          </Button>
          <div>
            {/* <Button variant="default" onClick={props.prevStep}>
            Back
          </Button> */}
            <Button type={'submit'} className="bg-buttonColor-500 ml-xs " onClick={submit}>
              Next step
            </Button>
          </div>
        </Group>
      </div>
    </>
  );
};

export default Experience;
