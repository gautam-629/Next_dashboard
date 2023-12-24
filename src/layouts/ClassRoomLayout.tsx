/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import AppNavbar from '../components/common/AppNavbar';
import ClassRoom from '../pages/TeacherDashBoard/class-room';
import { CommonClassRoom } from '../pages/classroom/CommonClassRoom';

const ClassRoomLayout = () => {
  return (
    <div className="">
      <CommonClassRoom />
    </div>
  );
};

export default ClassRoomLayout;
