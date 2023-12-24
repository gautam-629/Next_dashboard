/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, Badge, Grid } from '@mantine/core';
import moment from 'moment';
import { StudentTaskSubmissionForm } from './StudentTaskSubmissionForm';
import { StudentTaskSubmissionDetails } from './StudentTaskSubmissionDetails';
import { TaskSubmit } from '../student/pages/task/TaskSubmit';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ClassroomAssignmentCreate from './ClassroomCreateAssignment';
import { ClassroomAssignmentSubmit } from './ClassroomAssignmentSubmit';
import { TaskDetailCard } from '../TeacherDashBoard/assignments/TaskDetailCard';
import { useDispatch } from 'react-redux';
import { APIGetSingleBatchCourse } from '../../api/batch';
import { setBatchDetails, setClassroomSyallbus } from '../../store/modules/classroom/actions';
import { APIGetAllTopicsByCourseId } from '../../api/topic';
import { Console, log } from 'console';
import { ClassroomAssignmentAssign } from './ClassroomAssignmentAssign';
import AssessmentSection from '../TeacherDashBoard/course-create/plan-your-course/AssessmentSection';
import Assessments from '../../components/modules/classroom/Assessments';

export const ClassroomAssessments = (props: any) => {
  const dispatch = useDispatch();

  const { data } = props;
  const [SubmitFormOpened, setSubmitFormOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const batch: any = useParams().batch;
  const location = useLocation();
  const [course, setCourse] = useState();
  useEffect(() => {
    loadBatchDetails();
  }, [batch]);
console.log()
  const loadBatchDetails = async () => {
    if (batch) {
      const courseRes = await APIGetSingleBatchCourse(batch);
      // dispatch(setBatchDetails(courseRes.data));
      // const topicRes = await APIGetAllTopicsByCourseId(courseRes.data.course._id);
      // dispatch(setClassroomSyallbus(topicRes.data));
      console.log('@Batch in assignmnts', courseRes.data.course._id);
      setCourse(courseRes.data.course._id);
    }
  };

  return (
    <div>
      {data?.length > 0 && (
        <>
          <Accordion variant="filled">
            {data.map((v: any, key: number) => (
              <Accordion.Item value={v._id} key={key} className={'bg-gray-50 mb-xs rounded-sm'}>
                <Accordion.Control>
                  <Grid>
                    <Grid.Col md={4}>{v.assignmentTitle}</Grid.Col>
                    <Grid.Col md={4}>
                      <div className="text-xs font-bold">Due Date</div>
                      <div className="text-md">{moment(v.deadLine).format('MMM DD, YYYY')}</div>
                    </Grid.Col>
                    <Grid.Col md={4}>
                      <div className="w-full flex justify-end">
                        <Badge color={v.submitted || submitted ? 'green' : 'red'}>
                          <div className="text-sm">
                            {v.submitted || submitted ? 'Submitted' : 'Not Submitted'}
                          </div>
                        </Badge>
                      </div>
                    </Grid.Col>
                  </Grid>
                </Accordion.Control>
                <Accordion.Panel px={'xs'}>
                  {location.pathname.includes('/student/') && <Assessments />}
                  {location.pathname.includes('/teacher/') && <p>Teacher</p>}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          {/* {course == undefined ? '' : <ClassroomAssignmentAssign course={course} />} */}
        </>
      )}
    </div>
  );
};
