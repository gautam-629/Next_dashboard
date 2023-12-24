/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Grid } from '@mantine/core';
import { Cover2 } from '../../../utils/assets/image';

export const Hero = () => (
  <section
    className={'w-full wrapper-x relative  flex items-center min-h-[580px] xs:min-h-[500px] h-full'}
    style={{ aspectRatio: '1620 / 468' }}
  >
    <div className={'w-full absolute top-none left-none  h-full'}>
      <img src={Cover2} alt="" className={'object-cover object-center h-full w-full  shadow-lg'} />
    </div>
    <div className="text-area relative w-full lg:w-6/12 tracking-wider mb-md text-secondary-dark">
      <div className=" mb-xs">
        {/* <span className="text-5xl font-semibold text-secondary-dark">
          <span className="text-primary-700 text-5xl font-semibold">Learn</span> First To&nbsp;
          <span className="text-primary-700 text-5xl font-semibold">Lead</span> The Rest
        </span> */}
        <p className=" text-center lg:text-start font-quicksand text-herotitle 2xl:text-6xl font-semibold tracking-wider">
          Learn First To Lead{' '}
        </p>
        <p className=" text-center lg:text-start font-quicksand text-herotitle 2xl:text-6xl  font-semibold tracking-wider">
          The Rest
        </p>
      </div>

      <div>
        <p className="text-center lg:text-start text-xl  font-normal text-secondary-dark tracking-wider leading-9">
          Join a dynamic community of learners, collaborate on projects, and explore a wealth of
          knowledge at your own pace
        </p>
        {/* <p className="text-xl font-normal text-secondary-dark">
          {' '}
          projects, and explore a wealth of knowledge at your own
        </p>
        <p className="text-xl font-normal text-secondary-dark"> pace</p> */}
      </div>

      <Grid className="mt-sm">
        <Grid.Col sm={12} md={5} className=" flex justify-center lg:justify-start">
          <Button size="md" radius={'md'} className="font-semibold tracking-wider">
            Browse Our Courses
          </Button>
        </Grid.Col>
        <Grid.Col sm={12} md={7} className=" flex justify-center lg:justify-start">
          <Button
            size="md"
            className="ml-xs font-semibold tracking-wider"
            radius={'md'}
            variant="outline"
          >
            Enroll Now
          </Button>
        </Grid.Col>
      </Grid>

      {/* <div className="flex gap-xl">
        <Button>Browse Our Course</Button>
        <Button variant="outline">Enroll Now</Button>
      </div> */}
    </div>
  </section>
);
