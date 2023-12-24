import { Tabs } from '@mantine/core';
import React from 'react';

const TabsList = () => {
  const tabs = ['CourseOverView', 'Certifications', 'About Instructor', 'Reviews', 'FAQS'];
  return (
    <div className="mt-lg mb-md">
      {' '}
      <div className="sticky top-[86px]">
        {' '}
        <Tabs defaultValue="CourseOverView" className=" text-lg p-0">
          <Tabs.List className=" border-none h-[54px]" grow>
            {tabs.map((tab: string, index: number) => (
              <Tabs.Tab value={tab} className="text-lg font-semibold active-tabs" key={index}>
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>
    </div>
  );
};

export default TabsList;
