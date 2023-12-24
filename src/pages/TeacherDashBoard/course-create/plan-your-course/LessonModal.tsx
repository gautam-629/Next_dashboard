import React from 'react';
import { useMantineTheme } from '@mantine/core';

import VideoSection from './VideoSection';
import AssignmentCreate from '../../assignments/AssignmentCreate';
import AssessmentSection from './AssessmentSection';
import Resource from './Resource';

interface TypeProps {
  type: string;
  SectionIndex: number;
  LessonIndex: number;
  UnitIndex: number;
  form: any;
  sectionName: string;
}

const LessonModal = (props: TypeProps) => {
  const { SectionIndex, LessonIndex, UnitIndex, form, type } = props;
  const theme = useMantineTheme();

  const setAssignment = (data: any) => {
    // Section
    if (props.sectionName === 'section') {
      const sectionAssignments = form?.values?.topics[SectionIndex]?.assignment;
      form.setFieldValue(`topics.${SectionIndex}.assignment`, [...sectionAssignments, data]);
      const sectionQuiz = form?.values?.topics[SectionIndex]?.quiz;
      form.setFieldValue(`topics.${SectionIndex}.quiz`, [...sectionQuiz, data]);
      console.log('@Assignment submission for section', form.values);
    }

    // Lesson
    if (props.sectionName === 'lesson') {
      const sectionAssignments =
        form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.assignment;
      form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.assignment`, [
        ...sectionAssignments,
        data,
      ]);
      const sectionQuiz = form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.quiz;
      form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.assignment`, [
        ...sectionQuiz,
        data,
      ]);
    }

    // Unit
    if (props.sectionName === 'unit') {
      const sectionAssignments =
        form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.assignment;
      form.setFieldValue(
        `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.assignment`,
        [...sectionAssignments, data],
      );
    }

    const sectionQuiz =
      form?.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.quiz;
    form.setFieldValue(`topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.quiz`, [
      ...sectionQuiz,
      data,
    ]);

    console.log('After set assignment');
  };
  console.log(form.values, 'values');
  let modalContent = null;

  switch (type) {
    case 'Resource':
      modalContent = <Resource {...props} />;
      break;
    case 'Video':
      modalContent = <VideoSection {...props} />;
      break;
    case 'Assessment':
      modalContent = <AssessmentSection {...props} setAssignment={setAssignment} />;
      break;
    case 'Assignment':
      modalContent = <AssignmentCreate {...props} setAssignment={setAssignment} />;
      break;
    default:
      break;
  }

  return <>{modalContent}</>;
};

export default LessonModal;
