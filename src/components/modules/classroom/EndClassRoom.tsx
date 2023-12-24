/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Paper, Card, Button, Text, Box, Checkbox, Badge } from '@mantine/core';
import {
  setBatchDetails,
  setClassroomActiveTopic,
  setClassroomStatus,
  setClassroomSyallbus,
  setClassroomWildcardComponent,
  setWildCardDetails,
  showEndClassRoomDialog,
} from '../../../store/modules/classroom/actions';
import { AccordionVariant } from '@mantine/core/lib/Accordion/Accordion.types';
import { AccordionPanel } from '@mantine/core/lib/Accordion/AccordionPanel/AccordionPanel';
import { useForm } from '@mantine/form';
import { APIGetSingleBatchCourse, APIUpdateCompletedCourses } from '../../../api/batch';
import { useParams } from 'react-router-dom';
import { APIGetAllTopicsByCourseId } from '../../../api/topic';

export const EndClassRoom = (props: any) => {
  const dispatch: any = useDispatch();
  const syllabus = useSelector((state: any) => state.classRoomReducer.syllabus);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const [openItems, setOpenItems] = useState<string[]>([activeTopic as string]);
  const batch: any = useParams().batch;
  const completedTopics = useSelector((state: any) => state.classRoomReducer.completedTopics);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(setClassroomActiveTopic(openItems[0]));
  }, [openItems]);

  useEffect(() => {
    if (syllabus.length > 0) {
      dispatch(setClassroomActiveTopic(syllabus[0]._id));
    }
  }, [syllabus]);

  useEffect(() => {
    form.setFieldValue('completedTopics', completedTopics);
  }, [completedTopics]);

  const form = useForm({
    initialValues: {
      completedTopics: [] as any,
    },
  });

  const isTopicCompleted = (topicId: string) => {
    return completedTopics.includes(topicId);
  };

  const everyChildIsChecked = (topics: any) => {
    const flattenedTopics: any = [];

    function flattenRecursive(topic: any) {
      if (!topic.topics || topic.topics.length === 0) {
        return;
      }

      for (const subTopic of topic.topics) {
        flattenRecursive(subTopic);
        flattenedTopics.push(subTopic._id);
      }
    }

    for (const rootTopic of [topics]) {
      flattenRecursive(rootTopic);
      flattenedTopics.push(rootTopic._id);
    }

    return flattenedTopics.every((topic: any) => completedTopics.includes(topic));
  };

  const getAccordion = (syllabusItems: any, type = 'contained') => {
    return (
      syllabusItems?.length > 0 && (
        <Checkbox.Group withAsterisk {...form.getInputProps('completedTopics')}>
          <Accordion variant="contained">
            {syllabusItems
              .filter((v: any) => !everyChildIsChecked(v))
              .map((v: any, index: number) =>
                v?.topics?.length > 0 ? (
                  <Accordion.Item
                    key={index}
                    value={v?._id?.toString()}
                    className={`pointer ${
                      activeTopic === v?._id ? 'lesson-accordion-item  text-white' : ''
                    }`}
                  >
                    <div className={'flex'}>
                      <div className={'pl-xs mt-md'}>
                        <Checkbox radius="xl" value={v?._id} />
                      </div>
                      <Accordion.Control>
                        <div className={'flex'}>
                          <div>
                            <Text className=" tracking-wider">{v?.title}</Text>
                            {/* <Badge color={isTopicCompleted(v?._id) ? 'dark' : 'cyan'}> */}
                            <Text className="text-xs  tracking-wider text-primary-1000 ">
                              {v?.creditHours} Credit Hours
                            </Text>
                            {/* </Badge> */}
                          </div>
                        </div>
                      </Accordion.Control>
                    </div>
                    <Accordion.Panel>
                      <Accordion variant="contained">{getAccordion(v.topics)}</Accordion>
                    </Accordion.Panel>
                  </Accordion.Item>
                ) : (
                  <Card
                    className={`${
                      isTopicCompleted(v?._id) ? 'bg-gray-100 text-gray-700' : 'bg-transparent'
                    } pl-sm rounded-md `}
                    withBorder
                  >
                    <Box className={'flex justify-between items-center '}>
                      <Checkbox radius="xl" value={v?._id} />
                      <div className="flex-grow ml-sm">
                        <Text className=" tracking-wider">{v?.title}</Text>
                        <Text className="text-xs  tracking-wider text-primary-1000">
                          {v?.creditHours} Credit Hours
                        </Text>
                      </div>
                    </Box>
                  </Card>
                ),
              )}
          </Accordion>
        </Checkbox.Group>
      )
    );
  };

  const submitForm = async () => {
    setLoading(true);
    const res = await APIUpdateCompletedCourses(batch, {
      completedTopics: form.values.completedTopics,
    });
    if (batch) {
      const courseRes = await APIGetSingleBatchCourse(batch);
      dispatch(setBatchDetails(courseRes.data));
      const topicRes = await APIGetAllTopicsByCourseId(courseRes.data.course._id);
      dispatch(setClassroomSyallbus(topicRes.data));
    }
    dispatch(showEndClassRoomDialog(false));
    dispatch(setClassroomStatus(false));

    // dispatch(setClassroomWildcardComponent('default'));
    setLoading(false);
  };

  return (
    <Card className="w-full classroom-lessons-list sticky top-sm h-full bg-light-gray" p={0}>
      <form onSubmit={form.onSubmit(submitForm)}>
        <div className={'font-semibold p-sm text-lg tracking-wider'}>Course Content</div>
        <div className="px-sm">{getAccordion(syllabus, 'filled')}</div>

        <div className={'flex justify-end mt-md'}>
          <Button variant={'light'} onClick={() => dispatch(showEndClassRoomDialog(false))}>
            Cancel
          </Button>
          <Button type={'submit'} loading={loading}>
            Confirm
          </Button>
        </div>
      </form>
    </Card>
  );
};
