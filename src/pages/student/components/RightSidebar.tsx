/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Clock, FordwardArrow, RightArrow, SmallCalender } from '../../../utils/assets/image';

const RightSidebar = () => {
  return (
    <div className="right w-full max-w-full lg:max-w-[394px]  bg-gray-200 rounded-tl-md py-[40px] py-xs lg:px-[40px]">
      <div className="h-full w-full  grid grid-cols-2 gap-[20px] lg:gap-[40px]">
        {/* schedule div start */}
        <div className="top-card p-[16px] bg-white rounded-md col-span-2 ">
          <div className=" font-medium  tracking-wider">Todays Schedule</div>
          <div className="schedule gap-md flex flex-col mt-sm">
            {/* schedule time  */}
            <div className="item border-solid border-0 border-l-[3px] border-indigo-600  flex justify-between  pl-xs">
              <div className="schedule-left">
                <div className=" font-medium text-sm tracking-wide  text-current">
                  Data Structure and Algorithm
                </div>
                <div className="flex items-center gap-xs">
                  <img src={Clock} alt="" className="" />
                  <span className=" text-xs font-normal tracking-wide  text-gray-600">
                    8:00 pm - 10:00 am{' '}
                  </span>
                </div>
              </div>
              <div className="schedule-right">
                <img src={RightArrow} alt="" />{' '}
              </div>
            </div>
            {/* schedule time  */}
            <div className="item border-solid border-0 border-l-[3px] border-indigo-600  flex justify-between  pl-xs">
              <div className="schedule-left">
                <div className=" font-medium text-sm tracking-wide  text-current">
                  Data Structure and Algorithm
                </div>
                <div className="flex items-center gap-xs">
                  <img src={Clock} alt="" className="" />
                  <span className=" text-xs font-normal tracking-wide  text-gray-600">
                    8:00 pm - 10:00 am{' '}
                  </span>
                </div>
              </div>
              <div className="schedule-right">
                <img src={RightArrow} alt="" />{' '}
              </div>
            </div>
            {/* schedule time  */}
            <div className="item border-solid border-0 border-l-[3px] border-indigo-600  flex justify-between  pl-xs">
              <div className="schedule-left">
                <div className=" font-medium text-sm tracking-wide  text-current">
                  Data Structure and Algorithm
                </div>
                <div className="flex items-center gap-xs">
                  <img src={Clock} alt="" className="" />
                  <span className=" text-xs font-normal tracking-wide  text-gray-600">
                    8:00 pm - 10:00 am{' '}
                  </span>
                </div>
              </div>
              <div className="schedule-right">
                <img src={RightArrow} alt="" />{' '}
              </div>
            </div>
            {/* end schedule time */}
          </div>
        </div>
        {/* schedule div end */}

        {/* upcoming deadline */}
        <div className="top-card p-[16px] bg-white rounded-md col-span-1 lg:col-span-2">
          <div className=" font-medium  tracking-wider">Upcoming Deadline</div>
          <div className="deadline gap-md flex flex-col mt-sm">
            {/* schedule time  */}
            <div className="item ">
              <div className=" font-medium text-sm tracking-wide  text-current mb-sm">
                Data Structure and Algorithm
              </div>
              <div className="flex items-center gap-xs mb-xs">
                <img src={Clock} alt="" className="" />
                <span className=" text-xs font-normal tracking-wide  text-gray-600">
                  8:00 pm - 10:00 am
                </span>
              </div>
              <div className=" font-normal text-primary-700 text-[10px]">
                15hrs left for Submission
              </div>
              <div className="flex justify-between mt-sm">
                <div className="c-tag text-[10px] rounded-full font-medium red-pill px-sm py-[3px] inline-block">
                  Not Submitted
                </div>
                <div className="flex items-center gap-xs">
                  <span className=" text-xs  tracking-wide text-primary-700">Submit Now</span>
                  <img src={FordwardArrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of upcomming deadline */}
        {/* upcoming deadline */}
        <div className="top-card p-[16px] bg-white rounded-md  col-span-1 lg:col-span-2">
          <div className=" font-medium  tracking-wider">Upcoming Assessment</div>
          <div className="deadline gap-md flex flex-col mt-sm">
            {/* schedule time  */}
            <div className="item ">
              <div className=" font-medium text-sm tracking-wide  text-current mb-sm">
                The Engineering Process
              </div>
              <div className="flex items-center gap-xs mb-xs">
                <img src={SmallCalender} alt="" className=" h-[18px] w-[18px]" />
                <div className="">
                  <div className=" text-[10px] font-normal tracking-wide  text-gray-600 ">
                    Friday, 12 Sept 2022
                  </div>
                  <div className="text-sm">8:00 pm - 10:00 am</div>
                </div>
              </div>
              <div className="flex items-center gap-xs mb-xs">
                <img src={Clock} alt="" className=" h-[18px] w-[18px]" />
                <div className="">
                  <div className=" text-[10px] font-normal tracking-wide  text-gray-600 ">
                    Duration
                  </div>
                  <div className="text-sm">2 Hours</div>
                </div>
              </div>
              <div className=" font-normal text-primary-700 text-[10px] mt-sm">
                15hrs left for Submission
              </div>
              <div className="flex justify-between mt-sm">
                <div className="c-tag text-[10px] rounded-full font-medium red-pill px-sm py-[3px] inline-block">
                  Not Submitted
                </div>
                <div className="flex items-center gap-xs">
                  <span className=" text-xs  tracking-wide text-primary-700">Submit Now</span>
                  <img src={FordwardArrow} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of upcomming deadline */}
      </div>
    </div>
  );
};

export default RightSidebar;
