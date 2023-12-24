/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, AspectRatio, Box, Button, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

interface VideoSectionProps {
  close?: any;
  index?: number;
  SectionIndex: number;
  LessonIndex: number;
  UnitIndex: number;
  form: any;
  sectionName: string;
}

const VideoSection = (props: VideoSectionProps) => {
  const [val, setVal] = useState('');

  const { form, SectionIndex, LessonIndex, UnitIndex } = props;
  // const initialVideos = [];

  const [videos, setVideos] = useState<any>([]);
  const [video, setVideo] = useState<string>('');

  // props.sectionName == 'section'
  //   ? setVideos(form?.values?.topics[SectionIndex]?.videoUrl)
  //   : props.sectionName == 'lesson'
  //   ? setVideos(form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.videoUrl)
  //   : props.sectionName == 'unit'
  //   ? setVideos(
  //       form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.videoUrl,
  //     )
  //   : '';

  // useEffect(() => {
  //   props.sectionName == 'section'
  //     ? setVideos(form?.values?.topics[SectionIndex]?.videoUrl)
  //     : props.sectionName == 'lesson'
  //     ? setVideos(form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.videoUrl)
  //     : props.sectionName == 'unit'
  //     ? setVideos(
  //         form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.videoUrl,
  //       )
  //     : '';
  // });

  useEffect(() => {
    if (props.sectionName == 'section') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.videoUrl;
      setVideos(sectionVideos);
    }

    // Lesson
    if (props.sectionName == 'lesson') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.videoUrl;
      setVideos(sectionVideos);
    }

    // Unit
    if (props.sectionName == 'unit') {
      const sectionVideos =
        form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.videoUrl;
      setVideos(sectionVideos);
    }
  }, []);

  // Section

  const addVideo = () => {
    console.log('Video called');
    setVideos([...videos, video]);
  };

  const deleteVideo = (indexToRemove: number) => {
    console.log('delet video called for index', indexToRemove);
    const updatedVideos = videos.filter((_element: any, index: number) => index !== indexToRemove);

    // Update the state with the new array
    setVideos(updatedVideos);
  };

  const submitVideo = () => {
    console.log(props.sectionName);
    // Section
    if (props.sectionName == 'section') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.videoUrl;
      form.setFieldValue(`topics.${SectionIndex}.videoUrl`, [...videos]);
    }

    // Lesson
    if (props.sectionName == 'lesson') {
      const sectionVideos = form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.videoUrl;
      form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.videoUrl`, [...videos]);
    }

    // Unit
    if (props.sectionName == 'unit') {
      const sectionVideos =
        form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.videoUrl;
      form.setFieldValue(
        `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.videoUrl`,
        [...videos],
      );
    }
  };

  return (
    <div>
      <Text className="text-md">Enter video URL</Text>
      {/* <TextInput
  placeholder="Enter URL"
  size="md"
  // value={val}
  // {...props.form.getInputProps(`topics.${SectionIndex}.lessons.${index}.videoUrl`)}
  className="mb-md"
/> */}
      <Box className="flex w-full">
        <TextInput
          placeholder="Enter URL"
          size="md"
          value={video}
          onChange={(event) => setVideo(event.currentTarget.value)}
          className="mb-md grow"
        />
        <Button className="ml-xs" size="md" onClick={addVideo}>
          Add
        </Button>
      </Box>

      <Box>
        {videos?.map((singleVideo: any, index: number) => (
          <Box
            key={index}
            className="border-solid border-2 p-xs mb-xs bg-gray-100 rounded-lg border-gray-200 flex justify-between items-center"
          >
            <Text>{singleVideo}</Text>
            <ActionIcon
              onClick={() => {
                deleteVideo(index);
              }}
            >
              <IconTrash className="text-red-500" />
            </ActionIcon>
          </Box>
        ))}
      </Box>

      {/* {props.sectionName == 'section' ? (
        <TextInput
          placeholder="Enter URL"
          size="md"
          {...props.form.getInputProps(`topics.${SectionIndex}.videoUrl`)}
          className="mb-md"
        />
      ) : (
        ''
      )}

      {props.sectionName == 'lesson' ? (
        <TextInput
          placeholder="Enter URL"
          size="md"
          {...props.form.getInputProps(`topics.${SectionIndex}.topics.${LessonIndex}.videoUrl`)}
          className="mb-md"
        />
      ) : (
        ''
      )}

      {props.sectionName == 'unit' ? (
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

      <Button
        className="mt-sm"
        onClick={() => {
          submitVideo();
          props.close();
        }}
      >
        submit
      </Button>
    </div>
  );
};

export default VideoSection;
