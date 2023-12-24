/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Box, Button, Grid, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IndustryForm from './Industryform';
import axios from '../../../plugins/axios';
import { errorNotification } from '../../../utils/helpers/notifications';
import { IconPlus, IconAddressBook, IconPhone } from '@tabler/icons-react';
import { INITIAL_EXPERIENCE, Iexperience } from '../../../utils/interfaces/Onboarding.model';
import { Console } from 'console';

interface industryProps {
  nextStep: any;
  active: any;
  skip: any;
}

const Industry = (props: industryProps) => {
  const [formErrors, setFormErrors] = useState<any>({});
  const { skip } = props;
  const experienceData = useSelector(
    (state: any) => state?.authReducer?.userProfile,
    // return {
    //   preferedIndustry: state?.authReducer?.userProfile?.preferedIndustry,
    //   currentPosition: state?.authReducer?.userProfile?.currentPosition ?? '',
    // };
  );

  // initialValues: {
  //     education: qualificationData?.length ? [...qualificationData] : [INITIAL_EDUCATION],
  //   },

  const form = useForm({
    initialValues: {
      // experience: experienceData ? experienceData : INITIAL_EXPERIENCE,
      experience: {
        bio: experienceData ? experienceData?.bio : '',
        title: experienceData ? experienceData?.title : '',
        socialMedia: {
          facebook: experienceData ? experienceData?.socialMedia?.facebook : '',
          gitHub: experienceData ? experienceData?.socialMedia?.gitHub : '',
          linkedIn: experienceData ? experienceData?.socialMedia?.linkedIn : '',
        },
      },
      // experience: INITIAL_EXPERIENCE,
    },
    // validate: {
    //   preferedIndustry: (value: string[]) =>
    //     !value || (value.length === 0 && 'Prefered Industry cannot be empty'),
    //   currentPosition: (value: string) => {
    //     return (!value || value.length === 0) && 'Current Position cannot be empty';
    //   },
    // },
  });

  const { values } = form;
  useEffect(() => {
    console.log('State values', experienceData);
    console.log('Form data', form?.values);
  }, [experienceData, form]);

  const submit = async () => {
    // e.preventDefault();
    // const { hasErrors, errors } = form.validate() || {};
    // if (hasErrors) {
    //   setFormErrors(errors);
    //   return;
    // }
    // setFormErrors({});

    try {
      await axios.put(`users/secondary-details/add-personal-information`, { ...values.experience });
    } catch (error: any) {
      console.log(error);
      errorNotification(error?.toString());
    }

    props.nextStep();
  };
  const skipButton = () => {
    skip(true);
  };

  return (
    <Grid className="">
      <Grid.Col lg={8} className="m-none p-none pr-3xl ">
        <div className="">
          <Text className="text-2xl font-semibold text-secondary-dark leading-9">
            Personal Details
          </Text>
          <Text className="text-base font-normal leading-7 mt-md  mb-xs ">
            Write Short Bio that including your Experiences?
          </Text>
          <IndustryForm form={form} />
          <Group
            position="right"
            py="xs"
            className="sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400"
          >
            <Button variant="outline" radius="md" onClick={() => skip(true)}>
              Skip
            </Button>

            <div>
              <Button
                type={'submit'}
                className="bg-primary-1000 ml-xs"
                radius="md"
                onClick={() => {
                  submit();
                }}
              >
                Next step
              </Button>
            </div>
          </Group>
        </div>
      </Grid.Col>
      <Grid.Col lg={4} className=" items-center p-none m-none  relative  ">
        <Box className="flex flex-col justify-center px-md absolute top-7xl pt-md ">
          <Box className="flex flex-col justify-center items-center grow">
            <IconAddressBook size={73} className="text-primary-1000" />
            <Text className="text-lg font-medium leading-9 mt-xs text-secondary-dark tracking-wider">
              Personal Information
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
  );
};

export default Industry;
