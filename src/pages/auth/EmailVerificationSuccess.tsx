/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Paper, Button, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Verifcation from '../../assets/emailverificationimage.png';
import { APIVerifyEmail } from '../../api/auth';

const EmailVerificationCompleted = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const access_token = new URLSearchParams(location.search).get('token') as string;

  const goToLogin = () => navigate('/auth');

  useEffect(() => {
    (async () => {
      try {
        await APIVerifyEmail({ access_token });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        navigate('/');
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="mt-[200px] mr-3xl mb-xs ml-[700px]">
          <Loader variant="bars" size="lg" />
        </div>
      ) : (
        <Paper>
          <div className="flex  justify-center flex-col items-center w-full h-[100vh]">
            <img src={Verifcation} className="max-w-[300px] max-h-[300px] " />

            <h1 className="text-center">Email Successfully Verified </h1>
            <p className="text-center my-xs">
              You’ve Successfully verified your email.Now you can continue with login.
            </p>
            <Button onClick={goToLogin}> Go to Login</Button>
          </div>
        </Paper>
      )}
    </>
  );
};

export default EmailVerificationCompleted;
