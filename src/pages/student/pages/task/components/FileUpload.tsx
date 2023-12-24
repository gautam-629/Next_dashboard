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
// import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import axios from '../../../../../plugins/axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { errorNotification } from '../../../../../utils/helpers/notifications';

const FileUpload = ({ setFileUrl }: { setFileUrl: any }) => {
  const theme = useMantineTheme();
  const [preview, setPreview] = useState('' as string | undefined | null);
  const dispatch = useDispatch() as any;
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const [filename, setFileName] = useState(false);
  const [name, setName] = useState('');
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
      const response = await axios.post('file/upload-file', data);
      setFileUrl(response.data.url);
      setFileName(true);
      setName(response.data.filename);
      setPreview(files.filesName);
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
        {
          /*    <Dropzone
          onDrop={changeImage}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={['application / pdf']}
          className={'w-full'}
          maxFiles={1}
        >
          <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
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
              <CloudUpload size={100} strokeWidth={1} color={'blue'} className="mb-[-100px]" />
            </Dropzone.Idle>
            {filename ? (
              <div>{name}</div>
            ) : (
              <div>
                <Text className=" font-medium text-sm leading-[48px] tracking-3 text-center">
                  Drag and drops files or
                </Text>
                <div className="text-blue-700  font-medium text-sm  tracking-3 text-center">
                  browser
                </div>
              </div>
            )}
          </Group>
        </Dropzone> */
        }
      ) : (
        <div className="relative">
          <Text>{preview}</Text>
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
            onClick={() => setPreview(null)}
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

export default FileUpload;
