/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Tabs } from '@mantine/core';
import { useState } from 'react';
import { BlogContainer } from '../../components/modules/blog/BlogContainer';
import { APIGetMyBlogsByType } from '../../api/blog';
import { BlogStatusEnum } from '../../utils/enum/status.enum';
import { useNavigate } from 'react-router-dom';
export const Blog = () => {
  const [activeTab, setActiveTab] = useState<any>('active');
  const [activeBlogs, setActiveBlog] = useState([] as any);
  const [inactiveBlogs, setInactiveBlog] = useState([] as any);
  const [draftBlogs, setDraftBlog] = useState([] as any);
  const navigate = useNavigate();
  const loadData = async (type: string) => {
    if (type) {
      const res: any = await APIGetMyBlogsByType(type);
      if (type === BlogStatusEnum.ACTIVE) {
        setActiveBlog(res.data);
      }
      if (type === BlogStatusEnum.INACTIVE) {
        setInactiveBlog(res.data);
      }
      if (type === BlogStatusEnum.DRAFT) {
        setDraftBlog(res.data);
      }
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-md font-bold">My Blogs</div>
        <div>
          <Button onClick={() => navigate('/student/blog/add')}>Add Blog</Button>
        </div>
      </div>
      <Tabs defaultValue={'active'}>
        <Tabs.List>
          <Tabs.Tab value="active">Active</Tabs.Tab>
          <Tabs.Tab value="drafts">Drafts</Tabs.Tab>
          <Tabs.Tab value="inactive">Inactive</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <BlogContainer type={'ACTIVE'} loadData={loadData} data={activeBlogs} />
        </Tabs.Panel>
        <Tabs.Panel value="drafts">
          <BlogContainer type={'DRAFT'} loadData={loadData} data={draftBlogs} />
        </Tabs.Panel>
        <Tabs.Panel value="inactive">
          <BlogContainer type={'INACTIVE'} loadData={loadData} data={inactiveBlogs} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
