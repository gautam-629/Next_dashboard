/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Avatar, Badge, Box, Button, Card, Grid, RingProgress, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import { IconArrowNarrowRight, IconClockHour4, IconMessageShare } from '@tabler/icons-react';
import { IconFileMusic } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  setActiveTopicDetails,
  setClassroomActiveTopic,
  setWildCardDetails,
} from '../../store/modules/classroom/actions';

export const ClassroomBatchDetails = (props: any) => {
  const batch = useSelector((state: any) => state.classRoomReducer.batch);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const activeTopicDetails = useSelector((state: any) => state.classRoomReducer.activeTopicDetails);
  const dispatch: any = useDispatch();
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);
  const completedTopics = useSelector((state: any) => state.classRoomReducer.completedTopics);
  const [totalHour, setTotalHour] = useState<any>(0);
  const [mainTopic, setMainTopic] = useState<any>({});
  const [creditHour, setCreditHour] = useState<any>({});

  const syllabus = useSelector((state: any) => state.classRoomReducer.syllabus);

  const [grandparent, setGrandParent] = useState<any>();
  const [parent, setParent] = useState<any>();
  const [child, setChild] = useState<any>();

  useEffect(() => {
    const parent = null;
    const middle = null;
    const Child = null;

    function findObjectAndParents(rootArray: any, targetId: any) {
      function parentsearch(currentArray: any, path: any) {
        for (const current of currentArray) {
          // Create a new path array that includes the current object
          const currentPath = [...path, current];

          if (current._id === targetId) {
            return {
              object: current,
              parent: path[path.length - 1], // Parent is the last object in the path
              grandparent: path[path.length - 2], // Grandparent is the second-to-last object in the path
            };
          }

          if (current.topics && current.topics.length > 0) {
            const result: any = parentsearch(current.topics, currentPath);
            if (result) {
              return result;
            }
          }
        }

        return null;
      }

      return parentsearch(rootArray, []);
    }

    const targetIdToFind = activeTopicDetails._id;
    const result = findObjectAndParents(syllabus, targetIdToFind);

    if (result) {
      console.log('Found Object:', result?.object);
      console.log('Parent Object:', result?.parent);
      console.log('Grandparent Object:', result?.grandparent);

      setGrandParent(result?.grandparent);
      setParent(result?.parent);
      setChild(result?.object);

      console.log('Data set');
    } else {
      console.log('Object not found.');
    }
    console.log('@activeTopicDetail', activeTopicDetails);
  }, [activeTopicDetails]);

  const { showStats } = props;

  function sumTotalCreditHours(rootArray: any) {
    let totalCreditHours = 0;

    function search(currentArray: any) {
      for (const current of currentArray) {
        // Found the target root object, now calculate the creditHours within it
        totalCreditHours += current.creditHours;

        // Child
        if (current.topics && current.topics.length > 0) {
          search(current.topics);
        }
      }
    }

    search(rootArray);
    return totalCreditHours;
  }

  useEffect(() => {
    let hours = 0;
    let syllabushour = 0;

    const isTopicCompleted = (topicId: string) => {
      return completedTopics.includes(topicId);
    };

    function search(currentArray: any) {
      for (const current of currentArray) {
        const complete = isTopicCompleted(current._id);
        console.log('Complete Check', complete);
        if (!complete) {
          console.log('Not Completed latest Topic is ', current);
          dispatch(setClassroomActiveTopic(current._id));
          // dispatch(setActiveTopicDetails(current));
          setMainTopic(current);
          return;
        }
        if (complete) {
          hours += current?.creditHours;
        }
        if (current.topics && current.topics.length > 0) {
          search(current.topics);
        }
      }
      setCreditHour(hours);
    }
    search(syllabus);

    // function calcTotalHour() {
    //   for (const current of syllabus) {
    //     syllabushour += current.creditHours;
    //     if (current.topics && current.topics.length > 0) {
    //       search(current.topics);
    //     }
    //   }
    // }

    // calcTotalHour();
  }, [syllabus]);

  // function sumAssignments(rootArray: any, targetId: any) {
  function sumAssignments(rootArray: any) {
    let totalAssignments = 0;

    function assignmentSearch(currentArray: any) {
      for (const current of currentArray) {
        // Found the target root object, now calculate the creditHours within it
        totalAssignments += current.assignment.length;

        // Child
        if (current.topics && current.topics.length > 0) {
          assignmentSearch(current.topics);
        }
      }
    }

    assignmentSearch(rootArray);
    return totalAssignments;
  }

  function sumSubmittedAssignments(rootArray: any) {
    let totalCompletedAssignments = 0;
    console.log('@syllabus', syllabus);
    function submittedAssignmentSearch(currentArray: any) {
      // for (const current of currentArray.assignment) {
      // if (current._id == targetId) {
      // Found the target root object, now calculate the creditHours within it
      for (const item of currentArray?.assignment) {
        if (item?.submitted) {
          totalCompletedAssignments++;
        }
      }
    }

    submittedAssignmentSearch(rootArray);
    return totalCompletedAssignments;
  }

  return (
    <>
      {showStats && !isClassroomRunning && (
        <Card mb={'xs'} className={'bg-light-gray'}>
          {/* Classroom Details Numbers*/}

          <div className="text-xl font-semibold leading-9 tracking-wider text-secondary-dark">
            {batch?.batchName ?? ''}
          </div>

          <div>
            <div className="flex justify-between mt-md">
              {/* Individual Detail*/}
              <div className="flex items-center bg-white rounded-lg p-sm">
                <Box className="bg-gray-100 flex items-center p-xs rounded-full mr-xs">
                  <IconMessageShare size={24} color="blue" />
                </Box>
                <div>
                  <Text className="text-md text-secondary-default tracking-wider">
                    Total Assignments
                  </Text>
                  <Text className="font-medium leading-7 tracking-wider">
                    {sumAssignments(syllabus)}
                    {/* {activeTopicDetails?.assignment?.length} */}
                  </Text>
                </div>
              </div>

              {/* Individual Detail*/}
              <div className="flex items-center bg-white rounded-lg p-sm">
                <Box className="bg-gray-100 flex items-center p-xs rounded-full mr-xs">
                  <IconMessageShare size={24} color="red" />
                </Box>
                <div>
                  <Text className="text-md text-secondary-default tracking-wider">
                    Assignments Completed
                  </Text>
                  <Text className="font-medium leading-7 tracking-wider">
                    {/* {sumSubmittedAssignments(activeTopicDetails.assignment)} */}
                  </Text>
                </div>
              </div>

              {/* Individual Detail*/}
              <div className="flex items-center bg-white rounded-lg p-sm">
                <Box className="bg-gray-100 flex items-center p-xs rounded-full mr-xs">
                  <IconMessageShare size={24} color="blue" />
                </Box>

                <div>
                  <Text className="text-md text-secondary-default tracking-wider">Spent Hours</Text>
                  <Text className="font-medium leading-7 tracking-wider">
                    {/* {sumCreditHours(syllabus, v?._id)} h */}
                    20 h
                  </Text>
                </div>
              </div>

              {/* Individual Detail*/}
              <div className="flex items-center bg-white rounded-lg p-sm">
                <Box className="bg-gray-100 flex items-center p-xs rounded-full mr-xs">
                  <IconMessageShare size={24} color="red" />
                </Box>
                <div className="">
                  <Text className="text-md text-secondary-default tracking-wider">Attendance</Text>
                  <Text className="font-medium leading-7 tracking-wider">49 / 50</Text>
                </div>
              </div>
            </div>

            {/* Classroom Details */}
            <Grid className="mt-lg">
              <Grid.Col md={6}>
                <Text className="text-lg text-secondary-dark font-semibold leading-7 tracking-wider">
                  Active Section
                </Text>
                <Box className=" bg-white rounded-lg">
                  <Box className="flex items-center py-sm pr-sm mt-sm rounded-lg ">
                    <RingProgress
                      roundCaps
                      sections={[
                        {
                          value: (creditHour * 100) / sumTotalCreditHours(syllabus),
                          // value: 20,
                          color: 'cyan',
                        },
                      ]}
                      size={130}
                      label={
                        <>
                          <Text weight={600} align="center" className="text-Grayscale-700">
                            {((creditHour * 100) / sumTotalCreditHours(syllabus)).toFixed(0)} %
                          </Text>
                          <Text weight={600} align="center" className="text-Grayscale-600">
                            Done
                          </Text>
                        </>
                      }
                    />
                    <Box className="flex-1">
                      <Text className="text-md leading-5 font-medium tracking-wider text-secondary-dark">
                        {mainTopic?.title}
                      </Text>

                      <Box className="flex items-center justify-between flex-1 mt-sm">
                        <Box>
                          <Text className="text-sm text-secondary-default tracking-wider flex items-center">
                            <IconFileMusic size={18} className="text-primary-1000 mr-xs" />
                            {mainTopic?.resources?.length}
                            {/* {sumResources(syllabus, activeTopicDetails?._id)} */}
                            &nbsp;Resources
                          </Text>
                          <Text className="text-sm text-secondary-default tracking-wider flex items-center mt-xs">
                            <IconFileMusic size={18} className="text-primary-1000 mr-xs" />
                            {mainTopic?.assignment?.length}
                            {/* {sumAssignments(syllabus, activeTopicDetails?._id)} */}
                            &nbsp;Assignments
                          </Text>
                        </Box>
                        <Box>
                          <Text className="text-sm text-secondary-default tracking-wider flex items-center">
                            <IconFileMusic size={18} className="text-primary-1000 mr-xs" />
                            Description
                          </Text>
                          <Text className="text-sm text-secondary-default tracking-wider flex items-center mt-xs">
                            <IconFileMusic size={18} className="text-primary-1000 mr-xs" />
                            {/* {sumCreditHours(syllabus, activeTopicDetails?._id)} */}
                            {mainTopic?.creditHours}
                            &nbsp;Credit Hours
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid.Col>

              {/* Assignments */}
              <Grid.Col md={6} className="pl-sm">
                <Text className=" text-lg text-secondary-dark font-semibold leading-7 tracking-wider">
                  Pending Assignments
                </Text>
                <Box className=" p-sm mt-md bg-white">
                  {activeTopicDetails?.assignment.length > 0 ? (
                    <Box className="mb-sm bg-white p-md">
                      <Text className="text-md leading-5 font-medium tracking-wider text-secondary-dark">
                        {activeTopicDetails?.assignment[0]?.assignmentTitle}
                      </Text>
                      <div className="flex justify-between mt-xs">
                        <Text className="text-sm tracking-wider text-secondary-default flex items-center">
                          <IconClockHour4 size={20} className="mr-xs" />
                          {moment(activeTopicDetails?.assignment[0]?.deadLine).format(
                            'DD MMM, YYYY',
                          )}{' '}
                          - 12:00{' '}
                        </Text>
                        <Text
                          className="text-sm tracking-wider text-primary-1000 flex items-center cursor-pointer	"
                          onClick={() => {
                            dispatch(setWildCardDetails(activeTopicDetails?._id, 'assignments'));
                            props.setShowStats(false);
                          }}
                        >
                          {location.pathname.includes('/teacher/')
                            ? 'Check Submission'
                            : 'Submit now'}
                          <IconArrowNarrowRight size={16} className="ml-xs" />
                        </Text>
                      </div>
                    </Box>
                  ) : (
                    <Text className=" text-md leading-5 font-medium tracking-wider text-secondary-dark">
                      No Pending Assignments
                    </Text>
                  )}

                  {activeTopicDetails?.assignment?.length > 1 ? (
                    <Box className="mb-sm bg-white p-md">
                      <Text className="text-md leading-5 font-medium tracking-wider text-secondary-dark">
                        {activeTopicDetails?.assignment[1]?.assignmentTitle}
                      </Text>
                      <div className="flex justify-between mt-xs">
                        <Text className="text-sm tracking-wider text-secondary-default flex items-center">
                          <IconClockHour4 size={20} className="mr-xs" />
                          12 Sept, 2022 - 12:00{' '}
                        </Text>
                        <Text
                          className="text-sm tracking-wider text-primary-1000 flex items-center cursor-pointer	"
                          onClick={() => {
                            dispatch(setWildCardDetails(activeTopicDetails?._id, 'assignments'));
                            // setShowStats(false);
                          }}
                        >
                          {location.pathname.includes('/teacher/')
                            ? 'Check Submission'
                            : 'Submit now'}
                          <IconArrowNarrowRight size={16} className="ml-xs" />
                        </Text>
                      </div>
                    </Box>
                  ) : (
                    ''
                  )}
                </Box>
              </Grid.Col>
            </Grid>
          </div>
        </Card>
      )}
    </>
  );
};
