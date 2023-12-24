/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is Required').min(3, 'Too short !'),
  lastName: Yup.string().required('This field is Required').min(3, 'Too short !'),
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  // phoneNumber: Yup.string()
  //   .required('This field is Required')
  //   .matches(
  //     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  //     'Phone number is not valid',
  //   )
  //   .min(10, 'phone number must be 10 digits'),

  password: Yup.string()
    .required('Please Enter your password')
    .min(8, 'Your password must be longer than 8 characters.'),
  confirmPassword: Yup.string()
    .required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
});

export default SignupSchema;
