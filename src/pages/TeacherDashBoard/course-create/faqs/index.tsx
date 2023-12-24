/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, Button, Card, Divider, Drawer, Grid, Group, Image, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MouseEvent } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createCourseMessage } from '../../../../store/modules/sections/action';

import TextEditorComponent from '../input-field/TextEditorComponent';
import { useParams, useNavigate } from 'react-router-dom';
import { INITIAL_FAQ, Ifaq } from '../../../../utils/interfaces/Course.model';
import FAQ from './FAQ';
import { Plus } from '../../../../utils/assets/image';
import { APICreateFaq } from '../../../../api/faq';
import { errorNotification } from '../../../../utils/helpers/notifications';
import AddItems from '../Publishing-Info/Additems';

import {
  faMicrophoneLines,
  faFile,
  faLayerGroup,
  faDesktop,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../../../../components/common/Logo';
import { TeacherProfile } from '../../../../components/modules/course/Coursedetails/TeacherProfile';
import Tags from '../../../coursedetails/Tags';
import moment from 'moment';
import LearningObjective from '../../../coursedetails/LearningObjective';
import Requirements from '../../../coursedetails/Requirements';
import { useDisclosure } from '@mantine/hooks';
import FrequentlyAskedQuestions from '../../../faq';

const CourseMessage = (props: any) => {
  const { nextStep, prevStep, setActive } = props;
  const [formErrors, setFormErrors] = useState<any>({});

  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const courseCreateData = useSelector(
    (state: any) => state.courseReducer.courseCreateData.courseFaqs,
  );

  // const { welcomeMessage, congratulationMessage } = courseCreateData;
  const [faqData, setFaq] = useState<Ifaq[]>([]);
  const [data, setData] = useState<Ifaq[]>([]);
  const { courseId } = useParams();

  const form = useForm({
    initialValues: {
      faq: courseCreateData?.length ? [...courseCreateData] : [INITIAL_FAQ],
    },
    // validate: {
    //   faq: {
    //     question: (value: any) => value.length === 0 && 'question cannot be empty',
    //     answer: (value: any) => value.length === 0 && 'answer  cannot be empty',
    //   },
    // },
  });

  const { values } = form;
  const updatedFaqs = values.faq.map((faq: Ifaq) => ({
    ...faq,
    course: courseId,
  }));

  // const addNewSection = () => {
  //   const faq = values.faq || [];

  //   form.insertListItem('faq', {
  //     ...INITIAL_FAQ,
  //     index: faq.length,
  //   });
  //   setFaq(values.faq);
  // };

  // const deleteEducation = (e: MouseEvent<HTMLButtonElement>, index: number) => {
  //   e.stopPropagation();
  //   form.removeListItem('faq', index);
  // };

  return (
    <>
      <Grid p={0} gutter={0}>
        <Grid.Col>
          <div className="py-lg px-sm mb-md bg-white rounded-lg">
            <div className="text-xl font-semibold leading-5 ">Frequently Asked Questions</div>
            {/* <Accordion
              variant="separated"
              chevron={<img src={Plus} />}
              styles={{
                chevron: {
                  '&[data-rotate]': {
                    transform: 'rotate(45deg)',
                  },
                },
              }}
            >
              {faqData?.map((value: Ifaq, index: number) => (
                <Accordion.Item
                  value="customization"
                  className="bg-Grayscale-200 shadow-md"
                  key={index}
                >
                  <Accordion.Control className="text-lg !font-extrabold">
                    <span className="font-extrabold">
                      {value?.question ?? 'Is there a free trial available?'}
                    </span>
                  </Accordion.Control>
                  <Accordion.Panel className="font-normal text-base">
                    <span className="font-normal text-base">
                      {value.answer ??
                        ' Colors, fonts, shadows and many other parts are customizable to fit your'}
                    </span>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion> */}
            <div className="mt-lg">
              {/* <Text className="text-xl text-secondary-dark font-semibold">FAQ Question</Text> */}

              <AddItems
                setData={setData}
                prevStep={prevStep}
                nextStep={nextStep}
                setActive={setActive}
              />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CourseMessage;
