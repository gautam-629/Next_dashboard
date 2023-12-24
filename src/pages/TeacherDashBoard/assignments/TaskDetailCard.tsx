/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useMantineTheme, Button, Input, Modal, Card, Pagination, Grid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconFile, IconSearch } from '@tabler/icons-react';
import { TypingImg } from '../../../utils/assets/image';
import './pdf_style.css';

import axios from '../../../plugins/axios';
import { useForm } from '@mantine/form';

import { INITIAL_TASK } from '../../../utils/interfaces/Task.model';
import TaskM from './TaskM';

import PdfM from './PdfM';
import DetailViewPopup from './DetailViewPopup';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { errorNotification } from '../../../utils/helpers/notifications';
import { StackTitleComponent } from '../../../components/common/StackTitleComponent';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

export function TaskDetailCard(props: any) {
  let { course } = useParams();
  // let course = props?.course;
  // if (!course) {
  //   course = props.course;
  // }
  console.log(course, 'courseId');
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [pdfopened, setPdfOpened] = useState(false);
  const [DetailOpened, setDetailOpened] = useState(false);

  const theme = useMantineTheme();
  const [batchData, setBatch] = useState();
  const [element, setElement] = useState([]);
  const [taskId, setTaskId] = useState();
  const [pdfData, setPdfId] = useState();
  const [AssignmentDetail, setAssignmentDetail] = useState();
  const [count, setCount] = useState(0);
  const [reloadCount, setReloadCount] = useState(0);
  const [courseTitle, setCourseTitle] = useState('');
  const [isAssignmentLoading, setIsAssignmentLoading] = useState<boolean>(true);
  useEffect(() => {
    // console.log("@Assignment be");

    (async () => {
      const limit = 4;
      try {
        const res = await axios.get(`assignment/${course}/list/?page=${1}&limit=${limit}`);
        const totalPage = Math.ceil(res.data.count / 4);
        console.log(res, '@response');
        setCount(totalPage);
        setElement(res.data.results);
        setCourseTitle(res.data.courseTitle);
        setIsAssignmentLoading(false);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
      try {
        const batches = await axios.get(`batch/${course}/all`);
        const batchdata = batches?.data?.results.map((d: any) => {
          return { value: d._id, label: d.batchName ?? 'Untitled' };
        });

        setBatch(batchdata);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, [reloadCount]);

  const LoadTaskList = async (page: number) => {
    const limit = 4;
    try {
      const res = await axios.get(`assignment/${course}/list/?page=${page}&limit=${limit}`);
      setElement(res.data.results);
      const totalPage = Math.ceil(res.data.count / 4);
      setCount(totalPage);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  const redirectToEditTask = (taskId: any) => {
    navigate(`/teacher/assignment/edit/${taskId}`);
  };

  const assign = (taskId: any) => {
    setTaskId(taskId);

    setOpened(true);
  };

  const view_detail = (taskid: any) => {
    setAssignmentDetail(taskid);

    setDetailOpened(true);
  };
  const pdf = (pdfUrl: any) => {
    if (pdfUrl[0] == '') {
      return false;
    } else {
      setPdfId(pdfUrl);
    }

    setPdfOpened(true);
  };
  const form = useForm({
    initialValues: {
      ...INITIAL_TASK,
    },
  });
  const { values } = form;

  const notFoundComponent = () => {
    return (
      <Card mt={'xs'} className="rounded-lg mr-sm">
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center">
            <img
              src={TypingImg}
              onError={errorImageHandler}
              style={{
                height: '50vh',
                maxHeight: '500px',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            ></img>
            <Text className="text-center mt-[24px]  font-normal text-lg leading-[38px] ">
              Your Assigmnet list is empty.
            </Text>
            <Text className="text-center mt-[8px]  font-normal text-base  ">
              Create assignment, and it will be listed here
            </Text>
            <Button
              onClick={() => navigate('/teacher/assignment/create')}
              className="ml-md my-normal"
            >
              Create New Assignment
            </Button>
          </div>
        </div>
      </Card>
    );
  };
  console.log(batchData, '@batchData');
  if (isAssignmentLoading) return <LoadingSpinner />;
  return (
    <>
      {count === 0 ? (
        notFoundComponent()
      ) : (
        <div>
          <Card>
            <div className="flex justify-between mb-md">
              <StackTitleComponent>
                <div className={'text-lg font-bold cursor-pointer'} onClick={() => navigate(-1)}>
                  {courseTitle}
                </div>
              </StackTitleComponent>
              <div className={'flex'}>
                <Input
                  variant="filled"
                  icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
                  placeholder="Search"
                />
                <Button onClick={() => navigate('/teacher/assignment/create')} className="ml-md">
                  Create New Assignment
                </Button>
              </div>
            </div>
            {element?.map((item: any, index: any) => (
              <Card
                className="mx-md bg-trasnparent hover:bg-Grayscale-200 mb-lg"
                withBorder
                key={index}
              >
                <Grid align="center" className="p-none">
                  <Grid.Col className="p-none m-none" md={4}>
                    <div className="">
                      <p className="text-base font-semibold leading-7 text-secondary-dark">
                        {item.assignmentTitle}
                      </p>
                      <p className="text-xs font-normal leading-normal text-secondary-default ">
                        Section:{' '}
                        <span className="text-sm">{item?.section?.sectionTitle ?? 'Null'}1</span>
                      </p>
                      <p className="text-xs font-normal leading-normal text-secondary-default">
                        Lesson:{' '}
                        <span className="text-sm ">{item?.lesson?.lessonTitle ?? 'Null'}</span>
                      </p>
                    </div>
                  </Grid.Col>
                  <Grid.Col md={4}>
                    <Grid align="center">
                      <Grid.Col className="p-none m-none" span={6}>
                        <div className="text-center">
                          <IconFile
                            className="cursor-pointer"
                            size={24}
                            strokeWidth={2}
                            color={'#414141'}
                            onClick={() => pdf([item.imageUrl ?? '', item.assignmentTitle ?? ''])}
                          />

                          {item.imageUrl === '' ? (
                            <div>
                              <p className="text-sm font-normal leading-normal text-secondary-default">
                                No Attach File
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-normal leading-normal text-secondary-default">
                                Attached File
                              </p>
                            </div>
                          )}
                        </div>
                      </Grid.Col>

                      <Grid.Col className="p-none m-none" span={6}>
                        <div className="text-center">
                          <p className="text-sm font-normal leading-normal text-secondary-default">
                            {item?.batches?.length ?? '0'}
                          </p>
                          <p className="text-sm font-normal leading-normal text-secondary-default ">
                            Batch Assigned
                          </p>
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                  <Grid.Col className="p-none m-none" md={4}>
                    <div className="flex justify-end items-center">
                      <Button variant="outline" onClick={() => assign(item._id)}>
                        Assign Task
                      </Button>
                      <Button className="mx-xs" onClick={() => view_detail(item._id)}>
                        View Details
                      </Button>
                    </div>
                  </Grid.Col>
                </Grid>
              </Card>
            ))}
          </Card>

          <div className="flex justify-center mt-lg">
            {' '}
            <div>
              {' '}
              <Pagination total={count} onChange={LoadTaskList} />
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-opacity-55 blur-md"
        style={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          backdropFilter: 'blur(3px)',
        }}
      >
        <div className="bg-opacity-55 blur-md">
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            radius="lg"
            className="pop-modal assign-task-modal"
          >
            <TaskM
              taskId={taskId}
              form={form}
              values={values}
              batchdata={batchData}
              course={course}
              setOpened={setOpened}
              setReloadCount={setReloadCount}
            />
          </Modal>
        </div>
        <div className="bg-opacity-55 blur-md">
          <Modal
            opened={pdfopened}
            onClose={() => setPdfOpened(false)}
            radius="lg"
            title={<div className="font-bold text-lg">View Document</div>}
            className="pop-modal assign-task-modals"
            size={'1000px'}
          >
            <PdfM pdfData={pdfData} setOpened={setPdfOpened} />
          </Modal>
        </div>

        <div className="bg-opacity-55 blur-md">
          <Modal
            opened={DetailOpened}
            onClose={() => setDetailOpened(false)}
            radius="lg"
            title={<div className="font-bold text-lg">View Assignment Detail</div>}
            className="pop-modal assign-task-modals"
            size={' 700px'}
          >
            <DetailViewPopup AssignmentDetail={AssignmentDetail} setOpened={setDetailOpened} />
          </Modal>
        </div>
      </div>
    </>
  );
}
