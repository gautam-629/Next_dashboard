/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Timeline, Card, ActionIcon, Button } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Experience = () => {
  const experience = useSelector((state: any) => state.authReducer.userProfile.experience);
  const [showMore, setShowMore] = useState(-1);
  return (
    <Card className={'h-full min-h-[200px]'}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold  text-secondary-dark m-[0px]  ">Experience</p>
        </div>
        <div>
          <Button className="">Add Experience</Button>
        </div>
      </div>
      <div className="qualification-timeline-card">
        <Timeline active={2} className="mt-md ">
          {experience.map((item: any, index: number) => {
            return (
              <Timeline.Item className="" key={index}>
                <div className="rounded-[10px]">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex-grow font-bold mb-none text-secondary-default">
                        {item.organization}, {item.period}
                      </div>
                      <div className="font-normal text-base text-secondary-700">
                        {item.designation}
                      </div>
                    </div>
                    <div className=" flex">
                      <ActionIcon>
                        <IconPencil />
                      </ActionIcon>
                      <ActionIcon>
                        <IconTrash />
                      </ActionIcon>
                    </div>
                  </div>
                  <div className="">
                    <p
                      className={`${
                        showMore === index ? '' : 'two-line'
                      } font-normal text-base mt-[10px] mb-none text-secondary-default`}
                    >
                      {item.description}
                    </p>
                    {showMore !== index ? (
                      <Button
                        onClick={() => setShowMore(index)}
                        size={'xs'}
                        variant={'light'}
                        mt={'xs'}
                      >
                        Show more
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setShowMore(-1)}
                        size={'xs'}
                        variant={'subtle'}
                        mt={'xs'}
                      >
                        Show less
                      </Button>
                    )}
                  </div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </Card>
  );
};

export default Experience;
