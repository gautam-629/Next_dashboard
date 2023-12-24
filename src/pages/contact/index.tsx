/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useState } from 'react';
import { AspectRatio } from '@mantine/core';
import GetInTouch from './GetInTouch';
import ContactInfo from './ContactInfo';

export default function Contact() {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <div className="wrapper-x">
        <div className="flex ">
          <div className="mt-[64px]">
            <p className="font-bold">Contact us</p>
            <h1 className="mt-[12px]  font-medium text-[36px] leading-10">
              Chat to our friendly team
            </h1>
            <p className="mt-md text-gray-400 text-lg  font-light">
              We’d love to hear from you. Please fill out this form or shoot us an email.
            </p>
          </div>
        </div>
        <div className="flex justify-between  mt-[65px] mb-[64px]">
          <div className="">{<ContactInfo />} </div>
          <div className=" bg-slate-50 rounded-lg w-[576px] p-[40px]">{<GetInTouch />}</div>
        </div>
        <div className="mb-md">
          <AspectRatio ratio={26 / 9} mx="auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56541.41339132206!2d85.275897!3d27.660473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6abe2de758c1136!2sTechAxis!5e0!3m2!1sen!2snp!4v1672899970728!5m2!1sen!2snp"></iframe>
          </AspectRatio>
        </div>
      </div>
    </>
  );
}
