/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { CourseNotFound, DefaultImage, TypingImg } from '../../../utils/assets/image';
import { Button, Grid, Loader, Pagination, Text, useMantineTheme } from '@mantine/core';
import { getAllBatch, getAllBatchByCourseId } from '../../../api/batch';
import { errorNotification } from '../../../utils/helpers/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../common/LoadingSpinner';
import BatchCard from '../../../pages/TeacherDashBoard/BatchCard';
import image from '../../../assets/image.png';
import { errorImageHandler } from '../../../utils/assets/imageurl';

export const BatchListingTab = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openModal, setOpenModal] = useState(false);
  const theme = useMantineTheme();
  const [modalData, setModalData] = useState({ id: '', courseTitle: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBatchLoading, setIsBatchLoading] = useState<boolean>(true);
  const [count, setCount] = useState(0);
  const [batchList, setBatchList] = useState([]);
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { course } = useParams();
  console.log(course, 'courseId');
  const createNewBatch = () => {
    navigate('/teacher/batches/create');
  };
  const toggleModal = (props: any) => {
    setModalData((old) => ({ ...old, id: props.id, courseTitle: props.courseTitle }));

    return setOpenModal(!openModal);
  };
  console.log(props.status, '@status');
  console.log(reload, '@reload');
  useEffect(() => {
    if (course) {
      console.log(course, 'courseid inside useeffedt');
      getAllBatchByCourseId(course, props.status).then((res) => {
        console.log(res, '@respose');
        setBatchList(res.data.results);
        const totalPage = Math.ceil(res.data.count / 4);
        setCount(totalPage);
        setIsBatchLoading(false);
      });
    } else {
      getAllBatch(props.status).then((res) => {
        setBatchList(res.data.results);
        const totalPage = Math.ceil(res.data.count / 4);
        setCount(totalPage);
        setIsBatchLoading(false);
      });
    }
  }, [reload]);
  const LoadBatchList = async (page: number) => {
    try {
      const res = await getAllBatch(props.status, page);
      setBatchList(res.data.results);
      const totalPage = Math.ceil(res.data.count / 4);
      setCount(totalPage);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  const notFoundComponent = () => {
    return (
      <div>
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center">
            {/* <img
              onError={errorImageHandler}
              src={CourseNotFound}
              alt=""
              className="w-[145px] h-[145px]"
            /> */}
            <img
              src={TypingImg}
              onError={errorImageHandler}
              style={{
                height: '50vh',
                maxHeight: '500px',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
            <Text className="text-center mt-[24px]  font-normal text-lg leading-[38px] ">
              Your ClassRoom list is empty.
            </Text>
            <Text className="text-center mt-[8px]  font-normal text-base  ">
              Please click Create ClassRoom Button to create ClassRoom , and it will be listed here
            </Text>
            <Button size={'md'} onClick={createNewBatch} className="mt-[24px]">
              {!isLoading ? ' Create ClassRoom ' : <Loader color="white" size="sm" />}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const tabGridComponent = (myCourseList: any) => {
    if (isBatchLoading) {
      return <LoadingSpinner />;
    } else if (batchList.length === 0) {
      return notFoundComponent();
    } else {
      return (
        <Grid className={'mt-sm'}>
          {batchList?.map((batch: any, index: number) => (
            <Grid.Col md={4} sm={6} lg={4} xs={12} xl={4} key={index} className={'h-full'}>
              <BatchCard
                image={image}
                batchDetails={batch}
                defaultImage={DefaultImage}
                open={open}
                close={close}
                theme={theme}
                opened={opened}
                openModal={toggleModal}
                status={props.status}
                setReload={setReload}
              />
            </Grid.Col>
          ))}
        </Grid>
      );
    }
  };

  if (isBatchLoading) return <LoadingSpinner />;

  return (
    <>
      {batchList.length === 0 ? (
        notFoundComponent()
      ) : (
        <div>
          <Grid className={'mt-sm'}>
            {batchList?.map((batch: any, index: number) => (
              <Grid.Col key={index} className={'h-full'}>
                <BatchCard
                  image={image}
                  batchDetails={batch}
                  defaultImage={DefaultImage}
                  open={open}
                  close={close}
                  theme={theme}
                  opened={opened}
                  openModal={toggleModal}
                  status={props.status}
                  setReload={setReload}
                />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      )}
      <div className="flex justify-center mt-lg">
        <div>
          <Pagination total={count} onChange={LoadBatchList} />
        </div>
      </div>
    </>
  );
};
