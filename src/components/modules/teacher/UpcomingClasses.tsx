/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Badge, Divider, Text } from '@mantine/core';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { Clock } from '../../../utils/assets/image';
import { useEffect, useState } from 'react';
import { APIGetUpcomingClasses } from '../../../api/dashboard';

export const UpcomingClasses = () => {
  const [classes, setClasses] = useState([] as any);

  useEffect(() => {
    loadUpcomingClasses();
  }, []);
  const loadUpcomingClasses = async () => {
    const res = await APIGetUpcomingClasses();
    setClasses(res.data);
  };

  return (
    <div className="">
      <Text className="font-bold text-primary-700 text-lg"> Reminder</Text>
      <Divider />
      <div className="mt-sm ">
        {classes?.length > 0 ? (
          classes?.map((v: any, key: number) => (
            <div className="flex items-center mb-sm" key={key}>
              <img onError={errorImageHandler} src={Clock} className="w-[20px] mr-[10px]" />
              <div>
                <Text className="text-md">{v?.batchName}</Text>
                <Text className="text-sm font-bold">
                  {v?.startTime} - {v?.endTime}
                </Text>
                {v?.course?.courseTitle && (
                  <Badge className={'text-md'}>{v?.course?.courseTitle}</Badge>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-xl">No upcoming classes for today</div>
        )}
      </div>
    </div>
  );
};
