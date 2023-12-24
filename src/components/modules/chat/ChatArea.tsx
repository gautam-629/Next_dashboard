/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Avatar, Drawer, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconInfoSquare, IconSearch, IconSend } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ChatMessagesArea } from './ChatMessagesArea';
import io from 'socket.io-client';
import { useForm } from '@mantine/form';
import { APILoadGroupDetails, APILoadRecentMessages, APISendRoomMessage } from '../../../api/chat';
import axios from '../../../plugins/axios';
import { errorNotification } from '../../../utils/helpers/notifications';
import { APIUploadFile } from '../../../api/fille';

export const ChatArea = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const userId = localStorage.getItem('user_id');
  const [conversation, setConversation] = useState([] as any[]);
  const [groupDetails, setGroupDetails] = useState({} as any);
  const [preview, setPreview] = useState(null as any);
  const form: any = useForm({
    initialValues: {
      message: '',
    },
    validate: {
      message: (value) => value.length === 0 && 'Message cannot be empty',
    },
  });

  useEffect(() => {
    loadGroupChatMessages();
    const socket = io(`ws://localhost:3002`, { transports: ['websocket'] });
    console.log('here');
    // Listen for notification events
    socket.on('chatRoom/' + '64defa670068d58c18483c48', (message: any) => {
      console.log(conversation);
      setConversation((prevConversation) => [...prevConversation, message]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    const res = await APISendRoomMessage('64defa670068d58c18483c48', {
      senderId: userId,
      groupId: '64defa670068d58c18483c48',
      text: form.values.message,
      type: 'text',
    });

    form.reset(); // Reset the form after sending the message
  };

  const handleImageDrop = async (e: any) => {
    e.preventDefault();

    const files = e.dataTransfer.files; // Get the dropped files

    // Check if files contain images
    const imageFiles = Array.from(files);
    // .filter((file: any) => file.type.startsWith('image/'));

    if (files.length > 0) {
      // Handle image upload here, e.g., using a function to upload to your backend
      // uploadImages(imageFiles);
      for (const file of imageFiles) {
        try {
          const tempFile: any = file;
          const i: number = imageFiles.indexOf(tempFile);
          const data = new FormData();
          data.append(`file`, tempFile, tempFile.name);
          const response: any = await APIUploadFile(data);
          await APISendRoomMessage('64defa670068d58c18483c48', {
            senderId: userId,
            groupId: '64defa670068d58c18483c48',
            text: response.data.url,
            type: tempFile.type.startsWith('image/') ? 'image' : 'file',
          });
          console.log(response);
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      }

      console.log(imageFiles[0]);
    }
  };

  const loadGroupChatMessages = async () => {
    const res = await APILoadRecentMessages('64defa670068d58c18483c48');
    const res2 = await APILoadGroupDetails('64defa670068d58c18483c48');
    setGroupDetails(res2.data);
    setConversation(res.data);
    console.log(res.data);
  };

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Start new conversation">
        {/* Drawer content */}
      </Drawer>
      <div className={''}>
        <div className="flex justify-between bg-white rounded-md items-center p-xs">
          <div className="flex items-center">
            <Avatar size={36} color={'primary'}>
              SD
            </Avatar>
            <div className={'px-md font-bold text-lg'}>User 1</div>
          </div>
          <ActionIcon>
            <IconInfoSquare />
          </ActionIcon>
        </div>
        <div>
          {/*{ props.selectedRoom !=='' ? <ChatMessagesArea /> : <StartNewConversation/>}*/}
          <ChatMessagesArea
            conversation={[...conversation].reverse()}
            handleImageDrop={handleImageDrop}
          />
        </div>
        <form
          onSubmit={form.onSubmit(sendMessage)}
          className="flex items-center p-xs bg-white sticky bottom-[8px])"
        >
          <TextInput
            {...form.getInputProps('message')}
            placeholder="Write a message"
            className={'flex-1'}
            required
          />
          <div className={'pl-xs'}>
            <ActionIcon variant={'filled'} color={'primary'} size={32} type={'submit'}>
              <IconSend />
            </ActionIcon>
          </div>
        </form>
      </div>
    </>
  );
};
