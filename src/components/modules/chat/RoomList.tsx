/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { Drawer, TextInput, ActionIcon, Avatar, Card } from '@mantine/core';
import { BiMessageAdd } from 'react-icons/bi';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { APILoadMyGroups } from '../../../api/chat';

export const RoomList = (props: any) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);
  const loadRooms = async () => {
    const res = await APILoadMyGroups();
    console.log(res);
    setRooms(res.data);
  };
  return (
    <>
      <div className={'h-full '}>
        <div className="flex pb-xs">
          <div className="flex-grow font-extrabold text-primary-700 text-lg">Chats</div>
          <div>
            <ActionIcon size={36} variant={'filled'} color={'secondary'}>
              <BiMessageAdd size={24} />
            </ActionIcon>
          </div>
        </div>
        <div>
          <TextInput
            onChange={(e) => setSearchKeyword(e.currentTarget.value)}
            value={searchKeyword}
            placeholder="Search Conversation"
            icon={<IconSearch />}
          />
        </div>
        <div
          className={'overflow-auto w-full mt-xs cursor-pointer'}
          style={{ height: 'calc(100vh - 200px)' }}
        >
          {rooms.map((room: any, key: number) => (
            <Card
              className={`flex items-center hover:bg-gray-100 ${
                props.selectedRoom === room._id ? 'bg-secondary-300' : ''
              }`}
              key={key}
              p={0}
              onClick={() => props.setSelectedRoom(room._id)}
            >
              <Avatar src={room.img}></Avatar>
              <div className="flex-grow px-xs">
                <div className="font-bold text-md">{room.name}</div>
                <div className="text-md text-gray-600">{room.latestMessage?.text ?? ''}</div>
              </div>
            </Card>
          ))}{' '}
        </div>
      </div>
    </>
  );
};
