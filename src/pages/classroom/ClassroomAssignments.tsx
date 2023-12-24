/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, Badge, Grid, Text } from '@mantine/core';
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

export const ClassroomAssignments = (props: any) => {
  const dispatch = useDispatch();

  const { data, setReload, reload, setCurrentActive } = props;
  const [SubmitFormOpened, setSubmitFormOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const batch: any = useParams().batch;
  const location = useLocation();
  const [course, setCourse] = useState();
  useEffect(() => {
    loadBatchDetails();
  }, [batch]);

  const loadBatchDetails = async () => {
    if (batch) {
      const courseRes = await APIGetSingleBatchCourse(batch);
      dispatch(setBatchDetails(courseRes.data));
      const topicRes = await APIGetAllTopicsByCourseId(courseRes.data.course._id);
      dispatch(setClassroomSyallbus(topicRes.data));
      console.log('@Batch in assignmnts', courseRes.data.course._id);
      setCourse(courseRes.data.course._id);
      console.log('@Batch data', topicRes);
    }
  };

  return (
    <div className="mt-sm">
      {data?.length > 0 && (
        <>
          <Accordion variant="contained">
            {data.map((v: any, key: number) => (
              <Accordion.Item
                value={v._id}
                key={key}
                className={' mb-md rounded-md'}
                style={{
                  border: '1px solid Gainsboro',
                }}
              >
                <Accordion.Control className="pl-sm">
                  <Grid>
                    <Grid.Col md={5}>
                      <Text className="text-base font-semibold leading-7 text-secondary-dark">
                        {v.assignmentTitle}
                      </Text>
                    </Grid.Col>
                    <Grid.Col md={4}>
                      <div className="text-xs font-bold">Due Date</div>
                      <div className="text-md">{moment(v.deadLine).format('MMM DD, YYYY')}</div>
                    </Grid.Col>
                    <Grid.Col md={3} className="flex items-center">
                      <div className="w-full flex justify-end">
                        <Text
                          className={`text-sm font-semibold ${
                            v.submitted ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {v.submitted ? 'Submitted' : 'Not Submitted'}
                        </Text>
                      </div>
                    </Grid.Col>
                  </Grid>
                </Accordion.Control>
                <Accordion.Panel className="pr-xl">
                  {location.pathname.includes('/student/') &&
                    (v.submitted ? (
                      <StudentTaskSubmissionDetails data={v.submission} assignmentId={v.id} />
                    ) : (
                      <TaskSubmit
                        id={v._id}
                        batch={batch}
                        setSubmitFormOpened={setSubmitFormOpened}
                        // setSubmitted={setSubmitted}
                        // loadBatchDetails={loadBatchDetails}
                        reload={reload}
                        setReload={setReload}
                      />
                    ))}
                  {location.pathname.includes('/teacher/') && (
                    <div className="mt-sm">
                      <ClassroomAssignmentSubmit id={v._id} />
                    </div>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
      {course == undefined
        ? ''
        : location.pathname.includes('/teacher/') && (
            <ClassroomAssignmentAssign
              course={course}
              data={data}
              setReload={setReload}
              reload={reload}
              setCurrentActive={setCurrentActive}
            />
          )}
    </div>
  );
};
