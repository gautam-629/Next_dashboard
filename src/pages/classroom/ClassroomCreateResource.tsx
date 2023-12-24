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
import { useEffect, useState } from 'react';
import { FileButton, Button, Group } from '@mantine/core';

import { useForm } from '@mantine/form';

import { IconChevronDown } from '@tabler/icons-react';
import { IconChevronLeft, IconTrash, IconUpload } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { StackTitleComponent } from '../../components/common/StackTitleComponent';
import TextEditorComponent from '../TeacherDashBoard/course-create/input-field/TextEditorComponent';
import { INITIAL_ASSIGNMENT } from '../../utils/interfaces/Task.model';
import axios from '../../plugins/axios';
import { errorNotification } from '../../utils/helpers/notifications';
import { File } from '../../components/File';
import { loadActiveTopicDetails } from '../../store/modules/classroom/actions';

const ClassroomCreateResource = (props: any) => {
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

  //   const handleFileInputChange = async (files: any) => {
  //     // const
  //     if (!files[0]) {
  //       setPreview(undefined);
  //       return;
  //     }
  //     const data = new FormData();
  //     files.forEach((file: any, i: number) => {
  //       data.append(`file`, file, file.name);
  //     });
  //     try {
  //       const response = await axios.post('file/upload-file', data);
  //       const objectUrl = URL.createObjectURL(files[0]);

  //       form.setValues({ imageUrl: response.data.url });
  //     } catch (error: any) {
  //       errorNotification(error?.toString());
  //     }
  //   };

  const form = useForm({
    initialValues: {
      resources: [] as any,
      course: '',
      topic: '',
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

  //   useEffect(() => {
  //     if (values.longDescription) {
  //       setFormErrors((prevState: any) => {
  //         return {
  //           ...prevState,
  //           longDescription: '',
  //         };
  //       });
  //     }
  //   }, [values]);

  //   const submit = async (e: any) => {
  //     e.preventDefault();
  //     const { hasErrors, errors } = form.validate();

  //     if (hasErrors) {
  //       setFormErrors(errors);
  //       return;
  //     }
  //     setFormErrors({});
  //     form.validate();
  //     values.imageUrl = fileUrl;
  //     try {
  //       await axios.post('assignment/create-batch-assignment', values);
  //       if (activeTopic) {
  //         // setActiveTopic(res.data);
  //         dispatch(loadActiveTopicDetails(activeTopic, batch._id));
  //       }
  //     } catch (error: any) {
  //       errorNotification(error?.toString());
  //     }

  //     close();
  //   };

  //   const { index, SectionIndex, LessonIndex, UnitIndex, form } = props;

  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [uploadedFile, setUploadedFile] = useState<string>('');

  //   const [preview, setPreview] = useState('' as string | undefined);
  //   const dispatch = useDispatch() as any;
  //   const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const submitResources = async (e: any) => {
    // // Section
    // props.sectionName == 'section'
    //   ? form.setFieldValue(`topics.${SectionIndex}.resources`, [...uploadedFiles])
    //   : '';
    // // Lesson
    // props.sectionName == 'lesson'
    //   ? form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.resources`, [
    //       ...uploadedFiles,
    //     ])
    //   : '';
    // // Unit
    // props.sectionName == 'unit'
    //   ? form.setFieldValue(
    //       `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.resources`,
    //       [...uploadedFiles],
    //     )
    //   : '';
    try {
      await axios.post('file/create-batch-resource', values);
      if (activeTopic) {
        // setActiveTopic(res.data);
        dispatch(loadActiveTopicDetails(activeTopic, batch._id));
      }
    } catch (error: any) {
      errorNotification(error?.toString());
    }

    close();
  };

  const deleteUrl = (indexToRemove: number) => {
    console.log('delet video called for index', indexToRemove);
    const updatedUrls = uploadedFiles.filter(
      (_element: any, index: number) => index !== indexToRemove,
    );

    // Update the state with the new array
    setUploadedFiles(updatedUrls);
  };

  const setUrl = (fileUrl: string) => {
    // const sectionResources = form?.values?.topics[SectionIndex]?.resources;
    console.log(props.sectionName);

    form.setFieldValue('resources', [...uploadedFiles, fileUrl]);

    setUploadedFiles([...uploadedFiles, fileUrl]);

    console.log('After set file url');
    console.log(fileUrl);
    // console.log(form.values.topics);
  };

  const extractFileNameFromUrl = (url: string) => {
    // Use the URL constructor to parse the URL
    // const parsedUrl = new URL(url);

    // Get the pathname (e.g., "/file/get-file/Report_-fd83.pdf")
    // const pathname = parsedUrl.pathname;

    // Use string manipulation to extract the file name (e.g., "Report_-fd83.pdf")
    const fileName = url.toString().split('/').pop();

    return fileName;
  };

  return (
    <div className="m-auto">
      <div className="top-bar flex items-center justify-start gap-lg  text-lg tracking-wider mb-md">
        {/* <Text>Add Resources</Text> */}
      </div>
      <div className=" ">
        <Text className="text-md">Upload Files</Text>
        <File setFileUrl={setUrl} className="w-full"></File>

        {/* <FileUpload setFileUrl={setUrl} /> */}
      </div>

      <Box className="mt-md">
        {uploadedFiles?.length > 0 ? <Text className="mb-sm">Uploaded Files</Text> : ''}

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
      <Button
        className="mt-md flex "
        onClick={(e) => {
          submitResources(e);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ClassroomCreateResource;
