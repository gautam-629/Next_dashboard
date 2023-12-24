/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */
import React, { useEffect, useState } from 'react';

import { Text } from '@mantine/core';

import { useDispatch } from 'react-redux';

import { Image, Badge, Button, Grid, Input } from '@mantine/core';
import { Card } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { IconSearch, IconVideo } from '@tabler/icons-react';
import { getAllPublishCourses } from '../../../../store/modules/courses/actions';
import { DefaultImage, TypingImg } from '../../../../utils/assets/image';
import { useNavigate, useParams } from 'react-router-dom';
import { Task } from '../task/Task';
import { APIGetSingleBatch } from '../../../../api/batch';
import axios from '../../../../plugins/axios';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../../components/common/StackTitleComponent';

const ClassRoomDetails = () => {
  const { batch } = useParams();
  const [element, setElement] = useState<any>([]);
  const [classRoom, setClassRoomId] = useState();
  const [singleBatch, setSingleBatch] = useState<any>([]);
  const navigate = useNavigate();
  const [tab, setTab] = useState('homepage');
  useEffect(() => {
    (async () => {
      const batchdata = await APIGetSingleBatch(batch);

      setSingleBatch(batchdata.data);
      setClassRoomId(batchdata.data.classRoom);
      try {
        const batchDetails = (await axios.get(`assignment/task-list/${batch}`)) ?? [];
        setElement(batchDetails.data);
        console.log(batchdata.data, '@data');
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  console.log(singleBatch, 'single data');
  const joinClass = () => {
    const url = singleBatch.classRoomLink;
    window.open(`${url}?classRoom=${classRoom}`, '_blank');
  };
  return (
    <>
      <section className="pt-md">
        <div className="flex justify-between">
          <StackTitleComponent>
            <p onClick={() => navigate(-1)} className="cursor-pointer">
              {' '}
              {singleBatch?.course?.courseTitle ?? ''}
            </p>
          </StackTitleComponent>

          <div className="flex ">
            <Input
              variant="filled"
              icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
              placeholder="Search"
              className="mr-sm"
            />
            <Button
              leftIcon={<IconVideo size={40} strokeWidth={1} color={'white'} />}
              onClick={joinClass}
              className=""
            >
              Join
            </Button>
          </div>
        </div>
        <Card withBorder mt={'md'}>
          <Tabs radius="xs" defaultValue="assignment" orientation="vertical" inverted>
            <Tabs.List>
              {
                ///temporary disable don't remove
                /* 
                
                * ! temporary disable don't remove
                <Tabs.Tab value="homepage" onClick={() => setTab('homepage')}>
                Home Page
              </Tabs.Tab>
              <Tabs.Tab value="classnote" onClick={() => setTab('classnote')}>
                Class Note
              </Tabs.Tab> */
              }
              <Tabs.Tab value="assignment" onClick={() => setTab('assignment')}>
                Assignments
              </Tabs.Tab>
              {/* <Tabs.Tab value="grade" onClick={() => setTab('grade')}>
                Grade
              </Tabs.Tab> */}
              {/*<Divider my={'sm'} />*/}
              {/*<Text className=" text-lg font-bold text-primary-700">Channels</Text>*/}
              {/*<Tabs.Tab value="general" onClick={() => setTab('general')}>*/}
              {/*  General*/}
              {/*</Tabs.Tab>*/}
            </Tabs.List>
            <Tabs.Panel value="assignment" pt="xs" ml="lg">
              <Task element={element} />
            </Tabs.Panel>

            <Tabs.Panel value="general" pt="md" ml="lg">
              <div className="text-center text-[30px] font-medium items-center">
                Welcome to PUC CT651 OOAD
                <Text className="text-lg  font-normal text-blue-500">
                  Learn First To Lead The Rest
                </Text>
                <img
                  src={TypingImg}
                  style={{
                    height: '50vh',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="inactive" pt="xs" ml="lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestias
              expedita soluta reiciendis fugit ipsum esse repellat, deserunt rem corporis
              voluptatibus sint deleniti laboriosam. Nam sequi adipisci deleniti aliquid dolore.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur enim dolor
              nostrum provident quidem. Nam aperiam commodi animi corrupti explicabo quae?
              Accusantium repellendus similique, quaerat facere modi veniam vitae soluta! Lorem
              ipsum dolor, sit amet consectetur adipisicing elit. Repellat tempore reprehenderit
              magnam, repudiandae, dolorem et pariatur quis beatae at amet soluta vero esse error,
              cupiditate obcaecati quam nobis minima nam!
            </Tabs.Panel>
          </Tabs>
        </Card>
      </section>
    </>
  );
};

export default ClassRoomDetails;
