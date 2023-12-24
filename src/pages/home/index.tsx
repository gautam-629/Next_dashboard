/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useDispatch } from 'react-redux';
import { Hero } from '../../components/modules/home/Hero';
import { Metrics } from '../../components/modules/home/Metrics';
import { PopularCourses } from '../../components/modules/home/PopularCourses';
import { FeaturedCourses } from '../../components/modules/home/FeaturedCourses';
import { MobileApp } from '../../components/modules/home/MobileApp';
import { Testomonials } from '../../components/modules/home/Testomonials';
import { NewsLetter } from '../../components/modules/home/NewsLetter';
import { ExploreCourses } from '../../components/modules/home/ExploreCourses';
import { useEffect } from 'react';
import { getAllCourses } from '../../store/modules/courses/actions';
import EnrollStudent from '../../components/modules/home/EnrollStudent';
import BecomeTeacher from '../../components/modules/home/BecomeTeacher';
import TeacherSection from '../../components/modules/home/TeacherSection';
import Partners from '../../components/modules/home/Partners';
import LatestBlogsCourses from '../../components/modules/home/LatestBlogsCourses';

export default function Home() {
  const dispatch = useDispatch() as any;

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  return (
    <section>
      <Hero />
      <FeaturedCourses />
      <EnrollStudent />
      <ExploreCourses />
      <TeacherSection />
      <LatestBlogsCourses />
      <Testomonials />
      <BecomeTeacher />\
      <Partners />
      {/*
       */}
      {/* <MobileApp /> */}
      {/*<Metrics />*/}
      {/* <PopularCourses /> */}
      {/* <NewsLetter /> */}
    </section>
  );
}
