/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Paper, Card, Button, Text, Box, Checkbox, Badge, Grid } from '@mantine/core';
import {
  setClassroomActiveTopic,
  setClassroomStatus,
  setDrawer,
  setWildCardDetails,
} from '../../../store/modules/classroom/actions';

export const LessonsList = (props: any) => {
  const { showStats, setShowStats, setVideoSize, videoSize } = props;

  const dispatch: any = useDispatch();
  const syllabus = useSelector((state: any) => state.classRoomReducer.syllabus);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const completedTopics = useSelector((state: any) => state.classRoomReducer.completedTopics);
  const [openItems, setOpenItems] = useState<string[]>([activeTopic as string]);
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);

  // useEffect(() => {
  //   dispatch(setClassroomActiveTopic(openItems[0]));
  // }, [openItems]);

  // useEffect(() => {
  //   if (syllabus.length > 0) {
  //     dispatch(setClassroomActiveTopic(syllabus[0]._id));
  //   }
  // }, [syllabus]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(itemId)) {
        return prevOpenItems.filter((item) => item !== itemId);
      } else {
        return [...prevOpenItems, itemId];
      }
    });
  };

  const isTopicCompleted = (topicId: string) => {
    return completedTopics.includes(topicId);
  };

  // To get indeterminate
  const isEverySubTopicCovered = (id: string, topics: any) => {
    let val = false;
    if (!topics || topics?.length == 0) {
      val = false;
    }

    val = !!topics?.some((t: any) => completedTopics.includes(t._id));

    if (topics?.length > 0 && topics?.every((t: any) => completedTopics.includes(t._id))) {
      val = false;
    }

    return val;
  };

  const getAccordion = (syllabusItems: any, type = 'contained') => {
    return (
      syllabusItems?.length > 0 && (
        <Accordion variant="contained" className="" defaultValue={activeTopic.toString()}>
          {syllabusItems?.map((v: any, index: number) =>
            v?.topics?.length > 0 ? (
              <Accordion.Item
                key={index}
                value={v?._id?.toString()}
                className={`pointer ${
                  activeTopic === v?._id ? 'lesson-accordion-item  text-white' : ''
                } ${isTopicCompleted(v?._id) ? 'bg-gray-200/50 text-gray-700' : ''}`}
              >
                <Box className="flex pl-sm ">
                  <Box className=" mt-sm">
                    {/* <Checkbox color="cyan" radius={'lg'} /> */}
                    <Checkbox
                      checked={isTopicCompleted(v?._id)}
                      indeterminate={isEverySubTopicCovered(v?._id, v?.topics)}
                      mt={'sm'}
                      mr={'xs'}
                      radius={'lg'}
                    />
                  </Box>

                  <Box className="grow">
                    <Accordion.Control>
                      <Box>
                        {/* <div className="flex-grow flex items-center"> */}
                        {/* <Checkbox
                            checked={isTopicCompleted(v?._id)}
                            indeterminate={isEverySubTopicCovered(v?._id, v?.topics)}
                            mt={'sm'}
                            mr={'xs'}
                            radius={'lg'}
                          /> */}
                        {/* <div> */}
                        {/* <Grid.Col lg={9}> */}
                        <Text className=" tracking-wider mr-xl mt-xs">
                          {v?.title}
                          <div className="text-xs text-primary-1000 font-semibold">
                            {v?.creditHours} credit hour
                          </div>
                        </Text>
                        {/* </Grid.Col> */}
                        {/* <Grid.Col lg={3}> */}
                        {/* {
                            v._id == activeTopic
                              ? !isClassroomRunning && (
                                  <Button
                                    radius={'md'}
                                    size="xs"
                                    className="bg-primary-1000  mt-xs"
                                    onClick={() => {
                                      dispatch(setClassroomStatus(true));
                                      // dispatch(setClassroomWildcardComponent('default'));
                                      dispatch(setWildCardDetails(activeTopic, 'description'));
                                    }}
                                  >
                                    Join
                                  </Button>
                                )
                              : ''
                            // <div className="ml-xs font-semibold bg-green-300/75 px-xs py-xxs text-sm rounded-full text-buttonColor-500 absolute right-xl">
                            //   {v?.creditHours} h
                            // </div>
                          } */}
                        {/* </Grid.Col> */}

                        {/* <Text className=" tracking-wider">{v?.title}</Text>
                            <div className="flex">
                              <Badge color={isTopicCompleted(v?._id) ? 'dark' : 'cyan'}>
                                <Text className="text-xs  tracking-wider ">
                                  {v?.creditHours} Credit Hours
                                </Text>
                              </Badge>
                            </div> */}
                        {/* </div>
                        </div> */}
                      </Box>
                    </Accordion.Control>
                    <Box className="flex flex-wrap items-center px-sm ">
                      <Text
                        className={`text-sm font-semibold flex items-center cursor-pointer text-primary-1000 mr-md mb-xs ${
                          isTopicCompleted(v?._id) ? 'text-gray-700' : 'text-primary-1000'
                        }`}
                        onClick={() => {
                          dispatch(setWildCardDetails(v?._id, 'assignments'));
                          setShowStats(false);
                          dispatch(setDrawer(false));
                          videoSize == 'fullscreen' && setVideoSize('small');
                        }}
                      >
                        Assignment {/* {v?.assignment?.length > 0 && ( */}
                        <div
                          className={`ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500 ${
                            isTopicCompleted(v?._id)
                              ? 'bg-gray-400 text-white'
                              : 'text-buttonColor-500 bg-primary-1000/25'
                          }`}
                        >
                          {v?.assignment?.length || '0'}
                        </div>
                        {/* )} */}
                      </Text>
                      <Text
                        className={`text-sm font-semibold   text-primary-1000 cursor-pointer mr-md mb-xs ${
                          isTopicCompleted(v?._id) ? 'text-gray-700' : 'text-primary-1000'
                        }`}
                        onClick={() => {
                          dispatch(setWildCardDetails(v?._id, 'description'));
                          setShowStats(false);
                          dispatch(setDrawer(false));
                          videoSize == 'fullscreen' && setVideoSize('small');
                        }}
                      >
                        Description
                      </Text>
                      {/* <Text
                        className={`ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500 ${
                          isTopicCompleted(v?._id) ? 'text-gray-700' : 'text-primary-1000'
                        }`}
                        onClick={() => {
                          dispatch(setWildCardDetails(v?._id, 'resources'));
                          setShowStats(false);
                          dispatch(setDrawer(false));
                          setVideoSize('small');
                        }}
                      >
                        Resources
                        <div
                          className={`ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500 ${
                            isTopicCompleted(v?._id) ? 'bg-gray-400 text-white' : 'text-white'
                          }`}
                        >
                          {v?.resources?.length || '0'}
                        </div>
                      </Text> */}
                      <Text
                        className={`text-sm font-semibold flex items-center cursor-pointer text-primary-1000 mr-md  mb-xs ${
                          isTopicCompleted(v?._id) ? 'text-gray-700' : 'text-primary-1000'
                        }`}
                        onClick={() => {
                          dispatch(setWildCardDetails(v?._id, 'assignments'));
                          setShowStats(false);
                          dispatch(setDrawer(false));
                          videoSize == 'fullscreen' && setVideoSize('small');
                        }}
                      >
                        Resources {/* {v?.assignment?.length > 0 && ( */}
                        <div
                          className={`ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500 ${
                            isTopicCompleted(v?._id)
                              ? 'bg-gray-400 text-white'
                              : 'text-buttonColor-500 bg-primary-1000/25'
                          }`}
                        >
                          {v?.resources?.length || '0'}
                        </div>
                        {/* )} */}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Accordion.Panel>
                  <Accordion variant="contained">{getAccordion(v.topics)}</Accordion>
                </Accordion.Panel>
              </Accordion.Item>
            ) : (
              <Card
                className={`${
                  isTopicCompleted(v?._id) ? 'bg-gray-100 text-gray-700' : 'bg-transparent'
                } px-none pl-sm rounded-md   `}
                withBorder
                mt={'xs'}
              >
                <Box className={'flex items-center '}>
                  <Checkbox
                    radius={'lg'}
                    checked={isTopicCompleted(v?._id)}
                    mt={'sm'}
                    className="mr-md"
                  />
                  <div className="flex-grow">
                    <Text className=" tracking-wider">{v?.title}</Text>
                    {/* <Badge color={isTopicCompleted(v?._id) ? 'dark' : 'cyan'}>
                    <Text className="text-xs  tracking-wider ">
                        {v?.creditHours} Credit Hours
                      </Text>
                    </Badge> */}
                    <div className="text-xs text-primary-1000 font-semibold">
                      {v?.creditHours} credit hour
                    </div>
                  </div>
                </Box>
                <Box className="flex flex-wrap items-center pl-sm  ml-md mt-xs">
                  <Text
                    className={`text-sm font-semibold flex  items-center cursor-pointer text-primary-1000 mr-md mb-xs`}
                    onClick={() => {
                      dispatch(setWildCardDetails(v?._id, 'assignments'));
                      setShowStats(false);
                      dispatch(setDrawer(false));
                      setVideoSize('small');
                    }}
                  >
                    Assignment{' '}
                    <div className="ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500">
                      {v?.assignment?.length || '0'}
                    </div>
                  </Text>
                  <Text
                    className={
                      'text-sm font-semibold  mr-md text-primary-1000 cursor-pointer mb-xs'
                    }
                    onClick={() => {
                      dispatch(setWildCardDetails(v?._id, 'description'));
                      setShowStats(false);
                      dispatch(setDrawer(false));
                      setVideoSize('small');
                    }}
                  >
                    Description
                  </Text>
                  <Text
                    className={
                      'text-sm font-semibold  flex items-center  text-primary-1000 cursor-pointer mb-xs'
                    }
                    onClick={() => {
                      dispatch(setWildCardDetails(v?._id, 'resources'));
                      setShowStats(false);
                      dispatch(setDrawer(false));
                      setVideoSize('small');
                    }}
                  >
                    Resources
                    <div className="ml-xs bg-primary-1000/25 px-xs text-sm rounded-full text-buttonColor-500">
                      {v?.resources?.length || '0'}
                    </div>
                  </Text>
                </Box>
              </Card>
            ),
          )}
        </Accordion>
      )
    );
  };

  return (
    <Card
      className="w-full classroom-lessons-list sticky top-sm h-screen overflow-y-auto bg-light-gray"
      p={0}
      // style={{ height: 'calc(100vh - 100px)' }}
    >
      <div className={'font-semibold p-sm text-lg tracking-wider'}>Course Content</div>
      <div className="px-sm">{getAccordion(syllabus, 'filled')}</div>
    </Card>
  );
};
