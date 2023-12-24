/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Email, LiveMessage, OfficeLocation, Phone } from '../../utils/assets/image';
import { errorImageHandler } from '../../utils/assets/imageurl';

const ContactInfo = () => {
  return (
    <div className="flex">
      <div className="pr-xl">
        <div>
          <img onError={errorImageHandler} src={Email} className="" />
          <h2 className="font-semibold mt-md">Email</h2>
          <p className="mt-[8px] mb-[16px]">Our friendly team is here to help.</p>
          <p className="font-semibold  text-primary-700">hi@untitledui.com</p>
        </div>
        <div className="pt-2xl">
          <img onError={errorImageHandler} src={OfficeLocation} />
          <h2 className="font-semibold mt-md">Office</h2>
          <p className="mt-[8px] mb-[16px]">Come say hello at our office HQ.</p>
          <p className="font-semibold text-primary-700">Kumaripati,lalitpur</p>
        </div>
      </div>
      <div>
        <div>
          <img onError={errorImageHandler} src={LiveMessage} />
          <h2 className="font-semibold mt-md">Live Chat</h2>
          <p className="mt-[8px] mb-[16px]">Our friendly team is here to help.</p>
          <p className="font-semibold text-primary-700">start a new chat</p>
        </div>
        <div className="pt-2xl ">
          <img onError={errorImageHandler} src={Phone} />
          <h2 className="font-semibold mt-md">Phone</h2>
          <p className="mt-[8px] mb-[16px]">Mon-Fri from 8am to 5pm.</p>
          <p className="font-semibold text-primary-700">+1 (555) 000-0000</p>{' '}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
