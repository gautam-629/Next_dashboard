import { BASE_URL } from '../config/baseURL';
import { GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APIGitsi = (data: any) => {
  return PutRequest(`${BASE_URL}/users/add-jitsi-info`, data);
};
export const GetAPIGitsi = () => {
  return GetRequest(`${BASE_URL}/class-room/get-key-id`);
};
