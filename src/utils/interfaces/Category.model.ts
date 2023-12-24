export type Category = {
  _id: string;
  title: string;
  description: string;
  duration: number;
  imageUrl: string;
  isFeatured: boolean;
  parentId: string;
  updatedAt: string;
  jobOpening?: number;
  yearlyIncome?: string;
  growthPercentage?: number;
};
