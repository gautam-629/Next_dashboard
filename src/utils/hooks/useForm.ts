/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useState } from 'react';
import { errorNotification } from '../../plugins/notification';

function useForm(initialState: any, validate: any, initiateSubmit: any) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const resetFormValue = (initialState: any) => {
    setValues({ ...initialState });
  };

  const manualSetValue = async (name: any, value: any) => {
    setErrors((stateVal) => {
      return { ...stateVal, [name]: '' };
    });
    setValues((stateVal: any) => {
      return { ...stateVal, [name]: value };
    });
  };
  const handleChange = (event: any) => {
    setErrors({
      ...errors,
      [event.target.name]: '',
    });
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    const validationErrors = validate(values);
    const noErrors = Object.keys(validationErrors).length === 0;
    if (noErrors) {
      try {
        await initiateSubmit(values);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      setSubmitting(false);
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSubmitting(false);
    }
  };
  return {
    handleSubmit,
    handleChange,
    values,
    manualSetValue,
    handleBlur,
    errors,
    resetFormValue,
    isSubmitting,
  };
}

export default useForm;
