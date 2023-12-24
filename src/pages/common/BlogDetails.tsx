/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIGetBlogBySlug } from '../../api/blog';
import { errorNotification } from '../../plugins/notification';
import { Paper } from '@mantine/core';
import { errorImageHandler } from '../../utils/assets/imageurl';

export const BlogDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    cover: '',
    slug: '',
  });

  const loadData = async () => {
    try {
      const res = await APIGetBlogBySlug(slug ?? '');
      setBlog(res.data);
    } catch (e) {
      errorNotification({
        title: 'Error',
        message: e.message,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  return (
    <Paper p={'sm'} className={'h-full relative'}>
      <img
        onError={errorImageHandler}
        src={blog.cover}
        style={{ aspectRatio: '32  / 9' }}
        className={'w-full object-cover object-center rounded-md'}
        alt=""
      />
      <div className="text-lg font-bold mt-md capitalize">{blog.title}</div>
      <p dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
    </Paper>
  );
};
