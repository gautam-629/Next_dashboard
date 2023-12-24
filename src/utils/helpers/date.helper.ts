/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import moment from 'moment';

export const formatDate = (date: any) => {
  const temp = new Date(date);
  return moment(temp).format('MMM DD, YYYY');
};


export const formatTime = (date: any) => {
  return moment(date).format('hh:mm A');
};

export const formatBlogDate = (date: any) => {
  return moment(date).format('YYYY/MM/DD')
}
