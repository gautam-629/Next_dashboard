/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, ActionIcon, Badge, Box, Grid, Text } from '@mantine/core';
import moment from 'moment';
import { StudentTaskSubmissionForm } from './StudentTaskSubmissionForm';
import { StudentTaskSubmissionDetails } from './StudentTaskSubmissionDetails';
import { TaskSubmit } from '../student/pages/task/TaskSubmit';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ClassroomAssignmentCreate from './ClassroomCreateAssignment';
import { ClassroomAssignmentSubmit } from './ClassroomAssignmentSubmit';

import { Link } from 'react-router-dom';

export const ResourcePreview = (props: any) => {
  const { url } = props;

  const extractFileNameFromUrl = (url: string) => {
    // Use the URL constructor to parse the URL
    // const parsedUrl = new URL(url);

    // Get the pathname (e.g., "/file/get-file/Report_-fd83.pdf")
    // const pathname = parsedUrl.pathname;

    // Use string manipulation to extract the file name (e.g., "Report_-fd83.pdf")
    const fileName = url.split('/').pop();

    return fileName;
  };

  return (
    <Box className="w-full">
      <iframe src={url} title="Resource" className="w-full h-screen"></iframe>
    </Box>
  );
};
