/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import React, { useRef, useEffect, useState } from 'react';
import { ActionIcon, Avatar } from '@mantine/core';
import { GrDocumentCloud } from 'react-icons/gr';
import { getFileNameFromUrl } from '../../../utils/helpers/typo';
import { handleDownload } from '../../../utils/helpers/file.helper';
import moment from 'moment';

export const ChatMessagesArea = (props: any) => {
  const userId = localStorage.getItem('user_id');
  const { conversation, handleImageDrop, chatContainerRef, loadMoreMessages } = props;

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleScroll = () => {
    const scrollTop = chatContainerRef.current.scrollTop;
    const scrollThreshold = 1; // Adjust this threshold as needed

    if (scrollTop <= scrollThreshold && !isLoadingMore) {
      setIsLoadingMore(true);
      loadMoreMessages()
        .then(() => {
          setIsLoadingMore(false);
          if (chatContainerRef.current) {
            // After loading more messages, scroll back to the previous position
            chatContainerRef.current.scrollTop = scrollThreshold;
          }
        })
        .catch((error: any) => {
          setIsLoadingMore(false);
          console.error('Error loading more messages:', error);
        });
    }
  };

  return (
    // onScroll={handleScroll}
    <div
      ref={chatContainerRef}
      onDrop={handleImageDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ height: '450px' }}
      className={'w-full px-xs flex flex-col overflow-y-auto'}
    >
      {[...conversation].map((v: any, key: number) => (
        <div
          className={`flex items-end my-xs ${
            userId === v.user?._id ? 'self-end flex-row-reverse' : ''
          }`}
          key={key}
        >
          <Avatar src={v.user?.avatar} size={28} radius={36} />
          <div
            className={`message-box max-w-4/5 flex flex-col p-xs rounded-md ${
              userId !== v.user?._id ? 'bg-primary-700 text-white ml-xs' : 'bg-gray-200 mr-xs'
            }`}
          >
            {v.type === 'text' ? (
              <div>{v.text}</div>
            ) : v.type === 'file' ? (
              <div className="flex items-center">
                <ActionIcon onClick={() => handleDownload(v.text)}>
                  <GrDocumentCloud />
                </ActionIcon>
                <div className="ml-xs">{getFileNameFromUrl(v.text)}</div>
              </div>
            ) : (
              <div>
                <img
                  src={v.text}
                  className={'max-w-[200px] pointer'}
                  onClick={() => handleDownload(v.text)}
                />
              </div>
            )}
            <div className={'text-xs mt-xs w-full text-right'}>
              {moment(v.createdAt).format('MMM DD, YYYY')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
