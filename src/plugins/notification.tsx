/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
export const successNotification = ({ title, message }: any) => {
  showNotification({
    title: title,
    message: message,
    icon: <IconCheck />,
    autoClose: 5000,
  });
};
export const errorNotification = ({ title, message }: any) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 5000,
    icon: <IconX />,
    color: 'red',
  });
};
