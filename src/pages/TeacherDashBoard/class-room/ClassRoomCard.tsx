/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {
  Assessment,
  Assignment,
  Clock,
  CodingImg,
  DefaultImage,
  Lesson,
} from '../../../utils/assets/image';
import { Link } from 'react-router-dom';
import { errorImageHandler } from '../../../utils/assets/imageurl';

interface ClassRoomCardProps {
  classRoom: any;
}

const ClassRoomCard = (props: ClassRoomCardProps) => {
  const { classRoom } = props;
  const navigate = useNavigate();
  console.log(classRoom, 'classroom data');
  const joinMeeting = (id: any) => {
    navigate(`/student/classroom/${id}`);
  };
  return (
    <Card withBorder>
      <Card.Section>
        <Link to={`/student/classroom/${classRoom._id}`}>
          <img
            onError={errorImageHandler}
            src={classRoom?.course?.courseImageUrl ?? ''}
            height={160}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '160px',
              objectPosition: 'center',
              borderRadius: '4px',
            }}
            alt="Norway"
          />
        </Link>
      </Card.Section>

      <Text weight={700} className="text-lg mt-sm text-capitalize">
        {classRoom?.batchName ?? 'Batch 1'}
      </Text>
      <Text weight={500} className="mb-sm">
        Course: {classRoom?.course?.courseTitle ?? ''}
      </Text>
      <Group position="apart" className="mt-[12px]">
        <div className="flex content-center items-center">
          <img src={Lesson} />

          <Text size="sm" className="ml-[5px] ">
            12 Lesson
          </Text>
        </div>
        <div className="flex  items-center ">
          <img src={Clock} />

          <Text size="sm" className="ml-[5px]">
            08:00 - 10:00
          </Text>
        </div>
      </Group>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => joinMeeting(classRoom._id)}
      >
        View
      </Button>
    </Card>
  );
};

export default ClassRoomCard;
