/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import moment from 'moment';

export const courseDateFormatter = (date: string) => {
  return moment(date).isSame(new Date(), 'year')
    ? moment(date).format('MMM DD, YYYY')
    : moment(new Date()).diff(date, 'days') >= 3
    ? moment(date).format('MMM DD')
    : moment(date).fromNow();
};
