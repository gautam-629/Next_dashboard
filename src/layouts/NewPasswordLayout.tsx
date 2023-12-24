/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useState } from 'react';
import axios from '../plugins/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AUTHENTICATION_ROUTES, BASE_ROUTES } from '../routes/constants';
import { errorNotification, successNotification } from '../utils/helpers/notifications';
import { useForm } from '@mantine/form';

const NewPasswordLayout = () => {
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, { toggle }] = useDisclosure(false);
  const access_token = new URLSearchParams(location.search).get('token') as string;

  const form = useForm({
    initialValues: {
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.newPassword) {
        errors.newPassword = 'Password is required';
      } else if (values.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters long';
      } else if (!/\d/.test(values.newPassword)) {
        errors.newPassword = 'Password must contain at least one digit';
      } else if (!/[a-zA-Z]/.test(values.newPassword)) {
        errors.newPassword = 'Password must contain at least one letter';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      // if (!values.oldPassword) {
      //   errors.oldPassword = 'Old Password is required';
      // }

      return errors;
    },
  });
  // const isFormValid = () => {
  //   if (newpassword === '' || confirmnewpassword === '') {
  //     setErrorMessage('Please fill all the fields');
  //     return false;
  //   }
  //   if (newpassword !== confirmnewpassword) {
  //     setErrorMessage('Passwords do not match');
  //     return false;
  //   }
  //   return true;
  // };

  async function handleSubmit(e: any) {
    e.preventDefault();

    console.log(form.values.newPassword, 'passwordchange');
    const { hasErrors, errors } = form.validate() || {};
    console.log(errors, 'Errors');
    if (hasErrors === false) {
      console.log('true');
      await axios
        .post('/update-password', {
          access_token,
          password: form.values.newPassword,
        })
        .then(function (response) {
          successNotification('password changed successfully !');
          navigate(`${BASE_ROUTES.SUCCESS}/${AUTHENTICATION_ROUTES.PASSWORD_CHANGE_SUCCESS}`);
          setIsUpdated(true);
        })
        .catch(function (error) {
          errorNotification(error.response.data.message);
        });
    }
  }
  return (
    <div className="flex justify-center h-full w-full p-[100px] ">
      <form className=" mt-xl w-full">
        <h1>Change Password</h1>
        <p>Enter your Email address to retrieve your password</p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <PasswordInput
          className="my-sm"
          required
          label="New Password"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          required
          label="Confirm password"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps('confirmPassword')}
        />

        <Button
          className="flex justify-center my-lg bg-buttonColor-500"
          type="submit"
          fullWidth
          onClick={(e) => handleSubmit(e)}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default NewPasswordLayout;
