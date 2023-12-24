/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { getDarkMode, setTailwindDarkMode } from '../utils/helpers/darkMode';
import { ModalsProvider } from '@mantine/modals';
import { NavigationProgress } from '@mantine/nprogress';

export const BaseTheme = (props: any) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(getDarkMode() as ColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    setTailwindDarkMode();
  }, []);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Quicksand, SamsungOne, Plus Jakarta Sans, sans-serif',
          spacing: { xs: '8px', sm: '16px', md: '24px', lg: '32px', xl: '40px' },
          colorScheme: colorScheme,
          colors: {
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d',
              '#1d1e30',
              '#0c0d21',
              '#01010a',
            ],
            primary: [
              '#e9f6fc',
              '#bce5f5',
              '#a5dcf1',
              '#8fd3ee',
              '#62c1e7',
              '#35b0e0',
              '#1ea7dc',
              '#0c4358',
              '#093242',
              // '#06212c',
            ],
            secondary: [
              '#aee7e3',
              '#9ae2dc',
              '#85dcd4',
              '#71d6cd',
              '#5dd0c6',
              '#48cabf',
              '#34c4b8',
              '#1f766e',
              '#103b37',
            ],
          },
          primaryColor: 'primary',
        }}
      >
        <ModalsProvider>
          <NavigationProgress />
          <NotificationsProvider position="top-right">{props.children}</NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
