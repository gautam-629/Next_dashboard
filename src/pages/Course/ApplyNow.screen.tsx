/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useNavigate, useParams } from 'react-router-dom';

import {
  APIGetSingleBatch,
  APIRequestBatchChange,
  enrollToBatch,
  getAllBatchByCourseId,
} from '../../api/batch';
import { useEffect, useState } from 'react';
import { APIGetSingleCourse } from '../../api/singlecourse';
import { formatDate } from '../../utils/helpers/date.helper';
import { toast, ToastContainer } from 'react-toastify';
import { errorNotification, successNotification } from '../../utils/helpers/notifications';
import { errorImageHandler } from '../../utils/assets/imageurl';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Grid,
  Group,
  Radio,
  Text,
  TextInput,
} from '@mantine/core';
import { Modal, useMantineTheme } from '@mantine/core';
import { IconCalendar, IconClock, IconUser } from '@tabler/icons-react';
import axios from '../../plugins/axios';
import { AxiosResponse } from 'axios';
import { Batch } from '../../utils/interfaces/Batch.model';
import { useDisclosure } from '@mantine/hooks';
import { TypingImg } from '../../utils/assets/image';
import LoadingSpinner from '../../components/common/LoadingSpinner';
export const ApplyNow = () => {
  const navigate = useNavigate();
  const { course } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('1');
  const [singleCourse, setSingleCourse] = useState<any>([]);
  const [lessoncount, SetCount] = useState('');
  const [targetedAudiences, setTargetAudiences] = useState([]);
  const [status, setStatus] = useState({ data: { successMessage: '', id: '' } });
  const [price, setPrice] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [batchName, setBatchName] = useState('');
  const [discount, setDiscount] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBatchLoading, setIsBatchLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      await requestEnrolledStatus();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const singleCourseData = await APIGetSingleCourse(course);
        SetCount(singleCourseData.data.sections.length);
        setTargetAudiences(singleCourseData.data.targetedAudiences);
        setSingleCourse(singleCourseData.data);
        console.log(singleCourseData.data, 'singledata');
        // const batches = await getAllBatchByCourseId(course as string);
        // console.log(batches);
        setIsBatchLoading(false);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);
  async function requestEnrolledStatus() {
    let responseStatus: any;
    try {
      responseStatus = await axios.get(`enrollment-requests/enrolled-status/${course}`);
      console.log(responseStatus, '@response Status');
      setSelectedBatch(responseStatus?.data?.id ?? '');
      responseStatus && setStatus(responseStatus);
      if (responseStatus === 'REQUEST_PENDING') {
        setStatusMessage('Request Pending');
      }
    } catch (error: any) {
      // error && errorNotification(error?.toString());
    }
  }

  function checkEnrollStatusByBatchId(batchId: string) {
    if (status?.data.successMessage == 'ENROLLED') {
      return checkBatchId(status.data.id, batchId)
        ? status?.data.successMessage
        : 'Enrolled to other batches';
    } else if (status.data.successMessage == 'REQUEST_PENDING') {
      return checkBatchId(status.data.id, batchId)
        ? 'Request Pending'
        : 'Requested to other batches';
    } else {
      return 'ENROLL NOW';
    }
  }

  function checkBatchId(enrolledBatch: string, requestBatch: string) {
    return enrolledBatch == requestBatch ? true : false;
  }

  const enrollToBatchs = async (id: string) => {
    // if (enroll === 'ENROLL NOW') {
    try {
      const res = await enrollToBatch(id, course);
      successNotification("Your request has been submitted. We'll contact you.");
      // setEnroll('Enroll request Submitted');
      requestEnrolledStatus();
      // setIsDisabled(true);
    } catch (error: any) {
      navigate('/auth');
    }
  };

  const requestBatchChange = async (selectedBatch: string) => {
    try {
      const res = await APIRequestBatchChange({
        batch: selectedBatch,
        course: course ? course : '',
      });
      successNotification("Your request has been submitted. We'll contact you.");
      // setEnroll('Enroll request Submitted');
      requestEnrolledStatus();
      // setIsDisabled(true);
    } catch (error: any) {
      navigate('/auth');
    }
  };

  useEffect(() => {
    const selectedBatchPrice =
      singleCourse?.batches?.find((batch: any) => batch.id === selectedBatch)?.price ?? '0';
    const discountPercentage =
      singleCourse?.batches?.find((batch: any) => batch.id === selectedBatch)?.discount ?? '0';
    setDiscount(discountPercentage);
    console.log(selectedBatchPrice, 'selectedBatchPrice');
    setPrice(selectedBatchPrice);
    calculateTotalPrice();
    setIsBatchLoading(false);
  }, [selectedBatch]);
  // const { batch } = useParams();

  // const [batchData, setBatchData] = useState<any>([]);
  // // const [course, setCourse] = useState<any>({});
  // const [batchD, setBatch] = useState<any>({});
  // const [course, setCourseId] = useState('');
  // const [enroll, setEnroll] = useState('Enroll Now');
  // const [isDisabled, setIsDisabled] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const batchdata = await APIGetSingleBatch(batch);
  //       setBatchData(batchdata.data);
  //       setCourseId(batchdata.data.course.courseId);
  //       try {
  //         const status = await axios.get(
  //           `enrollment-requests/enrolled-status/${batchdata.data.course.courseId}`,
  //         );
  //         if (status.data.successMessage == 'ENROLL NOW') {
  //           setEnroll(status.data.successMessage);
  //         } else if (status.data.successMessage == 'REQUEST_PENDING') {
  //           setIsDisabled(true);
  //           setEnroll(status.data.successMessage);
  //         } else {
  //           setEnroll(status.data.successMessage);
  //           setIsDisabled(true);
  //         }
  //       } catch (error: any) {
  //         errorNotification(error?.toString());
  //       }
  //     } catch (error: any) {
  //       // errorNotification(error?.toString());
  //       console.log(error, '@error');
  //     }
  //     // const batchdata = singleCourse.data?.batches?.filter((d: any) => d._id == batch)[0];
  //   })();
  // }, []);

  // const enrollToBatchs = async () => {
  //   if (enroll === 'ENROLL NOW') {
  //     try {
  //       const res = await enrollToBatch(batch, course);

  //       if (res.status == 201) {
  //         successNotification(
  //           'Your Request has been submitted Successfully, we will contact you for further process',
  //         );
  //         setEnroll('Enroll request Submitted');

  //         setIsDisabled(true);
  //       }
  //     } catch (error: any) {
  //       if (error.statusCode == 403) {
  //         errorNotification('please login');
  //       }
  //     }
  //   } else if (enroll === 'REQUEST_PENDING') {
  //     errorNotification('Request Pending');
  //     setIsDisabled(true);
  //   } else if (enroll === 'ENROLLED') {
  //     errorNotification('ENROLLED');
  //     setIsDisabled(true);
  //   }
  // };

  useEffect(() => {
    calculateTotalPrice();
  }, [price, discount]);
  const calculateTotalPrice = () => {
    const discountAmount = (discount / 100) * price;
    const calculatedTotalPrice = price - discountAmount;
    setTotalPrice(parseFloat(calculatedTotalPrice.toFixed(2))); // Convert to number before setting
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
              Class Room is Not Available.
            </Text>
          </div>
        </div>
      </div>
    );
  };

  if (isBatchLoading) return <LoadingSpinner />;

  return (
    <>
      {singleCourse?.batches?.length === 0 ? (
        notFoundComponent()
      ) : (
        <div className="wrapper-x py-2xl">
          <Grid className="">
            <Grid.Col span={8} className="">
              <div className=" p-md bg-Grayscale-100">
                <h1 className="text-secondary-dark text-2xl font-normal mb-sm">
                  Available Classroom
                </h1>
                <div className="bg-Grayscale-100 p-none w-full">
                  <Radio.Group
                    onChange={(e: string) => {
                      console.log(e, 'inside radio group');
                      setSelectedBatch(e);
                    }}
                    value={selectedBatch}
                  >
                    <div className="grid grid-cols-2 gap-lg">
                      {singleCourse?.batches?.map((item: any, index: any) => (
                        <div key={index} className="cursor-pointer">
                          <div className="flex group flex-col gap-sm p-sm rounded-lg bg-white hover:hover:bg-primary-1000">
                            <div className="flex w-full justify-between items-center">
                              <p className="text-secondary-dark font-medium text-lg group-hover:text-white">
                                {item.batchName}
                              </p>
                              <Radio
                                value={item.id}
                                className="font-normal text-[16px]"
                                disabled={['ENROLLED'].includes(status.data.successMessage)}
                              />
                            </div>
                            <div className="flex gap-xs">
                              <IconCalendar
                                size={24}
                                strokeWidth={1.5}
                                color={'#14142B'}
                                className="group-hover:stroke-white"
                              />
                              <p className="text-base text-secondary-default font-normal group-hover:text-white ">
                                Date: {formatDate(item.startDate)}
                              </p>
                            </div>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex gap-xs">
                                <IconClock
                                  size={24}
                                  strokeWidth={1.5}
                                  color={'#14142B'}
                                  className="group-hover:stroke-white"
                                />
                                <p className="text-base text-secondary-default font-normal group-hover:text-white">
                                  Time: {item.startTime}-{item?.classDuration}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-lg text-primary-1000 font-normal group-hover:text-white">
                                  RS &nbsp;
                                </span>
                                <p className="text-secondary-default font-normal text-lg group-hover:text-white">
                                  {item?.price ?? ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Radio.Group>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={4} className=" ">
              <Grid>
                <Grid.Col span={12}>
                  <div className="p-sm bg-Grayscale-100 flex flex-col gap-sm">
                    <h1 className="text-secondary-dark text-2xl font-normal">Request Class</h1>
                    <span>Not available Classroom on Preferred timing? </span>
                    <Button onClick={open}>Request Classroom </Button>
                    <Modal
                      centered
                      size="xl"
                      opened={opened}
                      onClose={close}
                      overlayProps={{
                        opacity: 0.55,
                        blur: 3,
                      }}
                    >
                      <h1 className="my-xs text-primary-1000">Request ClassRoom</h1>
                      <p>Prefer Time</p>
                      <TextInput></TextInput>
                      <p className="my-xs">Number of Students</p>
                      <TextInput></TextInput>
                    </Modal>
                  </div>
                </Grid.Col>
                <Grid.Col span={12}>
                  <div className="p-sm bg-Grayscale-100 flex flex-col gap-sm">
                    <h1 className="text-secondary-dark text-2xl font-normal">Pricing</h1>
                    <div className="mt-4">
                      <p className="text-lg text-gray-700">
                        Original Price: <span className="line-through text-red-500">{price}</span>
                      </p>
                      <p className="text-lg text-green-600">Discount: {discount}% off</p>
                      <p className="text-3xl text-indigo-900 mt-2 font-semibold">{totalPrice}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      {' '}
                      <span>Total</span>
                      <span> Rs {totalPrice}</span>
                    </div>
                    <Divider className="bg-Grayscale-600" />
                    <div className="flex justify-end">
                      {['REQUEST_PENDING'].includes(status.data.successMessage) ? (
                        <Button onClick={() => requestBatchChange(selectedBatch)}>
                          Change Batch
                        </Button>
                      ) : (
                        <Button
                          onClick={() => enrollToBatchs(selectedBatch)}
                          disabled={['ENROLLED'].includes(status.data.successMessage)}
                        >
                          Enroll Now{' '}
                        </Button>
                      )}
                    </div>
                    <p className="text-primary-1000 text-lg font-bold">
                      {status.data.successMessage}
                    </p>
                    <Divider className="bg-Grayscale-600" />
                  </div>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </>
  );
};
