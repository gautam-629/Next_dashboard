import React from 'react';
import { Cover2 } from '../../../utils/assets/image';

const SecondFlipCard = (props: any) => {
  console.log(props.name, 'name');
  return (
    <>
      <div className="flipped-content-wrapper">
        <div className="flipped-content">
          <div className="flipped-content-text  rounded-tl-[100px] rounded-br-[100px]">
            <div>
              {' '}
              <p className="text-2xl font-semibold">{props.name ?? 'Abhinab Rajopadhyaya'}</p>
              <p className="text-base font-medium"> JavaScript Developer</p>
            </div>
          </div>
          <div className="flipped-content-image">
            <img
              src="https://media.licdn.com/dms/image/C4E03AQG_XI54ou5S_g/profile-displayphoto-shrink_800_800/0/1646629605877?e=1697673600&v=beta&t=Y_P1evcjv0udOrGMVRQ0ext9YQo8SJHUN3nyl0ajyS0"
              className="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px]"
              style={{ aspectRatio: '142 / 168 ' }}
            />
          </div>
        </div>
      </div>

      
    </>
  );
};

export default SecondFlipCard;
