/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

// export const getCustomOrderSort = ({data, sortBy, sortField}: any) => {
//     const sortByObject = sortBy.reduce((obj: any, item: any, index: any) => {
//         return {
//             ...obj,
//             [item]: index,
//         };
//     }, {});
//     return data.sort(
//         (a: any, b: any) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
//     );
// };

export const groupArrayBy = (arr: any[], key: string) => {
  return arr.reduce((result: any, obj: any) => {
    const group = obj[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(obj);
    return result;
  }, {});
};

export const getCustomOrderSort = (array: readonly string[], sortOrder: readonly string[]) => {
  const temp = [...array].sort((x, y) => sortOrder.indexOf(x) - sortOrder.indexOf(y));
  return temp;
};

export const generatePageArray = (limit: number, count: number): number[] => {
  let val: number[] = [];
  const pageNum = Math.ceil(count / limit);
  for (let i = 0; i <= pageNum; i++) {
    val = [...val, i];
  }
  return val;
};
