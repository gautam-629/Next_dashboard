/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Card } from '@mantine/core';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { useNavigate } from 'react-router-dom';
import { courseDateFormatter } from '../../utils/helpers/datetime';
import { RightUpArrow } from '../../utils/assets/image';

export const LandingBlogCard = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <Card p={'xs'} onClick={() => navigate('/blog/' + data.slug)}>
      <img
        onError={errorImageHandler}
        src={data.cover}
        className={'w-full object-cover object-center rounded-md'}
        style={{ aspectRatio: '4 / 3' }}
      />
      <div className="content-area">
        {data?.categories?.length > 0 && (
          <div className={'flex flex-wrap my-xs '}>
            {data?.categories.map((v: any, key: number) => (
              <Badge
                className={'text-sm mb-xs '}
                size="md"
                styles={{
                  inner: {
                    fontSize: '0.9rem',
                  },
                }}
              >
                {v.categoryTitle}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center ">
          <div className="two-line-fixed-height font-semibold text-lg  md:mt-[12px]  md:mb-xs ">
            {data?.title ?? `Course`}
          </div>
          <div className="">
            <img src={RightUpArrow} alt="" />
          </div>
        </div>
        <div className="flex items-center">
          <img
            onError={errorImageHandler}
            src={data?.createdBy?.avatar ?? ''}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className={'pl-xs'}>
            <div className="text-sm font-medium">
              {data?.createdBy?.firstName ?? '-'} {data?.createdBy?.lastName ?? '-'}
            </div>
            <div className="text-sm text-gray-500 font-normal">
              {data?.createdAt ? courseDateFormatter(data?.createdAt) : '12 July, 2022'}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
