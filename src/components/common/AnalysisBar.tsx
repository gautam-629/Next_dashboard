/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Card, Grid } from '@mantine/core';

interface AnalysisProps {
  data: any;
}

export const AnalysisBar = ({ data }: AnalysisProps) => {
  return (
    <>
      <Card mt={'sm'}>
        <Grid>
          {data.map((dat: any, index: any) => (
            <Grid.Col md={4} sm={4} xs={6} key={index} className={'text-center'}>
              <div className="text-xs font-semibold text-center text-primary-700">{dat.title}</div>
              <div className="text-4xl  tracking-widest font-bold ">{dat.number}</div>
            </Grid.Col>
          ))}
        </Grid>
      </Card>
    </>
  );
};
