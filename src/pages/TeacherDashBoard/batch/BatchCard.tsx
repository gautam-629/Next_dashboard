/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Modal,
  Progress,
  Switch,
  Tabs,
  Text,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';
import { DefaultImage } from '../../../utils/assets/image';
interface CardProps {
  value: string;
  data: any;
  lessonimg: any;
  assignmentImg: any;
  clockImg: any;
  assessmentImg: any;
  image: any;
  defaultImage: any;

  theme: any;
}
const BatchCard = (props: CardProps) => {
  const navigate = useNavigate();
  const redirectToEdit = (course: string) => {
    navigate(`/teacher/add-course/${course}`);
  };
  return (
    <Tabs.Panel value={props.value} pt="xs">
      <Grid className="mt-lg">
        {props.data.slice(0, 60).map((v: any, index: number) => (
          <Grid.Col key={index} sm={6} md={6} lg={3}>
            <div className="course-card">
              <Card shadow="sm" radius="md" withBorder p="lg">
                <Card.Section component="div" onClick={() => redirectToEdit(v._id)}>
                  <Image
                    src={
                      v?.courseImageUrl
                        ? v.courseImageUrl !== ''
                          ? v.courseImageUrl
                          : props.defaultImage
                        : DefaultImage
                    }
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>
                <div className="mt-[12px]">
                  <Group position="apart">
                    <Text weight={500} className="font-medium">
                      {v?.courseTitle
                        ? v.courseTitle !== ''
                          ? v.courseTitle
                          : 'course'
                        : 'course'}
                    </Text>
                  </Group>
                  {/* <Badge color="green" variant="light" className="mt-[8px] ">
                    Completed
                  </Badge> */}
                </div>
                <Group position="apart" className="mt-[12px]">
                  <div className="flex content-center items-center">
                    <img src={props.lessonimg} />

                    <Text size="sm" className="ml-[5px] ">
                      {v?.lessons} Lesson
                    </Text>
                  </div>
                  <div className="flex  items-center ">
                    <img src={props.assignmentImg} />

                    <Text size="sm" className="ml-[5px] ">
                      {v?.assignments} 4 Assignments
                    </Text>
                  </div>
                </Group>
                <Group position="apart" className="my-[12px]">
                  <div className="flex items-center">
                    <img src={props.clockImg} />

                    <Text size="sm" className="ml-[5px]">
                      08:00 - 10:00
                    </Text>
                  </div>
                  <div className="flex items-center">
                    <img src={props.assessmentImg} />

                    <Text size="sm" className="ml-[5px]">
                      0 Assessments
                    </Text>
                  </div>
                </Group>
                <div className="flex flex-col">
                  <div className="flex items-center w-full">
                    <Progress size="sm" value={90} className="w-full" />
                    <span className="ml-xs">100%</span>
                  </div>
                  <span className="text-left w-full mt-[6px] text-sm text-blue-600 font-medium">
                    Completed
                  </span>
                </div>
                <Group position="apart" className="mt-sm">
                  <div className="flex">
                    <Switch onLabel="ON" offLabel="OFF" size="md" />{' '}
                    <span className="ml-[12px]">Active</span>
                  </div>
                  {/* <Avatar.Group spacing="sm">
                    <Avatar src={props.image} radius="xl" />
                    <Avatar src={props.image} radius="xl" />
                    <Avatar src={props.image} radius="xl" />
                    <Avatar radius="xl">+50</Avatar>
                  </Avatar.Group> */}
                </Group>
              </Card>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </Tabs.Panel>
  );
};

export default BatchCard;
