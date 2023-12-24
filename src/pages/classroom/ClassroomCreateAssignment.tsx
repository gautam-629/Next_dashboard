/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Card, Grid, Input, Select, Text, TextInput } from '@mantine/core';
import RichTextEditor from '@mantine/rte';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FileButton, Button, Group } from '@mantine/core';

import { useForm } from '@mantine/form';

import { IconChevronDown } from '@tabler/icons-react';

import { useDispatch, useSelector } from 'react-redux';
import { StackTitleComponent } from '../../components/common/StackTitleComponent';
import TextEditorComponent from '../TeacherDashBoard/course-create/input-field/TextEditorComponent';
import { INITIAL_ASSIGNMENT } from '../../utils/interfaces/Task.model';
import axios from '../../plugins/axios';
import { errorNotification } from '../../utils/helpers/notifications';
import { File } from '../../components/File';
import { loadActiveTopicDetails } from '../../store/modules/classroom/actions';

const ClassroomAssignmentCreate = (props: any) => {
  const dispatch: any = useDispatch();
  const { close } = props;
  const [value, setSelectedFile] = useState<File[]>([]);
  const batch: any = useSelector((state: any) => state.classRoomReducer.batch);
  const activeTopic: any = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const navigate = useNavigate();
  const [preview, setPreview] = useState('' as string | undefined);
  const [lesson, setLesson] = useState([]);
  const [fileUrl, setFileUrl] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  const handleFileInputChange = async (files: any) => {
    // const
    if (!files[0]) {
      setPreview(undefined);
      return;
    }
    const data = new FormData();
    files.forEach((file: any, i: number) => {
      data.append(`file`, file, file.name);
    });
    try {
      const response = await axios.post('file/upload-file', data);
      const objectUrl = URL.createObjectURL(files[0]);

      form.setValues({ imageUrl: response.data.url });
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  const form = useForm({
    initialValues: {
      assignmentTitle: '',
      longDescription: '',
      imageUrl: '',
      batches: [] as any,
      course: '',
      topic: '',
    },
    validate: {
      assignmentTitle: (value) => (!value || value.length === 0) && 'Title cannot be empty',
      longDescription: (value) => value.length === 0 && 'Description cannot be empty',
    },
  });
  const { values } = form;
  useEffect(() => {
    if (batch) {
      form.setFieldValue('batches', [batch?._id]);
    }
    if (batch?.course?._id) {
      form.setFieldValue('course', batch?.course?._id);
    }
    if (activeTopic) {
      form.setFieldValue('topic', activeTopic);
    }
  }, [batch]);

  useEffect(() => {
    if (values.longDescription) {
      setFormErrors((prevState: any) => {
        return {
          ...prevState,
          longDescription: '',
        };
      });
    }
  }, [values]);

  const submit = async (e: any) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    form.validate();
    values.imageUrl = fileUrl;
    try {
      await axios.post('assignment/create-batch-assignment', values);
      if (activeTopic) {
        // setActiveTopic(res.data);
        dispatch(loadActiveTopicDetails(activeTopic, batch._id));
      }
    } catch (error: any) {
      errorNotification(error?.toString());
    }

    close();
  };

  return (
    <form>
      <Card p={0}>
        <div className="mt-md grid">
          <Input.Wrapper label={'Assignment Title'}>
            <TextInput
              withAsterisk
              placeholder="Your Assignment Title goes here"
              {...form.getInputProps(`assignmentTitle`)}
            />
          </Input.Wrapper>
        </div>
        <div className=" grid">
          <TextEditorComponent
            form={form}
            title="Description"
            courseModel={'longDescription'}
            errorMessage={''}
            placeholder={'Description'}
            className={formErrors.longDescription ? 'form-error-field' : ''}
          />
          <div className="form-errors">{formErrors.longDescription}</div>
        </div>
        <div className="grid grid-cols-12 gap-lg">
          <div className=" grid col-span-12">
            <File setFileUrl={setFileUrl}></File>
          </div>
          {/* <div className=" mt-md grid col-span-4">
            <Input.Wrapper label="tatus"}>
            <Select
              placeholder="Status"
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              data={['Active', 'Inactive']}
              {...form.getInputProps('status')}
            />
          </div> */}
        </div>

        <div className="buttons flex justify-between mt-sm">
          <Button type={'submit'} radius={'md'} size="md" onClick={(e) => submit(e)}>
            Add Assignment
          </Button>
          <Button variant={'outline'} onClick={() => close()}>
            Cancel
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default ClassroomAssignmentCreate;
