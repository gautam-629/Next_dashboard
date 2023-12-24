/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Button, Divider, Grid, Space, TextInput } from '@mantine/core';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  FB_white_icon,
  Facebook,
  Insta_white_icon,
  LinkIn_white_icon,
  RALoginImg,
  RAWhiteLogo,
} from '../../utils/assets/image';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Category } from '../../utils/interfaces/Category.model';
import { APIGetFeaturedCategories } from '../../api/categories';
import { APIGetPopularCourses } from '../../api/course';

const Company = ['About Us', 'Careers', 'Press', 'News', 'Become A Instructor', 'Contact'];
const popularCategory = [
  'Design',
  'Machine Learning',
  'Data Science',
  'Marketing',
  'IT and Software',
  'Business',
];

export const FooterLanding = () => {
  const courseList = useSelector((state: any) => state.courseReducer.courseList);
  const [list, setList] = useState<Category[]>([]);
  const [popularCourseList, setPopularCourseList] = useState([]);
  useEffect(() => {
    getCategoryList();
    getPopularCourses();
  }, []);
  const getCategoryList = async () => {
    try {
      const response: any = await APIGetFeaturedCategories();
      const categoryList: Category[] = response.data; // Assuming response.data is an array of category objects
      const slicedCategories = categoryList.slice(0, 6);
      // console.log(slicedCategories, 'slicedCategories');
      setList(slicedCategories);
      console.log(slicedCategories, 'category');
    } catch (error) {
      // console.log(error, 'errors');
    }
  };
  const getPopularCourses = async () => {
    try {
      const popularCourse: any = await APIGetPopularCourses();
      setPopularCourseList(popularCourse?.data.slice(0, 6));
      console.log(popularCourse, 'popularCourse');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(popularCourseList, 'populacourseList');
  return (
    <footer className={'text-white landing-footer w-full py-xl wrapper-x bg-gray-800 '}>
      <div className="flex flex-col lg:flex-row md:justify-between my-2xl">
        <div className="text-center lg:text-start">
          <p className="text-3xl font-semibold"> Join our newsletter</p>
          <p className="text-xl font-normal text-gray-300">
            Sign up for the very best tutorials and the latest news.
          </p>
        </div>
        <div className="flex gap-sm justify-center lg:justify-start ">
          <div>
            {' '}
            {/* <TextInput placeholder="Enter your email" className=" w-full" size="lg"></TextInput> */}
            <p className="mt-xs text-center">
              We care about your data in our{' '}
              <span className="underline  font-normal">privacy policy</span>
            </p>
          </div>

          {/* <Button variant="outline" size="lg" className="border-white text-white">
            Subscribe
          </Button> */}
        </div>
      </div>

      <Grid>
        <Grid.Col span={12} md={4} xs={12} className="text-center lg:text-start">
          <div className="mb-sm">
            {/* <Logo /> */}
            <img src={RAWhiteLogo} alt="" style={{ aspectRatio: 262 / 64 }} />
          </div>
          <div>
            <p className="text-base font-medium">
              Learn, Grow, Succeed: RemoteAxle&apos;s Pathway to Achievement
            </p>
          </div>
        </Grid.Col>
        <Grid.Col span={12} md={3} xs={12} className="text-center lg:text-start">
          <div className="font-bold text-lg pb-xs">Popular Courses</div>
          <div className="mt-sm">
            {popularCourseList?.map((course: any, index: number) => (
              <div className="nav-item pb-xs mb-sm" key={index}>
                <Link
                  to="/contact"
                  className="no-underline text-md text-normal font-medium text-white"
                  // You should add a unique key for each mapped element
                >
                  {course?.courseTitle}
                </Link>
              </div>
            ))}
            {/* <div className="nav-item pb-xs mb-sm">
              <Link to="/contact" className="no-underline text-normal font-medium">
                UI/UX Design
              </Link>
            </div>
            <div className="nav-item pb-xs  mb-sm">
              <Link to="/faq" className="no-underline text-normal font-medium">
                Solution
              </Link>
              <Button variant="outline" radius="xl" size="xs" className="ml-xs border-white">
                <p className=" text-white text-sm">New</p>
              </Button>
            </div>
            <div className="nav-item pb-xs mb-sm ">
              <Link to="/blogs-screen" className="no-underline text-white text-normal font-medium">
                Tutorials
              </Link>
            </div>
            <div className="nav-item pb-xs mb-sm">
              {' '}
              <Link to="/blogs-screen" className="no-underline text-white text-normal font-medium">
                Pricing
              </Link>
            </div>
            <div className="nav-item pb-xs mb-sm">
              {' '}
              <Link to="/blogs-screen" className="no-underline text-white text-normal font-medium">
                Releases
              </Link>
            </div> */}
          </div>
        </Grid.Col>
        <Grid.Col span={12} md={3} xs={12} className="text-center lg:text-start">
          <div className="font-bold text-lg pb-xs">Popular Category</div>
          <div className="mt-sm">
            {list?.map((data: Category, index: number) => (
              <div key={index} className="nav-item pb-xs mb-sm">
                {data?.title}
              </div>
            ))}
          </div>
        </Grid.Col>
        <Grid.Col span={12} md={2} xs={12} className="text-center lg:text-start">
          <div className="font-bold text-lg pb-xs">Company</div>
          <div className="mt-sm">
            {/* {' '}
            {Company.map((data: any, index: number) => (
              <div key={index} className="nav-item pb-xs mb-[12px]">
                {data}
              </div>
            ))} */}
            {/* <div className="nav-item pb-xs">About Us</div>
            <div className="nav-item pb-xs mt-sm">Careers</div>
            <div className="nav-item pb-xs mt-sm">Press</div>
            <div className="nav-item pb-xs mt-sm">News</div>
            <div className="nav-item pb-xs mt-sm">Become a Instructor</div> */}
            <div className="nav-item pb-xs mt-sm">
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </Grid.Col>
        {/* <Grid.Col md={3} xs={6}>
        <div className="font-bold text-lg pb-xs">Legal</div>
        <div className="nav-item pb-xs">Terms </div>
        <div className="nav-item pb-xs">Privacy</div>
        <div className="nav-item pb-xs">Cookies</div>
        <div className="nav-item pb-xs">Cookies</div>
        <div className="nav-item pb-xs">Licenses</div>
        <div className="nav-item pb-xs">Setting</div>
      </Grid.Col> 
    </Grid>
    <div className="flex w-full justify-center mt-2xl">
      {/* <div className="logo">
        <Logo />
      </div>
      <Space /> */}
      </Grid>
      <div className="flex justify-center mt-2xl">
        <div className="flex gap-lg">
          {' '}
          <img src={Insta_white_icon} className=""></img>
          <img src={LinkIn_white_icon} className=""></img>
          <img src={FB_white_icon} className=""></img>
        </div>
      </div>
      {/*<div>All rights reserved 2022</div>*/}

      <Divider className="my-lg border-gray-600" />
      <div className="text-center font-normal">© 2023 RemoteAxle. All rights reserved.</div>
    </footer>
  );
};
