/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import React from 'react';
import { IconSearch } from '@tabler/icons-react';

import { Input, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  label: string;
  onSearch: (prams: string) => void;
}

export const LabelSearch = ({ label, onSearch }: SearchProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="label text-2xl cursor-pointer" onClick={() => navigate(-1)}>
        {label}
      </div>
      <div className="search-bar max-w-[325px] w-full">
        <Input
          icon={<IconSearch />}
          placeholder="Search"
          variant={'filled'}
          className={'w-full'}
          size={'md'}
          onChange={(e) => onSearch(e?.target?.value)}
        />
      </div>
    </div>
  );
};
