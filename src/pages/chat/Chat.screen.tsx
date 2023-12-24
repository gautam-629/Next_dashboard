/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { Paper, Grid } from '@mantine/core';
import { RoomList } from '../../components/modules/chat/RoomList';
import { ChatArea } from '../../components/modules/chat/ChatArea';
import { useState } from 'react';

export const ChatScreen = () => {
  const [selectedRoom, setSelectedRoom] = useState('');

  return (
    <Paper className={'h-full'} p={0}>
      <Grid p={0}>
        <Grid.Col md={3}>
          <RoomList selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
        </Grid.Col>
        <Grid.Col md={9} className={'bg-gray-50'} py={0}>
          <ChatArea selectedRoom={selectedRoom} />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
