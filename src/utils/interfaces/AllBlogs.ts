export interface IBlog {
  _id: string;
  title: string;
  content: string;
  // categories: string[];
  cover: string;
  // tags: string[];
  // isPublished: boolean;
  // status: string;
  // createdBy: string;
  comments: any[];
  likes: any[];
  createdAt: string;
  slug?: any;
  // updatedAt: string;
  // __v: number;
  // id: string;
}
