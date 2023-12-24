import { Grid, Rating } from '@mantine/core';
import React from 'react';
import { Avatar } from '../../utils/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Comments from './Comments';

const Reviews = () => {
  return (
    <div className="mt-md">
      <p className="text-2xl font-bold">Reviews</p>
      <Grid className="mt-md">
        <Grid.Col span={1}>
          <img src={Avatar} alt="" className="w-5xl h-5xl " />
        </Grid.Col>
        <Grid.Col span={11}>
          <div className="flex justify-between">
            <Rating defaultValue={4} size="xl" />
            <div className="flex justify-between gap-sm">
              <FontAwesomeIcon icon={faHeart} style={{ color: '#c30035' }} />
              <FontAwesomeIcon icon={faShare} />
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>

          <p className="text-base font-normal my-xs ">
            Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est
            ultricies ultricies. Duis est sit sed leo nisl,
          </p>
          <p className="text-base font-semibold mb-xs">Sagar Chapagain</p>
          <p className="text-tiny font-semibold">Software Engineer</p>
        </Grid.Col>
      </Grid>
      <Grid className="mt-md">
        <Grid.Col span={1}>
          <img src={Avatar} alt="" className="w-5xl h-5xl " />
        </Grid.Col>
        <Grid.Col span={11}>
          <div className="flex justify-between">
            <Rating defaultValue={4} size="xl" />
            <div className="flex justify-between gap-sm">
              <FontAwesomeIcon icon={faHeart} style={{ color: '#c30035' }} />
              <FontAwesomeIcon icon={faShare} />
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>

          <p className="text-base font-normal my-xs ">
            Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est
            ultricies ultricies. Duis est sit sed leo nisl,
          </p>
          <p className="text-base font-semibold mb-xs">Sagar Chapagain</p>
          <p className="text-tiny font-semibold">Software Engineer</p>
        </Grid.Col>
      </Grid>
      <Comments />
    </div>
  );
};

export default Reviews;
