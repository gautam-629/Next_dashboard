/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React, { useState } from 'react';

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

interface TaskProps {
  setOpened: any;
  pdfData: any;
}

export const PdfM = (props: TaskProps) => {
  const { pdfData, setOpened } = props;

  const newPlugin = defaultLayoutPlugin();

  const fileType = ['application/pdf'];

  return (
    <div className="pdf_modal h-[1000px] w-[500px]">
      <h4 className="text-center absolute top-[34px] right-[336px]">
        Assignment Title: {pdfData[1]}
      </h4>

      <div className="pdf_component">
        {pdfData[0].split('.').pop() == 'pdf' ? (
          <iframe className="h-[600px] w-[900px]" src={pdfData[0]}></iframe>
        ) : (
          <img src={pdfData[0]} className="h-[580px] w-[900px]" alt="images" />
        )}

        {/* <iframe className="h-[600px] w-[900px]" src={pdfId}></iframe> */}
        {/* show pdf conditionally (if we have one)  */}
        {/* {pdfId && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfId} plugins={[]} />
            </Worker>
          </>
        )} */}
        {/* if we dont have pdf or viewPdf state is null */}
        {/* {!pdfId && <>No pdf file selected</>} */}
      </div>
    </div>
  );
};

export default PdfM;
