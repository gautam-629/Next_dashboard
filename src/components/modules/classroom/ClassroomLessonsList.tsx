/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Paper, Card, Button } from '@mantine/core';
import {
  setClassroomActiveTopic,
  setWildCardDetails,
} from '../../../store/modules/classroom/actions';
import { AccordionVariant } from '@mantine/core/lib/Accordion/Accordion.types';

export const ClassroomLessonsList = () => {
  const dispatch: any = useDispatch();
  const syllabus = useSelector((state: any) => state.classRoomReducer.syllabus);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const [openItems, setOpenItems] = useState<string[]>([activeTopic as string]);
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);

  useEffect(() => {
    dispatch(setClassroomActiveTopic(openItems[0]));
  }, [openItems]);

  useEffect(() => {
    if (syllabus.length > 0) {
      dispatch(setClassroomActiveTopic(syllabus[0]._id));
    }
  }, [syllabus]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(itemId)) {
        return prevOpenItems.filter((item) => item !== itemId);
      } else {
        return [...prevOpenItems, itemId];
      }
    });
  };

  const getAccordion = (syllabusItems: any, type = 'contained') => {
    return (
      syllabusItems?.length > 0 && (
        <Accordion
          variant={type as AccordionVariant}
          multiple
          value={openItems}
          onChange={(value) => setOpenItems(value)}
        >
          {syllabusItems.map((v: any, index: number) => (
            <Accordion.Item
              key={index}
              value={v?._id?.toString()}
              className={`pointer ${
                activeTopic === v?._id ? 'lesson-accordion-item bg-primary-700 text-white' : ''
              }`}
            >
              <div className="flex items-center pt-xs justify-between">
                <div className={'pl-sm'}>
                  <div
                    className="font-extrabold pointer py-xs px-sm hover:bg-gray-200 rounded-sm hover:text-primary-700"
                    onClick={() => dispatch(setWildCardDetails(v._id, 'description'))}
                  >
                    {v?.title}
                  </div>
                  <div className="flex items-center mt-xs flex-wrap px-sm">
                    <Button
                      variant={`${[v._id, v.parent].includes(activeTopic) ? 'white' : 'outline'}`}
                      compact
                      size="xs"
                      mr={'xs'}
                      mb={'xs'}
                      onClick={() => dispatch(setWildCardDetails(v?._id, 'description'))}
                    >
                      <div style={{ fontSize: '.7rem' }}>Description</div>
                    </Button>
                    <Button
                      variant={`${[v._id, v.parent].includes(activeTopic) ? 'white' : 'outline'}`}
                      compact
                      size="xs"
                      mr={'xs'}
                      mb={'xs'}
                      onClick={() => dispatch(setWildCardDetails(v?._id, 'resources'))}
                    >
                      <div style={{ fontSize: '.7rem' }}>Resources</div>
                    </Button>
                    <Button
                      variant={`${[v._id, v.parent].includes(activeTopic) ? 'white' : 'outline'}`}
                      compact
                      size="xs"
                      mr={'xs'}
                      mb={'xs'}
                      onClick={() => dispatch(setWildCardDetails(v?._id, 'assignments'))}
                    >
                      <div style={{ fontSize: '.7rem' }}>Assignments</div>
                    </Button>
                    <Button
                      variant={`${[v._id, v.parent].includes(activeTopic) ? 'white' : 'outline'}`}
                      compact
                      size="xs"
                      mr={'xs'}
                      mb={'xs'}
                      onClick={() => dispatch(setWildCardDetails(v?._id, 'assessment'))}
                    >
                      <div style={{ fontSize: '.7rem' }}>Assessment</div>
                    </Button>
                  </div>
                </div>
                <Accordion.Control className="font-extrabold lessons-list-accordion" />
              </div>
              <Accordion.Panel className="">
                {v?.topics?.length > 0 ? getAccordion(v.topics) : ''}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )
    );
  };

  return (
    <Card
      className="w-full classroom-lessons-list sticky top-sm h-full bg-light-gray"
      p={0}
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <div className={'font-bold p-sm'}>Course Content</div>
      {getAccordion(syllabus, 'filled')}
    </Card>
  );
};
