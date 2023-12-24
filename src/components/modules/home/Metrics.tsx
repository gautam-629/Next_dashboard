/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import CountUp from 'react-countup';
import { Button, Grid } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

const metrics = [
  { value: 500, label: 'Users', cta: 'Learn More' },
  { value: 310, label: 'Graduates', cta: 'Check Rankings' },
  { value: 450, label: 'Courses', cta: 'View All' },
  { value: 120, label: 'Teachers', cta: 'Learn More' },
];
export const Metrics = () => (
  <section className={'wrapper-x my-lg'}>
    <div className={'grid justify-between grid-cols-2 gap-sm md:grid-cols-4'}>
      {metrics.map((v, key) => (
        <div key={key}>
          <div className="text-center">
            {/* <div className="text-7xl text-primary-700">{v.value}</div> */}
            <CountUp end={v.value} className="text-5xl md:text-7xl text-primary-700" delay={1} />
            <div className="text-lg font-bold">{v.label}</div>
            <div>
              <Button variant={'subtle'} className="flex justify-between items-center m-auto">
                {v.cta}{' '}
                <span className="">
                  <IconArrowRight />
                </span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
