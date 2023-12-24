import React from 'react';
import Logo1 from '../../../assets/logo1.png';
import Logo2 from '../../../assets/logo2.png';
import Logo3 from '../../../assets/logo3.png';
import Logo4 from '../../../assets/logo4.png';
import { Partner1, Partner2 } from '../../../utils/assets/image';

const Partners = () => {
  return (
    <div className="bg-Grayscale-200 mb-2xl">
      {' '}
      <div className="wrapper-x">
        <div className="flex flex-col text-center gap-2xl py-2xl px-6xl">
          <h1 className="text-4xl leading-10 tracking-wider font-semibold text-secondary-dark">
            Our Partners
          </h1>
          <div className="flex flex-col lg:flex-row justify-evenly gap-4xl items-center">
            <img
              src={Logo1}
              className="h-full object-fill"
              style={{ aspectRatio: '250 / 66' }}
            ></img>
            <img
              src={Partner1}
              className="h-full object-fill w-1/5"
              style={{ aspectRatio: '250 / 66' }}
            ></img>
            <img
              src={Logo3}
              className="h-full object-fill"
              style={{ aspectRatio: '250 / 66' }}
            ></img>
            <img
              src={Partner2}
              className="h-full object-fill"
              style={{ aspectRatio: '250 / 66' }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
