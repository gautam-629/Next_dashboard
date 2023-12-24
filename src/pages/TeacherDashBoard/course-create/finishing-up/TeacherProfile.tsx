/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider, Space, Text } from '@mantine/core';
import { useSelector } from 'react-redux';
import Avatar from '../../../../assets/Avatar.png';
export const TeacherProfile = ({ course }: any) => {
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);

  const firstName = userProfile?.firstName ?? '';
  const lastName = userProfile?.firstNamelastName ?? '';
  const fullName = firstName.concat(' ', lastName);
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  return (
    <div className="">
      <Divider my="sm" />
      <div className="flex w-full">
        <img src={Avatar} width="40px" height="40px" />
        <div className="flex flex-col mx-sm">
          <span className="  ">{fullName ?? 'Olivia Rhye'}</span>
          <span className="">{course?.teacher?.teacherProfession ?? 'TBD'}</span>
        </div>
      </div>

      <div className="flex justify-between mt-md">
        <Text size={'xl'} weight={'bold'}>
          {courseCreateData.currency} {courseCreateData.coursePrice}
        </Text>
      </div>
    </div>
  );
};
