import React from 'react';
import { Avatar, Cover2 } from '../../../utils/assets/image';
import { ItutorsInterface } from '../../../utils/interfaces/tutors.model';

// eslint-disable-next-line prettier/prettier
const FlipCard = ({ data }: { data: ItutorsInterface }) => {
  return (
    <div className="flipped-content-wrapper">
      <div className="flipped-content">
        <div className="flipped-content-text">
          <p className="text-2xl font-semibold">{data.firstName}</p>
          <p className="text-base font-medium"> {data.currentPosition}</p>
        </div>
        <div className="flipped-content-image">
          <img
            src={
              data?.avatar ??
              'https://media.licdn.com/dms/image/C4E03AQHt6SkPTl8rfw/profile-displayphoto-shrink_800_800/0/1644927496782?e=1697673600&v=beta&t=hV6vzsBioNYAIjzLfpziApCgqQskoIWTUG75t-h_CDg'
            }
            className="w-full  object-cover h-full "
            onError={Avatar}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
