/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Button } from '@mantine/core';
import { ArrowDown, ArrowUp, Message, Trash } from 'tabler-icons-react';
import {
  loadForumData,
  setCommentsDrawer,
  setSelectedForum,
} from '../../../store/modules/classroom/actions';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { courseDateFormatter } from '../../../utils/helpers/datetime';
import { APIDeleteComment, APIPostForumUpvote } from '../../../api/forum';
import { openConfirmModal } from '@mantine/modals';
import { errorNotification } from '../../../plugins/notification';

export const ForumCommentCard = (props: any) => {
  const { data, loadComments } = props;
  const userId = localStorage.getItem('user_id');
  const addUpvote = async (type: string) => {
    const res = await APIPostForumUpvote({
      comment: data._id,
      type,
    });
    await loadComments();
  };

  const checkIfUserVoted = (type: string) => {
    console.log(data.userVoteType);
    return data.userVoteType === type;
  };

  const openDeleteConfirmationModal = (id: string) => {
    try {
      openConfirmModal({
        title: 'Please confirm your action',
        children: <div>Are you sure you want to delete this comment?</div>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async () => {
          await APIDeleteComment(data.id);
          await loadComments();
        },
      });
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: e.toString(),
      });
    }
  };

  return (
    <div className={'mt-xs'}>
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="text-md">{data.comment ?? ''}</div>
          <div className="flex">
            <Button
              onClick={() => addUpvote('1')}
              variant={checkIfUserVoted('1') ? 'filled' : 'subtle'}
              color={'green'}
              size="xs"
              rightIcon={<ArrowUp size={14} />}
            >
              {data.upvoteCount}
            </Button>
            <Button
              onClick={() => addUpvote('0')}
              variant={checkIfUserVoted('0') ? 'filled' : 'subtle'}
              color={'red'}
              size="xs"
              rightIcon={<ArrowDown size={14} />}
            >
              {data.downvoteCount}
            </Button>
          </div>
        </div>
        {userId === data.commentCreator?._id && (
          <ActionIcon onClick={() => openDeleteConfirmationModal(data._id)}>
            <Trash size={24} />
          </ActionIcon>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <img
            onError={errorImageHandler}
            src={data?.commentCreator?.avatar ?? ''}
            alt=""
            className="w-[24px] h-[24px] rounded-full"
          />
          <div className={'pl-xs'}>
            <div className="text-sm font-medium">
              {data?.commentCreator?.firstName ?? '-'} {data?.commentCreator?.lastName ?? '-'}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 font-normal">
          {data?.createdAt ? courseDateFormatter(data?.createdAt) : '12 July, 2022'}
        </div>
      </div>
    </div>
  );
};
