/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Card } from '@mantine/core';
import { errorImageHandler } from '../../../utils/assets/imageurl';

export const Testomonial = ({ testomonial }: any) => (
  <div className="relative flex items-end h-[380px]">
    <img
      src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt=""
      onError={errorImageHandler}
      className={'w-full h-full absolute top-none object-cover '}
    />
    {/* <img src={testomonial.img} alt="" className={'w-full h-full absolute top-none '} /> */}
    <div
      className="  text-area py-lg px-md   w-full"
      style={{
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)',
        backdropFilter: 'blur(6px)',
        color: 'white',
      }}
    >
      <div className={'font-bold'}>{testomonial.name}</div>
      <div className={'font-bold'}>{testomonial.quote}</div>
      <div className={'font-bold'}>{testomonial.job}</div>
      <div className={'font-bold'}>{testomonial.company}</div>
    </div>
  </div>
);
