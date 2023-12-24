/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text } from '@mantine/core';
// import CreateClassRoom from './CreateClassRoom';
// import ClassRoomCard from './classRoomCard';
import { useEffect, useState } from 'react';
import { APIGetAllClassRoom } from '../../../api/classRoom';
import CreateClassRoom from './CreateClassRoom';
import ClassRoomCard from './ClassRoomCard';
import { errorNotification } from '../../../utils/helpers/notifications';

const ClassRoom = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [classRoomList, setClassRoomList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const classRoomResponse = await APIGetAllClassRoom();
        setClassRoomList(classRoomResponse.data);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  return (
    <div className="p-lg">
      <div className="flex justify-between">
        <div className="text-3xl font-semibold text-primary-700">ClassRoom </div>
        <Button onClick={open}>Create new meeting</Button>
      </div>

      <Modal opened={opened} onClose={close} title="Authentication">
        <CreateClassRoom />
      </Modal>
      <div className=" class-room-list grid grid-cols-3 gap-md mt-sm">
        {classRoomList.map((room: any) => (
          <ClassRoomCard classRoom={room} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default ClassRoom;
