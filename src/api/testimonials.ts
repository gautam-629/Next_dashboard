import { GetRequest, PostRequest, PutRequest } from '../plugins/https';
export const APIGetAllTestimonials = () => {
  return GetRequest(`testimonials`);
};
