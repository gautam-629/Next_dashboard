/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CourseContent = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <div className={'mt-md'}>
      <Text className="text-2xl font-bold mb-sm">Course Content</Text>
      <div>
        <p className="text-base font-semibold text-start ">15 Sections</p>
        <p className="text-base font-semibold text-primary-200 text-end">Expand All Sections</p>
      </div>
      {course?.sections?.map((v: any, index: number) => (
        <div key={index} className="">
          <Accordion
            variant="contained"
            chevronPosition="left"
            styles={{
              chevron: {
                width: '3rem',
                height: '3rem',
              },
            }}
          >
            <Accordion.Item value={v?.sectionTitle} className="bg-[#F7F7FC] hover:bg-[#F7F7FC] ">
              <Accordion.Control className="!font-extrabold">
                <span className="font-extrabold">{v?.sectionTitle}</span>{' '}
              </Accordion.Control>
              <Accordion.Panel className="bg-white hover:!bg-white">
                {v?.lessons?.map((l: any, index: number) => (
                  <div key={index} className="bg-white hover:!bg-white">
                    <Accordion chevronPosition="right" defaultValue="customization">
                      <Accordion.Item value={l?.lessonTitle ?? ''} className="border-b-0">
                        <Accordion.Control className="bg-white hover:!bg-white">
                          <span className=""> {l?.lessonTitle ?? ''}</span>
                        </Accordion.Control>
                        <Accordion.Panel className="p-xs">
                          <div
                            dangerouslySetInnerHTML={{ __html: l?.lessonDescription ?? '' }}
                          ></div>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
