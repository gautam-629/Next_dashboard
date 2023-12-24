/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { TextInput, Paper, Text, Button, Modal, Group, PasswordInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../plugins/axios';
import { SignUpValues } from '../../utils/interfaces/SignUpValues';
import { errorNotification } from '../../utils/helpers/notifications';
import { useForm } from '@mantine/form';
import { createStudent } from '../../store/modules/auth/services/user';
import GoogleButton from '../../components/Button/GoogleButton';

const INITIAL_FORM_VALUES: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  // phoneNumber: '',
  password: '',
  confirmPassword: '',
};

function SignupScreen() {
  const [isLoading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  async function resend() {
    axios.post('/resend-email', {
      userId,
    });
  }

  const form = useForm({
    initialValues: {
      ...INITIAL_FORM_VALUES,
    },
    validate: {
      firstName: (val) => !val && val === '' && '*Required',
      lastName: (val) => !val && val === '' && '*Required',
      email: (val) => !val && val === '' && '*Required',
      // phoneNumber: (val) => !val && val === '' && '*Required',
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

  const createStudentHandler = async () => {
    const { hasErrors, errors } = form.validate() || {};

    if (hasErrors === false) {
      setLoading(true);
      try {
        await createStudent({
          firstName: form.values.firstName,
          lastName: form.values.lastName,
          email: form.values.email,
          // phoneNumber: form.values.phoneNumber,
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
  return (
    <>
      <div className="flex justify-center items-center wrapper-x lg:wrapper-right lg:pl-none  w-full wrapper-right h-full">
        <Paper radius="md" className="md:w-2/4  lg:w-3/4 flex justify-center items-center">
          <form onSubmit={form.onSubmit((values) => createStudentHandler())} className={'w-full'}>
            <div>
              <div className="font-semibold  text-3xl text-secondary-dark">Sign Up</div>
              <div className="font-normal mt-[12px] text-base leading-6 text-secondary-default">
                Welcome to sign up page.{' '}
              </div>
            </div>
            <div className="py-sm">
              <div className="flex justify-between gap-sm">
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
                placeholder="Confirm Password"
                {...form.getInputProps('confirmPassword')}
                className="py-xs "
              />
              <Button fullWidth mt="sm" color={'primary'} type="submit" loading={isLoading}>
                Create Account
              </Button>
              <br />
              <GoogleButton register="student" text="signup_with" />
              <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account?{' '}
                <Link to="/auth" className="text-blue-600 no-underline hover:underline">
                  Log in
                </Link>
              </Text>
            </div>
          </form>
        </Paper>

        <div>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            radius="lg"
            className="pop-modal"
            centered
          >
            {/* Modal content */}
            <div>
              <h1 className="text-center">Email Verification</h1>{' '}
              <p className="text-center">
                Email has been sent to your account successfully.Please Check and verify
              </p>
              <Group className="flex-col">
                <Button fullWidth variant={'subtle'} radius="lg" onClick={() => navigate('/auth')}>
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
    </>
  );
}

export default SignupScreen;
