/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

const SuccessMessageLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SuccessMessageLayout;
