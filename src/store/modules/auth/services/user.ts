/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { APICreateStudent, APICreateTeacher } from '../../../../api/users';
import { saveUserIdAfterLogin } from '../../../../utils/helpers/auth';
import { errorNotification } from '../../../../utils/helpers/notifications';

interface ICreateStudent {
  firstName: string;
  lastName: string;
  email: string;
  // phoneNumber: string;
  password: string;
}

export const createStudent = async (data: ICreateStudent) => {
  const res: any = await APICreateStudent(data);
  res?.data?.userProfile?._id && saveUserIdAfterLogin(res.data.userProfile._id);
};
export const createTeacher = async (data: ICreateStudent) => {
  const res: any = await APICreateTeacher(data);
  res?.data?.userProfile?._id && saveUserIdAfterLogin(res.data.userProfile._id);
};
