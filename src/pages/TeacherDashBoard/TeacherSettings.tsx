/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Card, Text, TextInput, Textarea } from '@mantine/core';
import { INITIAL_JITSI_CONFIG } from '../../utils/interfaces/JitsiConfig';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { APIGitsi, GetAPIGitsi } from '../../api/gitsi';
import { successNotification } from '../../plugins/notification';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../plugins/axios';
import { errorNotification } from '../../utils/helpers/notifications';

export const TeacherSettings = () => {
  const [formErrors, setFormErrors] = useState<any>({});
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      ...INITIAL_JITSI_CONFIG,
    },
    validate: {
      jitsiAppId: (value) => value.length === 0 && 'BatchName cannot be empty',
      jitsiKid: (value) => value.length === 0 && 'course  cannot be empty',
      jitsiPrivateKey: (value) => value.length === 0 && 'startDate  cannot be empty',
    },
  });
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const { values } = form;
  // const { jitsiAppId, jitsiKid, jitsiPrivateKey } = userProfile;
  // const profile = {
  //   jitsiAppId,
  //   jitsiKid,
  //   jitsiPrivateKey,
  // };
  // console.log(jitsiAppId, '@jitsiAppId');

  const submit = async (e: any) => {
    console.log(values, 'values');

    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    form.validate();
    try {
      const res = await APIGitsi(values);

      // dispatch(createBatch({ ...values, classRoomLink }));
      successNotification('Batch Successfully Created!');
      navigate('/teacher/batches');
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await GetAPIGitsi();
        console.log(data, '#data');
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      // const { jitsiAppId, jitsiKid, jitsiPrivateKey } = data;
      // const jitsi = { jitsiAppId, jitsiKid, jitsiPrivateKey };
      // form.setValues({});
    })();

    console.log(values, '@values');
  });

  return (
    <form onSubmit={form.onSubmit(submit)}>
      {' '}
      <Card shadow="sm" radius="md" withBorder className="p-lg  w-2/3 m-auto h-[500px] my-xl">
        <Text className="text-lg font-semibold mt-lg mb-lg">JITSI Configuration</Text>
        <div>
          {' '}
          <TextInput
            placeholder="Enter JITSI_APP_ID"
            label="Enter JITSI_APP_ID "
            required
            {...form.getInputProps(`jitsiAppId`)}
          ></TextInput>
          <TextInput
            placeholder="Enter JITSI_KID"
            label="Enter JITSI_KID"
            className="my-md"
            required
            {...form.getInputProps(`jitsiKid`)}
          ></TextInput>
          <Textarea
            placeholder="Enter JITSI_PRIVATE_KEY"
            label="Enter JITSI_PRIVATE_KEY"
            required
            {...form.getInputProps(`jitsiPrivateKey`)}
          ></Textarea>
          <Button className="mt-md" type={'submit'} onClick={submit}>
            Submit
          </Button>
        </div>
      </Card>
    </form>
  );
};
