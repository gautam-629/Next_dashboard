/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Button, Card, Grid, Image, Progress } from '@mantine/core';
import Course from '../../../../assets/Anna.png';
import { IconBook2, IconClockHour2, IconGraph, IconNotes } from '@tabler/icons-react';

export const TeacherBatchCard = () => {
  return (
    <Card>
      <Grid align="center" justify="center" gutter="md">
        <Grid.Col span={5} className="p-none">
          <div className="flex gap-xs items-center">
            <div className="h-full w-2/4">
              <Image src={Course} className="batch-image"></Image>
            </div>
            <div className="w-full">
              <p className="text-sm leading-5 font-medium text-secondary-dark">
                Batch Evening (5:00pm)
              </p>

              <p className="text-xs font-normal leading-5 text-secondary-default ">
                Data Structure And Algorithm
              </p>
              <div className="flex justify-between mt-xs ">
                <div className="flex gap-xs items-center">
                  <IconBook2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    12 lessons
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <IconNotes size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    12 Assignments
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-xs">
                <div className="flex gap-xs items-center">
                  <IconClockHour2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    12:00 - 2:00
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <IconGraph size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    12 Assessments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={4} className="flex flex-col justify-center items-center ">
          <div className="flex gap-xs w-3/4 items-center justify-center">
            <Progress value={50} className="w-full" />
            <p className="text-sm font-normal leading-5 text-secondary-default ">100%</p>
          </div>
          <span className="text-sm text-primary-200 leading-5 font-normal w-3/4 text-left">
            10 days To Complete
          </span>
        </Grid.Col>
        <Grid.Col span={3} className="flex justify-between items-center p-none">
          <Badge>Completed</Badge>
          <Button className="ml-sm">View Details </Button>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
