/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useForm } from '@mantine/form';
import { APIDeleteComment, APIGetBlogBySlug } from '../../../api/blog';
import { errorNotification } from '../../../plugins/notification';
import { useEffect, useState } from 'react';
import { APIGetForumById, APIPostComment, APIPostForumUpvote } from '../../../api/forum';
import { ActionIcon, Button, Card } from '@mantine/core';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { courseDateFormatter } from '../../../utils/helpers/datetime';
import { ArrowDown, ArrowUp, Message, Trash } from 'tabler-icons-react';

import {
  loadForumData,
  setCommentsDrawer,
  setSelectedForum,
} from '../../../store/modules/classroom/actions';
import { useDispatch, useSelector } from 'react-redux';

export const ForumCard = (props: any) => {
  const [data, setData] = useState({} as any);

  const course = useSelector((state: any) => state.classRoomReducer.batch.course._id);
  const dispatch: any = useDispatch();

  const loadData = async () => {
    try {
      const res = await APIGetForumById(data._id ?? '');
      setData(res.data);
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: e.message,
      });
    }
  };

  const addUpvote = async (type: string) => {
    const res = await APIPostForumUpvote({
      forum: data._id,
      type,
    });
    if (course) {
      dispatch(loadForumData(course));
    }
  };

  const checkIfUserVoted = (type: string) => {
    console.log(data.userVoteType);
    return data.userVoteType === type;
  };

  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <Card p={'sm'} mb={'xs'}>
      <div className="flex justify-between">
        <div className="text-md">{data.title ?? ''}</div>
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

          <Button
            onClick={() => {
              dispatch(setSelectedForum(data._id));
              dispatch(setCommentsDrawer(true));
            }}
            variant={'subtle'}
            color={'gray'}
            size="xs"
            rightIcon={<Message size={14} />}
          >
            {data.commentCount}
          </Button>
        </div>
      </div>
      <div className="flex mt-xs items-center justify-between">
        <div className="flex items-center ">
          <img
            onError={errorImageHandler}
            src={data?.forumCreator?.avatar ?? ''}
            alt=""
            className="w-[24px] h-[24px] rounded-full"
          />
          <div className={'pl-xs'}>
            <div className="text-sm font-medium">
              {data?.forumCreator?.firstName ?? '-'} {data?.forumCreator?.lastName ?? '-'}
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 font-normal">
          {data?.createdAt ? courseDateFormatter(data?.createdAt) : '12 July, 2022'}
        </div>
      </div>
    </Card>
  );
};
