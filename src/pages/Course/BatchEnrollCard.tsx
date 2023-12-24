import { Button, Card } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconCalendar, IconClock, IconUser } from '@tabler/icons-react';
import { formatDate } from '../../utils/helpers/date.helper';
import axios from '../../plugins/axios';
import { enrollToBatch } from '../../api/batch';
import { errorNotification, successNotification } from '../../utils/helpers/notifications';
const BatchEnrollCard = (props: any) => {
  const navigate = useNavigate();
  const { course } = useParams();
  const singleCourse = props.singleCourse;
  const [isDisabled, setIsDisabled] = useState(false);
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
        ? status?.data.successMessage
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
      {singleCourse?.course?.batches?.map((d: any) => {
        return (
          <Card
            withBorder
            className="mt-sm flex flex-col justify-between rounded-md p-sm"
            key={d._id}
          >
            {/* <Link
              to={`/course/${course}/apply-now/${d._id}`}
              className="no-underline flex justify-between items-center w-full"
            > */}
            <div>
              <div className="font-bold text-lg">{d.batchName}</div>
              <div className={'mt-sm'}>
                <div className={'flex items-center mb-xs'}>
                  <IconCalendar />
                  <div className={'ml-xs'}>
                    {formatDate(d.startDate)} to {formatDate(d.endDate)}
                  </div>
                </div>
                <div className={'flex items-center mb-xs'}>
                  <IconClock />
                  <div className="ml-xs">
                    {d.startTime}-{d.endTime}
                  </div>
                </div>
                <div className={'flex items-center mb-xs'}>
                  <IconUser />
                  <div className="ml-xs">Student Limit: {d.studentLimit}</div>
                </div>
              </div>
            </div>
            {/* <div className="bg-dark rounded-full text-white items-center">
            <img src={RightArrow} onError={errorImageHandler} alt="" />
          </div> */}
            <Button
              className="w-full my-sm"
              onClick={() => {
                enrollToBatchs(d._id);
              }}
              disabled={['REQUEST_PENDING', 'ENROLLED'].includes(status.data.successMessage)}
            >
              {checkEnrollStatusByBatchId(d._id)}
            </Button>
            {/* </Link> */}
          </Card>
        );
      })}
    </div>
  );
};

export default BatchEnrollCard;
