import { AxiosResponse } from 'axios';
import { DeleteRequest, GetRequest, PostRequest, PutRequest } from '../plugins/https';

export const APIGetBlogs = () => {
  return GetRequest('blog/');
};

export const APIGetMyBlogs = () => {
  return GetRequest('blog/me');
};
export const APIGetMyBlogsByType = (type: string) => {
  return GetRequest('blog/me/' + type);
};

export const APIGetBlogDetails = (id: string) => {
  return GetRequest('blog/' + id);
};

export const APIGetFeaturedBlogs = () => {
  return GetRequest('blog/featured');
};

export const APIPostBlog = (blog: any) => {
  return PostRequest(`blog`, blog);
};

export const APIUpdateBlog = (id: string, blog: any) => {
  return PutRequest(`blog/${id}`, blog);
};

export const APIGetBlogById = (id: string) => {
  return GetRequest(`blog/${id}`);
};

export const APIGetLatestBlog = () => {
  return GetRequest(`blog/latest`);
};
export const APIGetBlogBySlug = (id: string) => {
  return GetRequest(`blog/slug/${id}`);
};

export const APIDeleteBlog = (id: string) => {
  return DeleteRequest(`blog/${id}`);
};
export const APIToggleLike = (id: string) => {
  return GetRequest(`blog-like/blog/${id}`);
};

export const APIToggleSave = (id: string) => {
  return GetRequest(`saved-blog/blog/${id}`);
};

export const APIAddComment = (data: any) => {
  return PostRequest(`blog-comment`, data);
};

export const APIDeleteComment = (id: string) => {
  return DeleteRequest(`blog-comment/user/` + id);
};

export const APICommentsByBlog = (id: any) => {
  return GetRequest(`blog-comment/blog/` + id);
};

export const APIGetAllBlogs = () => {
  return GetRequest(`blog`);
};