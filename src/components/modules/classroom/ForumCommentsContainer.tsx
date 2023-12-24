/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useSelector } from 'react-redux';
import { APIDeleteComment, APILoadForumComments, APIPostComment } from '../../../api/forum';
import { useEffect, useState } from 'react';
import { openConfirmModal } from '@mantine/modals';
import { errorNotification } from '../../../plugins/notification';
import { useForm } from '@mantine/form';
import { Textarea, Input, Button, ActionIcon } from '@mantine/core';
import { ArrowDown, ArrowUp, Message, Trash } from 'tabler-icons-react';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { courseDateFormatter } from '../../../utils/helpers/datetime';
import { setCommentsDrawer, setSelectedForum } from '../../../store/modules/classroom/actions';
import { ForumCommentCard } from './ForumComment.card';

export const ForumCommentsContainer = () => {
  const forumId = useSelector((state: any) => state.classRoomReducer.selectedForum);
  const userId = localStorage.getItem('user_id');
  const [comments, setComments] = useState([] as any);
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    console.log(forumId);
    loadComments();
  }, [forumId]);
  const loadComments = async () => {
    if (forumId !== -1) {
      const res = await APILoadForumComments(forumId);
      setComments(res.data);
    }
  };

  const form: any = useForm({
    initialValues: {
      comment: '',
    },
    validate: {
      comment: (value: string) => value.length === 0 && 'Message cannot be empty',
    },
  });

  const addComment = async () => {
    const res = await APIPostComment(forumId, { comment: form.values.comment, forum: forumId });
    await loadComments();
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(addComment)}>
        <Input.Wrapper label={<div className={'font-bold text-md'}>Add Comment</div>}>
          <Textarea placeholder="What are your thoughts?" {...form.getInputProps('comment')} />
        </Input.Wrapper>
        <div className="flex justify-end py-xs">
          <Button variant="filled" radius="xl" type={'submit'}>
            Add
          </Button>
        </div>
      </form>
      {comments.map((v: any, key: number) => (
        <ForumCommentCard data={v} key={key} loadComments={loadComments} />
      ))}
    </div>
  );
};
