/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import ProfileDetails from './ProfileDetails';
import { Qualification } from './qualification';
import Experience from './experience';
import Certification from './certification';
import { Button, Grid } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const location = useLocation();
  const profile = location.pathname.includes('teacher') ? 'teacher' : 'student';
  return (
    <>
      <Grid>
        <Grid.Col sm={12} md={12} lg={12} xl={12} xs={12}>
          <ProfileDetails />
        </Grid.Col>
        <Grid.Col sm={6} md={6} lg={6} xl={6} xs={12}>
          <Qualification />
        </Grid.Col>
        <Grid.Col sm={6} md={6} lg={6} xl={6} xs={12}>
          <Certification />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default TeacherProfile;
