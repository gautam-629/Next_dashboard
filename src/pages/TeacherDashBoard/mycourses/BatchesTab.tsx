import { Badge, Button, Card, Grid, Progress } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { enrollToBatch } from '../../../api/batch';
import { successNotification } from '../../../utils/helpers/notifications';
import axios from '../../../plugins/axios';
import { formatDate } from '../../../utils/helpers/date.helper';
import CourseImage from '../course-create/finishing-up/CourseImage';
import { Batches } from '../Batches';

const BatchesTab = (props: any) => {
  return (
    <>
      {' '}
      <div>
        <Batches />
      </div>
    </>
  );
};

export default BatchesTab;
