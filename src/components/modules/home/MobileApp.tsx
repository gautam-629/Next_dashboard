/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import Mobile from '../../../assets/mobile.png';
import AppStore from '../../../assets/appstore.png';
import { Grid } from '@mantine/core';

export const MobileApp = () => {
  return (
    <section className={'w-full'}>
      <Grid className="bg-blue-700 w-full wrapper-x flex lg:items-center justify-between lg:pt-2xl m-none">
        <Grid.Col md={6} lg={6} sm={12} xs={12} className="flex-col justify-center lg:pb-2xl">
          <h1 className="sm:text-2xl md:text-5xl text-white">
            Growth performance <br />
            tracking made easy
          </h1>
          <p className="text-white pt-sm">Start your 30-day free trial today.</p>
          <img src={AppStore} className={'mt-xs'} />
        </Grid.Col>
        <Grid.Col md={6} lg={6} sm={12} xs={12} className="lg:justify-end  lg:visible" p={0}>
          <img
            src={Mobile}
            className={'w-full object-contain'}
            style={{ aspectRatio: '720 / 600' }}
            height={400}
            alt=""
          />
        </Grid.Col>
      </Grid>
    </section>
  );
};
