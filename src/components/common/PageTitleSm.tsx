/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';

interface pageTitleProps {
  title: string;
}

export const PageTitleSm = ({ title }: pageTitleProps) => {
  return <div className=" font-medium  tracking-wide">{title} </div>;
};
