import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Grid,
  Group,
  Image,
  Switch,
  Text,
} from '@mantine/core';
import axios from '../../../plugins/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { DefaultImage } from '../../../utils/assets/image';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { errorNotification } from '../../../plugins/notification';
import { StackTitleComponent } from '../../../components/common/StackTitleComponent';

// import Button from '../../../components/Button';

const TaskCard = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const [isEmpty, setEmpty] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get('assignment/my-courses-assignment');
      if (Object.keys(res.data).length === 0) {
        // Data object is empty
        setEmpty(true);
      }
      console.log(res.data, 'res@');
      if (res && res.data && Object.keys(res.data).length) {
        const c = res?.data?.map((d: any) => {
          return {
            value: d?._id,
            label: d?.courseTitle,
            count: d?.totalAssignment ?? '',
            courseImageUrl: d?.courseImageUrl,
          };
        });
        setCourse(c);
      } else {
        setCourse([]);
      }
    } catch (e: any) {
      errorNotification({
        title: 'Error',
        message: e?.toString(),
      });
    }
  };
  const viewTask = (course: any) => {
    navigate(`/teacher/assignment/list/${course}`);
  };

  return (
    <Card className="rounded-lg">
      <div className="flex justify-between mb-md">
        <StackTitleComponent> Assignments</StackTitleComponent>

        <div className="text-end mb-md">
          <Link className="no-underline" to={'/teacher/assignment/create'}>
            <Button type="button" className="btn-gradient">
              Create New Assignment
            </Button>
          </Link>
        </div>
      </div>
      {/*<AssignmentCard/>*/}
      {isEmpty ? (
        <div className="text-2xl font-medium text-center mt-md">Assignment is not available</div>
      ) : (
        <Grid>
          {course.map((v: any, index: any) => (
            <Grid.Col
              md={3}
              sm={6}
              lg={3}
              xs={6}
              xl={3}
              key={index}
              className={'h-full'}
              onClick={() => viewTask(v.value)}
            >
              <Card shadow="sm" withBorder>
                <Card.Section component="div">
                  <img
                    style={{ aspectRatio: '350 / 200' }}
                    onError={errorImageHandler}
                    src={v?.courseImageUrl ?? ''}
                    className="w-full h-full object-cover object-center"
                  />
                </Card.Section>
                <div className="flex-grow ">
                  <Group position="apart" mt="sm" mb="xs">
                    <Text weight={900} className={'two-line-fixed-height'}>
                      {' '}
                      {v.label}
                    </Text>
                  </Group>

                  <Badge className=" font-bold text-xs normal-case p-xs " variant="light">
                    Total Assignment: {v.count}
                  </Badge>
                </div>

                <div className=" mb-sm">
                  <Button
                    variant="filled"
                    onClick={() => viewTask(v.value)}
                    className="w-full rounded-md mt-md "
                  >
                    View Assignment
                  </Button>
                </div>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Card>
  );
};

export default TaskCard;
