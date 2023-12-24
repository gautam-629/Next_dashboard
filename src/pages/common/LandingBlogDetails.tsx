/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  APIAddComment,
  APICommentsByBlog,
  APIDeleteComment,
  APIGetAllBlogs,
  APIGetBlogBySlug,
  APIToggleLike,
  APIToggleSave,
} from '../../api/blog';
import { errorNotification } from '../../plugins/notification';
import {
  ActionIcon,
  Card,
  Input,
  Textarea,
  ThemeIcon,
  Button,
  Grid,
  Box,
  Title,
  Stack,
  Text,
} from '@mantine/core';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { Bookmark, Heart, Trash } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { courseDateFormatter } from '../../utils/helpers/datetime';
import { openConfirmModal } from '@mantine/modals';
import { IBlog } from '../../utils/interfaces/AllBlogs';
import BlogCard from '../blog/BlogCard';

export const LandingBlogDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    cover: '',
    slug: '',
    liked: false,
    likes: 0,
    saved: false,
    createdBy: {
      _id: '-1',
      firstName: '',
      lastName: '',
      avatar: '',
    },
  });

  const [comments, setComments] = useState([]);
  const isAuthenticated = !!localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  const form: any = useForm({
    initialValues: {
      comment: '',
    },
    validate: {
      comment: (value: string) => value.length === 0 && 'Message cannot be empty',
    },
  });

  const loadData = async () => {
    try {
      const res = await APIGetBlogBySlug(slug ?? '');
      setBlog(res.data);
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: e.message,
      });
    }
  };

  const toggleLike = async () => {
    const res = await APIToggleLike(blog?._id ?? '');
    await loadData();
  };

  const toggleSave = async () => {
    const res = await APIToggleSave(blog?._id ?? '');
    await loadData();
  };

  const addComment = async () => {
    const res = await APIAddComment({ comment: form.values.comment, blog: blog._id });
    await loadComments();
  };

  const loadComments = async () => {
    if (blog?._id) {
      const res = await APICommentsByBlog(blog._id);
      setComments(res.data);
    }
  };

  const openDeleteConfirmationModal = (id: string) => {
    try {
      openConfirmModal({
        title: 'Please confirm your action',
        children: <div>Are you sure you want to delete this comment?</div>,
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async () => {
          await APIDeleteComment(id);
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

  useEffect(() => {
    loadData();
  }, [slug]);

  useEffect(() => {
    loadComments();
  }, [blog]);

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res: any = await APIGetAllBlogs();
        setBlogs(res.data);
      } catch (error: any) {
        errorNotification(error.message || 'An error occurred');
      }
    })();
  }, []);
  return (
    <section className={' wrapper-x py-md md:py-2xl  dark:bg-blueGray-800  '}>
      <div>
        <img
          onError={errorImageHandler}
          src={blog.cover}
          style={{ aspectRatio: '32  / 9' }}
          className={'w-full object-cover object-center rounded-md'}
          alt=""
          onClick={() => navigate('/blog/' + blog?.slug)}
        />
        <Grid>
          <Grid.Col sm={8}>
            <div className="flex justify-between items-center mt-md ">
              <div className="text-2xl font-bold capitalize">{blog.title}</div>
              <div className={'flex items-center'}>
                <div className={'text-md font-bold'}>{blog.likes}</div>
                <ActionIcon
                  variant={blog.liked ? 'filled' : 'default'}
                  color={blog.liked ? 'red' : 'gray'}
                  onClick={() => toggleLike()}
                  ml={'xs'}
                  mr={'xs'}
                  className={'flex items-center'}
                >
                  <Heart size={24} />
                </ActionIcon>
                <ThemeIcon
                  variant={blog.saved ? 'filled' : 'default'}
                  color={blog.liked ? 'green' : 'gray'}
                  onClick={() => toggleSave()}
                >
                  <Bookmark size={24} />
                </ThemeIcon>
              </div>
            </div>
            <div className="flex items-center mt-sm">
              <img
                onError={errorImageHandler}
                src={blog?.createdBy?.avatar ?? ''}
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className={'pl-xs'}>
                <div className="text-sm font-medium">
                  {blog?.createdBy?.firstName ?? '-'} {blog?.createdBy?.lastName ?? '-'}
                </div>
                <div className="text-sm text-gray-500 font-normal">
                  {blog?.createdAt ? courseDateFormatter(blog?.createdAt) : '12 July, 2022'}
                </div>
              </div>
            </div>
            <div className="mt-md">
              <p dangerouslySetInnerHTML={{ __html: blog?.content }}></p>
            </div>
            <div className="comment-section mt-md">
              <Card withBorder p={'xs'}>
                <form onSubmit={form.onSubmit(addComment)}>
                  <Input.Wrapper label={<div className={'font-bold text-md'}>Add Comment</div>}>
                    <Textarea
                      placeholder="What are your thoughts?"
                      {...form.getInputProps('comment')}
                    />
                  </Input.Wrapper>
                  <div className="flex justify-end py-xs">
                    <Button variant="filled" radius="xl" type={'submit'}>
                      Add
                    </Button>
                  </div>
                </form>
                {comments.map((v: any, key: number) => (
                  <div className={'mt-xs'} key={key}>
                    <div className="flex justify-between">
                      <div className="text-md flex-grow">{v.comment}</div>
                      {userId === v.createdBy?._id && (
                        <ActionIcon onClick={() => openDeleteConfirmationModal(v._id)}>
                          <Trash size={24} />
                        </ActionIcon>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center ">
                        <img
                          onError={errorImageHandler}
                          src={v?.createdBy?.avatar ?? ''}
                          alt=""
                          className="w-[24px] h-[24px] rounded-full"
                        />
                        <div className={'pl-xs'}>
                          <div className="text-sm font-medium">
                            {v?.createdBy?.firstName ?? '-'} {v?.createdBy?.lastName ?? '-'}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 font-normal">
                        {v?.createdAt ? courseDateFormatter(v?.createdAt) : '12 July, 2022'}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </Grid.Col>{' '}
          <Grid.Col sm={4}>
            <Box className="mt-md">
              <Title className="font-normal text-lg">Must Read Blogs</Title>
              {[1, 2].map((item) => (
                <Stack className="mt-md" spacing="xs" key={item}>
                  <Text className="text-Grayscale-600 text-tiny font-medium" fz="sm">
                    2074/02/01
                  </Text>
                  <Title order={2} className="font-medium text-secondary-dark text-lg">
                    React vs React Native - Which JS Fram...
                  </Title>
                  <Text className="font-medium text-secondary-default">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsu..
                  </Text>
                </Stack>
              ))}
            </Box>
            <Box></Box>
            <Box>
              <p className="mt-sm font-semibold">Recommend blogs</p>
              {Array.isArray(blogs) &&
                blogs?.map((blog: IBlog) => (
                  <Grid.Col key={blog._id}>
                    <BlogCard blog={blog} />
                  </Grid.Col>
                ))}
            </Box>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};
