// import { CategoryMockUpData } from '../../../utils/mock/mockData';

import { DataAnalyst } from '../../../utils/assets/image';
import { errorImageHandler } from '../../../utils/assets/imageurl';
interface CategoryProps {
  title?: string;
  duration?: string;
  yearlyIncome?: string;
  growthPercentage?: number;
  imageUrl: string;
  jobOpening?: number;
  description?: string;
}
const CategoryDescription = (props: CategoryProps) => {
  return (
    <div>
      <p className="text-2xl font-semibold text-secondary-default tracking-wider">
        {props?.title ?? ' Why Data Analyst ?'}
      </p>
      <div className="flex flex-col lg:flex-row gap-md mt-lg items-center">
        <div className=" w-full lg:w-4/12">
          <img
            src={props?.imageUrl ?? DataAnalyst}
            alt=""
            className="w-full object-cover"
            style={{ aspectRatio: '134 / 50' }}
            onError={errorImageHandler}
          />
        </div>
        <div className="font-medium tracking-wider text-sm  leading-6 text-secondary-default">
          {props.description}
          <p className="text-base font-bold mt-xs tracking-wider leading-7">
            {props?.duration ?? '3 months To Complete'}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-sm justify-between items-center mt-md lg:mt-lg lg:mb-3xl lg:mx-sm">
        <div className="text-center">
          <p className="text-2xl font-semibold text-secondary-dark leading-9 tracking-wider">
            $ {props?.yearlyIncome ?? '$35000'}
          </p>
          <p className="text-lg font-normal leading-9 text-secondary-default tracking-wider">
            Yearly Income
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-secondary-dark leading-9 tracking-wider">
            {props?.growthPercentage ?? '27.6'} %
          </p>
          <p className="text-lg font-normal leading-9 text-secondary-default tracking-wider">
            Projected 10 yrs Growth
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-secondary-dark leading-9 tracking-wider">
            &gt; {props?.jobOpening ?? '170000'}
          </p>
          <p className="text-lg font-normal leading-9 text-secondary-default tracking-wider">
            Job Openings
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryDescription;
