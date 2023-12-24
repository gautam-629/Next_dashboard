/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import moment from 'moment';
import { handleDownload } from '../../utils/helpers/file.helper';
import { Button } from '@mantine/core';

export const StudentTaskSubmissionDetails = (props: any) => {
  const { data } = props;
  return (
    <div>
      <div className="flex justify-between">
        <div>
          {/* <div className="text-sm font-semibold ">Submission</div> */}
          {data?.fileUrl && (
            <div>
              <Button
                // compact
                // variant={'light'}
                // color={'primary'}
                radius={'md'}
                onClick={() => handleDownload(data.fileUrl)}
              >
                Download submitted file
              </Button>
            </div>
          )}
        </div>
        <div>
          <div className="text-xs font-bold">Submitted at</div>
          <div>{moment(data?.submittedAt ?? new Date()).format('MMM DD, YYYY')}</div>
        </div>
      </div>
      <div className={'mt-md'}>
        <div className="text-xs font-extrabold text-primary-700">Solution description</div>
        <div dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}></div>
      </div>
      {data?.status.toLowerCase() === 'completed' && data?.remarks?.length > '' && (
        <>
          <div className="text-xs font-extrabold text-secondary-700">Remarks</div>
          <div>{data?.remarks}</div>
        </>
      )}
    </div>
  );
};
