import { Button, Grid } from '@mantine/core';
import React from 'react';
import { BecomeTeacherr, Certificate } from '../../utils/assets/image';
import { useNavigate, useParams } from 'react-router-dom';

const Certifications = () => {
  const navigate = useNavigate();
  const { course } = useParams();
  const ApplyNow = () => {
    navigate(`/course/applynow/${course}`);
  };
  return (
    <Grid className="flex md:flex-row xs:flex-col mt-md w-full ">
      <Grid.Col md={6} xs={12} className="w-full">
        <div>
          <img src={Certificate} style={{ aspectRatio: '478 / 337' }} className="w-full" />
        </div>
      </Grid.Col>
      <Grid.Col md={6} xs={12} className="flex items-center">
        {' '}
        <div className="py-2xl w-full ">
          <div>
            {' '}
            <p className="text-2xl font-semibold">Obtain a Career Certification</p>
            <p className="text-lg font-semibold mt-sm mb-xs">
              Highlight the Benefits on Your LinkedIn Profile, Resume, or CV.
            </p>
            <p className="text-base font-medium ">
              Announce it on social media platforms and during your performance evaluation
            </p>
            <Button className="w-1/4 mt-lg" size="md" variant="outline" onClick={ApplyNow}>
              Enroll Now
            </Button>
          </div>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default Certifications;
