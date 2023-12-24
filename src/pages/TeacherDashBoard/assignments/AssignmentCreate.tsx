/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Box, Card, Grid, Input, Select, Text, TextInput } from '@mantine/core';
import RichTextEditor from '@mantine/rte';

import { Link, useNavigate, useParams } from 'react-router-dom';
import TextEditorComponent from '../course-create/input-field/TextEditorComponent';
import DropFileSection from '../course-create/Introducing-Course/DropFileSection';
import { useEffect, useState } from 'react';
import { FileButton, Button, Group } from '@mantine/core';

import { useForm } from '@mantine/form';
import axios from '../../../plugins/axios';

import { IconChevronDown, IconTrash } from '@tabler/icons-react';
import { PostRequest } from '../../../plugins/https';
import {
  INITIAL_ASSIGNMENT,
  INITIAL_COURSE_ASSIGNMENT,
} from '../../../utils/interfaces/Task.model';
import { File } from '../../../components/File';
import { errorNotification } from '../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../components/common/StackTitleComponent';
import FileUpload from '../../onboarding/certification/FileUpload';

const AssignmentCreate = ({ setAssignment, close }: any) => {
  const [value, setSelectedFile] = useState<File[]>([]);
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const navigate = useNavigate();
  const [preview, setPreview] = useState('' as string | undefined);
  const [lesson, setLesson] = useState([]);
  const [formErrors, setFormErrors] = useState<any>({});

  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  // const handleFileInputChange = async (files: any) => {
  //   // const
  //   if (!files[0]) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const data = new FormData();
  //   files.forEach((file: any, i: number) => {
  //     data.append(`file`, file, file.name);
  //   });
  //   try {
  //     const response = await axios.post('file/upload-file', data);
  //     // const objectUrl = URL.createObjectURL(files[0]);

  //     form.setValues({ imageUrl: response.data.url });
  //   } catch (error: any) {
  //     errorNotification(error?.toString());
  //   }
  // };

  const form = useForm({
    initialValues: {
      ...INITIAL_COURSE_ASSIGNMENT,
      course: courseId,
    },
    validate: {
      assignmentTitle: (value) => (!value || value.length === 0) && 'Title cannot be empty',
      longDescription: (value) => value.length === 0 && 'Description cannot be empty',
    },
  });
  const { values } = form;
  console.log(values, '@Assignment Form values');

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get('courses/list');
  //     } catch (error: any) {
  //       console.log(error, 'error');
  //     }
  //     try {
  //       const res = await axios.get('courses/list');
  //       const c = res.data?.results?.map((d: any) => {
  //         return { value: d._id, label: d.courseTitle ?? 'Untitled' };
  //       });
  //       setCourse(c);
  //       if (courseid && courseid !== '') {
  //         form.setFieldValue('course', courseid);
  //       }
  //     } catch (error: any) {
  //       errorNotification(error?.toString());
  //     }
  //   })();
  // }, []);

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

  const setUrl = (fileUrl: string) => {
    setUploadedFiles([...uploadedFiles, fileUrl]);
    // form.setFieldValue('fileUrl', [fileUrl]);
  };

  const deleteUrl = (indexToRemove: number) => {
    console.log('delet video called for index', indexToRemove);
    const updatedUrls = uploadedFiles.filter(
      (_element: any, index: number) => index !== indexToRemove,
    );

    // Update the state with the new array
    setUploadedFiles(updatedUrls);
  };

  // useEffect(() => {
  //   console.log('@Course Id', courseId);

  //   courseId && form.setFieldValue('course', courseId);
  // }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    // const { hasErrors, errors } = form.validate();

    // if (hasErrors) {
    //   setFormErrors(errors);
    //   return;
    // }
    // setFormErrors({});
    // form.validate();
    // values.imageUrl = fileUrl;
    console.log('@uploadedFiles', uploadedFiles);

    form.setFieldValue('fileUrl', [...uploadedFiles]);

    try {
      console.log('@submitted assignment', values);

      const response = await axios.post('assignment/create-single-assignment', values);
      console.log('Assignment Response', response);
      setAssignment(response?.data?.id);
    } catch (error: any) {
      errorNotification(error?.toString());
      console.log(error);
    }

    close(false);

    // navigate('/teacher/assignment');
  };

  const extractFileNameFromUrl = (url: string) => {
    // Use the URL constructor to parse the URL
    const parsedUrl = new URL(url);

    // Get the pathname (e.g., "/file/get-file/Report_-fd83.pdf")
    const pathname = parsedUrl.pathname;

    // Use string manipulation to extract the file name (e.g., "Report_-fd83.pdf")
    const fileName = pathname.split('/').pop();

    return fileName;
  };

  return (
    <form>
      <Box>
        <div className="top-bar flex items-center justify-start gap-lg  text-lg tracking-wider">
          <Text>Assignment Create</Text>
        </div>
        <div className="mt-md grid">
          <Input.Wrapper label={'Assignment Title'}>
            <TextInput
              withAsterisk
              placeholder="Your Assignment Title goes here"
              {...form.getInputProps(`assignmentTitle`)}
            />
          </Input.Wrapper>
        </div>
        {/* <Grid mt={'sm'}>
          <Grid.Col md={4} sm={4} lg={4}>
            <Input.Wrapper label={'Select Course'}>
              <Select
                searchable
                placeholder={'--- select course ---'}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                data={course}
                {...form.getInputProps(`course`)}
                withAsterisk
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col md={4} sm={4} lg={4}>
            <Input.Wrapper label={'Select Section'}>
              <Select
                withAsterisk
                placeholder={'--- select section ---'}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                data={section}
                {...form.getInputProps(`section`)}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col md={4} sm={4} lg={4}>
            <Input.Wrapper label={'Select Lesson'}>
              <Select
                withAsterisk
                placeholder={'--- select lesson ---'}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={30}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                data={lesson}
                {...form.getInputProps(`lesson`)}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid> */}
        <div className="mt-md grid">
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
          <div className="mt-md grid col-span-12">
            {/* <File setFileUrl={setUrl}></File> */}
            <FileUpload setFileUrl={setUrl} />
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

        <Box className="mt-md">
          {uploadedFiles.length > 0 ? <Text className="mb-sm">Uploaded Files</Text> : ''}

          {uploadedFiles?.map((singleFile: any, index: number) => (
            <Box
              key={index}
              className="border-solid border-2 p-xs mb-xs bg-gray-100 rounded-lg border-gray-200 flex justify-between items-center"
            >
              <Text>{extractFileNameFromUrl(singleFile)}</Text>
              <ActionIcon
                onClick={() => {
                  deleteUrl(index);
                }}
              >
                <IconTrash className="text-red-500" />
              </ActionIcon>
            </Box>
          ))}
        </Box>
        <div className="mt-md  buttons flex justify-between">
          <Button type={'submit'} onClick={(e) => submit(e)}>
            Submit
          </Button>
          {/* <Button variant={'subtle'} onClick={() => navigate(-1)}>
            Cancel
          </Button> */}
        </div>
      </Box>
    </form>
  );
};

export default AssignmentCreate;
