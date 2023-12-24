import { Badge, Button, Card, Divider, Group, Radio } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconBook2, IconDeviceLaptop } from '@tabler/icons-react';
import { formatDate } from '../../utils/helpers/date.helper';
import axios from '../../plugins/axios';
import { enrollToBatch } from '../../api/batch';
import { errorNotification, successNotification } from '../../utils/helpers/notifications';
import { FiLayers } from 'react-icons/fi';
import BatchEnrollCard from './BatchEnrollCard';
const BatchData = [
  { id: '1', BatchName: 'Batch 1', Date: '2022-02-22', Time: '2:02pm - 4:00 pm' },
  { id: '2', BatchName: 'Batch 2', Date: '2022-02-22', Time: '2:02pm - 4:00 pm' },
  { id: '3', BatchName: 'Batch 3', Date: '2022-02-22', Time: '2:02pm - 4:00 pm' },
  { id: '4', BatchName: 'Batch 4', Date: '2022-02-22', Time: '2:02pm - 4:00 pm' },

  // Add more mock data here
];
const BatchList = (props: any) => {
  const navigate = useNavigate();
  const { course } = useParams();
  const singleCourse = props.singleCourse;
  console.log(singleCourse, 'singlecourse data');
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('1');
  console.log(singleCourse, '@singlecoursedata');
  const [status, setStatus] = useState({ data: { successMessage: '', id: '' } });
  useEffect(() => {
    (async () => {
      await requestEnrolledStatus();
    })();
  }, []);

  async function requestEnrolledStatus() {
    let responseStatus: any;
    try {
      responseStatus = await axios.get(`enrollment-requests/enrolled-status/${course}`);
      console.log(responseStatus, '@response Status');
      setSelectedBatch(responseStatus?.data?.id ?? '');
      responseStatus && setStatus(responseStatus);
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

  return (
    <div>
      {' '}
      <Card withBorder className="mt-sm flex flex-col justify-between rounded-md p-sm">
        {/* <Link
              to={`/course/${course}/apply-now/${d._id}`}
              className="no-underline flex justify-between items-center w-full"
            > */}

        {/* <Link
              to={`/course/${course}/apply-now/${d._id}`}
              className="no-underline flex justify-between items-center w-full"
            > */}
        <div>
          <div className="font-semibold text-base">This Course Includes:</div>
          <li className="mt-sm flex items-center text-sm font-medium">
            <FiLayers size={16} strokeWidth={1.5} color={'blue'} className="mr-[10px]" />
            For {singleCourse.targetedAudiences} Level
          </li>
          <li className="mt-sm flex items-center text-sm font-medium">
            <IconDeviceLaptop size={16} strokeWidth={1.5} color={'blue'} className="mr-[10px]" />
            Total Assignments {singleCourse.totalAssignment}
          </li>
          <li className="mt-sm flex items-center text-sm font-medium">
            <IconBook2 size={16} strokeWidth={1.5} color={'blue'} className="mr-[10px]" />
            Total lessons {singleCourse.lessons}
          </li>
          <Divider className="my-[14px]" />
          <div className="font-semibold text-base">Select Available Batch </div>

          {/* {singleCourse.batches?.map((d: any) => {
            <div key={d._id}>
              <p>{d.batchName}</p> <p>hello</p>
              <Button
                className="w-full my-sm"
                onClick={() => {
                  enrollToBatchs(d._id);
                }}
                disabled={['REQUEST_PENDING', 'ENROLLED'].includes(status.data.successMessage)}
              >
                {checkEnrollStatusByBatchId(d._id)}
              </Button>
              ;
            </div>;
          })} */}

          <Radio.Group
            onChange={(e: string) => {
              console.log(e, 'inside radio group');
              setSelectedBatch(e);
            }}
            value={selectedBatch}
          >
            <div className="h-[150px] overflow-y-auto">
              {singleCourse?.batches?.map((item: any, index: any) => (
                <div key={index}>
                  <Group mt="xs">
                    <div>
                      {' '}
                      <Radio
                        value={item.id}
                        label={item.batchName}
                        className="font-normal text-[16px]"
                        disabled={['REQUEST_PENDING', 'ENROLLED'].includes(
                          status.data.successMessage,
                        )}
                      />
                      {/* <p>BatchName: {item.BatchName}</p> */}
                      <div className="ml-[35px]">
                        {' '}
                        <p className="text-sm font-normal">
                          Date: {formatDate(item.startDate)} to {formatDate(item.endDate)}
                        </p>
                        <p className="text-sm font-normal">
                          Time: {item.startTime}-{item.endTime}
                        </p>
                        {/* <Badge className="text-xs">{checkEnrollStatusByBatchId(item._id)}</Badge> */}
                        {/* <p className="text-blue-700"> {checkEnrollStatusByBatchId(item._id)}</p> */}
                      </div>
                    </div>
                  </Group>
                </div>
              ))}
            </div>
          </Radio.Group>

          <p className="my-xs">*Note: Select the Batch To enroll</p>
          <Divider className="my-[14px]" />
          <p className="text-2xl font-semibold my-[14px]">Rs. 140</p>
          <Button
            fullWidth
            className="mt-md"
            onClick={() => enrollToBatchs(selectedBatch)}
            disabled={['REQUEST_PENDING', 'ENROLLED'].includes(status.data.successMessage)}
          >
            Enroll Now
          </Button>
          <BatchEnrollCard singleCourse={singleCourse} />
        </div>

        {/* </Link> */}
      </Card>
    </div>
  );
};

export default BatchList;
