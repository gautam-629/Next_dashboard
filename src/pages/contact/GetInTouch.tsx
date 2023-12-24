/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { TextInput, Textarea, SimpleGrid, Group, Button, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useFormik } from 'formik';
import GetInTouchSchema from '../Schemas/GetInTouchSchema';
import emailjs from '@emailjs/browser';

const GetInTouch = () => {
  async function onSubmit(values: any, { resetForm }: any) {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', values, 'YOUR_PUBLIC_KEY').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  }

  const { values, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema: GetInTouchSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between gap-md">
        <div className="flex flex-col w-full">
          <TextInput
            label="FirstName"
            placeholder="FirstName"
            id={'firstName'}
            name={'firstName'}
            onChange={handleChange}
          />
          <p className="error text-red-600">{errors.name}</p>
        </div>
        <div className="flex flex-col w-full">
          <TextInput
            label="LastName"
            placeholder="LastName"
            id={'lastName'}
            name={'lastName'}
            onChange={handleChange}
          />
          <p className="error text-red-600">{errors.name}</p>
        </div>
      </div>
      <TextInput
        className=" w-full my-md"
        label="Email"
        placeholder="Your email"
        id={'email'}
        name="email"
        variant="default"
        value={values.email}
        onChange={handleChange}
      />
      <p className="error text-red-600">{errors.email}</p>

      <TextInput
        className="my-md"
        label="Subject"
        placeholder="Subject"
        mt="md"
        id={'subject'}
        name="subject"
        variant="default"
        value={values.subject}
        onChange={handleChange}
      />

      <p className="error text-red-600">{errors.subject}</p>
      <Textarea
        mt="md"
        label="Message"
        placeholder="Your message"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="default"
        value={values.message}
        onChange={handleChange}
      />
      <p className="error text-red-600">{errors.message}</p>
      <Checkbox mt="md" label="I agree to sell my privacy" />
      <Group position="center" mt="xl">
        <Button fullWidth type="submit">
          Send message
        </Button>
      </Group>
    </form>
  );
};

export default GetInTouch;
