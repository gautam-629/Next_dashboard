/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import srHeaderSection from '../../assets/srHeadersection.png';
import cover from '../../assets/cover.jpg';
export const SearchHero = () => {
  return (
    <section className={'wrapper-x relative flex items-center'} style={{ height: '400px' }}>
      <img
        src={cover}
        alt=""
        className={'w-full absolute top-none left-none rounded-md object-cover h-full'}
      />
      <div className="grid grid-cols-4 gap-4">
        <div>01</div>
        <div>09</div>
        <div>09</div>
      </div>
    </section>
  );
};
