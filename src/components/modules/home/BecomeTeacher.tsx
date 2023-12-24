import { Button, Grid } from '@mantine/core';
import { BecomeTeacherr } from '../../../utils/assets/image';
import { useNavigate } from 'react-router-dom';
const BecomeTeacher = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between md:gap-lg items-center wrapper-x py-lg">
      <Grid className="mt-md w-full mx-none">
        <Grid.Col lg={6} xs={12}>
          {' '}
          <div className=" py-sm lg:py-2xl w-full">
            <p className="text-5xl font-normal mb-xl text-secondary-default tracking-wider">
              Start Teaching Today!
            </p>
            <p className="text-2xl font-normal tracking-wider leading-9">
              Become an instructor and change lives —
            </p>
            <p className="text-2xl font-normal mb-xl tracking-wider leading-9">
              including your own
            </p>

            <Button
              className="leading-7 px-lg font-semibold tracking-wider"
              size="xl"
              radius={'md'}
              color="cyan"
              onClick={() => navigate(`auth/teacher-signup`)}
            >
              Get Started
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col lg={6} xs={12} className="w-full hidden md:block">
          <div>
            <img src={BecomeTeacherr} style={{ aspectRatio: '590 / 438' }} className="w-full" />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default BecomeTeacher;
