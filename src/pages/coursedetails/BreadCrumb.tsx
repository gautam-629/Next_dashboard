import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

interface CourseTitleProps {
  courseTitle: string | undefined;
}

const BreadCrumb: React.FC<CourseTitleProps> = ({ courseTitle }) => {
  const CourseTitle = courseTitle || 'No CourseTitle available';
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);

  return (
    <div className="flex items-center gap-[4px]">
      {/* <p className="text-primary-1000 text-base font-normal">IT & Services</p> <span></span>
      <FontAwesomeIcon icon={faCaretRight} /> */}
      <p className="text-base font-normal text-primary-1000">
        {courseCreateData?.category?.[0]?.title ?? null}
      </p>
      <FontAwesomeIcon icon={faCaretRight} />
      <p className="text-base font-normal">{CourseTitle}</p>
    </div>
  );
};

export default BreadCrumb;
