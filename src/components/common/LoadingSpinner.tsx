/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Loader } from '@mantine/core';

const LoadingSpinner = () => {
  return (
    <div className="flex h-[100%] items-center justify-center">
      <Loader variant="bars" size="lg" />
    </div>
  );
};

export default LoadingSpinner;
