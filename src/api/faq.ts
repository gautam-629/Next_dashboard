import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APICreateFaq = (data: any) => {
  return PostRequest('course-faqs', data);
};

export const APIDeleteFaq = (id: string) => {
  return DeleteRequest(`course-faqs/${id}`);
};
