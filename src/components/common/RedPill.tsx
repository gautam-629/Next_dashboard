/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

interface PillsProps {
  color?: string;
  title: string;
}
export const RedPill = ({ title, color }: PillsProps) => {
  return (
    <div>
      <div
        className={`c-tag text-[10px] rounded-full ml-xs font-medium  px-sm py-[3px] inline-block ${
          color ? color : 'red-pill'
        }`}
      >
        {title}
      </div>
    </div>
  );
};
