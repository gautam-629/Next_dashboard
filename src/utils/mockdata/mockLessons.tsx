/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

const DESCRIPTION_MOCK = `<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>`;
export const MOCK_LESSONS = [
  {
    id: 1,
    title: 'grandparent 1',
    description: DESCRIPTION_MOCK,
    assignments: 3,
    files: 3,
    videos: 3,
    assessment: 4,
    children: [
      {
        id: 11,
        title: 'grand paren1 parent 1',
        description: DESCRIPTION_MOCK,
        assignments: 3,
        files: 3,
        videos: 3,
        assessment: 4,
        parentId: 1,
        children: [],
      },
      {
        id: 12,
        title: 'grand paren1 parent 2',
        description: DESCRIPTION_MOCK,
        assignments: 3,
        files: 3,
        videos: 3,
        assessment: 4,
        parentId: 1,
        children: [
          {
            id: 111,
            title: 'grand paren1 parent 2 child 1',
            description: DESCRIPTION_MOCK,
            assignments: 3,
            files: 3,
            videos: 3,
            assessment: 4,
            parentId: 1,
            children: [],
          },
          {
            id: 112,
            title: 'grand paren1 parent 2 child 2',
            description: DESCRIPTION_MOCK,
            assignments: 3,
            files: 3,
            videos: 3,
            assessment: 4,
            parentId: 1,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'grandparent 2',
    description: DESCRIPTION_MOCK,
    assignments: 3,
    files: 3,
    videos: 3,
    assessment: 4,
    children: [
      {
        id: 21,
        title: 'grand paren2 parent 1',
        description: DESCRIPTION_MOCK,
        assignments: 3,
        files: 3,
        videos: 3,
        assessment: 4,
        parentId: 1,
        children: [],
      },
      {
        id: 22,
        title: 'grand paren2 parent 2',
        description: DESCRIPTION_MOCK,
        assignments: 3,
        files: 3,
        videos: 3,
        assessment: 4,
        parentId: 1,
        children: [
          {
            id: 221,
            title: 'grand paren2 parent 1 child 1',
            description: DESCRIPTION_MOCK,
            assignments: 3,
            files: 3,
            videos: 3,
            assessment: 4,
            parentId: 1,
            children: [],
          },
          {
            id: 222,
            title: 'grand paren1 parent 1 child 2',
            description: DESCRIPTION_MOCK,
            assignments: 3,
            files: 3,
            videos: 3,
            assessment: 4,
            parentId: 1,
            children: [],
          },
        ],
      },
    ],
  },
];
