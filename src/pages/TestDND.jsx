

import React, { useState, useRef } from "react";

import SortableTree from 'react-sortable-tree'

import 'react-sortable-tree/style.css';


export const TestDND = () => {
  let course = [{
      title: 'Introduction to web development',
    "description": "short description",
    "classRoomLink": "",
    "course": "64e36bd107cc5bf4cf7a52bc",
    "children":[{
        "title": "starting web development",
        "description": "short description",
        "classRoomLink": "",
        "course": "64e36bd107cc5bf4cf7a52bc",
        "children": []
    }],
  },
    {
      "title": "How Https Works",
      "description": "short description",
      "classRoomLink": "",
      "course": "64e36bd107cc5bf4cf7a52bc",
      "children": []
  },
  {
    "title": "Introduction to PHP",
    "description": "short description",
    "classRoomLink": "",
    expanded: true,

    "course": "64e36bd107cc5bf4cf7a52bc",
    "children":[{
        "title": "PHP loops",
        "description": "short description",
        "classRoomLink": "",
        expanded: true,

        "course": "64e36bd107cc5bf4cf7a52bc",
        "children": [{
          "title": "Foreach",
          "description": "short description",
          "classRoomLink": "",
          expanded: true,

          "course": "64e36bd107cc5bf4cf7a52bc",
          "children": []
       }]
      },
      {
       "title": "PHP If Else",
       "description": "short description",
       "classRoomLink": "",
       "course": "64e36bd107cc5bf4cf7a52bc",
       "children": [{
         "title": "if else",
         "description": "short description",
         "classRoomLink": "",
         "course": "64e36bd107cc5bf4cf7a52bc",
         "children": []
      }]
      
    }]
  }]
  const [treeData, setTreeData] = useState(course);
  return (
    // <div style={{ height: 400 }} >
    <div  style={{ height: 600 }}> 
      <SortableTree
          treeData={treeData}
          onChange={treeData => setTreeData( treeData )}
          isVirtualized={false}
        />
  </div>
  );
};
