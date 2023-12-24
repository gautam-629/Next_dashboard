/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

export const getInitials = (str1 = '', str2 = '') => {
  if (str1.length === 0 && str2.length === 0) return '';
  return str1[0].toUpperCase() + str2[0].toUpperCase();
};

export const getFileNameFromUrl = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};
