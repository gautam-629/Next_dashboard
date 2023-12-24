/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { APIAddQuestion, APILoadForumByCourse, APILoadForumByTopic } from '../../api/forum';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Textarea } from '@mantine/core';
import { APIAddComment } from '../../api/blog';
import { useForm } from '@mantine/form';
import { ForumCard } from '../../components/modules/forum/ForumCard';
import { loadForumData } from '../../store/modules/classroom/actions';

export const ClassroomTopicForum = () => {
  const ques = useSelector((state: any) => state.classRoomReducer.forums);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const course = useSelector((state: any) => state.classRoomReducer?.batch?.course?._id);
  const dispatch: any = useDispatch();
  useEffect(() => {
    loadData();
  }, [course]);

  const form: any = useForm({
    initialValues: {
      title: '',
    },
    validate: {
      title: (value: string) => value.length === 0 && 'Message cannot be empty',
    },
  });
  const loadData = async () => {
    if (course) {
      await dispatch(loadForumData(course));
    }
  };
  const addQuestion = async () => {
    const res = await APIAddQuestion({ title: form.values.title, course: course });
    await loadData();
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(addQuestion)}>
        <Input.Wrapper label={<div className={'font-bold text-md'}>Add Question</div>}>
          <Textarea placeholder="What do you want to ask?" {...form.getInputProps('title')} />
        </Input.Wrapper>
        <div className="flex justify-end py-xs">
          <Button variant="filled" radius="xl" type={'submit'}>
            Add
          </Button>
        </div>
      </form>
      <div>
        {ques.map((v: any, key: number) => (
          <ForumCard key={key} data={v} />
        ))}
      </div>
    </div>
  );
};
