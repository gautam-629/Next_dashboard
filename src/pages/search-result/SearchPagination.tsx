/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { Divider } from '@mantine/core';
import { Pagination } from '@mantine/core';

const SearchPagination = () => {
  return (
    <>
      <div className="wrapper-x">
        <Pagination total={10} className="my-md justify-center" />
      </div>
    </>
  );
};

export default SearchPagination;
