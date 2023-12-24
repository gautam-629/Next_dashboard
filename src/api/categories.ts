import { AxiosResponse } from 'axios';
import { GetRequest } from '../plugins/https';
import { Category } from '../utils/interfaces/Category.model';
import { ICourse } from '../utils/interfaces/Course.model';

export const APIGetCategories = () => {
  return GetRequest('categories/all');
};

export const APIGetFeaturedCategories = (): Promise<AxiosResponse<Category>> => {
  return GetRequest('course-group/featured-course-group');
};

export const APIGetCoursesByCategory = (categoryId: string): Promise<AxiosResponse<ICourse>> => {
  return GetRequest(`course-group/course-by-group/${categoryId}`);
};

export const APIGetAllChildNodes = () => {
  return GetRequest('course-group/get-child-group');
};

export const APIGetAllChildParentNodes = () => {
  return GetRequest('course-group/get-heirarichal-group');
};
