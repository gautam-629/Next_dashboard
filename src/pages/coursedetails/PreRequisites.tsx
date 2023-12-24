import React from 'react';

interface RequirementsProps {
  Prerequisites?: string[] | undefined;
}

const PreRequisites: React.FC<RequirementsProps> = ({ Prerequisites }) => {
  return (
    <div className="mt-lg">
      <div>
        <p className="text-xl font-semibold">Pre-Requisites</p>
        {/* <p className="text-base font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod facilis fugit molestiae
          libero fugiat odio veniam, excepturi beatae tempora debitis minima nobis enim quam, et a
          ullam corrupti eaque. Dolor.
        </p> */}
        <ol className="mt-sm">
          <div className="ml-md">
            {Prerequisites?.map((prerequisite: string, index: number) => (
              <li key={index} className="text-base font-normal">
                {prerequisite}
              </li>
            ))}
          </div>
        </ol>
      </div>
    </div>
  );
};

export default PreRequisites;
