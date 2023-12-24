/*
 * Copyright (c) 2023 Groupado.
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 */

import {
  Button,
  Grid,
  Input,
  TextInput,
  Paper,
  SegmentedControl,
  MultiSelect,
} from '@mantine/core';
import { CloudUpload, Trash } from 'tabler-icons-react';
import { Dropzone } from '@mantine/dropzone';
import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { APIUploadImage } from '../../api/file-handler';
import { APIGetBlogById, APIGetBlogBySlug, APIPostBlog } from '../../api/blog';
import { showNotification } from '@mantine/notifications';
import { errorNotification } from '../../plugins/notification';
import { StackTitleComponent } from '../../components/common/StackTitleComponent';
import { RemoteAxleRichTextEditor } from '../../components/common/RemoteAxleRichTextEditor';
import { APIGetCategories } from '../../api/categories';

export const AddBlog = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const loadCategories = async () => {
    try {
      const res = await APIGetCategories();
      setCategories(res.data);
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: 'Could not load categories',
      });
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const res = await APIGetBlogById(id ?? '');
      form.setValues({
        title: res.data.title,
        categories: res.data.categories.map((v: any) => v._id),
        content: res.data.content,
        status: res.data.status,
        tags: res.data.tags,
      });

      setCoverImage(res.data.cover);
    } catch (e) {
      errorNotification({
        title: 'Error',
        message: e.message,
      });
    }
  };
  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setCoverImage(file);
  };

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      tags: '',
      categories: [],
      status: 'DRAFT',
    },
    validate: {
      title: (val) => !val && val === '' && '*Required',
      categories: (val) => {
        if (val.length === 0) return '*Please atleast 1 category';
        if (val.length > 3) return '*Please select max 3 categories';
      },
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);
  const changeContentDescription = (val: string) => {
    form.setFieldValue('content', val);
  };

  const addBlog = async () => {
    try {
      setLoading(true);
      if (form.values.content === '') {
        errorNotification({
          title: 'Error',
          message: 'Description cannot be empty',
        });
        setLoading(false);
        return;
      }
      if (coverImage) {
        let cover: any = coverImage;
        if (typeof coverImage !== 'string') {
          const formData = new FormData();
          formData.append('file', coverImage);
          const res: any = await APIUploadImage(formData);
          cover = res.data.url;
        }
        const res2 = await APIPostBlog({
          cover: cover,
          title: form.values.title.trim(),
          content: form.values.content,
          tags: form.values.tags,
          status: form.values.status,
          categories: form.values.categories,
        });
        navigate('/student/blogs');
      } else {
        errorNotification({
          title: 'Error',
          message: 'Please add a cover image',
        });
      }
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: e.toString(),
      });
    }
    setLoading(false);
  };

  return (
    <section>
      <form onSubmit={form.onSubmit((val) => addBlog())}>
        <Paper p={'sm'} className={'h-full relative'}>
          <div className={'mb-md flex justify-between'}>
            <StackTitleComponent>Add Blog</StackTitleComponent>
            <SegmentedControl
              {...form.getInputProps('status')}
              data={[
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Active', value: 'ACTIVE' },
                { label: 'Inactive', value: 'INACTIVE' },
              ]}
            />
          </div>
          <Grid>
            <Grid.Col span={12}>
              <Dropzone onDrop={handleDrop} multiple={false} p={0}>
                {coverImage ? (
                  <div
                    style={{
                      border: '2px dashed #999',
                      borderRadius: '4px',
                      minHeight: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      maxHeight: '300px',
                      aspectRatio: '32 / 9',
                      width: '100%',
                    }}
                  >
                    <img
                      src={
                        typeof coverImage === 'string'
                          ? coverImage
                          : URL.createObjectURL(coverImage)
                      }
                      alt="Cover Image"
                      style={{
                        maxWidth: '100%',
                        objectFit: 'cover',
                        width: '100%',
                        aspectRatio: '32 / 9',
                        height: '100%',
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="flex flex-col items-center justify-center"
                      style={{ minHeight: '150px' }}
                    >
                      <CloudUpload
                        size={32}
                        style={{
                          marginRight: '0.5rem',
                        }}
                      />
                      <div>Drag and drop an image file here. Please use ratio of 32:9.</div>
                    </div>
                  </>
                )}
              </Dropzone>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12}>
              <Input.Wrapper label={'Blog Title'}>
                <TextInput
                  pb={'xs'}
                  variant="filled"
                  {...form.getInputProps('title')}
                  placeholder={'Enter title for blog'}
                  required
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={8}>
              <Input.Wrapper label={'Blog Category'}>
                <MultiSelect
                  {...form.getInputProps('categories')}
                  data={categories.map((v: any) => ({ label: v.categoryTitle, value: v._id }))}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Input.Wrapper label={'Blog Description'} mt={'sm'}>
            <RemoteAxleRichTextEditor
              changeContentDescription={changeContentDescription}
              loadedContent={form.values?.content ?? ''}
            />
          </Input.Wrapper>
          <div className="flex justify-end py-md mt-md h-[80px] w-full sticky bottom-none left-none bg-white">
            <Button
              type={'button'}
              color={'secondary'}
              className={'mr-sm'}
              loading={loading}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button loading={loading} type={'submit'}>
              Save
            </Button>
          </div>
        </Paper>
      </form>
    </section>
  );
};
