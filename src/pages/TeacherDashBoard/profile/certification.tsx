/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { DefaultImage } from '../../../utils/assets/image';
import { Card, Grid, Image, SimpleGrid } from '@mantine/core';
import { useSelector } from 'react-redux';
import { errorImageHandler } from '../../../utils/assets/imageurl';

const Certification = () => {
  const certification = useSelector((state: any) => state.authReducer.userProfile.certification);

  return (
    <div>
      <Card className={'h-full min-h-[200px] '} radius="md">
        <div className="flex justify-between items-center pb-[32px]">
          <div>
            <p className="text-md font-bold text-secondary-dark m-[0px]">Certification</p>
          </div>
          {/* <div>
            <Pencil />
          </div> */}
        </div>
        {/* <Grid>
          <Grid.Col md={4} sm={4} lg={3} xs={6}>
            {certification.map((item: any, index: number) => {
              return (
                <Card withBorder p={0} key={index}>
                  <img
                    src={item.cvUrl}
                    className="max-h-[166px] w-full"
                    onError={errorImageHandler}
                  />
                  <div className="p-sm text-center">
                    <p className="font-bold text-lg text-secondary-dark">{item.title}</p>
                    <p className="font-medium text-sm text-secondary-default">{item.description}</p>
                  </div>
                </Card>
              );
            })}
          </Grid.Col>
        </Grid> */}
        <SimpleGrid cols={3}>
          {certification?.map((item: any, index: number) => (
            <Card withBorder p={0} key={index}>
              <Card.Section>
                <Image src={item.cvUrl} height={160} alt="Norway" onError={errorImageHandler} />
              </Card.Section>
              {/* <img src={item.cvUrl} className="max-h-[166px] w-full" onError={errorImageHandler} /> */}
              <div className="p-sm text-center">
                <p className="font-bold text-lg text-secondary-dark">{item.title}</p>
                <p className="font-medium text-sm text-secondary-default">{item.description}</p>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </Card>
    </div>
  );
};

export default Certification;
