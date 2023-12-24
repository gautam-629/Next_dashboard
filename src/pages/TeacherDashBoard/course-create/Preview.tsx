import React, { useState } from 'react';
import {
  Button,
  Text,
  Title,
  TextInput,
  Textarea,
  Accordion,
  Drawer,
  Divider,
  Image,
  Grid,
  Card,
  Box,
} from '@mantine/core';
import {
  faMicrophoneLines,
  faFile,
  faLayerGroup,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { INITIAL_FAQ, Ifaq } from '../../../utils/interfaces/Course.model';
import { useForm } from '@mantine/form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../../../components/common/Logo';
import { TeacherProfile } from '../../../components/modules/course/Coursedetails/TeacherProfile';
import Tags from '../../coursedetails/Tags';
import moment from 'moment';
import LearningObjective from '../../coursedetails/LearningObjective';
import Requirements from '../../coursedetails/Requirements';
import FrequentlyAskedQuestions from '../../faq';
import PlanYourCourse from './plan-your-course';
import CourseDetails from '../../coursedetails';
import TabsList from '../../coursedetails/TabsList';
import AboutTeacher from '../../coursedetails/AboutTeacher';
import SideSection from '../../coursedetails/SideSection';
import CourseDescription from '../../coursedetails/CourseDescription';
import PreRequisites from '../../coursedetails/PreRequisites';

interface Task {
  question: string;
  answer: string;
}

interface PreviewProps {
  opened: any;
  close: any;
  setActive: any;
}

export default function Preview({ opened, close, setActive }: any) {
  const courseDetails = useSelector((state: any) => state.courseReducer.courseCreateData);
  const userProfile = useSelector((state: any) => state?.authReducer?.userProfile);

  const form = useForm({
    initialValues: {
      faqsList: courseDetails?.courseFaqs?.length ? [...courseDetails.courseFaqs] : [INITIAL_FAQ],
      question: '',
      answer: '',
    },
  });

  return (
    <Drawer.Root opened={opened} onClose={close} position="bottom" size="100%" className="">
      <Drawer.Content>
        <Drawer.Header className=" wrapper-x flex justify-between items-center backdrop-blur-xl bg-white/90">
          <div className="logo ">
            <Logo />
          </div>
          <Drawer.Title className="flex justify-center items-center ml-sm">
            <p className="text-center text-xl mt-[5px] font-semibold"> Course Preview</p>
          </Drawer.Title>
          <Box className="flex justify-end items-center">
            <Button
              className="mr-xl"
              onClick={() => {
                setActive(5);
                close();
              }}
            >
              Finish
            </Button>

            <Drawer.CloseButton>
              <Button className="" variant="outline">
                Close
              </Button>
            </Drawer.CloseButton>
          </Box>
        </Drawer.Header>
        <Drawer.Body className="p-none m-none relative">
          <div className="wrapper-x mt-lg mb-3xl flex justify-between gap-lg ">
            <Grid className="">
              <Grid.Col lg={9} md={8} sm={8} xs={12}>
                {/* <div>
                  {courseDetails?.courseTitle ? (
                    <p className="text-5xl font-semibold mb-sm">{courseDetails?.courseTitle}</p>
                  ) : (
                    ''
                  )}
                  {courseDetails?.shortDescription ? <p>{courseDetails?.shortDescription}</p> : ''}
                </div> */}
                <div className="mb-md">
                  <CourseDescription
                    courseDescription={courseDetails?.shortDescription}
                    courseTitle={courseDetails?.courseTitle}
                  />
                </div>

                {courseDetails.tags.length > 1 ? <Tags tags={courseDetails?.tags} /> : ''}

                {/* <TeacherProfile teacher={courseDetails?.teacher} /> */}

                {courseDetails?.teacher ? (
                  <Box className="mt-lg">
                    <TeacherProfile teacher={courseDetails?.teacher} />
                  </Box>
                ) : (
                  <Box className="mt-lg">
                    <TeacherProfile teacher={userProfile} />
                  </Box>
                )}

                <p className="text-base font-semibold text-primary-1000 my-normal">
                  Last Updated:
                  {moment(courseDetails?.updatedAt).format('YYYY/MM/DD') ?? ''}
                </p>
                <Divider my="sm" />
                {courseDetails.learningObjective.length > 1 ? (
                  <LearningObjective objective={courseDetails.learningObjective} />
                ) : (
                  ''
                )}
                {courseDetails.toolsAndLanguage.length > 0 ? (
                  <div>
                    <p className="text-2xl font-bold my-md">Course OverView</p>
                    <p className="text-xl font-semibold">Tools, Language and Frameworks</p>
                    <div className="mt-[12px] flex flex-start gap-md">
                      {courseDetails?.toolsAndLanguage.map((value: string, index: number) => (
                        <div
                          className="text-xs bg-secondary-1000 px-sm py-xs font-normal"
                          key={index}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <TabsList />

                {courseDetails.topics.length > 1 ? (
                  <Box className="mt-md">
                    <PlanYourCourse role="user" />
                  </Box>
                ) : null}
                {/* {courseDetails.requirements.length > 1 ? (
                  <Requirements requirements={courseDetails?.requirements} />
                ) : null} */}
                {courseDetails.requirements.length > 0 ? (
                  <PreRequisites Prerequisites={courseDetails?.prerequisites}></PreRequisites>
                ) : null}
                {courseDetails.requirements.length > 0 ? (
                  <Requirements requirements={courseDetails?.requirements} />
                ) : null}

                {courseDetails.teacher ? (
                  <AboutTeacher teacher={courseDetails?.teacher} />
                ) : (
                  <AboutTeacher teacher={userProfile} />
                )}
                {courseDetails.courseFaqs.length > 0 ? (
                  // <FrequentlyAskedQuestions faqsList={form.values.faqsList} />
                  <FrequentlyAskedQuestions coursefaq={courseDetails?.courseFaqs} />
                ) : null}
              </Grid.Col>
              <Grid.Col lg={3} md={4} sm={4} xs={12}>
                {/* <div className="sticky top-[86px]">
                  <Card padding="lg" radius="md" withBorder>
                    {courseDetails.courseImageUrl !== '' ? (
                      <Card.Section>
                        <Image
                          src={courseDetails.courseImageUrl}
                          alt="Norway"
                          style={{ aspectRatio: 384 / 232 }}
                        />
                      </Card.Section>
                    ) : (
                      ''
                    )}

                    <div>
                      <div className="flex flex-start gap-xs items-center mt-sm mb-normal">
                        <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
                        <Text weight={500}>English</Text>
                      </div>
                      <div className="flex flex-start gap-xs items-center mb-normal">
                        <FontAwesomeIcon icon={faFile} style={{ color: '#0F83FE' }} />
                        <Text weight={500}>Documents and Video available for support</Text>
                      </div>
                      <div className="flex flex-start gap-xs items-center mb-normal">
                        <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#0F83FE' }} />
                        <Text weight={500}>For Intermediate Level</Text>
                      </div>
                      <div className="flex flex-start gap-xs items-center mb-normal">
                        <FontAwesomeIcon icon={faDesktop} style={{ color: '#0F83FE' }} />
                        <Text weight={500}>2 Assessments for certification</Text>
                      </div>
                      <div className="flex flex-start gap-xs items-center mb-normal">
                        <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
                        <Text weight={500}>Total 8 lessons</Text>
                      </div>
                      <Divider />
                    </div>
                    <div className="my-sm">
                      <p className="text-base font-semibold">Rs 1,00,000 - Rs 2,00,000</p>
                      <p className="text-xs font-normal mt-xs">
                        Note: Price may vary according to the schedule{' '}
                      </p>
                    </div>
                    <Button className="mt-sm mb-md bg-primary-1000" size="lg" fullWidth>
                      Apply Now
                    </Button>
                  </Card>
                </div> */}
                <SideSection level={courseDetails?.level} />
              </Grid.Col>
            </Grid>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>

    // <Drawer.Root opened={opened} onClose={close} position="bottom" size="100%">
    //   <Drawer.Content>
    //     <Drawer.Header className=" wrapper-x flex justify-between backdrop-blur-xl bg-white/90">
    //       <div className="logo ">
    //         <Logo />
    //       </div>
    //       <Drawer.Title className="flex justify-center items-center ml-sm">
    //         <p className="text-center text-xl mt-[5px] font-semibold"> Course Preview Updated</p>
    //       </Drawer.Title>
    //       <Drawer.CloseButton />
    //     </Drawer.Header>
    //     <Drawer.Body className="p-none m-none">
    //       <CourseDetails />
    //     </Drawer.Body>
    //   </Drawer.Content>
    // </Drawer.Root>
  );
}
