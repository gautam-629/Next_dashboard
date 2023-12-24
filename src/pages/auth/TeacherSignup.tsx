/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../plugins/axios';

import { TextInput, Paper, Text, Button, Modal, Group, Loader, PasswordInput } from '@mantine/core';

import SignupSchema from '../Schemas/SignupSchema';
import { SignUpValues } from '../../utils/interfaces/SignUpValues';
import { successNotification } from '../../plugins/notification';
import { errorNotification } from '../../utils/helpers/notifications';
import { useForm } from '@mantine/form';
import { createStudent, createTeacher } from '../../store/modules/auth/services/user';
import GoogleButton from '../../components/Button/GoogleButton';

const TeacherSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const INITIAL_FORM_VALUES: SignUpValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm({
    initialValues: {
      ...INITIAL_FORM_VALUES,
    },
    validate: {
      firstName: (val) => !val && val === '' && '*Required',
      lastName: (val) => !val && val === '' && '*Required',
      email: (val) => !val && val === '' && '*Required',

      password: (val) => {
        if (!val && val === '') {
          return '*Required';
        }
        if (val.length < 8) {
          return 'Passwords  must have at least 8 letters';
        }
        return null;
      },
      confirmPassword: (val, values) => {
        if (!val && val === '') {
          return '*Required';
        }
        if (val !== values.password) {
          return 'Passwords did not match';
        }
        return null;
      },
    },
  });

  const createTeacherHandler = async () => {
    console.log(form.validate(), 'validate');
    const { hasErrors, errors } = form.validate() || {};

    if (hasErrors === false) {
      console.log(hasErrors, 'haserror');
      setLoading(true);
      try {
        await createTeacher({
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          email: form.values.email,
          password: form.values.password,
        });
        form.reset();
        setOpened(true);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      setLoading(false);
    }
  };
  const userId = localStorage.getItem('user_id');

  async function resend() {
    await axios.post('/resend-email', {
      userId,
    });
  }

  const goToLogin = () => {
    navigate('/auth');
  };
  return (
    <div className="flex justify-center items-center w-full wrapper-right h-full">
      <Paper radius="md" className="w-3/4  pt-xs">
        <form onSubmit={form.onSubmit((values) => createTeacherHandler())} className={'w-full'}>
          <div>
            <div className="font-semibold  text-3xl text-secondary-dark  ">Teach with us</div>
            <div className="font-normal mt-[12px] text-base leading-6 text-secondary-default">
              Empower tomorrows generation and teach with us.
            </div>
          </div>
          <div className="py-md">
            <div className="flex justify-between gap-md">
              <div className="flex flex-col w-full">
                <TextInput
                  withAsterisk
                  label="First Name"
                  placeholder="First Name"
                  {...form.getInputProps('firstName')}
                />
              </div>
              <div className="flex flex-col w-full">
                <TextInput
                  withAsterisk
                  label="Last Name"
                  placeholder="Last Name"
                  {...form.getInputProps('lastName')}
                />
              </div>
            </div>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
              className="py-xs"
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Password"
              {...form.getInputProps('password')}
              className="py-xs"
            />
            <PasswordInput
              withAsterisk
              label="Confirm Password"
              placeholder="Enter confirm Password"
              {...form.getInputProps('confirmPassword')}
              className="py-xs"
            />
            <Button fullWidth mt="sm" type="submit" loading={isLoading}>
              Create Account
            </Button>
            <br />
            {/* <GoogleButton register="teacher" text="signup_with" /> */}
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Already have an account?{' '}
              <Link to="/auth" className="text-blue-600 no-underline hover:underline">
                Login
              </Link>
            </Text>
          </div>
        </form>
      </Paper>

      <div>
        <Modal opened={opened} onClose={() => setOpened(false)} radius="lg">
          {/* Modal content */}
          <div>
            <h1 className="text-center">Email Verification</h1>
            <p className="text-center">
              Email has been sent to your account successfully.Please Check and verify
            </p>
            <Group className="flex-col mt-md">
              <Button className="bg-buttonColor-500 w-[190px]" radius="lg" onClick={goToLogin}>
                Go to Login
              </Button>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                Didn’t Get an Email
                <Button
                  variant="subtle"
                  radius="xs"
                  size="xs"
                  className="ml-[10px] w-[80px]"
                  onClick={resend}
                >
                  Resend
                </Button>
                {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}
              </Text>
            </Group>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TeacherSignup;
