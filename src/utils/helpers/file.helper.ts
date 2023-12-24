/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { getFileNameFromUrl } from './typo';
import { APIDownloadFile } from '../../api/fille';

export const handleDownload = async (link: string) => {
  const fileName = getFileNameFromUrl(link);
  const res: any = await APIDownloadFile(fileName);
  const blob = new Blob([res.data]);
  const url: any = window.URL.createObjectURL(blob);
  const downloadlink = document.createElement('a');
  downloadlink.href = url;
  downloadlink.setAttribute('download', fileName);
  document.body.appendChild(downloadlink);
  downloadlink.click();
  document.body.removeChild(downloadlink);
};
