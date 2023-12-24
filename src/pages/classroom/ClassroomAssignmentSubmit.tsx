/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Input,
  Modal,
  Button,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { isNotEmpty } from '@mantine/form';
import moment from 'moment';
import { StackTitleComponent } from '../../components/common/StackTitleComponent';
import StudentTaskDetail from '../TeacherDashBoard/assignments/StudentTaskDetail';
import { Eye, FileSvg } from '../../utils/assets/image';
import PdfM from '../TeacherDashBoard/assignments/PdfM';
import { errorNotification } from '../../utils/helpers/notifications';
import axios from '../../plugins/axios';

export function ClassroomAssignmentSubmit(props: any) {
  const { id } = props;
  const navigate = useNavigate();

  const [element, setElement] = useState([]);
  const [pdfopened, setPdfOpened] = useState(false);
  const [pdfData, setPdfId] = useState();
  const [DetailOpened, setDetailOpened] = useState(false);
  const [reloadCount, setReloadCount] = useState(0);
  const [AssignmentDetail, setAssignmentDetail] = useState();

  // const [element, setElement] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`task-submit/lists-by-assignment/${id}`);

        setElement(res.data);
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
  const rows = element.map((item: any, index: any) => (
    <tr key={index}>
      <td>
        <p>{index + 1}</p>
      </td>
      <td>
        <div>
          {item.student?.firstName} {item.student?.lastName}
        </div>
        <div>
          {(() => {
            if (item.fileUrl != '') {
              // if (item.fileUrl.split('.').pop() == 'pdf') {
              //   return (
              //     <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="pdf" />
              //   );
              // } else if (item.fileUrl == '') {
              //   return <p className="disabled">No File Available</p>;
              // } else if (item.fileUrl.split('.').pop() == 'docx') {
              //   return (
              //     <img src={FileSvg} className="h-[30px] w-[30px] cursor-pointer" alt="docs" />
              //   );
              // } else {
              //   return (
              //     <img
              //       src={item.fileUrl}
              //       className="h-[30px] w-[30px] cursor-pointer"
              //       alt="images"
              //     />
              //   );
              // }
              <Button
                variant={'subtle'}
                onClick={() => pdf([item.fileUrl ?? '', item.assignment.assignmentTitle])}
              >
                {'View Submission '}
              </Button>;
            } else {
              return <p className="disabled">No File Available</p>;
            }
          })()}{' '}
        </div>
      </td>
      <td>
        {moment(item.submittedAt).format('YYYY/MM/DD kk:mm:ss')}

        {/* <p>{item.submittedAt}</p> */}
      </td>
      {/* <td>
        <p>{item.description}</p>
      </td> */}
      {/*<div*/}
      {/*  key={index}*/}
      {/*  className="h-full"*/}
      {/*>*/}
      {/*  <td></td>*/}
      {/* <td>
          {item.imageUrl.split('.').pop() == 'pdf' ? (
            <img src={FileSvg} className="h-[100px] w-[100px]" alt="pdf" />
          ) : (
            <img src={item.imageUrl} className="h-[100px] w-[100px]" alt="images" />
          )}
        </td> */}
      {/* </a> */}
      {/*</div>*/}
      <td>
        {(() => {
          if (item.status == 'Completed') {
            return (
              <Badge variant="gradient" gradient={{ from: 'green', to: 'green' }}>
                Completed
              </Badge>
            );
          } else if (item.status == 'Received') {
            return (
              <Badge variant="gradient" gradient={{ from: 'indigo', to: 'blue' }}>
                Received
              </Badge>
            );
          } else if (item.status == 'Review') {
            return (
              <Badge variant="gradient" gradient={{ from: '#077E8C', to: '#077E8C' }}>
                Review
              </Badge>
            );
          } else {
            return (
              <Badge variant="gradient" gradient={{ from: '#F7CB73', to: '#F7CB73' }}>
                Pending
              </Badge>
            );
          }
        })()}{' '}
      </td>
      <td>{item.remarks}</td>

      <td>
        {/* <div key={index} className="" onClick={() => redirectToEditTask(item._id)}>
          <p>
            <img src={Edit} className="mr-lg"/>
          </p>
        </div> */}
        <div key={index} className="h-full" onClick={() => view_detail(item._id)}>
          <p>
            <img src={Eye} className="mr-lg  cursor-pointer" title="View Detail" />
          </p>
        </div>

        <p>
          {/* <Link to={`/teacher/assignment/${item._id}/edit`}>
              <img src={Edit} className="mr-lg"/>
            </Link> */}

          {/* <img src={Edit} className="mr-lg"/> */}
          {/* <img src={Delete} className=""/> */}
        </p>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="">
        <table className="w-full task-table">
          <thead>
            <tr className="task-list">
              <th className="w-[5%]">SN.</th>
              <th className="w-[30%]">FullName</th>
              <th className="w-[20%]">Submit Date</th>
              {/* <th className="w-[10%]">Description</th> */}
              {/*<th className="w-[10%]">File</th>*/}
              <th className="w-[10%]">Status</th>
              <th className="w-[10%]">Remarks</th>
              <th className="w-[10%]">Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
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
            title={<div className="font-bold text-lg">Submitted Assignment</div>}
            // className="pop-modal assign-task-modals"
            size={'600px'}
          >
            <StudentTaskDetail
              AssignmentDetail={AssignmentDetail}
              setOpened={setDetailOpened}
              setReloadCount={setReloadCount}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}
