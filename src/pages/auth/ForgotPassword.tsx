/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { createStyles, Paper, TextInput, Button, Group, Loader } from '@mantine/core';
import axios from '../../plugins/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { successNotification } from '../../plugins/notification';
import { errorNotification, successNotification } from '../../utils/helpers/notifications';
import { IconChevronLeft, IconMail } from '@tabler/icons-react';
const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sendEmail, setSendMail] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const backToLogin = () => {
    navigate('/auth');
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    await axios
      .post('generate-reset-link', {
        email,
      })
      .then(function () {
        successNotification('please check your email and click on forgot password link');
        setSendMail(true);
        setLoading(false);
        setEmail('');
      })
      .catch(function (error) {
        console.log(error, 'Error');
        errorNotification(
          error?.toString() ?? 'Request failed, please check your email and try again',
        );
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center items-center  w-full lg:wrapper-right lg:pl-none wrapper-x  h-full">
      <form onSubmit={handleSubmit} className="w-full md:w-2/4  lg:w-3/4">
        <Paper radius="md" className=" w-full   pt-xs">
          <div>
            <div className=" flex items-center gap-[8px]">
              <IconChevronLeft
                size={28}
                strokeWidth={1.5}
                color={'black'}
                onClick={backToLogin}
                className=""
              />
              <span className="font-bold   text-3xl leading-8 text-secondary-dark tracking-[1px]">
                Forgot Password?
              </span>
            </div>
            <div className="mt-md  font-normal text-base leading-8  text-secondary-default">
              Enter your Email address to retrieve your password{' '}
            </div>
          </div>
          <div className="py-md">
            <Group className="">
              <TextInput
                color="dimmed"
                size="sm"
                icon={<IconMail size={20} strokeWidth={1.5} color={'#414141'} />}
                label="Your email"
                placeholder="yourmail@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />

              <Button fullWidth className="bg-buttonColor" type="submit">
                {isLoading ? <Loader color="white" size="sm" /> : 'Continue'}
              </Button>
            </Group>
          </div>
        </Paper>
      </form>
    </div>
  );
}
