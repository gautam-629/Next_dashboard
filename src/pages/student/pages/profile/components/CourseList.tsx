import { Button, Card } from '@mantine/core';
import User from '../../../../../assets/Anna.png';

interface CourseListProps {
  courses: {
    batchCount: number;
    coursePrice: number;
    courseTitle: string;
    _id: string;
  }[];
}

export default function CourseList(props: CourseListProps) {
  const { courses } = props;
  return (
    <Card withBorder className="my-md">
      <div className="">
        <p className="text-lg font-semibold leading-7 text-secondary-dark">Courses</p>
      </div>

      <div className="grid grid-cols-2 gap-sm mt-sm">
        {courses.map((course, index) => (
          <div className="bg-Grayscale-200 p-xs rounded-md" key={index}>
            <div className="flex gap-xs">
              <img src={User} className="" style={{ aspectRatio: '70 / 70', height: '70px' }} />
              <div>
                <p className="text-base font-medium text-secondary-dark ">{course.courseTitle}</p>
                <p className="text-xs font-normal text-secondary-default">{course.coursePrice}</p>
                <a className="text-xs font-normal text-primary-700">
                  {course.batchCount} Batches Available
                </a>
              </div>
            </div>
            <div className="flex justify-end mt-md">
              <Button className="text-sm font-semibold">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
