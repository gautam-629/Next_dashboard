import { Card } from '@mantine/core';
import moment from 'moment';

type Education = {
  level: string;
  passedYear: string;
  subject: string;
  university: string;
  _id: string;
};

interface EducationProps {
  education: Education[];
}

const Education = (props: EducationProps) => {
  const { education } = props;
  const educationDetails = (edu: Education) => {
    return (
      <div className="mt-xs">
        <p className="text-xs font-semibold text-secondary-dark leading-7">
          {moment(edu.passedYear).format('YYYY')}
        </p>
        <p className="text-xs font-semibold text-secondary-dark leading-7">{edu.subject}</p>
        <p className="text-xs font-semibold text-secondary-default leading-7">{edu.university}</p>
      </div>
    );
  };
  return (
    <Card withBorder className="mt-md">
      <p className="text-lg font-semibold leading-7 text-secondary-dark">Educational Background</p>
      {education.map((edu) => educationDetails(edu))}
    </Card>
  );
};

export default Education;
