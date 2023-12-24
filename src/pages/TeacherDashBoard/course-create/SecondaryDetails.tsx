/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { FcDocument } from 'react-icons/fc';
import { FiLayers, FiMonitor } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { Mic, Layer, Book, Monitor, Smile, FileIcon } from '../../../utils/assets/image';

const SecondaryDetails = () => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const lessonCount = courseCreateData.sections.length;
  return (
    <div className="hidden sm:block text-left text-primary-700 mr-sm box-border p-sm pt-[0px] ">
      <ul className="text-sm list-none">
        <li>
          <h3
            className="mb-[20px] text-base text-secondary-dark font-medium 
            tracking-[0.25px]"
          >
            Secondary Details
          </h3>
        </li>
        {/* <li
          className="flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px]"
        >
          <img src={Mic} className="mr-[10px]"/>

          <div>English</div>
        </li> */}
        <li
          className=" flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px] "
        >
          <img src={Layer} className="mr-[10px]" />
          For {courseCreateData.targetedAudiences}
        </li>
        {/* <li
          className=" flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px]"
        >

          <img src={FileIcon} className="mr-[10px]"/>
          Documents and Video available for support
        </li>
        <li
          className=" flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px]"
        >

          <img src={Monitor} className="mr-[10px]"/>
          Assessments for certification
        </li> */}
        <li
          className=" flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px]"
        >
          <img src={Book} className="mr-[10px]" />
          Total {lessonCount} lessons
        </li>
        {/* <li
          className=" flex items-center mb-md text-sm text-Grayscale-600 font-medium 
            tracking-[0.25px]"
        >

          <img src={Smile} className="mr-[10px]"/>
          15 fully certified team members
        </li> */}
      </ul>
    </div>
  );
};

export default SecondaryDetails;
