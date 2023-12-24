/* eslint-disable */
/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Testomonial } from './Testomonial';
import { Button, Grid } from '@mantine/core';
import { MockTestomonials } from '../../../utils/mockdata/mockData';
import React from 'react';
import { Cover2 } from '../../../utils/assets/image';
import TestomonialCard from '../../../pages/home/Testomonials/TestomonialCard';
import { ObjectAnyType, TestomonialObjecttype } from '../../../utils/interfaces/type';
import { useCallback, useEffect, useState } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { Progress, rem } from '@mantine/core';
import { APIGetAllTestimonials } from '../../../api/testimonials';
import { TestimonialType } from '../../../utils/interfaces/Testimonials';
import { useNavigate } from 'react-router-dom';
export const Testomonials = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
    getTestimonials();
  }, [embla]);

  const getTestimonials = async () => {
    const testimonialsData = await APIGetAllTestimonials();
    setTestimonials(testimonialsData.data);
  };

  const navigate = useNavigate();
  // console.log(testimonials, 'testimonials data');
  const signUp = () => {
    navigate(`/auth/signup`);
  };

  return (
    <div className="bg-Grayscale-200">
      <section className="wrapper-x py-2xl">
        <div className="text-area flex justify-between items-center">
          <div>
            <div className="text-4xl font-semibold text-secondary-dark tracking-wider">
              Don’t just take our word for it
            </div>
            <div className="text-xl font-normal text-[#667085] mt-normal tracking-wider">
              Hear from some of our amazing customers who are building faster.
            </div>
          </div>
          {/* <Button variant={'outline'} size={'lg'} onClick={signUp}>
            Sign up Now
          </Button> */}
        </div>
        <Carousel
          className="mt-lg"
          dragFree
          slideSize="33.333333%"
          breakpoints={[
            { maxWidth: 'md', slideSize: '50%' },
            { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
          ]}
          slideGap="sm"
          align="start"
          getEmblaApi={setEmbla}
          initialSlide={3}
          loop
        >
          {/* <Grid columns={10} className="mt-lg"> */}
          {testimonials?.map((data: TestimonialType, index: number) => (
            // <Grid.Col key={index} span={5}>
            <Carousel.Slide key={index}>
              {' '}
              <TestomonialCard {...data} />
            </Carousel.Slide>
            // </Grid.Col>
          ))}
          {/* </Grid> */}
        </Carousel>
        <Progress
          value={scrollProgress}
          styles={{ bar: { transitionDuration: '0ms' }, root: { maxWidth: rem(320) } }}
          size="xs"
          mt="xl"
          mx="auto"
        />
      </section>
    </div>
  );
};

//  <div className="text-area flex justify-between items-center">
//         <div>
//           <div className="text-3xl">Don’t just take our word for it</div>
//           <div className="text-lg">
//             Hear from some of our amazing customers who are building faster.
//           </div>
//         </div>
//         <Button variant={'outline'} size={'lg'}>
//           Sign up Now
//         </Button>
//       </div>
//       <Carousel
//         className={'mt-xl h-[380px]'}
//         withIndicators
//         height={500}
//         slideSize="33.333333%"
//         slideGap="md"
//         loop
//         align="start"
//         slidesToScroll={3}
//       >
//         {MockTestomonials.map((v, key) => (
//           <React.Fragment key={key}>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//             <Carousel.Slide>
//               <Testomonial testomonial={v} />
//             </Carousel.Slide>
//           </React.Fragment>
//         ))}
//         {/* ...other slides */}
//       </Carousel>
