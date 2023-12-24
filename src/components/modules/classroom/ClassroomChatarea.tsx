/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Avatar, Drawer, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useForm } from '@mantine/form';
import { APILoadGroupDetails, APILoadRecentMessages, APISendRoomMessage } from '../../../api/chat';
import axios from '../../../plugins/axios';
import { errorNotification } from '../../../utils/helpers/notifications';
import { APIUploadFile } from '../../../api/fille';
import { ChatMessagesArea } from '../chat/ChatMessagesArea';
import { useSelector } from 'react-redux';

export const ClassroomChatarea = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const userId = localStorage.getItem('user_id');
  const [conversation, setConversation] = useState([] as any[]);
  const [groupDetails, setGroupDetails] = useState({} as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState(null as any);
  const batchDetails = useSelector((state: any) => state.classRoomReducer.batch);
  const chatContainerRef: any = useRef(null);
  const [onload, setOnLoad] = useState(false);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);
  const form: any = useForm({
    initialValues: {
      message: '',
    },
    validate: {
      message: (value) => value.length === 0 && 'Message cannot be empty',
    },
  });

  useEffect(() => {
    if (batchDetails.chatroom) {
      loadGroupChatMessages();
      const socket = io(`ws://localhost:3002`, { transports: ['websocket'] });
      socket.on('chatRoom/' + batchDetails.chatroom, (message: any) => {
        setConversation((prevConversation) => [...prevConversation, message]);
      });

      // Clean up the socket connection on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [batchDetails]);

  const sendMessage = async () => {
    const res = await APISendRoomMessage(batchDetails.chatroom, {
      senderId: userId,
      groupId: '64defa670068d58c18483c48',
      text: form.values.message,
      type: 'text',
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    form.reset(); // Reset the form after sending the message
  };

  const handleImageDrop = async (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const imageFiles = Array.from(files);
    if (files.length > 0) {
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
    }
  };

  const loadGroupChatMessages = async () => {
    const res = await APILoadRecentMessages(batchDetails.chatroom, currentPage, 10);
    const res2 = await APILoadGroupDetails(batchDetails.chatroom);
    if (res.data?.length > 0) {
      setConversation((prevConversation) => [...prevConversation, ...res.data]);
      if (!onload) {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setOnLoad(true);
    setGroupDetails(res2.data);
  };

  return (
    <>
      <div className={'w-full'}>
        {/*{ props.selectedRoom !=='' ? <ChatMessagesArea /> : <StartNewConversation/>}*/}
        <ChatMessagesArea
          conversation={[...conversation]}
          handleImageDrop={handleImageDrop}
          loadMoreMessages={loadGroupChatMessages}
          chatContainerRef={chatContainerRef}
        />
      </div>
      <form
        onSubmit={form.onSubmit(sendMessage)}
        className="flex items-center p-xs bg-white sticky w-full bottom-[8px])"
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
    </>
  );
};
