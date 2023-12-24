/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Input, Button } from '@mantine/core';
import { DatePicker, DateTimePicker } from '@mantine/dates';
import { useState } from 'react';
import { APICreateClassRoom } from '../../../api/classRoom';
import { errorNotification } from '../../../utils/helpers/notifications';

const CreateClassRoom = () => {
  const [classStartDate, setClassStartDate] = useState<Date>(new Date());
  const [classRoomTitle, setClassRoomTitle] = useState<string>('');

  const createNewClassRoom = async () => {
    try {
      const response = await APICreateClassRoom({ classRoomTitle, classStartDate });
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  return (
    <div className="classroom-form">
      <Input
        placeholder="Meeting title"
        onChange={(e) => setClassRoomTitle(e.target.value)}
        value={classRoomTitle}
      />
      <DateTimePicker
        label="Pick date and time"
        placeholder="Pick date and time"
        maw={400}
        mx="auto"
        value={classStartDate}
        onChange={(e: Date) => setClassStartDate(e)}
      />
      <Button onClick={createNewClassRoom}>Create new meeting</Button>
    </div>
  );
};

export default CreateClassRoom;
