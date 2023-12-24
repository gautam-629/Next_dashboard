/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { ActionIcon, Group, Text, useMantineTheme } from '@mantine/core';
import { IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import axios from '../../../../plugins/axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../../../../store/modules/courses/actions';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { Upload } from '../../../../utils/assets/image';

const DropFileSection = ({
  form,
  errorMessage,
  setFormErrors,
}: {
  form: any;
  errorMessage: any;
  setFormErrors: any;
}) => {
  const theme = useMantineTheme();
  const [preview, setPreview] = useState('' as string | undefined);
  const dispatch = useDispatch() as any;
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  const changeImage = async (files: any) => {
    if (!files[0]) {
      setPreview(undefined);
      return;
    }

    const data = new FormData();

    files.forEach((file: any) => {
      data.append(`file`, file, file.name);
    });

    try {
      const response = await axios.post('file/upload-image', data);

      dispatch(setCourseData({ ...form.values, courseImageUrl: response.data.url }));
      form.setFieldValue('courseImageUrl', response.data.url);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  useEffect(() => {
    setPreview(courseCreateData.courseImageUrl);
  }, [courseCreateData.courseImageUrl]);

  return (
    <>
      {!preview ? (
        <Dropzone
          onDrop={changeImage}
          {...form.getInputProps('courseImageUrl')}
          onReject={(files) => {
            setFormErrors('Image size too large');
            console.log('rejected  files', files);
          }}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          maxFiles={1}
        >
          <Group position="center" style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                size={50}
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <img src={Upload}></img>
            </Dropzone.Idle>

            <div className="flex flex-col justify-center items-center w-full">
              <Text className="text-base font-semibold text-Grayscale-700">
                Drag Image on Click Here
              </Text>
              <Text className="text-base font-semibold my-xs text-Grayscale-700">
                To Select Files
              </Text>
            </div>
          </Group>
          <span className="text-red-600 mt-sm">{errorMessage ? errorMessage : ''}</span>
        </Dropzone>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt=""
            className={'object-cover object-center w-full'}
            style={{ aspectRatio: '980 / 271' }}
            width={500}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=600';
            }}
          />
          <ActionIcon
            onClick={() => setPreview(undefined)}
            variant="filled"
            color="primary"
            className={'absolute top-none right-none m-sm'}
          >
            <IconX />
          </ActionIcon>
        </div>
      )}
    </>
  );
};

export default DropFileSection;
