/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { IconHome, IconMathGreater } from '@tabler/icons-react';
import { Avatar, Badge, Box, Button, NavLink, UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { MdOutlineAssessment } from 'react-icons/md';
import { GiRank1 } from 'react-icons/gi';
import { SiCoursera } from 'react-icons/si';

import Profile from '../../../../assets/Avatar.png';
import Cover from '../../../../assets/cover.png';

const StudentProfile = () => {
  const theme = useMantineTheme();
  return (
    <section className="flex gap-6">
      {/* <div className="min-h-screen bg-blue-700">
        <div className="p-xs flex flex-col justify-between h-full">
          <Box sx={{ width: 340 }}>
            <NavLink
              label="Home"
              icon={<Home size={16} strokeWidth={1.5} />}
              childrenOffset={28}
              className="mt-5xl text-white hover:bg-purple-700"
            >
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
              <NavLink label="Nested parent link" childrenOffset={28}>
                <NavLink label="First child link" />
                <NavLink label="Second child link" />
                <NavLink label="Third child link" />
              </NavLink>
            </NavLink>
            <NavLink
              label="DashBoard"
              icon={<LayoutDashboard size={16} strokeWidth={1.5} />}
              childrenOffset={28}
              defaultOpened
              className="text-white hover:bg-purple-700"
            >
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
              <NavLink label="Third child link" />
            </NavLink>
            <NavLink
              label="Courses"
              icon={<SiCoursera size={16} />}
              childrenOffset={28}
              defaultOpened
              className="text-white hover:bg-purple-700"
            >
              <NavLink label="First child link" />
              <NavLink label="Second child link" />
            </NavLink>
            <NavLink
              label="Rankings"
              icon={<GiRank1 size={16} />}
              childrenOffset={28}
              defaultOpened
              className="text-white hover:bg-purple-700"
            >
              <NavLink label="First child link" />
            </NavLink>
            <NavLink
              label="Assessments"
              icon={<MdOutlineAssessment size={16} />}
              childrenOffset={28}
              defaultOpened
              className="text-white hover:bg-purple-700"
            >
              <NavLink label="First child link" />
            </NavLink>
          </Box>
          <Box
            sx={{
              paddingTop: theme.spacing.sm,
              borderTop: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
              }`,
            }}
          >
            <UnstyledButton
              sx={{
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
              }}
            >
              <Group>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" color="white" weight={500}>
                    Amy Horsefighter
                  </Text>
                  <Text color="white" size="xs">
                    ahorsefighter@gmail.com
                  </Text>
                </Box>

                {theme.dir === 'ltr' ? (
                  <IconChevronRight size={18} />
                ) : (
                  <IconChevronLeft size={18} />
                )}
              </Group>
            </UnstyledButton>
          </Box>
        </div>
      </div> */}

      <div className="min-h-screen w-full">
        <div className="">
          <div className="relative flex items-center justify-center h-full ">
            <img src={Cover} className="min-w-full mt-xs " />
            <img src={Profile} className="absolute -mb-7xl stroke-2" width="100px" />
            <h1 className="absolute -mb-[300px]">Olivia Rhye</h1>
          </div>
          <div className="flex mt-lg items-baseline ">
            <IconHome size={20} strokeWidth={1} color={'black'} className="mr-xs ml-xs " />
            <IconMathGreater size={20} strokeWidth={1} color={'black'} className="mr-xs pt-xs" />
            <p className="mt-auto mr-sm">setting</p>
            <IconMathGreater size={20} strokeWidth={1} color={'black'} className="mr-xs pt-xs" />
            <Badge size="md" radius="sm" className="">
              Badge
            </Badge>
          </div>
          <div className="mt-4xl">
            <Group position="center" className="">
              <Button variant="default">Tertiary</Button>
              <Button variant="filled">Primary</Button>
              <Button variant="gradient">secondary</Button>
              <Button variant="subtle">secondary</Button>
            </Group>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
