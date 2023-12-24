import { Button, Card } from '@mantine/core';
import { IconClockHour3, IconCalendar } from '@tabler/icons-react';
import moment from 'moment';

interface BatchListProps {
  batches: {
    batchName: string;
    courseTitle: string;
    endTime: string;
    startDate: string;
    startTime: string;
    students: number;
    classDuration: number;
    _id: string;
  }[];
}

const BatchList = (props: BatchListProps) => {
  const { batches } = props;
  console.log(batches, '@batches');
  return (
    <Card withBorder className="">
      <div className="">
        <p className="text-lg font-semibold leading-7 text-secondary-dark">Upcoming Batches</p>
      </div>

      <div className="grid grid-cols-2 gap-sm mt-sm">
        {batches.map((batch, index) => (
          <div className="bg-Grayscale-200 p-md rounded-md" key={index}>
            <div className=" gap-xs">
              <div>
                <p className="text-base font-medium text-secondary-dark ">{batch.batchName}</p>
                <p className="text-sm  text-secondary-default">{batch.courseTitle}</p>
                <p className="text-xs font-semibold text-secondary-default">
                  {batch.students} enrolled
                </p>
              </div>
              <div className=" flex justify-between mt-sm">
                <div className="flex items-center gap-xs">
                  <IconClockHour3 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-sm font-normal text-secondary-dark">Time:{batch.startTime}</p>
                </div>
                <div className="flex items-center gap-xs">
                  <IconClockHour3 size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-sm font-normal text-secondary-dark">
                    ClassDuration: {batch?.classDuration} hrs
                  </p>
                </div>

                <div className="flex items-center gap-xs">
                  <IconCalendar size={16} strokeWidth={2} color={'#1EA7DC'} />
                  <p className="text-sm font-normal text-secondary-dark">
                    Class Start Date:
                    {moment(batch.startDate).format('DD MMM')}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center  mt-sm">
              <Button className="text-sm font-semibold">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BatchList;
