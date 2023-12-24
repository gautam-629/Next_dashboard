/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Grid, Card, Text, Group, Avatar, Progress, Table, Divider, Tabs } from '@mantine/core';

import { ZoomScreen } from '../../../utils/assets/image';

export const TeachingCenter = () => {
  return (
    <>
      <div className=" bg-white flex justify-between">
        <div className="w-[100%]">
          <section className="">
            <Card className=" ">
              <Text className="text-sm ">Web Design (Batch-evening-5pm)</Text>
              <Text className="text-base ">Learning Loops in Javascript</Text>
              <img src={ZoomScreen} className="w-full" />
            </Card>
            <Tabs defaultValue="overview" className="p-lg ">
              <Tabs.List grow>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="resourse">Resourse </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="overview" pt="lg">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi
                eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam
                enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt.
                At feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra, semper. Eget
                in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis
                fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In
                turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </Tabs.Panel>

              <Tabs.Panel value="resourse" pt="xs">
                Messages tab content
              </Tabs.Panel>
            </Tabs>

            {/* <div className=" bg-white mt-sm">
              
            </div> */}
          </section>
        </div>
        <div className="bg-gray-500 w-[300px] flex flex-col">
          <div className="  mt-[40px] ml-[24px] mr-[10px]"> hello</div>
        </div>
      </div>
    </>
  );
};
