/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { ActionIcon, Box, Button, Modal, Paper, Tabs, Text } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadActiveTopicDetails,
  setActiveTopicDetails,
  setClassroomWildcardComponent,
  setDrawer,
} from '../../../store/modules/classroom/actions';
import { APIGetTopicDetailsById } from '../../../api/topic';
import { useDisclosure } from '@mantine/hooks';
import ClassroomAssignmentCreate from '../../../pages/classroom/ClassroomCreateAssignment';
import { useLocation } from 'react-router-dom';
import { ClassroomResources } from '../../../pages/classroom/ClassroomResources';
import { Cross } from 'tabler-icons-react';
import { ClassroomTopicForum } from '../../../pages/classroom/ClassroomTopicForum';
import Assessments from './Assessments';
import { ClassroomAssignments } from '../../../pages/classroom/ClassroomAssignments';
import { ClassroomAssessments } from '../../../pages/classroom/ClassroomAssessments';
import AssessmentSection from '../../../pages/TeacherDashBoard/course-create/plan-your-course/AssessmentSection';

export const LessonDetails = (props: any) => {
  const { setShowStats, setVideoSize, videoSize } = props;
  const [reload, setReload] = useState<boolean>(false);

  const dispatch: any = useDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAssessment, { open: openAssessmentModal, close: closeAssessmentModal }] =
    useDisclosure(false);
  const active = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const syllabus = useSelector((state: any) => state.classRoomReducer.syllabus);

  const batch = useSelector((state: any) => state.classRoomReducer.batch);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopicDetails);
  console.log(activeTopic, '@activetopic');
  const activeWildCard = useSelector(
    (state: any) => state.classRoomReducer.wildcardClassroomComponent,
  );

  const [currentActive, setCurrentActive] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (active !== '-1') {
      loadTopicById();
    }
  }, [active]);

  const loadTopicById = async () => {
    if (active) {
      // setActiveTopic(res.data);
      dispatch(loadActiveTopicDetails(active, batch._id));
    }
  };

  useEffect(() => {
    console.log('@Reload triggered', currentActive);
    dispatch(loadActiveTopicDetails(currentActive, batch._id));
  }, [reload]);

  const [grandparent, setGrandParent] = useState('');
  const [parent, setParent] = useState('');
  const [child, setChild] = useState('');

  useEffect(() => {
    const parent = null;
    const middle = null;
    const Child = null;

    function findObjectAndParents(rootArray: any, targetId: any) {
      function search(currentArray: any, path: any) {
        for (const current of currentArray) {
          // Create a new path array that includes the current object
          const currentPath = [...path, current];

          if (current._id === targetId) {
            return {
              object: current,
              parent: path[path.length - 1], // Parent is the last object in the path
              grandparent: path[path.length - 2], // Grandparent is the second-to-last object in the path
            };
          }

          if (current.topics && current.topics.length > 0) {
            const result: any = search(current.topics, currentPath);
            if (result) {
              return result;
            }
          }
        }

        return null;
      }

      return search(rootArray, []);
    }

    const targetIdToFind = activeTopic._id;
    const result = findObjectAndParents(syllabus, targetIdToFind);

    if (result) {
      setGrandParent(result?.grandparent?.title);
      setParent(result?.parent?.title);
      setChild(result?.object?.title);
    }
  }, [activeTopic]);

  return (
    <Paper pb={'sm'} pr={'sm'} pl={'sm'} className={'bg-light-gray'}>
      <Box className="flex items-center mb-sm">
        <Text>
          {/* {activeTopic.title}{' '} */}
          {/* {grandparent}
          {parent}
          {child} */}

          {grandparent == undefined ? (
            parent == undefined ? (
              <Text className="text-secondary-dark font-semibold tracking-wider leading-10 text-xl  flex items-center">
                {child}
              </Text>
            ) : (
              <div className="flex items-center">
                <Text className="text-secondary-dark font-semibold tracking-wider leading-10 text-xl  ">
                  {parent}&nbsp;
                </Text>

                <Text className="text-secondary-dark text-lg font-medium leading-8 tracking-wider">
                  {'> '}&nbsp;
                  {child}
                </Text>
              </div>
            )
          ) : (
            <div className="flex items-center">
              <Text className="text-secondary-dark font-semibold tracking-wider leading-10 text-xl  ">
                {grandparent}&nbsp;
              </Text>

              <Text className="text-secondary-dark text-lg font-medium leading-8 tracking-wider">
                {'>'}&nbsp;
                {parent}&nbsp;
                {'>'}&nbsp;
                {child}
              </Text>
            </div>
          )}
        </Text>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        size={'40%'}
        title="Add Assignment"
        className={'classroom-add-assignment-modal'}
      >
        <ClassroomAssignmentCreate close={() => close()} />
      </Modal>
      <Tabs
        value={activeWildCard}
        onTabChange={(val) => dispatch(setClassroomWildcardComponent(val))}
      >
        <Tabs.List>
          <Tabs.Tab value="description">
            <Text className="font-semibold">Description</Text>
          </Tabs.Tab>
          <Tabs.Tab value="resources">
            <Text className="font-semibold">Resource Files</Text>
          </Tabs.Tab>

          <Tabs.Tab value="assignments">
            <Text className="font-semibold">Assignment</Text>
          </Tabs.Tab>
          <Tabs.Tab value="forum">
            <Text className="font-semibold">Forum</Text>
          </Tabs.Tab>
          <Tabs.Tab value="assessments">
            <Text className="font-semibold">Assessment</Text>
          </Tabs.Tab>

          {/*<Tabs.Tab value="resources">Resources</Tabs.Tab>*/}
          {/*<Tabs.Tab value="assessment">Assessments</Tabs.Tab>*/}
        </Tabs.List>

        <Tabs.Panel value="description" pt="xs" className="mt-sm">
          {activeWildCard === 'description' &&
            (activeTopic?.description ? (
              <div
                className="text-lg leading-8 text-secondary-default tracking-wider pl-md"
                dangerouslySetInnerHTML={{ __html: activeTopic?.description }}
              ></div>
            ) : (
              <div className="text-lg leading-8 text-secondary-default tracking-wider">
                'Theres no description for this content at the moment'
              </div>
            ))}
        </Tabs.Panel>

        <Tabs.Panel value="assignments" pt="xs">
          {activeWildCard === 'assignments' && (
            <>
              {location.pathname.includes('/teacher/') && (
                <div className="flex justify-between mb-sm">
                  <div className={`text-lg font-semibold cursor-pointer flex items-center  `}>
                    Assignments list ({activeTopic.assignment?.length})
                  </div>
                  <div>
                    <Button onClick={open}>Add Assigment</Button>
                  </div>
                </div>
              )}
              {/*{location.pathname.includes('/student/') && (*/}
              <ClassroomAssignments
                data={activeTopic.assignment}
                setReload={setReload}
                reload={reload}
                setCurrentActive={setCurrentActive}
              />
              {/*)}*/}
            </>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="resources" pt="xs">
          {/* {activeWildCard === 'resources' && <div>this is batch resources</div>} */}
          {activeWildCard === 'resources' && (
            <>
              {/*{location.pathname.includes('/student/') && (*/}
              {/* <ClassroomAssignments data={activeTopic.assignment} /> */}
              <ClassroomResources data={activeTopic.resources} setShowStats={setShowStats} />

              {/* Resource List */}
              {/*)}*/}
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="forum" pt="xs">
          {/* {activeWildCard === 'resources' && <div>this is batch resources</div>} */}
          {activeWildCard === 'forum' && (
            <>
              {/*{location.pathname.includes('/student/') && (*/}
              {/* <ClassroomAssignments data={activeTopic.assignment} /> */}
              <ClassroomTopicForum />

              {/* Resource List */}
              {/*)}*/}
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="assessments" pt="xs">
          <Assessments />

          {/* <Button onClick={openAssessmentModal}>Create Assessment </Button> */}

          <Modal opened={openedAssessment} onClose={closeAssessmentModal} size="55%" centered>
            {/* Modal content */}
            <AssessmentSection />
          </Modal>
          {/* <ClassroomAssessments mainActiveTopic={activeTopic} data={activeTopic.quiz} /> */}
          {/* {activeWildCard === 'assessments' && <div>assessments</div>} */}
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
