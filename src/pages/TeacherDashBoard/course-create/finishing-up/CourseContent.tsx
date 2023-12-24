/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, List, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
const CourseContent = ({ course }: any) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <div className="mt-md course-content-area">
      <Text className="text-lg font-semibold">Course Content</Text>
      {courseCreateData.sections.map((v: any, index: number) => (
        <div key={index}>
          <Accordion radius="xs" chevronPosition="left" defaultValue="customization">
            <Accordion.Item value={v.sectionTitle}>
              <Accordion.Control> {v.sectionTitle}</Accordion.Control>
              <Accordion.Panel>
                {v?.lessons?.map((l: any, index: number) => (
                  <div key={index}>
                    <Accordion
                      defaultValue="false"
                      radius="xs"
                      chevronPosition="left"
                      variant="contained"
                      p={'xs'}
                    >
                      <Accordion.Item value="Learning Numpy">
                        <Accordion.Control>{l.lessonTitle}</Accordion.Control>
                        <Accordion.Panel>{parse(l.lessonDescription)}</Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}

      <div className={'mt-sm'}>
        <Text className="text-xl  font-semibold mt-sm">Requirements</Text>
        <div className="text-gray-500 text-base font-normal">
          <List type={'ordered'}>
            {courseCreateData.requirements.map((requirement: any, index: number) => (
              <List.Item key={index}>{requirement}</List.Item>
            ))}
          </List>
        </div>
      </div>
      <div className={'mt-sm'}>
        <Text className="text-xl font-semibold mt-sm">Who is this course for</Text>
        <div className="text-gray-500 text-base font-normal">
          <List>
            {courseCreateData.targetedAudiences.map((targetedAudience: any, index: number) => (
              <List.Item key={index}>{targetedAudience}</List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
