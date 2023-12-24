/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Input, Button } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { successNotification } from '../../../utils/helpers/notifications';

export const NewsLetter = () => {
  const notify = () => successNotification('You have subscribed to our newsletter');
  return (
    <div className=" wrapper-x ">
      <div className="w-full bg-primary-700 flex gap-lg justify-between p-2xl rounded-2xl">
        <div className="w-6/12">
          <p className="text-white text-3xl font-semibold">Join Our Newsletter</p>
          <p className="text-white text-xl font-normal">
            Sign up for the very best tutorials and the latest news.
          </p>
        </div>
        <div className="w-6/12">
          <div className=" flex gap-sm">
            <div className="w-4/6">
              <Input placeholder="Enter a Email"></Input>
            </div>
            <div className="w-2/6">
              <Button variant="outline" className="border border-white text-white">
                Subscribe
              </Button>
            </div>
          </div>
          <p className="text-sm text-white mt-xs">
            We care about your data in our{' '}
            <span className="underline text-sm"> privacy policy </span> .
          </p>
        </div>
      </div>
      {/* <h1>We’ve just released a new update!</h1>
      <p className="text-warmGray-400">
        Check out the all new dashboard view. Pages and now load faster.
      </p>
      <h1 className="text-sm">We’ve just released a new update!</h1>
      <div className="flex justify-center p-md spa">
        <Input icon={<IconAt />} variant="filled" placeholder="Your email" />
        <Button className="px-lg ml-md" onClick={notify}>
          Subscribe
        </Button>
      </div> */}
    </div>
  );
};
