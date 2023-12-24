/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Accordion, ActionIcon, Badge, Box, Button, Grid, Modal, Text } from '@mantine/core';
import moment from 'moment';
import { StudentTaskSubmissionForm } from './StudentTaskSubmissionForm';
import { StudentTaskSubmissionDetails } from './StudentTaskSubmissionDetails';
import { TaskSubmit } from '../student/pages/task/TaskSubmit';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ClassroomAssignmentCreate from './ClassroomCreateAssignment';
import { ClassroomAssignmentSubmit } from './ClassroomAssignmentSubmit';
import {
  IconArrowBack,
  IconArrowLeft,
  IconDownload,
  IconEye,
  IconTrash,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ResourcePreview } from './ResourcePreview';
import { useDisclosure } from '@mantine/hooks';
import ClassroomCreateResource from './ClassroomCreateResource';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { loadActiveTopicDetails } from '../../store/modules/classroom/actions';
import { errorNotification } from '../../plugins/notification';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../config/baseURL';

export const ClassroomResources = (props: any) => {
  const dispatch: any = useDispatch();

  const { data, setShowStats } = props;
  const [SubmitFormOpened, setSubmitFormOpened] = useState(false);
  const batch: any = useParams().batch;
  const location = useLocation();
  const [preview, setPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const activeTopic: any = useSelector((state: any) => state.classRoomReducer.activeTopic);

  const extractFileNameFromUrl = (url: string) => {
    // Use the URL constructor to parse the URL
    // const parsedUrl = new URL(url);

    // Get the pathname (e.g., "/file/get-file/Report_-fd83.pdf")
    // const pathname = parsedUrl.pathname;

    // Use string manipulation to extract the file name (e.g., "Report_-fd83.pdf")
    const fileName = url.toString().split('/').pop();

    return fileName;
  };

  const deleteResource = async (indexToRemove: any, item: any) => {
    console.log('delete video called for index', indexToRemove);

    const updatedUrls = data.filter((_element: any, index: number) => index !== indexToRemove);

    console.log('Items after delete', updatedUrls);

    try {
      await axios.put(`${BASE_URL}/file/delete-resource/${activeTopic}`, item);
      // await axios.delete(`${BASE_URL}/file/delete-resource/${activeTopic}/${indexToRemove}`);
      if (activeTopic) {
        // setActiveTopic(res.data);
        dispatch(loadActiveTopicDetails(activeTopic, batch._id));
      }
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-sm items-center">
        <div
          className={`text-lg font-semibold cursor-pointer flex items-center ${
            preview && 'text-primary-1000'
          }`}
          onClick={() => {
            setPreview(false);
          }}
        >
          {preview && <IconArrowLeft className="mr-xs" />} Resources list ({data?.length})
        </div>
        {location.pathname.includes('/teacher/') && (
          <>
            <div>
              <Button onClick={open}>Add Resource</Button>
            </div>

            <Modal
              opened={opened}
              onClose={close}
              title="Add Resource"
              // className={'classroom-add-assignment-modal'}
              centered
              size={'lg'}
            >
              <ClassroomCreateResource
                close={() => {
                  close();
                }}
              />
            </Modal>
          </>
        )}
      </div>

      {data?.length > 0 && (
        <Box>
          {data.map((v: any, key: number) => (
            <Box key={key}>
              {!preview && (
                <Box className="border-solid border-2 p-xs mb-xs bg-gray-100/75 rounded-lg border-gray-100 flex justify-between items-center">
                  <Text>
                    {/* <a href={v} download>
                    {extractFileNameFromUrl(v)}
                  </a> */}
                    <Link to={v} target="_blank">
                      {extractFileNameFromUrl(v)}
                    </Link>
                  </Text>
                  <Box className="flex items-center">
                    <ActionIcon
                      onClick={() => {
                        setUrl(v);
                        setShowStats(false);
                        setPreview(true);
                      }}
                      className="mr-sm"
                    >
                      <IconEye color="black" />
                    </ActionIcon>
                    <Link to={v} download={v} target="_blank">
                      <ActionIcon className="mr-sm">
                        <IconDownload color="green" />
                      </ActionIcon>
                    </Link>

                    {location.pathname.includes('/teacher/') && (
                      <ActionIcon
                        onClick={() => {
                          deleteResource(key, v);
                        }}
                      >
                        <IconTrash className="text-red-500" />
                      </ActionIcon>
                    )}
                  </Box>
                </Box>
              )}

              {/* <Box px={'xs'}>
                {location.pathname.includes('/student/') &&
                  (v.submitted ? (
                    <StudentTaskSubmissionDetails data={v.submission} assignmentId={v.id} />
                  ) : (
                    <TaskSubmit
                      id={v._id}
                      batch={batch}
                      setSubmitFormOpened={setSubmitFormOpened}
                    />
                  ))}
                {location.pathname.includes('/teacher/') && (
                  <div className="mt-sm">
                    <ClassroomAssignmentSubmit id={v._id} />
                  </div>
                )}
              </Box> */}
            </Box>
          ))}
        </Box>
      )}

      {preview && <ResourcePreview url={url} />}
    </div>
  );
};
