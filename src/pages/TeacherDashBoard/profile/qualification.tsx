/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Timeline, Card, ActionIcon } from '@mantine/core';
import { useSelector } from 'react-redux';

import { formatDate } from '../../../utils/helpers/date.helper';

export const Qualification = () => {
  const Qualification = useSelector((state: any) => state.authReducer.userProfile.education);

  return (
    <Card className="h-full" radius="md">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-bold  text-secondary-dark m-[0px]">Academic Qualification</p>
        </div>
        {/* <div>
          <button className="bg-buttonColor-500 rounded-lg text-white border-none font-semibold text-sm   px-md py-xs">
            Add Qualification
          </button>
        </div> */}
      </div>
      {Qualification?.length > 0 ? (
        <div className="qualification-timeline-card">
          <Timeline active={2} className="mt-md ">
            {Qualification.map((item: any, index: number) => {
              return (
                <Timeline.Item className="" key={index}>
                  <div className="flex">
                    <div className="flex-grow">
                      <div className="font-bold text-secondary-700">
                        {item.level}, {item.university}
                      </div>
                      <div className="font-normal text-lg text-secondary-dark">
                        {formatDate(item?.passedYear)}
                      </div>
                    </div>
                    {/* <div className=" flex">
                      <ActionIcon>
                        <Pencil />
                      </ActionIcon>
                      <ActionIcon>
                        <Trash />
                      </ActionIcon>
                    </div> */}
                  </div>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[100px]">
          No Qualifications added yet
        </div>
      )}
    </Card>
  );
};
