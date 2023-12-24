/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ClassroomChatarea } from './ClassroomChatarea';
import { useState } from 'react';

export const ClassroomChat = (props: any) => {
  const selectedRoom = props.room;
  const [active, setActive] = useState(false);
  return (
    <div
      className={'w-[300px] fixed bottom-none right-none'}
      style={{
        border: '1px solid rgba(0,0,0,0.125)',
        boxShadow: '-2px 0 8px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div
        className="flex items-center justify-between bg-primary-700 text-white pointer px-md py-sm"
        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
        onClick={() => setActive(!active)}
      >
        Batch Title
      </div>
      <div className="w-full bg-white">{active && <ClassroomChatarea />}</div>
    </div>
  );
};
