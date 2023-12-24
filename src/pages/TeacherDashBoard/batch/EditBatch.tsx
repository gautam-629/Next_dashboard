/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';
import { RightArrow } from '../../../utils/assets/image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { forwardRef } from 'react';
import {
  Group,
  Avatar,
  Text,
  Select,
  Button,
  Card,
  Input,
  Grid,
  NumberInput,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { createBatch } from '../../../store/modules/batch/actions';
import axios from '../../../plugins/axios';
import { useSelector } from 'react-redux';

import { useInterval } from '@mantine/hooks';
import { errorNotification, successNotification } from '../../../utils/helpers/notifications';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { getMyCourses } from '../../../store/modules/courses/actions';
import { error } from 'console';
import { APIGetSingleBatch } from '../../../api/batch';
import { DatePicker, DatePickerInput } from '@mantine/dates';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  courseSubTitle: string;
  courseImageUrl: string;
  coursePrice: string;
  courseDuration: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, courseImageUrl, coursePrice, courseDuration, ...others }: ItemProps, ref) => (
    <div
      ref={ref}
      {...others}
      className="bg-[#EFF0F7] mb-xs mx-xs py-sm px-sm rounded-lg  border-transparent"
    >
      <Group noWrap>
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <Avatar src={courseImageUrl} />

            <div className="mx-xs">
              <Text size="sm">{label} </Text>
            </div>
          </div>
          <div className="">{coursePrice}</div>
          <div className="">
            <div className=" tracking-wide font-medium">Duration</div>
            <div className="font-sm  tracking-wide text-[#414141]">{courseDuration}</div>
          </div>
        </div>
      </Group>
    </div>
  ),
);

const EditBatch = () => {
  const batchCreateData = useSelector((state: any) => state.batchReducer.batchCreateData);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch() as any;
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [classRoomLink, setLink] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  const [courseList, setCourseList] = useState([]);
  const myCourses = useSelector((state: any) => state.courseReducer.myCourses);

  const { id } = useParams();
  const [course, setId] = useState('');

  const [classRoom, setClassRoomId] = useState();
  const [singleBatch, setSingleBatch] = useState<any>([]);
  const [coursename, setCourseName] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const singleBatchData = await APIGetSingleBatch(id);
        const formData = {
          ...singleBatchData.data,

          course: singleBatchData?.data?.course?.courseId ?? '',
        };

        console.log(formData, '@formData');

        form.setValues({ ...formData });
        setCourseName(true);
        setSingleBatch(singleBatchData.data);
        setClassRoomId(singleBatchData.data.classRoom);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('courses/list');
      } catch (error: any) {
        console.log(error, 'error');
      }
      try {
        const res = await axios.get('courses/list');
        const c = res.data?.results?.map((d: any) => {
          return { value: d._id, label: d.courseTitle ?? 'Untitled' };
        });
        setCourseList(c);
        if (course && course !== '') {
          form.setFieldValue('course', course);
        }
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  const form = useForm({
    initialValues: {
      ...batchCreateData,
    },
    validate: {
      batchName: (value) => value.length === 0 && 'Batch name cannot be empty',
      course: (value) => value.length === 0 && 'Course cannot be empty',
      startDate: (value) => value.length === 0 && 'Start Date cannot be empty',
      endDate: (value) => value.length === 0 && 'End Date cannot be empty',
      startTime: (value) => value.length === 0 && 'Start Time cannot be empty',
      endTime: (value) => value.length === 0 && 'EndTime cannot be empty',
      studentLimit: (value) => value.length === 0 && 'studentLimit cannot be empty',
      classRoomLink: (value) => value.length === 0 && 'Link cannot be empty',
    },
  });

  const { values } = form;
  console.log(values, '@values');
  useEffect(() => {
    if (values.batchName) {
      setFormErrors((prevState: any) => {
        return { ...prevState, batchName: '' };
      });
    }
    if (values.endDate) {
      setFormErrors((prevState: any) => {
        return { ...prevState, endDate: '' };
      });
    }
    if (values.startDate) {
      setFormErrors((prevState: any) => {
        return { ...prevState, startDate: '' };
      });
    }
    if (values.startTime) {
      setFormErrors((prevState: any) => {
        return { ...prevState, startTime: '' };
      });
    }
    if (values.endTime) {
      setFormErrors((prevState: any) => {
        return { ...prevState, endTime: '' };
      });
    }
    if (values.studentLimit) {
      setFormErrors((prevState: any) => {
        return { ...prevState, studentLimit: '' };
      });
    }
    if (values.classRoomLink) {
      setFormErrors((prevState: any) => {
        return { ...prevState, classRoomLink: '' };
      });
    }
  }, [values]);
  const submit = async (e: any) => {
    e.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(errors, 'errors');

    if (hasErrors) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    dispatch(createBatch({ ...values, classRoomLink }));
    successNotification('Batch Successfully Created!');
    navigate('/teacher/batches');
  };

  const generateLink = async () => {
    try {
      const res = await axios.post('class-room/create-room');
      setLink(res.data.classRoomLink);

      values.classRoom = res.data.newCreatedData._id;
      values.classRoomLink = res.data.classRoomLink;
    } catch (error: any) {
      errorNotification(error?.toString());
    }

    successNotification('ClassRoom Link Generated Successfully!');
    setIsDisabled(true);
  };

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20,
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('courses/list');
        console.log(res, 'courselist');
        const c = res.data.results.map((d: any) => {
          return { value: d._id, label: d.courseTitle ?? 'Untitled' };
        });

        setId(c);

        if (values.course && values.course !== '') {
          form.setFieldValue('course', values.course);
        }
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, [coursename]);
  return (
    <>
      <Card>
        <div className="top-bar flex items-center justify-start text-lg tracking-wider">
          <ActionIcon onClick={() => navigate(-1)}>
            <IconChevronLeft />
          </ActionIcon>
          <span>Create New Class Room</span>
        </div>
        <div className="mt-md">
          <Input.Wrapper label={'Batch Title'}>
            <Input
              type="text"
              placeholder="Your Batch Title goes here"
              name="batchName"
              className={formErrors.batchName ? 'form-error-field' : ''}
              {...form.getInputProps(`batchName`)}
            />
            <div className="form-errors">{formErrors.batchName}</div>
          </Input.Wrapper>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper label={'Batch Course'} mt={'sm'}>
                <Select
                  placeholder="Pick one"
                  itemComponent={SelectItem}
                  data={courseList}
                  searchable
                  maxDropdownHeight={400}
                  nothingFound="You don't have any course yet."
                  {...form.getInputProps(`course`)}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper label={'Class type'} mt={'sm'}>
                <Select
                  placeholder="Select Class Type"
                  data={[
                    { value: 'PHYSICAL', label: 'Physical' },
                    { value: 'REMOTE', label: 'Remote' },
                    { value: 'HYBRID', label: 'Hybrid' },
                  ]}
                  {...form.getInputProps(`classType`)}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col md={6} sm={6} lg={6} xs={12} mt={'md'}>
              <Input.Wrapper label={'Session Start date'}>
                <DatePickerInput
                  placeholder="Your Batch Title goes here"
                  className={formErrors.startDate ? 'form-error-field' : ''}
                  {...form.getInputProps(`startDate`)}
                />
                <div className="form-errors">{formErrors.startDate}</div>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={6} sm={6} lg={6} xs={12} mt={'md'}>
              <Input.Wrapper label={'Session End date'}>
                <DatePickerInput
                  placeholder="Your Batch Title goes here"
                  {...form.getInputProps(`endDate`)}
                  className={formErrors.endDate ? 'form-error-field' : ''}
                />
                <div className="form-errors">{formErrors.endDate}</div>
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper label={'Class Start Time'}>
                <Input
                  type="time"
                  placeholder="Your Batch Title goes here"
                  {...form.getInputProps(`startTime`)}
                  className={formErrors.startTime ? 'form-error-field' : ''}
                />
                <div className="form-errors">{formErrors.startTime}</div>
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper label={'Class End Time'}>
                <Input
                  type="time"
                  placeholder="Your Batch Title goes here"
                  {...form.getInputProps(`endTime`)}
                  className={formErrors.endTime ? 'form-error-field' : ''}
                />
                <div className="form-errors">{formErrors.endTime}</div>
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper label={'Maximum number of Student'}>
                <NumberInput
                  type="number"
                  min={5}
                  placeholder="Maximum number of Student"
                  {...form.getInputProps(`studentLimit`)}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6} className=" grid items-center">
              <Input.Wrapper label={'Generate ClassRoom Link'}>
                <div>
                  <Button onClick={generateLink} disabled={isDisabled}>
                    Generate Link
                  </Button>
                </div>
              </Input.Wrapper>
              <p>{values.classRoomLink}</p>
              <div className="form-errors">{formErrors.classRoomLink}</div>
            </Grid.Col>
          </Grid>
        </div>
        <div className="flex justify-end mt-md">
          <Button onClick={submit}>Create</Button>
          <Button onClick={() => navigate(-1)} variant={'subtle'}>
            Cancel
          </Button>
        </div>
      </Card>
    </>
  );
};

export default EditBatch;
