import { INITIAL_ENQUIRY } from '../../utils/interfaces/Enquiry';
import { useForm } from '@mantine/form';
import { Button, TextInput, Textarea } from '@mantine/core';
import { errorNotification, successNotification } from '../../utils/helpers/notifications';
import { useParams } from 'react-router-dom';
import { APIPostCourseEnquiry } from '../../api/course';
import { useState } from 'react';

const Enquiry = () => {
  const { course } = useParams<{ course: string }>();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      ...INITIAL_ENQUIRY,
    },
    validate: {
      name: (val) => !val && val === '' && '*Required',
      email: (val) => !val && val === '' && '*Required',
      phoneNumber: (val) => !val && val === '' && '*Required',
      message: (val) => !val && val === '' && '*Required',
    },
  });

  const { values } = form;
  const submit = async (e: any) => {
    e.preventDefault();
    const { hasErrors } = form.validate();

    if (hasErrors) {
      return;
    }
    form.validate();
    try {
      setLoading(true);
      await APIPostCourseEnquiry({ ...values, course: course ?? '' });
      successNotification('Enquiry sent successfully');
      form.reset();
    } catch (error: any) {
      errorNotification(error?.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TextInput
        withAsterisk
        label="Full Name"
        placeholder="John Doe"
        className="my-sm"
        {...form.getInputProps('name')}
      />
      <TextInput
        className="my-sm"
        withAsterisk
        label="Email"
        placeholder="john@example.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        className="my-sm"
        withAsterisk
        label="Phone Number"
        placeholder="Phone Number"
        {...form.getInputProps('phoneNumber')}
      />
      <Textarea
        className="my-sm"
        withAsterisk
        label="Message"
        placeholder="Message"
        {...form.getInputProps('message')}
      />
      <Button size="lg" fullWidth className="bg-primary-1000" onClick={submit}>
        {loading ? 'loading...' : 'Send Enquiry'}
      </Button>
    </div>
  );
};

export default Enquiry;
