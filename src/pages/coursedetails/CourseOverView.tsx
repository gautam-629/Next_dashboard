import React, { useEffect } from 'react';
import Accord from '../../components/modules/course/Coursedetails/Accord';
import CourseContent from '../../components/modules/course/Coursedetails/CourseContent';
import { Accordion, Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Assessment, Assignment, File, FileResource, Task, Video } from '../../utils/assets/image';
const CourseOverView = () => {
  return (
    <div>
      <p className="text-2xl font-bold my-md">Course OverView</p>
      <div>
        {/* <CourseContent /> */}

        <div className="">
          <Text className="text-xl font-semibold mb-sm">Course Content</Text>
          {/* <div className="flex justify-between mb-xs">
            <p className="text-base font-normal ">15 Sections</p>
            <p className="text-base font-semibold text-primary-200 ">Expand All Sections</p>
          </div> */}
          <Accordion
            variant="contained"
            chevronPosition="left"
            styles={{
              chevron: {
                width: '3rem',
                height: '3rem',
                strokeWidth: 13,
              },
            }}
          >
            <Accordion.Item value="Chapter1" className="bg-[#F7F7FC] hover:bg-[#F7F7FC] ">
              <Accordion.Control className="!font-extrabold">
                <div className="flex justify-between">
                  {' '}
                  <span className="font-extrabold">Chapter1</span>{' '}
                  <span className="text-sm font-normal text-primary-1000">2 Credit Hours</span>
                </div>
              </Accordion.Control>
              <Accordion.Panel className="bg-white hover:!bg-white">
                <div className="bg-white hover:!bg-white">
                  <Accordion chevronPosition="right" defaultValue="customization">
                    <Accordion.Item value="Introduction to python" className="border-b-0">
                      <div className="flex flex-start gap-sm items-center">
                        <div className="flex items-center">
                          <span className="mr-[4px]">
                            <img src={FileResource}></img>
                          </span>
                          <p>2 Resource files</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-[4px]">
                            <img src={Task}></img>
                          </span>
                          <p>2 Resource files</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-[4px]">
                            <img src={Video}></img>
                          </span>
                          <p>2 Resource files</p>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-[4px]">
                            <img src={Assessment}></img>
                          </span>
                          <p>2 Resource files</p>
                        </div>
                      </div>
                      <Accordion.Control className="bg-white hover:!bg-white">
                        <span className=""> Introduction to python</span>
                      </Accordion.Control>
                      <Accordion.Panel className="p-xs">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
                          nostrum debitis? Ratione odit architecto nulla numquam pariatur excepturi
                          inventore saepe? Ducimus, aspernatur natus consequuntur excepturi
                          molestias mollitia commodi. Mollitia, modi.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Chapter2" className="bg-[#F7F7FC] hover:bg-[#F7F7FC] ">
              <Accordion.Control className="!font-extrabold">
                <div className="flex justify-between">
                  {' '}
                  <span className="font-extrabold">Chapter2</span>{' '}
                  <span className="text-sm font-normal text-primary-1000">2 Credit Hours</span>
                </div>
              </Accordion.Control>
              <Accordion.Panel className="bg-white hover:!bg-white">
                <div className="bg-white hover:!bg-white">
                  <Accordion chevronPosition="right" defaultValue="customization">
                    <Accordion.Item value="Introduction to python" className="border-b-0">
                      <Accordion.Control className="bg-white hover:!bg-white">
                        <span className=""> Introduction to python</span>
                      </Accordion.Control>
                      <Accordion.Panel className="p-xs">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
                          nostrum debitis? Ratione odit architecto nulla numquam pariatur excepturi
                          inventore saepe? Ducimus, aspernatur natus consequuntur excepturi
                          molestias mollitia commodi. Mollitia, modi.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Chapter3" className="bg-[#F7F7FC] hover:bg-[#F7F7FC] ">
              <Accordion.Control className="!font-extrabold">
                <div className="flex justify-between">
                  <span className="font-extrabold">Chapter3</span>{' '}
                  <span className="text-sm text-primary-1000 font-normal">2 Credit Hours</span>
                </div>
              </Accordion.Control>
              <Accordion.Panel className="bg-white hover:!bg-white">
                <div className="bg-white hover:!bg-white">
                  <Accordion chevronPosition="right" defaultValue="customization">
                    <Accordion.Item value="Introduction to python" className="border-b-0">
                      <Accordion.Control className="bg-white hover:!bg-white">
                        <span className=""> Introduction to python</span>
                      </Accordion.Control>
                      <Accordion.Panel className="p-xs">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
                          nostrum debitis? Ratione odit architecto nulla numquam pariatur excepturi
                          inventore saepe? Ducimus, aspernatur natus consequuntur excepturi
                          molestias mollitia commodi. Mollitia, modi.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="Chapter4" className="bg-[#F7F7FC] hover:bg-[#F7F7FC] ">
              <Accordion.Control className="!font-extrabold">
                <div className="flex justify-between">
                  <span className="font-extrabold">Chapter4</span>{' '}
                  <span className="text-sm text-primary-1000 font-normal">2 Credit Hours</span>
                </div>
              </Accordion.Control>
              <Accordion.Panel className="bg-white hover:!bg-white">
                <div className="bg-white hover:!bg-white">
                  <Accordion chevronPosition="right" defaultValue="customization">
                    <Accordion.Item value="Introduction to python" className="border-b-0">
                      <Accordion.Control className="bg-white hover:!bg-white">
                        <div className="flex justify-between">
                          <span className=""> Introduction to python</span>
                          <span className="text-sm text-primary-1000 font-normal">
                            2 Credit Hours
                          </span>
                        </div>
                      </Accordion.Control>
                      <Accordion.Panel className="p-xs">
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
                          nostrum debitis? Ratione odit architecto nulla numquam pariatur excepturi
                          inventore saepe? Ducimus, aspernatur natus consequuntur excepturi
                          molestias mollitia commodi. Mollitia, modi.
                        </div>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CourseOverView;
