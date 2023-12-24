/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { createBatch, editBatch } from '../../../store/modules/batch/actions';
import axios from '../../../plugins/axios';
import { useSelector } from 'react-redux';

import { useInterval } from '@mantine/hooks';
import { errorNotification, successNotification } from '../../../utils/helpers/notifications';
import { getMyCourses } from '../../../store/modules/courses/actions';
import { error } from 'console';
import { APIGetSingleBatch } from '../../../api/batch';
import moment from 'moment';
import { IconChevronDown, IconChevronLeft } from '@tabler/icons-react';
import { Batch, INITIAL_BATCH } from '../../../utils/interfaces/Batch.model';
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

const CreateBatch = () => {
  const classRoomCreateData = useSelector((state: any) => state.batchReducer.classRoomCreateData);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch() as any;
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [classRoomLink, setLink] = useState('');
  const [formErrors, setFormErrors] = useState<any>({});
  const [courseList, setCourseList] = useState([]);
  const myCourses = useSelector((state: any) => state.courseReducer.myCourses);
  const location = useLocation();
  const { courseid, batchId } = useParams();
  console.log(batchId, 'batchId');
  const editMode = location.pathname.includes('edit') && batchId && batchId !== '';
  console.log(location.pathname.includes('edit'), 'path');

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getMyCourses());
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/courses/my-courses');
      } catch (error: any) {
        console.log(error, 'error');
      }
      try {
        const res = await axios.get('/courses/my-courses');
        const c = res.data?.results?.map((d: any) => {
          return { value: d._id, label: d.courseTitle ?? 'Untitled' };
        });
        setCourseList(c);
        console.log(c, 'courseList');
        if (courseid && courseid !== '') {
          form.setFieldValue('course', courseid);
        }
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();

    if (location.pathname.includes('edit') && batchId && batchId !== '') {
      (async () => {
        try {
          const singleBatchData: any = await APIGetSingleBatch(batchId);
          console.log(singleBatchData, 'api');
          form.setValues({
            course: singleBatchData.data.course?.courseId ?? '',
            batchName: singleBatchData.data.batchName,
            startDate: moment(singleBatchData.data.startDate).format('YYYY-MM-DD'),
            // endDate: moment(singleBatchData.data.endDate).format('YYYY-MM-DD'),
            startTime: singleBatchData.data.startTime,
            welcomeMessage: singleBatchData.data.welcomeMessage,
            congratulationMessage: singleBatchData.data.congratulationMessage,
            minEnrollStudent: singleBatchData.data.minEnrollStudent,
            maxEnrollStudent: singleBatchData.data.maxEnrollStudent,
            classDuration: singleBatchData.data.classDuration,
            price: singleBatchData.data.price,
            // endTime: singleBatchData.data.endTime,
            // studentLimit: singleBatchData.data.studentLimit,
            classType: singleBatchData.data.classType,
            // classRoomLink: singleBatchData.data.classRoomLink,
            discount: singleBatchData.data.discount,
          });
        } catch (error: any) {
          errorNotification(error?.toString());
        }
      })();
    }
  }, []);

  const form = useForm({
    initialValues: {
      // ...classRoomCreateData,
      ...INITIAL_BATCH,
    },
    validate: {
      batchName: (value) => value == '' && 'Batch name cannot be empty',
      course: (value) => value?.length === 0 && 'Course cannot be empty',
      startDate: (value) => value?.length === 0 && 'Start Date cannot be empty',
      classDuration: (value) => value?.length === 0 && 'classDuration cannot be empty',
      classType: (value) => value?.length === 0 && 'classDuration cannot ?be empty',
      startTime: (value) => value?.length === 0 && 'Start Time cannot be empty',
      minEnrollStudent: (value) => value?.length === 0 && 'minEnrollStudent cannot be empty',
      maxEnrollStudent: (value) => value?.length === 0 && 'maxEnrollStudent cannot be empty',
      price: (value) => value === 0 && 'price cannot be empty',
      welcomeMessage: (value) => value?.length === 0 && 'welcomeMessage cannot be empty',
      congratulationMessage: (value) =>
        value?.length === 0 && 'congratulationMessage cannot be empty',
      discount: (value) => value === 0 && 'discount cannot be empty',
    },
  });

  const { values } = form;
  console.log(values, 'values data');

  useEffect(() => {
    if (values.batchName) {
      setFormErrors((prevState: any) => {
        return { ...prevState, batchName: '' };
      });
    }
    if (values.course) {
      setFormErrors((prevState: any) => {
        return { ...prevState, course: '' };
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
    if (values.classDuration) {
      setFormErrors((prevState: any) => {
        return { ...prevState, classDuration: '' };
      });
    }
    if (values.minEnrollStudent) {
      setFormErrors((prevState: any) => {
        return { ...prevState, minEnrollStudent: '' };
      });
    }
    if (values.price) {
      setFormErrors((prevState: any) => {
        return { ...prevState, price: '' };
      });
    }
    if (values.discount) {
      setFormErrors((prevState: any) => {
        return { ...prevState, discount: '' };
      });
    }
    if (values.welcomeMessage) {
      setFormErrors((prevState: any) => {
        return { ...prevState, welcomeMessage: '' };
      });
    }
    if (values.congratulationMessage) {
      setFormErrors((prevState: any) => {
        return { ...prevState, congratulationMessage: '' };
      });
    }
    if (values.maxEnrollStudent) {
      setFormErrors((prevState: any) => {
        return { ...prevState, maxEnrollStudent: '' };
      });
    }
    // if (values.classRoomLink) {
    //   setFormErrors((prevState: any) => {
    //     return { ...prevState, classRoomLink: '' };
    //   });
    // }
  }, [values]);
  const classroomData = { ...values };
  const submit = async (e: any) => {
    e.preventDefault();
    console.log(values, '@values');
    const { hasErrors, errors } = form.validate();
    // console.log(errors, 'errors');
    console.log('@Batch form values', form.values);

    console.log('@form validation triggered');
    console.log(hasErrors, 'haserror');

    if (hasErrors) {
      console.log('@batch form values', form.values);

      console.log('@batch creation error', errors.batchName);

      setFormErrors(errors);
      console.log(errors, 'errors');

      return;
    }
    console.log('after errors condition');
    setFormErrors({});
    form.validate();
    if (location.pathname.includes('edit') && batchId && batchId !== '') {
      console.log('edit batch');
      dispatch(editBatch(batchId ?? '', { ...values }));
      successNotification('Batch Successfully Created!');

      navigate('/teacher/batches');
    } else {
      console.log('createbatch');
      dispatch(createBatch({ ...values }));
      successNotification('Batch Successfully Created!');

      navigate('/teacher/batches');
    }
  };

  // const generateLink = async () => {
  //   try {
  //     const res = await axios.post('class-room/create-room');
  //     setLink(res.data.classRoomLink);

  //     values.classRoom = res.data.newCreatedData._id;
  //     values.classRoomLink = res.data.classRoomLink;
  //   } catch (error: any) {
  //     errorNotification(error?.toString());
  //   }

  //   successNotification('ClassRoom Link Generated Successfully!');
  //   setIsDisabled(true);
  // };

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

  return (
    <>
      <Card>
        <div className="top-bar flex items-center justify-start text-lg tracking-wider">
          <ActionIcon onClick={() => navigate(-1)}>
            <IconChevronLeft />
          </ActionIcon>
          <span>{editMode ? 'Edit' : 'Add New'} Class Room</span>
        </div>
        <div className="mt-md">
          <Grid>
            <Grid.Col span={6} mt={'md'}>
              <Input.Wrapper>
                <TextInput
                  label={'ClassRoom Title'}
                  variant="filled"
                  size="lg"
                  required
                  type="text"
                  placeholder="Your ClassRoom Title goes here"
                  name="batchName"
                  className={formErrors.batchName ? 'form-error-field' : ''}
                  {...form.getInputProps(`batchName`)}
                />
                {/* <div className="form-errors">{formErrors.batchName}</div> */}
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6} mt={'md'}>
              <Input.Wrapper>
                <Select
                  label={'Select Course'}
                  size="lg"
                  withAsterisk
                  placeholder="Select your Course"
                  itemComponent={SelectItem}
                  data={courseList}
                  searchable
                  maxDropdownHeight={400}
                  nothingFound="You don't have any course yet."
                  {...form.getInputProps(`course`)}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              {' '}
              <Input.Wrapper mt={'sm'}>
                {' '}
                <NumberInput
                  label={'Min Number of Students'}
                  defaultValue={0}
                  placeholder="Min Number of Students"
                  variant="filled"
                  size="lg"
                  withAsterisk
                  hideControls
                  {...form.getInputProps(`minEnrollStudent`)}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper mt={'sm'}>
                {' '}
                <NumberInput
                  label={'Max Number of Students'}
                  defaultValue={0}
                  placeholder="Max Number of Students"
                  variant="filled"
                  size="lg"
                  withAsterisk
                  hideControls
                  {...form.getInputProps(`maxEnrollStudent`)}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col md={6} sm={6} lg={6} xs={12} mt={'md'}>
              <Input.Wrapper>
                <Select
                  label={'Class type'}
                  size="lg"
                  variant="filled"
                  placeholder="Select Class Type"
                  data={[
                    { value: 'PHYSICAL', label: 'Physical' },
                    { value: 'REMOTE', label: 'Remote' },
                    { value: 'HYBRID', label: 'Hybrid' },
                  ]}
                  {...form.getInputProps(`classType`)}
                />
                {/* <Input
                  type="date"
                  placeholder="Your ClassRoom Title goes here"
                  {...form.getInputProps(`endDate`)}
                  className={formErrors.endDate ? 'form-error-field' : ''}
                /> */}
                {/* <div className="form-errors">{formErrors.endDate}</div> */}
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col md={6} sm={6} lg={6} xs={12} mt={'md'}>
              <Input.Wrapper>
                <TextInput
                  label={'Class Start Date'}
                  size="lg"
                  variant="filled"
                  required
                  type="date"
                  placeholder="Your ClassRoom Title goes here"
                  className={formErrors.startDate ? 'form-error-field' : ''}
                  {...form.getInputProps(`startDate`)}
                  onChange={(e) => {
                    const { value } = e.target;
                    form.setFieldValue('startDate', value); // Update the startDate in the values object
                  }}
                  min={new Date().toISOString().split('T')[0]} // Set min to today's date
                />
                {/* <div className="form-errors">{formErrors.startDate}</div> */}
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper>
                <TextInput
                  label={'Class Start Time'}
                  size="lg"
                  variant="filled"
                  type="time"
                  placeholder="Class start time"
                  {...form.getInputProps(`startTime`)}
                  className={formErrors.startTime ? 'form-error-field' : ''}
                />
                {/* <div className="form-errors">{formErrors.startTime}</div> */}
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper>
                {/* <Input
                  type="time"
                  placeholder="Your ClassRoom Title goes here"
                  {...form.getInputProps(`endTime`)}
                  className={formErrors.endTime ? 'form-error-field' : ''}
                /> */}
                <Select
                  label={'Class Duration'}
                  variant="filled"
                  size="lg"
                  placeholder="1 hrs"
                  rightSection={<IconChevronDown size="1rem" />}
                  rightSectionWidth={30}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  data={[
                    { value: '30', label: '30 min' },
                    { value: '45', label: '45 min' },
                    { value: '1', label: '1 hour' },
                    { value: '1.5', label: '1.5 hour' },
                    { value: '2', label: '2 hour' },
                  ]}
                  {...form.getInputProps(`classDuration`)}
                />
                {/* <div className="form-errors">{formErrors.endTime}</div> */}
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper>
                <Textarea
                  label={'Congratulations Message'}
                  minRows={4}
                  size="lg"
                  variant="filled"
                  placeholder="Congratulations Message"
                  {...form.getInputProps(`congratulationMessage`)}
                  className={formErrors.startTime ? 'form-error-field' : ''}
                />
                {/* <div className="form-errors">{formErrors.startTime}</div> */}
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper>
                {/* <Input
                  type="time"
                  placeholder="Your ClassRoom Title goes here"
                  {...form.getInputProps(`endTime`)}
                  className={formErrors.endTime ? 'form-error-field' : ''}
                /> */}
                <Textarea
                  label={'Welcome Message'}
                  variant="filled"
                  minRows={4}
                  size="lg"
                  placeholder="Welcome Message"
                  rightSection={<IconChevronDown size="1rem" />}
                  rightSectionWidth={30}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  {...form.getInputProps(`welcomeMessage`)}
                />
                <div className="form-errors">{formErrors.endTime}</div>
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Input.Wrapper>
                <NumberInput
                  label={'Pricing'}
                  placeholder="RS. 20,000"
                  variant="filled"
                  size="lg"
                  withAsterisk
                  hideControls
                  {...form.getInputProps(`price`)}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper>
                <NumberInput
                  label={'Discount'}
                  placeholder="0%"
                  variant="filled"
                  size="lg"
                  withAsterisk
                  hideControls
                  {...form.getInputProps(`discount`)}
                />
              </Input.Wrapper>
            </Grid.Col>
            {/* <Grid.Col span={6} className=" grid items-center">
              <Input.Wrapper label={'Generate ClassRoom Link'}>
                <div>
                  <Button onClick={generateLink} disabled={isDisabled}>
                    Generate Link
                  </Button>
                </div>
              </Input.Wrapper>
              <p>{values.classRoomLink}</p>
              <div className="form-errors">{formErrors.classRoomLink}</div>
            </Grid.Col> */}
          </Grid>
        </div>
        <div className="flex justify-end mt-md">
          <Button onClick={submit}>{editMode ? 'Save' : 'Create'}</Button>
          <Button onClick={() => navigate(-1)} variant={'subtle'}>
            Cancel
          </Button>
        </div>
      </Card>
    </>
  );
};

export default CreateBatch;
