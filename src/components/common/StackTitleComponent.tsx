/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useNavigate } from 'react-router-dom';
import { ActionIcon } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';

export const StackTitleComponent = (props: any) => {
  const navigate = useNavigate();
  return (
    <div className={'flex items-center'}>
      <ActionIcon onClick={() => navigate(-1)}>
        <IconChevronLeft />
      </ActionIcon>
      <div className={'text-2xl font-normal'}>{props.children}</div>
    </div>
  );
};
