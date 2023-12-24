/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  // name:string,
  // phone:string,
  email: string;
  password: string;
  role: string;
}

export interface IUserEmail {
  email: string;
}

export interface IUpdatePassword {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}
