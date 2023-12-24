/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Box, Button, FileInput, Text, TextInput } from '@mantine/core';
import axios from '../../../../plugins/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../../../../store/modules/courses/actions';
import { useSelector } from 'react-redux';

import { IconTrash } from '@tabler/icons-react';
import { File } from '../../../../components/File';
import { errorNotification } from '../../../../utils/helpers/notifications';
import FileUpload from '../../../onboarding/certification/FileUpload';
import { log } from 'console';
interface ResourceProps {
  form: any;
  SectionIndex: number;
  LessonIndex: number;
  UnitIndex: number;
  index?: number;
  close?: any;
  type?: any;
  setType?: any;
  sectionName: string;
}
const Resource = (props: ResourceProps) => {
  const { index, SectionIndex, LessonIndex, UnitIndex, form } = props;

  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [uploadedFile, setUploadedFile] = useState<string>('');

  useEffect(() => {
    if (props.sectionName == 'section') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.resources;
      setUploadedFiles(sectionVideos);
    }

    // Lesson
    if (props.sectionName == 'lesson') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.resources;
      setUploadedFiles(sectionVideos);
    }

    // Unit
    if (props.sectionName == 'unit') {
      const sectionVideos =
        form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.resources;
      setUploadedFiles(sectionVideos);
    }
  }, []);

  const [preview, setPreview] = useState('' as string | undefined);
  const dispatch = useDispatch() as any;
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  // const handleFile = async (files: any) => {
  //   if (!files) {
  //     setPreview(undefined);
  //     return;
  //   }
  //   const data = new FormData();
  //   data.append(`file`, files, files.name);
  //   try {
  //     const response = await axios.post('file/upload-file', data);
  //     const objectUrl = URL.createObjectURL(files);

  //     dispatch(setCourseData({ ...props.form.values }));

  //     props.form.setFieldValue(
  //       `topics.${SectionIndex}.lessons.${index}.resources`,
  //       response.data.url,
  //     );

  //     setPreview(objectUrl);
  //   } catch (error: any) {
  //     errorNotification(error?.toString());
  //   }
  // };

  const submitResources = () => {
    // Section
    props.sectionName == 'section'
      ? form.setFieldValue(`topics.${SectionIndex}.resources`, [...uploadedFiles])
      : '';

    // Lesson
    props.sectionName == 'lesson'
      ? form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.resources`, [
          ...uploadedFiles,
        ])
      : '';

    // Unit
    props.sectionName == 'unit'
      ? form.setFieldValue(
          `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.resources`,
          [...uploadedFiles],
        )
      : '';
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

    setUploadedFiles([...uploadedFiles, fileUrl]);

    console.log('After set file url');
    console.log(fileUrl);
    // console.log(form.values.topics);
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
    <div className="m-auto">
      <div className="top-bar flex items-center justify-start gap-lg  text-lg tracking-wider mb-md">
        {/* <Text>Add Resources</Text> */}
      </div>
      {/* <FileInput
        placeholder="Pick file"
        label="Upload File"
        withAsterisk
        onChange={handleFile}
        // {...props.form.getInputProps(`curriculum.${lessonIndex}.lecture.${index}.resources`)}
        icon={<Upload size={20} strokeWidth={1} color={'black'} />}
      /> */}

      {/* <Text className="text-md">Enter video URL</Text> */}

      {/* <TextInput
        placeholder="Enter URL"
        size="md"
        // value={val}
        // {...props.form.getInputProps(`topics.${SectionIndex}.lessons.${index}.videoUrl`)}
        className="mb-md"
      /> */}

      {/* {props.sectionName == 'section' ? (
        <TextInput
          placeholder="Enter URL"
          size="md"
          {...props.form.getInputProps(`topics.${SectionIndex}.videoUrl`)}
          className="mb-md"
        />
      ) : (
        ''
      )} */}

      {/* {props.sectionName == 'lesson' ? (
        <TextInput
          placeholder="Enter URL"
          size="md"
          {...props.form.getInputProps(`topics.${SectionIndex}.topics.${LessonIndex}.videoUrl`)}
          className="mb-md"
        />
      ) : (
        ''
      )} */}

      {/* {props.sectionName == 'unit' ? (
        <TextInput
          placeholder="Enter URL"
          size="md"
          {...props.form.getInputProps(
            `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.videoUrl`,
          )}
          className="mb-md"
        />
      ) : (
        ''
      )} */}

      <div className=" ">
        <Text className="text-md">Upload Files</Text>
        {/* <File setFileUrl={setUrl} className="w-full"></File> */}

        <FileUpload setFileUrl={setUrl} />
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
      <Button
        className="mt-md flex "
        onClick={() => {
          submitResources();
          props.close(false);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Resource;
