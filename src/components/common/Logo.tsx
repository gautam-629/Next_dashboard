/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Link } from 'react-router-dom';
import RemoteAxis from '../../assets/RemoteAxis.png';
import LogoFull from '../../assets/RA_logo.png';
import { errorImageHandler } from '../../utils/assets/imageurl';
import { Box } from '@mantine/core';

export const Logo = () => (
  <Link to="/" className={'block'}>
    <img
      src={LogoFull}
      alt=""
      className={'xl:h-[60px] h-[40px]'}
      onError={errorImageHandler}
      // height={'50'}
    />
  </Link>
);
