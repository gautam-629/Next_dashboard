/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Box, Button, Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import StepFourForm from './StepFourForm';
import axios from '../../../plugins/axios';
import { INITIAL_CERTIFICATION, Icertification } from '../../../utils/interfaces/Onboarding.model';
import { errorNotification } from '../../../utils/helpers/notifications';
import { IconPlus, IconAward, IconPhone } from '@tabler/icons-react';

interface certificationProps {
  nextStep: any;
  prevStep: any;
  skip: any;
}
const Certification = (props: certificationProps) => {
  const { skip } = props;
  const certificationData = useSelector(
    (state: any) => state.authReducer.userProfile.certification,
  );
  const [fileUrl, setFileUrl] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  const form = useForm({
    initialValues: {
      certification: certificationData?.length ? [...certificationData] : [INITIAL_CERTIFICATION],
    },
    validate: {
      certification: {
        title: (value: any) => value.length === 0 && 'Title cannot be empty',
        description: (value: any) => value.length === 0 && 'Description cannot be empty',
        cvUrl: (value: any) => value.length === 0 && 'File cannot be empty',
      },
    },
  });

  const { values }: any = form;
  const submit = async (e: any) => {
    e.preventDefault();

    const { hasErrors, errors } = form.validate() || {};
    console.log(errors);
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    form.validate();
    try {
      await axios.put(`users/secondary-details/certification`, {
        certification: [...values.certification],
      });

      props.nextStep();
    } catch (error: any) {
      errorNotification('Certification should not be empty');
    }
  };

  const addForm = () => {
    const certification = values.certification || [];

    form.insertListItem('certification', {
      ...INITIAL_CERTIFICATION,
      index: certification.length,
    });
  };
  const deleteForm = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('certification', index);
  };

  const previousStep = () => {
    props.prevStep();
  };

  return (
    <>
      <Grid className="">
        <Grid.Col span={8} className="m-none p-none pr-3xl ">
          <div className="">
            <Text className="text-2xl font-semibold text-secondary-dark leading-9 tracking-wider">
              Awards and Certifications
            </Text>
            <Text className="text-base font-normal leading-7 mt-md text-secondary-default text-secondary-dark tracking-wider">
              What is highest Qualification Degree you’ve earned?
            </Text>

            <Box className="">
              {values?.certification?.map((certification: Icertification, index: number) => (
                <StepFourForm
                  certification={certification}
                  form={form}
                  key={index}
                  index={index}
                  deleteForm={deleteForm}
                  setFileUrl={setFileUrl}
                  values={values}
                  submit={submit}
                  formErrors={formErrors}
                />
              ))}
              <div className=" flex justify-center mt-md mb-md rounded-md">
                <Button
                  onClick={addForm}
                  fullWidth
                  variant="unstyled"
                  size="xl"
                  className="border-dashed border-2 rounded-lg border-gray-400"
                >
                  <IconPlus size={44} className="text-gray-400" />
                </Button>
              </div>
            </Box>
            <Group
              position="right"
              className="sticky bottom-xs bg-white z-10 flex justify-between border-t-gray-400"
            >
              <Button variant="outline" radius="md" onClick={() => skip(true)}>
                Skip
              </Button>
              <div>
                {/* <Button variant="default" onClick={props.prevStep}>
            Back
          </Button> */}
                <Button
                  type={'submit'}
                  variant="outline"
                  className=" mr-sm"
                  radius="md"
                  onClick={previousStep}
                >
                  Previous
                </Button>
                <Button
                  type={'submit'}
                  className="bg-primary-1000 ml-xs"
                  radius="md"
                  onClick={submit}
                >
                  Next
                </Button>
              </div>
            </Group>
          </div>
        </Grid.Col>

        <Grid.Col span={4} className=" items-center p-none m-none  relative  ">
          <Box className="flex flex-col justify-center px-md absolute top-7xl pt-md ">
            <Box className="flex flex-col justify-center items-center grow">
              <IconAward size={73} className="text-primary-1000" />
              <Text className="text-lg font-medium leading-9 mt-xs text-secondary-dark tracking-wider">
                Awards & Certifications
              </Text>
              <Text className="text-center font-normal text-base leading-7 mt-xs text-secondary-dark tracking-wider">
                Fill out or skip The form on Left. It can be edited Later from Settings.
              </Text>
            </Box>
            <Box className="flex justify-center items-end mt-7xl">
              <Box className="flex">
                <Box className="flex items-center justify-center">
                  <IconPhone size={43} />
                </Box>
                <Box className="ml-md">
                  <Text className="font-semibold leading-7 text-secondary-dark tracking-wider">
                    Call Us For Support
                  </Text>
                  <Text className="text-lg  text-secondary-dark tracking-wider">
                    {' '}
                    +988 9867345321
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Certification;
