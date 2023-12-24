/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Group,
  useMantineTheme,
  Input,
  Modal,
  Card,
  Text,
  Tooltip,
  Badge,
  Table,
  Button,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';

import { CourseNotFound, Delete, Edit, Eye, TypingImg } from '../../../utils/assets/image';

import axios from '../../../plugins/axios';
import { isNotEmpty } from '@mantine/form';
import { FileSvg } from '../../../utils/assets/image';
import PdfM from './PdfM';
import DetailViewPopup from './DetailViewPopup';
import { errorNotification } from '../../../utils/helpers/notifications';
import { errorImageHandler } from '../../../utils/assets/imageurl';
import { StackTitleComponent } from '../../../components/common/StackTitleComponent';
import { formatDate } from '../../../utils/helpers/date.helper';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

export function AssignTask(singleBatch: any) {
  console.log(singleBatch.singleBatch, 'singlebatchdata');
  const { batch } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [element, setElement] = useState<any>({});
  const [pdfopened, setPdfOpened] = useState(false);
  const [pdfData, setPdfId] = useState();
  const [DetailOpened, setDetailOpened] = useState(false);
  const [isAssignmentListLoading, setIsAssignmentoading] = useState<boolean>(true);
  const [reloadCount, setReloadCount] = useState(0);
  const [AssignmentDetail, setAssignmentDetail] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`assignment/lists-by-batch/${batch}`);
        setElement(res.data);
        setCount(res.data.count);
        setIsAssignmentoading(false);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, [reloadCount]);
  const redirectToEditTask = (taskId: any) => {
    navigate(`/teacher/assignment/edit/${taskId}`);
  };
  const taskSubmitList = (taskId: any) => {
    navigate(`/teacher/assignment/submitTask/${taskId}`);
  };
  const pdf = (pdfUrl: any) => {
    if (pdfUrl[0] == '') {
      return false;
    } else {
      setPdfId(pdfUrl);
    }

    setPdfOpened(true);
  };

  const view_detail = (taskid: any) => {
    setAssignmentDetail(taskid);

    setDetailOpened(true);
  };

  const theme = useMantineTheme();
  const rows = element?.results?.map((item: any, index: any) => (
    <tr key={index}>
      <td>
        <p>{index + 1}</p>
      </td>
      <td>
        <div>
          <p className=" font-medium text-base   text-secondary-dark mb-xs">
            {item?.assignmentTitle ?? 'Untitled'}
          </p>
        </div>
      </td>
      <td>
        <p>{item?.course?.courseTitle ?? 'Untitled'}</p>
      </td>
      <td>
        <p>{item?.section?.sectionTitle ?? 'Untitled'}</p>
      </td>
      <td>
        <p>{item?.lesson?.lessonTitle ?? 'Untitled'}</p>
      </td>
      {/*<td></td>*/}

      <td
        key={index}
        className="h-full"
        onClick={() => pdf([item.imageUrl ?? '', item.assignmentTitle ?? 'Untitled'])}
      >
        {(() => {
          if (item.imageUrl.split('.').pop() == 'pdf') {
            return (
              <Tooltip label="click here">
                <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="pdf" />
              </Tooltip>
            );
          } else if (item.imageUrl == '') {
            return <p className="disabled">No File Available</p>;
          } else if (item.imageUrl.split('.').pop() == 'docx') {
            return <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="docs" />;
          } else {
            return (
              <img src={item.imageUrl} className="h-[30px] w-[30px] cursor-pointer" alt="images" />
            );
          }
        })()}
      </td>
      <td>
        <p>{formatDate(item.deadLine)}</p>
      </td>
      <td>
        <div
          className="submitTask cursor-pointer text-blue-600 text-center"
          title="Student Submit Task"
          key={index}
          onClick={() => taskSubmitList(item._id)}
        >
          <p>{item.taskSubmittedCount}</p>
        </div>
      </td>
      <td>
        <Badge>{item.isActive == true ? 'Active' : 'InActive'}</Badge>
      </td>
      <td>
        <div className="flex items-center">
          <div key={index} className="" onClick={() => redirectToEditTask(item._id)}>
            <p>
              <img src={Edit} className="mx-xs" />
            </p>
          </div>
          <div key={index} className="h-full" onClick={() => view_detail(item._id)}>
            <p>
              <img src={Eye} className="mx-xs  cursor-pointer" title="View Detail" />
            </p>
          </div>
        </div>
      </td>
    </tr>
  ));

  const notFoundComponent = () => {
    return (
      <div>
        <div className="flex  justify-center">
          <div className="flex flex-col justify-center items-center">
            <img
              onError={errorImageHandler}
              src={TypingImg}
              alt=""
              className="w-[145px] h-[145px]"
            />
            <Text className="text-center mt-[24px]  font-normal text-lg leading-[38px] ">
              Your Task list is empty.
            </Text>
            <Text className="text-center mt-[8px]  font-normal text-base  ">
              Please click Create Assignment Button to create Assignment , and it will be listed
              here
            </Text>

            <Button
              className="mt-sm"
              onClick={() =>
                navigate(
                  `/teacher/course/${singleBatch.singleBatch.course.courseId}/create-assignment`,
                )
              }
            >
              Create New Assignment
            </Button>
          </div>
        </div>
      </div>
    );
  };
  if (isAssignmentListLoading) return <LoadingSpinner />;
  return (
    <>
      <div>
        {count === 0 ? (
          notFoundComponent()
        ) : (
          <div>
            <Card>
              <div className="flex justify-between mb-md">
                <StackTitleComponent>Task</StackTitleComponent>
                <Group position="apart">
                  <Input
                    variant="filled"
                    icon={<IconSearch size={25} strokeWidth={1.5} color={'#14142B'} />}
                    placeholder="Search"
                  />
                </Group>
              </div>
              <div className="text-end mb-md ">
                <Button
                  onClick={() =>
                    navigate(
                      `/teacher/course/${singleBatch.singleBatch.course.courseId}/create-assignment`,
                    )
                  }
                >
                  Create New Assignment
                </Button>
              </div>
              <Table
                horizontalSpacing="lg"
                verticalSpacing="md"
                fontSize="lg"
                className="w-full task-table"
                highlightOnHover
              >
                <thead>
                  <tr className="task-list">
                    <th className="w-[5%]">SN.</th>
                    <th className="w-[%]">Title</th>
                    <th className="w-[15%]">Course</th>
                    <th className="w-[10%]">Section</th>
                    <th className="w-[10%]">Lesson</th>
                    <th className="w-[10%]">File</th>
                    <th className="w-[10%]">Deadline</th>
                    <th className="w-[10%]">Submitted</th>
                    <th className="w-[5%]">Status</th>
                    <th className="w-[15%]">Action</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Card>
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
                  size={'700px'}
                >
                  <DetailViewPopup
                    AssignmentDetail={AssignmentDetail}
                    setOpened={setDetailOpened}
                  />
                </Modal>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
