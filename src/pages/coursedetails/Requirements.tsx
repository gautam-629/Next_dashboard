import React from 'react';

interface RequirementsProps {
  requirements?: string[] | undefined;
}

const Requirements: React.FC<RequirementsProps> = ({ requirements }) => {
  return (
    <div className="mt-lg">
      <div>
        <p className="text-xl font-semibold">Requirements</p>
        {/* <p className="text-base font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod facilis fugit molestiae
          libero fugiat odio veniam, excepturi beatae tempora debitis minima nobis enim quam, et a
          ullam corrupti eaque. Dolor.
        </p> */}
        <ol className="mt-sm">
          <div className="ml-md">
            {requirements?.map((requirement: string, index: number) => (
              <li key={index} className="text-base font-normal">
                {requirement}
              </li>
            ))}
          </div>
        </ol>
      </div>
    </div>
  );
};

export default Requirements;
