/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useEffect, useState } from 'react';
import { Grid } from '@mantine/core';
import { BlogCard } from '../../common/BlogCard';

export const BlogContainer = (props: any) => {
  const { type, loadData, data } = props;

  useEffect(() => {
    loadData(type);
  }, []);

  return (
    <Grid>
      {data.map((v: any, key: number) => (
        <Grid.Col key={key} md={3}>
          <BlogCard data={v} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
