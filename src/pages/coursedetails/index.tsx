import React, { useEffect, useState } from 'react';
import BreadCrumb from './BreadCrumb';
import CourseDescription from './CourseDescription';
import Tags from './Tags';
import { TeacherProfile } from '../../components/modules/course/Coursedetails/TeacherProfile';
import LearningObjective from './LearningObjective';
import TabsList from './TabsList';
import Requirements from './Requirements';
import Certifications from './Certifications';
import AboutTeacher from './AboutTeacher';
import SideSection from './SideSection';
import { Divider, Grid } from '@mantine/core';
import { APIGetSingleCourseDetails } from '../../api/course';
import { useParams } from 'react-router-dom';
import { CourseType } from '../../utils/interfaces/type';
import { ICourse } from '../../utils/interfaces/Course.model';
import moment from 'moment';
import FAQ from '../faq';
import FrequentlyAskedQuestions from '../faq';
import CourseFor from './CourseFor';
import PlanYourCourse from '../TeacherDashBoard/course-create/plan-your-course';
import { APIGetUserProfile } from '../../api/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMyCourseById } from '../../store/modules/courses/getMyCourseById';
import PreRequisites from './PreRequisites';

const CourseDetails = () => {
  const { course } = useParams<{ course: string }>();
  const [coursedetails, setCourseDetails] = useState<ICourse | undefined>(undefined);
  const [role, setRole] = useState('user');
  const dispatch = useDispatch() as any;
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  console.log(courseCreateData, 'courseCreateData');
  useEffect(() => {
    getSingleCourseDetails();
    if (
      userProfile?.roles?.length > 1 &&
      userProfile?._id &&
      courseCreateData?.teacher?._id &&
      userProfile._id === courseCreateData.teacher._id
    ) {
      console.log('teacher role');
      setRole('teacher');
    } else if (userProfile?.roles?.length === 0) {
      setRole('student');
    }
    // getUserProfile();
    if (course) {
      dispatch(getMyCourseById(course));
    }
  }, []);
  console.log(role, 'setroles');
  // const getUserProfile = async () => {
  //   console.log('getuserdata');
  //   try {
  //     const response = await APIGetUserProfile();
  //     console.log(response, 'response');
  //     setRole(response.data.roles);

  //     // setRole(response.role);
  //   } catch (error) {
  //     setRole(['user']);
  //     console.log(error, 'errors');
  //   }
  // };

  const getSingleCourseDetails = async () => {
    if (course) {
      try {
        const response = await APIGetSingleCourseDetails(course);
        const courseData: ICourse | undefined = response.data;

        setCourseDetails(courseData);
      } catch (error) {
        console.log('');
      }
    }
  };
  console.log(coursedetails, 'details');

  useEffect(() => {
    if (course) {
      dispatch(getMyCourseById(course));
    }
  }, []);

  return (
    <>
      <div className="">
        <div className="wrapper-x mt-lg mb-3xl flex justify-between gap-lg ">
          <Grid className="" mt={'md'}>
            <Grid.Col lg={8} md={8} sm={8} xs={12}>
              <BreadCrumb courseTitle={coursedetails?.courseTitle} />
              <CourseDescription
                courseDescription={coursedetails?.shortDescription}
                courseTitle={coursedetails?.courseTitle}
              />
              <Tags tags={coursedetails?.tags} />
              <TeacherProfile teacher={coursedetails?.teacher} />
              <p className="text-base font-semibold text-primary-1000 my-normal">
                Last Updated:
                {moment(coursedetails?.updatedAt).format('YYYY/MM/DD') ?? ''}
              </p>
              <Divider my="sm" />
              <LearningObjective objective={coursedetails?.learningObjective} />
              <div className="mb-[12px]">
                {' '}
                <p className="text-xl font-semibold">Tools, Language and Frameworks</p>
              </div>
              <div className="mt-[12px] flex flex-start gap-md mb-[40px]">
                {' '}
                {coursedetails?.toolsAndLanguage.map((tool, index) => (
                  <div
                    key={index}
                    className="text-xs bg-secondary-1000 px-sm py-xs font-normal rounded-[4px]"
                  >
                    {tool}
                  </div>
                ))}
              </div>

              <TabsList />

              {/* <CourseOverView /> */}
              <PlanYourCourse role={'user'} />
              {/* <CourseFor /> */}
              <PreRequisites Prerequisites={coursedetails?.prerequisites}></PreRequisites>
              <Requirements requirements={coursedetails?.requirements} />
            </Grid.Col>
            <Grid.Col lg={4} md={4} sm={4} xs={12}>
              <SideSection level={coursedetails?.level} />
            </Grid.Col>
          </Grid>
        </div>

        <div className="wrapper-x">
          <p className="text-2xl font-bold mt-xs mb-md">Cerifications</p> <Certifications />
          {/* <Reviews /> */}
        </div>
        <div className="bg-Grayscale-200 mb-3xl">
          <div className="wrapper-x">
            <AboutTeacher teacher={coursedetails?.teacher} />
          </div>
        </div>
        <div className="wrapper-x">
          <FrequentlyAskedQuestions coursefaq={coursedetails?.courseFaqs} />
        </div>
      </div>
      ;
    </>
  );
};

export default CourseDetails;
