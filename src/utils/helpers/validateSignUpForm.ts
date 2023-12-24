/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { SignUpValues } from '../interfaces/SignUpValues';

export const validateSignUpForm = (values: SignUpValues) => {
  const errors: any = {};

  if (!values.email) {
    errors.amount = '*Field cannot be empty';
  }
  // if (!values.phoneNumber) {
  //   errors.category = '*Field cannot be empty';
  // }
  if (!values.password) {
    errors.category = '*Field cannot be empty';
  }
  return errors;
};
