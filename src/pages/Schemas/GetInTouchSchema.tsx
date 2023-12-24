/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import * as Yup from 'yup';

const GetInTouchSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().required('Email is a required field').email('Invalid email format'),
  username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  subject: Yup.string().min(3, 'Too Short!'),
  message: Yup.string().min(3, 'Too Short!'),
});

export default GetInTouchSchema;
