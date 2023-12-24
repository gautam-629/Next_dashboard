import { string } from 'yup';

export type TestimonialType = {
  description: string;
  users: UserType;
  isFeatured: boolean;

  // tutor information here if needed
};

export type UserType = {
  firstName: string;
  lastName: string;
  img: string;
  currentPosition: string;
  avatar: string;
};
