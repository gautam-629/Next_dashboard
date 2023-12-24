import React from 'react';
import { Cover2 } from '../../../utils/assets/image';
import { TestomonialObjecttype } from '../../../utils/interfaces/type';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { TestimonialType } from '../../../utils/interfaces/Testimonials';

const TestomonialCard = (data: TestimonialType) => {
  const defaultDescription = ' lorem ';
  const description = data?.description || defaultDescription;
  return (
    <div>
      <div className="flex w-full">
        <div className="p-sm flex justify-center items-center gap-md bg-white rounded-md">
          <div className="">
            <p className="text-base font-normal text-secondary-default two-line-fixed-height mt-xs tracking-wider leading-8">
              {description}
            </p>
            <div className="couse-tutor flex gap-xs items-center justify-start mt-sm md:mt-sm">
              <div className="">
                <img
                  onError={errorImageHandler}
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                  className="w-[35px] h-[35px] rounded-full"
                />
              </div>
              <div className="">
                <p className="text-md font-semibold text-secondary-dark tracking-wider">
                  {data?.users?.firstName + ' ' + (data?.users?.lastName ?? '')}
                </p>
                <p className="text-sm font-normal text-secondary-default tracking-wider">
                  {data?.users?.currentPosition ?? 'Developer'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestomonialCard;
