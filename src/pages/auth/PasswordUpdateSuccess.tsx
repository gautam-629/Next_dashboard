/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Successful from '../../assets/successful.png';

const PasswordUpdateSuccess = () => {
  const navigate = useNavigate();
  const Login = () => {
    navigate('/auth');
  };
  return (
    <>
      <Paper>
        <div className="flex  justify-center flex-col items-center w-full h-[100vh]">
          <img src={Successful} className="max-w-[300px] max-h-[300px] " />

          <h1 className="text-center">Password Changed Successfully</h1>
          <p className="text-center my-sm">
            You’ve Successfully changed your password. Now you can continue with login{' '}
          </p>
          <Button onClick={Login}> Go to Login</Button>
        </div>
      </Paper>
    </>
  );
};

export default PasswordUpdateSuccess;
