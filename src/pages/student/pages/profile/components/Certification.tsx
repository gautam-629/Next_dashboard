import { Card } from '@mantine/core';
import User from '../../../../../assets/Anna.png';
import { errorImageHandler } from '../../../../../utils/assets/imageurl';

type Certification = {
  cvUrl: string;
  description: string;
  title: string;
  _id: string;
};

interface CertificationProps {
  certification: Certification[];
}

const Certification = (props: CertificationProps) => {
  const { certification } = props;
  console.log(certification, 'certification');
  console.log(certification && certification.length, 'length');
  const certificationDetails = (cert: Certification) => {
    return (
      <div className="mt-xs flex gap-xs">
        <div className="w-1/3">
          <img
            src={cert?.cvUrl ?? null}
            className="w-full"
            style={{ aspectRatio: 72 / 68 }}
            onError={errorImageHandler}
          />
        </div>
        <div className="2/3">
          <p className="text-xs font-semibold text-secondary-dark leading-7">{cert.title}</p>
          <p className="text-xs font-normal text-secondary-default leading-7">{cert.description}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      {' '}
      {certification && certification.length !== 0 ? (
        <Card withBorder className="mt-md">
          <p className="text-lg font-semibold leading-7 text-secondary-dark">Certifications</p>
          {certification.map((exp) => certificationDetails(exp))}
        </Card>
      ) : null}
    </>
  );
};

export default Certification;
