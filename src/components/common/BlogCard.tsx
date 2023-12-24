/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Card, ActionIcon } from '@mantine/core';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { useNavigate } from 'react-router-dom';
import { courseDateFormatter } from '../../utils/helpers/datetime';
import { RightUpArrow } from '../../utils/assets/image';
import { Pencil } from 'tabler-icons-react';

export const BlogCard = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <Card p={'xs'}>
      <img
        onError={errorImageHandler}
        src={data.cover}
        className={'w-full object-cover object-center rounded-md'}
        style={{ aspectRatio: '4 / 3' }}
        onClick={() => navigate('/student/blog/' + data.slug)}
      />
      <div className="content-area">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-2xl  md:mt-[12px]  md:mb-xs ">
            {data?.title ?? `Course`}
          </div>
          <div className="">
            <ActionIcon onClick={() => navigate('/student/blog/edit/' + data._id)}>
              <Pencil />
            </ActionIcon>
          </div>
        </div>
      </div>
    </Card>
  );
};
