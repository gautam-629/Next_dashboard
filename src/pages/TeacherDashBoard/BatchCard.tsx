/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Modal,
  Progress,
  Tabs,
  Text,
} from '@mantine/core';

import { DefaultImage } from '../../utils/assets/image';

import { useNavigate } from 'react-router-dom';
import { errorImageHandler } from '../../utils/assets/imageurl';

import { IconBook2, IconNotes, IconClockHour2, IconGraph } from '@tabler/icons-react';
import { DeleteBatchAPI } from '../../api/batch';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
interface BatchCardProps {
  image: any;
  defaultImage: any;
  deleteCourse?: any;
  batchDetails: any;
  open: any;
  close: any;
  theme: any;
  opened: any;
  openModal: any;
  status: any;
  setReload: boolean;
}
const BatchCard = (props: any) => {
  const { batchDetails, status, setReload } = props;
  const [opened, { open, close }] = useDisclosure(false);
  console.log(status, '@batchdetails status');

  const navigate = useNavigate();
  console.log(batchDetails, 'batchDetails');

  const redirectToEdit = (id: string) => {
    console.log(id, 'id');
    navigate(`/teacher/batch/edit/${id}`);
  };
  const viewTask = (batchId: string) => {
    navigate(`/teacher/batch/assignment/list/${batchId}`);
  };

  const startNow = async () => {
    console.log();
    const url = batchDetails.classRoomLink;

    window.open(`${url}?classRoom=${batchDetails.classRoom}`, '_blank');
  };

  const deleteBatch = async (batch: string) => {
    console.log(batch, 'BatchId ');

    try {
      const respose = await DeleteBatchAPI(batch);
      close();
      setReload(true);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    // <Tabs.Panel value={props.value} pt="xs">
    // onClick={() => navigate(`${batchDetails._id}`)}
    <Card withBorder className="mt-xs rounded-lg hover:bg-Grayscale-200">
      <Grid align="center" justify="center" gutter="lg">
        <Grid.Col span={5} className="p-none">
          <div className="flex gap-xs items-center">
            <div className=" w-3/4 flex items-center my-auto ">
              <img
                onError={errorImageHandler}
                style={{ aspectRatio: '420 / 240' }}
                src={batchDetails?.course?.courseImageUrl ?? DefaultImage}
                className="batch-image rounded-lg w-full object-fill aspect-video cursor-pointer "
                // onClick={() => navigate(`/teacher/course/${batchDetails.course._id}`)}
                onClick={() => navigate('/teacher/classroom/' + batchDetails._id)}
              />
            </div>
            <div className="w-full">
              <p
                className="text-sm leading-5 font-medium text-secondary-dark cursor-pointer hover:text-blue-500 hover:text-[15px] transition-all "
                onClick={() => navigate(`/teacher/batches/${batchDetails._id}`)}
              >
                {batchDetails.batchName ?? 'Untitled'}
              </p>
              <p
                className="text-xs font-normal leading-5 text-secondary-default cursor-pointer hover:text-blue-500 hover:text-[15px] transition-all "
                onClick={() => navigate(`/teacher/course/${batchDetails.course._id}`)}
              >
                {batchDetails?.course?.courseTitle ?? 'Untitled'}
              </p>
              <div className="flex justify-between mt-xs ">
                <div className="flex gap-xs items-center">
                  <IconBook2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    {batchDetails?.lessons ?? '0'} topics
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <IconNotes size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p
                    className="text-xs font-normal leading-5 text-secondary-default cursor-pointer hover:text-blue-500 hover:text-[15px] transition-all"
                    onClick={() => viewTask(batchDetails._id)}
                  >
                    {batchDetails?.assignmentCount ?? '0'} Assignments
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-xs">
                <div className="flex gap-xs items-center">
                  <IconClockHour2 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    {batchDetails.startTime}
                  </p>
                </div>
                <div className="flex gap-xs items-center">
                  <IconGraph size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-xs font-normal leading-5 text-secondary-default ">
                    0 Assessments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={4} className="flex flex-col justify-center items-center ">
          <div className="flex gap-xs w-3/4 items-center justify-center">
            <Progress value={50} className="w-full" />
            <p className="text-sm font-normal leading-5 text-secondary-default ">100%</p>
          </div>
          <span className="text-sm text-primary-200 leading-5 font-normal w-3/4 text-left">
            10 days To Complete
          </span>
        </Grid.Col>
        {status ? (
          <Grid.Col span={3} className="flex gap-xl items-center p-none">
            {/* <Badge>{status}</Badge> */}
            {/* <Button
              className="ml-sm"
              onClick={() => navigate(`/teacher/batches/${batchDetails._id}`)}
            >
              View Details{' '}
            </Button> */}
            <Button
              className="ml-sm"
              variant={'light'}
              onClick={() => navigate('/teacher/classroom/' + batchDetails._id)}
            >
              Go to Class
            </Button>
            {props.status === 'pending' && (
              <>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="xl"
                  onClick={() => redirectToEdit(batchDetails?._id)}
                  style={{ color: '#3CC3CF' }}
                  className="cursor-pointer"
                />
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faTrash}
                  style={{ color: '#ec274f' }}
                  onClick={open}
                  size="xl"
                />
              </>
            )}

            <Modal opened={opened} onClose={close} title="">
              <p>Are your sure you want to delete this Batch</p>
              <div className="flex justify-between my-lg">
                <Button onClick={close}>Cancel</Button>
                <Button onClick={() => deleteBatch(batchDetails?._id)}>Delete</Button>
              </div>
            </Modal>
          </Grid.Col>
        ) : (
          // </Grid>
          <Grid.Col span={3} className="flex justify-between items-center p-none">
            {/* <Button className="ml-sm" onClick={startNow}>
              Start class{' '}
            </Button> */}
            <Button
              className="ml-sm"
              variant={'light'}
              onClick={() => navigate('/teacher/classroom/' + batchDetails._id)}
            >
              Go to Class
            </Button>
          </Grid.Col>
        )}
      </Grid>
    </Card>
  );
};

export default BatchCard;
