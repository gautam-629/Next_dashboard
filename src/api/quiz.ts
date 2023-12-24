import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../plugins/https';
export const APICreateQuiz = (quiz: any) => {
  return PostRequest(`quiz/create-single-quiz`, quiz);
};
