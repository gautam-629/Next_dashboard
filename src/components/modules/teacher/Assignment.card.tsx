/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Card, Grid, Switch } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import React from 'react';

export const AssignmentCard = () => {
  return (
    <Card className="bg-transparent hover:bg-Grayscale-200" withBorder>
      <Grid align="center" className="p-none">
        <Grid.Col className="p-none m-none" md={4}>
          <div className="">
            <p className="text-base font-semibold leading-7 text-secondary-dark">
              Implement an User Registration
            </p>
            <p className="text-xs font-normal leading-normal text-secondary-default ">
              Section: <span className="text-sm">Chapter 1</span>
            </p>
            <p className="text-xs font-normal leading-normal text-secondary-default">
              Lesson: <span className="text-sm ">Introduction to Big Data</span>
            </p>
          </div>
        </Grid.Col>
        <Grid.Col md={4}>
          <Grid align="center">
            <Grid.Col className="p-none m-none" span={6}>
              <div className="text-center">
                <IconFile size={24} strokeWidth={2} color={'#414141'} />
                <p className="text-sm font-normal leading-normal text-secondary-default">
                  file.svg
                </p>
              </div>
            </Grid.Col>

            <Grid.Col className="p-none m-none" span={6}>
              <div className="text-center">
                <p className="text-sm font-normal leading-normal text-secondary-default">4</p>
                <p className="text-sm font-normal leading-normal text-secondary-default">
                  Batch Assigned
                </p>
              </div>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col className="p-none m-none" md={4}>
          <div className="flex justify-end items-center">
            <Button variant="outline">Assign Task</Button>
            <Button className="mx-xs">View Details</Button>
            <Switch></Switch>
          </div>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
