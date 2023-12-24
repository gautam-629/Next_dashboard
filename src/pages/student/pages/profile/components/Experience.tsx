import { Card } from '@mantine/core';

type Experience = {
  description: string;
  designation: string;
  organization: string;
  period: string;
  _id: string;
};

interface ExperienceProps {
  experience: Experience[];
}

export default function Experience(props: ExperienceProps) {
  const { experience } = props;

  const experienceDetails = (exp: Experience) => {
    return (
      <div className="mt-xs flex justify-between items-center gap-sm">
        <div className="w-2/12">
          <p className="text-xs font-semibold text-secondary-dark leading-7">{exp.period}</p>
        </div>
        <div className="w-4/12">
          <p className="text-xs font-semibold text-secondary-dark leading-7">{exp.designation}</p>
          <p className="text-xs font-normal text-secondary-default leading-7">{exp.organization}</p>
        </div>
        <div className="w-6/12">
          <p className="text-xs font-normal  text-secondary-default leading-7">{exp.description}</p>
        </div>
      </div>
    );
  };
  return (
    <Card withBorder className="">
      <div className="">
        <p className="text-lg font-semibold leading-7 text-secondary-dark">Experience</p>
        {experience.map((exp) => experienceDetails(exp))}
      </div>
    </Card>
  );
}
