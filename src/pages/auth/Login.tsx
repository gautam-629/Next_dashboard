/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Paper, Text, Group, Loader, Button } from '@mantine/core';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { IconBrandLinkedin, IconLock, IconUser } from '@tabler/icons-react';
import { authenticateUser } from '../../store/modules/auth/actions';
import { FacebookIcon, Github, Linkedin } from '../../utils/assets/image';
import { errorNotification } from '../../utils/helpers/notifications';
import { errorImageHandler } from '../../utils/assets/imageurl';
import GoogleButton from '../../components/Button/GoogleButton';
import { loginSuccessNavigateHandler } from '../../utils/helpers/loginSuccess';
import LinkedInPage from '../../components/Button/LinkedInPage';
import { IconBrandGoogle } from '@tabler/icons-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await dispatch(authenticateUser({ email, password }));
      console.log(res, 'user details');
      if (rememberMe) {
        Cookies.set('email', email);
        Cookies.set('password', password);
      }
      if (res.status == 201) {
        loginSuccessNavigateHandler(res, navigate);
      } else {
        setLoading(false);

        navigate('/teacher/mycourses');
      }
      // if (res.status == 201) {
      //   const roles = ['STUDENT', 'TEACHER'];

      //   const checkRole = roles.every((value) => {
      //     return res.data.userProfile.roles.includes(value);
      //   });

      //   if (checkRole === true) {
      //     navigate('/teacher/mycourses');
      //   } else {
      //     navigate('/student/classroom');
      //   }
      // } else {
      //   throw new Error('Unauthorized');
      // }
    } catch (error: any) {
      console.log(error.toString(), '@error');
      errorNotification(error?.toString());
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center wrapper-x  w-full lg:wrapper-right lg:pl-none h-full">
      <Paper radius="md" className="w-full md:w-2/4  lg:w-3/4 flex justify-center items-center ">
        <div className={' w-full'}>
          <div>
            <div className="font-semibold text-3xl text-secondary-dark  ">Welcome Back</div>
            <div className="font-normal mt-[12px] text-base leading-6 text-secondary-default">
              Welcome Back! Please enter your details.
            </div>
          </div>
          <div className="pt-sm">
            <form onSubmit={handleLogin} className="flex flex-col gap-sm">
              <TextInput
                icon={<IconUser size={20} strokeWidth={1.5} color={'black'} />}
                label="Email"
                placeholder="yourmail@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex flex-col gap-xs">
                <PasswordInput
                  icon={<IconLock size={20} strokeWidth={1.5} color={'black'} />}
                  label="Password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Group position="apart" className="justify-end ">
                  <Link
                    to="/auth/forgot-password"
                    className=" no-underline hover:underline cursor-pointer hover:text-primary-700 text-xs font-normal    text-secondary-default"
                  >
                    Forgot Password?
                  </Link>
                </Group>
              </div>

              <Button type="submit" className="!w-full text-center ">
                {!isLoading ? 'Log in' : <Loader color="white" size="sm" />}
              </Button>
            </form>
          </div>
          <div>
            <div className="flex flex-col gap-sm my-md justify-between">
              {/* <GoogleButton />
              <LinkedInPage /> */}
              {/* <img onError={errorImageHandler} src={FacebookIcon} />
              <img onError={errorImageHandler} src={Linkedin} />
              <img onError={errorImageHandler} src={Github} /> */}
              <Button
                variant="default"
                leftIcon={<IconBrandGoogle size={16} />}
                className="text-base text-secondary-default"
              >
                Sign In With Google
              </Button>
              <Button
                variant="default"
                leftIcon={<IconBrandLinkedin size={16} />}
                className="text-base text-secondary-default"
              >
                Sign In With LinkedIn
              </Button>
            </div>
            <hr />
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Do not have an account yet?{' '}
              <Link to="/auth/signup" className="text-blue-600 no-underline hover:underline">
                Sign Up
              </Link>
            </Text>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LoginForm;
