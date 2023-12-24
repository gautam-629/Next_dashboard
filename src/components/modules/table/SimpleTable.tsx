/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';
import { FileSvg } from '../../../utils/assets/image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GiConsoleController } from 'react-icons/gi';
import axios from 'axios';
import { Badge, Card, Table, Tabs, useMantineTheme } from '@mantine/core';
import PdfM from '../../../pages/TeacherDashBoard/assignments/PdfM';
import { formatDate } from '../../../utils/helpers/date.helper';

interface TableProps {
  tableData: any;
  element: any;
}
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import TaskDetail from '../../../pages/student/pages/task/TaskDetail';
import { TaskSubmit } from '../../../pages/student/pages/task/TaskSubmit';
export const SimpleTable = ({ element, tableData }: TableProps) => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState(0);
  const [SubmitFormOpened, setSubmitFormOpened] = useState(false);
  const [DetailOpened, setDetailOpened] = useState(false);
  const navigate = useNavigate();
  const { batch } = useParams();
  const [course, setCourse] = useState([]);
  const [pdfData, setPdfId] = useState();
  const [pdfopened, setPdfOpened] = useState(false);
  const theme = useMantineTheme();
  const [taskId, setTaskId] = useState('');
  console.log(element, '@element');
  const pdf = (pdfUrl: any) => {
    console.log(pdfUrl, 'pdfUrl');
    if (pdfUrl[0] == '') {
      return false;
    } else {
      setPdfId(pdfUrl);
    }

    setPdfOpened(true);
  };
  const submitTask = (taskId: any) => {
    // navigate(`/student/tasks/${batch}/${taskId}`);
    setSubmitFormOpened(true);
    console.log('submittask');

    setTaskId(taskId);
  };

  const editTask = (taskId: any) => {
    navigate(`/student/tasks/edit/${batch}/${taskId}`);
  };

  const viewDetailTask = (taskId: any) => {
    console.log('view task');
    setDetailOpened(true);
    setTaskId(taskId);
  };
  const rows = element?.results?.map((d: any, index: any) => (
    <tr key={index}>
      <td>
        <p>{index + 1}</p>
      </td>
      <td>
        <div>
          <div className="item-left flex gap-[10px]">
            <div
              className="flex items-center justify-center gap-[10px] h-[60px] w-[60px] rounded-full bg-gray-200 p-[10px] cursor-pointer"
              onClick={() => pdf([d.imageUrl ?? '', d.assignmentTitle ?? ''])}
            >
              <img src={FileSvg} alt="" className="h-[24px] " />
            </div>
            <div className=" text-xs text-gray-600">
              {d?.course?.courseTitle ?? '  Data Structure and Principle'}
              <p>{d?.assignmentTitle ?? 'No assignment title'}</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="item-center">
          <div className=" font-normal text-xs text-gray-600  mb-[12px]">Due Date</div>
          <div className=" font-normal tracking-wider  mb-[4px]"> {formatDate(d.deadLine)}</div>
          {/* <div className=" text-[10px] tracking-widest text-red-500">Overdue by 50 minutes</div> */}
        </div>
      </td>

      <td>
        {' '}
        <div>
          {(() => {
            if (d.taskSubmitted == null) {
              return (
                <div className="c-tag text-xs rounded-full font-medium bg-pink-200 w-max text-white px-sm py-[3px] inline-block">
                  Not Submitted
                </div>
              );
            } else {
              if (d.taskSubmitted.status == 'Completed') {
                return <Badge variant="light">{d.taskSubmitted.status ?? ''}</Badge>;
              } else if (d.taskSubmitted.status == 'Review') {
                return <Badge variant="light">{d.taskSubmitted.status ?? ''}</Badge>;
              } else if (d.taskSubmitted.status == 'Pending') {
                return <Badge variant="light">{d.taskSubmitted.status ?? ''}</Badge>;
              } else if (d.taskSubmitted.status == 'Received') {
                return <Badge variant="light">{d.taskSubmitted.status ?? ''}</Badge>;
              } else {
                return <Badge variant="light">{d.taskSubmitted.status ?? ''}</Badge>;
              }
            }
          })()}
        </div>
      </td>
      <td>
        {' '}
        {(() => {
          if (d.taskSubmitted == null) {
            return <Button onClick={() => submitTask(d._id)}>Submit Assignment</Button>;
          } else if (d.taskSubmitted.status == 'Completed') {
            return (
              <Button
                data-disabled
                sx={{ '&[data-disabled]': { pointerEvents: 'all' } }}
                onClick={(event) => event.preventDefault()}
              >
                Submit Assignment
              </Button>
            );
          } else if (d.taskSubmitted.status == 'Pending') {
            return (
              <Button variant="outline" onClick={() => editTask(d._id)}>
                Edit Assignment
              </Button>
            );
          }
        })()}
      </td>

      <td>
        {' '}
        <Button onClick={() => viewDetailTask(d._id)}>View Detail</Button>
      </td>
    </tr>
  ));

  return (
    <Card>
      <Tabs defaultValue="allassignment">
        <Tabs.List>
          <Tabs.Tab value="allassignment">All Assignment</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="allassignment">
          {' '}
          <Table
            highlightOnHover
            className="w-full task-table "
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fontSize="sm"
          >
            <thead>
              <tr className="task-list">
                <th className="w-[5%]">SN.</th>
                <th className="w-[15%]">Title</th>
                <th className="w-[20%]">Due Date</th>
                <th className="w-[10%]">Status</th>
                <th className="w-[15%]">Submit</th>
                <th className="w-[20%]">View Details</th>
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </Table>
        </Tabs.Panel>
      </Tabs>
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
        <div>
          <Modal
            opened={DetailOpened}
            onClose={() => setDetailOpened(false)}
            size="calc(100vw - 3rem)"
            title="Authentication"
          >
            <TaskDetail id={taskId} setDetailOpened={setDetailOpened} />
          </Modal>
        </div>
        <div>
          <Modal
            opened={SubmitFormOpened}
            onClose={() => setSubmitFormOpened(false)}
            size="calc(100vw - 3rem)"
            title="Authentication"
          >
            <TaskSubmit id={taskId} batch={batch} setSubmitFormOpened={setSubmitFormOpened} />
          </Modal>
        </div>
      </div>
    </Card>
  );
};
