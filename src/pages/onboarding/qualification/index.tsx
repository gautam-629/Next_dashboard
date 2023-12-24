import { Box, Button, Grid, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import StepTwoForm from './StepTwoForm';
import { Text } from '@mantine/core';
import axios from '../../../plugins/axios';
import { INITIAL_EDUCATION, Ieducation } from '../../../utils/interfaces/Onboarding.model';
import { errorNotification } from '../../../utils/helpers/notifications';
import { IconPlus, IconSchool, IconPhone } from '@tabler/icons-react';

interface qualificationProps {
  nextStep: any;
  prevStep: any;
  skip: any;
  active: any;
}
const Qualification = (props: qualificationProps) => {
  const { skip } = props;
  const qualificationData = useSelector((state: any) => state.authReducer.userProfile.education);
  const [formErrors, setFormErrors] = useState<any>({});

  const form = useForm({
    initialValues: {
      education: qualificationData?.length ? [...qualificationData] : [INITIAL_EDUCATION],
    },

    validate: {
      education: {
        // level: (value: any) => value.length === 0 && 'level cannot be empty',
        subject: (value: any) => value.length === 0 && 'Major  cannot be empty',
        // university: (value: any) => value.length === 0 && 'University cannot be empty',
        passedYear: (value: any) => !value && 'PassingYear cannot be empty',
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
      await axios.put(`users/secondary-details/education`, {
        education: [...values.education],
      });
      props.nextStep();
    } catch (error: any) {
      errorNotification('Education should not be empty');
    }
  };

  const addNewSection = () => {
    const education = values.education || [];

    form.insertListItem('education', {
      ...INITIAL_EDUCATION,
      index: education.length,
    });
  };

  const deleteEducation = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('education', index);
  };

  const previousStep = () => {
    props.prevStep();
  };

  return (
    <Grid className="">
      <Grid.Col span={8} className="m-none p-none pr-3xl ">
        <div className="">
          <Text className="text-2xl font-semibold text-secondary-dark leading-9 tracking-wider">
            Qualification
          </Text>
          <Text className="text-base font-normal leading-7 mt-md text-secondary-default text-secondary-dark tracking-wider">
            What is highest Qualification Degree you’ve earned?
          </Text>
          {values?.education?.map((education: Ieducation, index: number) => (
            <StepTwoForm
              deleteEducation={deleteEducation}
              education={education}
              key={index}
              index={index}
              form={form}
            />
          ))}

          <div className=" flex justify-center mt-md mb-md rounded-md">
            <Button
              onClick={addNewSection}
              fullWidth
              variant="unstyled"
              size="xl"
              className="border-dashed border-2 rounded-lg border-gray-400"
            >
              <IconPlus size={44} className="text-gray-400" />
            </Button>
          </div>
          <Group
            position="right"
            className="sticky bottom-none bottom-xs bg-white z-10 flex justify-between border-t-gray-400"
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
            <IconSchool size={73} className="text-primary-1000" />
            <Text className="text-lg font-medium leading-9 mt-xs text-secondary-dark tracking-wider">
              Qualification
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

export default Qualification;
