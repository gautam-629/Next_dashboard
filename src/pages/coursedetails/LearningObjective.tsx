import { Divider } from '@mantine/core';
import React from 'react';
interface LearningObjectiveProps {
  objective?: string[];
}
const LearningObjective = (props: LearningObjectiveProps) => {
  const learningObjective = props?.objective?.filter((data: any) => data.length);
  return (
    <>
      <div className="mt-normal mb-md">
        <p className="text-2xl font-semibold">Learning Objective</p>

        {learningObjective?.map((list: string, index: number) => (
          <div key={index} className="flex gap-sm items-center">
            <div className="checkmark text-xl ">&#10004; </div>
            <div className="text-base font-normal my-sm">{list}</div>
          </div>
        ))}
      </div>
      <Divider className="my-lg" />
    </>
  );
};

export default LearningObjective;
