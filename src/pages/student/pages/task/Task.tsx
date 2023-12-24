/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useEffect, useState } from 'react';
import { AnalysisBar } from '../../../../components/common/AnalysisBar';
import { LabelSearch } from '../../../../components/common/LabelSearch';
import { SimpleTable } from '../../../../components/modules/table/SimpleTable';
import { INITIAL_STUDENT_TASK_DATA } from '../../../../utils/mockdata/StudentTaskData';
import { errorNotification } from '../../../../utils/helpers/notifications';
import axios from '../../../../plugins/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@mantine/core';

export const Task = (props: any) => {
  const [notSubmittedCount, setNotSubmittedCount] = useState(0);
  const { batch } = useParams();
  const [submittedCount, setSubmittedCount] = useState(0);
  const [element, setElement] = useState<any>([]);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([...INITIAL_STUDENT_TASK_DATA]);
  useEffect(() => {
    taskDataHandler();
    getData();
  }, []);

  const taskDataHandler = () => {
    props?.element?.forEach((data: any) => {
      if (!data.taskSubmitted) {
        setNotSubmittedCount(notSubmittedCount + 1);
      }
      if (['Pending', 'Received', 'Review', 'Completed'].includes(data.taskSubmitted?.status)) {
        setSubmittedCount(submittedCount + 1);
      }
    });
  };

  const [analysisData, setAnalysisData] = useState([
    { title: 'Total Assignment', number: props.element?.length ?? 0 },
    { title: 'Submitted', number: submittedCount },
    { title: 'Left Submission', number: notSubmittedCount },
  ]);
  const getData = async () => {
    try {
      const batchDetails = (await axios.get(`assignment/task-list/${batch}`)) ?? [];
      setElement(batchDetails.data);
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };
  // const { element } = props;
  return (
    <Card className="mr-normal">
      <div className="left w-full py-sm">
        {/* search bar */}
        <LabelSearch label="My Assignment" onSearch={() => null} />
        {/* analysis box */}
        {/* <AnalysisBar data={analysisData} /> */}
        {/* task table */}
        <div className={'mt-md'}>
          <SimpleTable tableData={tableData} element={element} />
        </div>
      </div>
    </Card>
  );
};
