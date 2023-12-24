import { GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APIGetAllProfessionalTutors = () => {
  return GetRequest(`users/tutors`);
};
