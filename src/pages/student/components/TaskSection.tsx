/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FileSvg } from '../../../utils/assets/image';

const TaskSection = () => {
  return (
    <>
      {' '}
      <div className="item w-full bg-white rounded-lg p-[20px] flex justify-between items-center mt-md col-span-3">
        <div className="item-left flex gap-[10px]">
          <div className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px]">
            <img src={FileSvg} alt="" className="h-[24px] " />
          </div>
          <div className="flex flex-col justify-center ">
            <div className=" text-base font-semibold  tracking-wider">The Design Principle</div>
            <div className=" text-xs text-gray-600">Data Structure and Principle</div>
          </div>
        </div>
        <div className="item-center">
          <div className=" font-normal text-xs text-gray-600  mb-[12px]">Due Date</div>
          <div className=" font-normal tracking-wider  mb-[4px]">12 September, 2022 - 15:00</div>
          <div className=" text-[10px] tracking-widest text-red-500">Overdue by 50 minutes</div>
        </div>
        <div className="item-right flex justify-between items-center gap-xl">
          <div>
            <div className="c-tag text-xs rounded-full font-medium bg-pink-200 text-red-500 px-sm py-[3px] inline-block">
              Presentation
            </div>
          </div>
          <Link to="/student/tasks/123" className="no-underline">
            <div className="border-solid border-gray-300 px-sm py-xs rounded-lg  text-sm tracking-widest text-purple-500 ">
              Submit Task
            </div>
          </Link>
        </div>
      </div>
      <div className="item w-full bg-white rounded-lg p-[20px] flex justify-between items-center mt-md col-span-3">
        <div className="item-left flex gap-[10px]">
          <div className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px]">
            <img src={FileSvg} alt="" className="h-[24px] " />
          </div>
          <div className="flex flex-col justify-center ">
            <div className=" text-base font-semibold  tracking-wider">The Design Principle</div>
            <div className=" text-xs text-gray-600">Data Structure and Principle</div>
          </div>
        </div>
        <div className="item-center">
          <div className=" font-normal text-xs text-gray-600  mb-[12px]">Due Date</div>
          <div className=" font-normal tracking-wider  mb-[4px]">12 September, 2022 - 15:00</div>
          {/* <div className=" text-[10px] tracking-widest text-red-500">Overdue by 50 minutes</div> */}
        </div>
        <div className="item-right flex justify-between items-center gap-xl">
          <div>
            <div className="c-tag text-xs rounded-full font-medium bg-pink-200 text-red-500 px-sm py-[3px] inline-block">
              Presentation
            </div>
          </div>
          <Link to="/student/tasks/123" className="no-underline">
            <div className="border-solid border-gray-300 px-sm py-xs rounded-lg  text-sm tracking-widest text-purple-500 ">
              Submit Task
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TaskSection;
