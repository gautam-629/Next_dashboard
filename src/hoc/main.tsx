/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { BrowserRouter } from 'react-router-dom';
import { BaseTheme } from './theme';

export const MainContainer = (props: any) => {
  return (
    <BrowserRouter>
      <BaseTheme>{props.children}</BaseTheme>
    </BrowserRouter>
  );
};
