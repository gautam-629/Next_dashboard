import { Paper, Grid, Drawer, Modal, ScrollArea, Box } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBatchDetails,
  setClassroomStatus,
  setClassroomSyallbus,
  setClassroomWildcardComponent,
  setCommentsDrawer,
  setCourseDetails,
  setDrawer,
  showEndClassRoomDialog,
} from '../../store/modules/classroom/actions';
import { VideoSection } from '../../components/modules/classroom/VideoSection';
import { LessonDetails } from '../../components/modules/classroom/LessonDetails';
import { ClassroomLessonsList } from '../../components/modules/classroom/ClassroomLessonsList';
import { ClassroomChat } from '../../components/modules/classroom/Classroom.chat';
import { APIGetSingleBatchCourse } from '../../api/batch';
import { useParams } from 'react-router-dom';
import { APIGetAllTopicsByCourseId } from '../../api/topic';
import { ClassroomBatchDetails } from './ClassroomBatchDetails';
import { LessonsList } from '../../components/modules/classroom/LessonsList';
import { EndClassRoom } from '../../components/modules/classroom/EndClassRoom';
import { ForumCommentsContainer } from '../../components/modules/classroom/ForumCommentsContainer';

export const ClassroomScreen = () => {
  const isClassroomRunning = useSelector((state: any) => state.classRoomReducer.isClassroomRunning);
  const showDrawer = useSelector((state: any) => state.classRoomReducer.showDrawer);
  const showCommentsDrawer = useSelector((state: any) => state.classRoomReducer.showCommentsDrawer);
  const wildcardClassroomComponent = useSelector(
    (state: any) => state.classRoomReducer.wildcardClassroomComponent,
  );
  // const [opened, { open, close }] = useDisclosure(false);
  const activeTopic = useSelector((state: any) => state.classRoomReducer.activeTopic);
  const showEndingDialog = useSelector((state: any) => state.classRoomReducer.showEndingDialog);
  const batch: any = useParams().batch;
  const dispatch = useDispatch();
  const [showStats, setShowStats] = useState(true);
  const [videoSize, setVideoSize] = useState('small');

  useEffect(() => {
    loadBatchDetails();
  }, [batch]);
  const loadBatchDetails = async () => {
    if (batch) {
      const courseRes = await APIGetSingleBatchCourse(batch);
      dispatch(setBatchDetails(courseRes.data));
      const topicRes = await APIGetAllTopicsByCourseId(courseRes.data.course._id);
      dispatch(setClassroomSyallbus(topicRes.data));
    }
  };

  useEffect(() => {
    // dispatch(setClassroomWildcardComponent('default'));
    // setWildCardDetails(activeTopic?._id, 'description');
    setClassroomStatus(false);
  }, []);

  const showSidebar = () => {
    if (isClassroomRunning && wildcardClassroomComponent !== 'default') {
      return false;
    }
    if (!isClassroomRunning) {
      return true;
    }
    if (isClassroomRunning && wildcardClassroomComponent === 'default') {
      return true;
    }
    return false;
  };
  return (
    <>
      <Drawer
        size={'35%'}
        opened={showDrawer}
        onClose={() => dispatch(setDrawer(false))}
        position={'right'}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {/* <ClassroomLessonsList /> */}
        <Box className="overflow-y-scroll">
          <LessonsList
            setShowStats={setShowStats}
            setVideoSize={setVideoSize}
            videoSize={videoSize}
          />
        </Box>
      </Drawer>
      {/*comments drawer*/}
      <Drawer
        size={'35%'}
        title={'Comments'}
        opened={showCommentsDrawer}
        onClose={() => dispatch(setCommentsDrawer(false))}
        position={'right'}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <ForumCommentsContainer />
      </Drawer>
      <Modal
        opened={showEndingDialog}
        size={'35%'}
        onClose={() => dispatch(showEndClassRoomDialog(false))}
        title={<div className="text-sm font-bold">Completed Topics</div>}
      >
        <EndClassRoom />
      </Modal>
      {/*)}*/}
      <Grid className={'h-full '}>
        {wildcardClassroomComponent !== 'default' ? (
          isClassroomRunning ? (
            videoSize !== 'fullscreen' ? (
              <Grid.Col
                className={'class-room-transition'}
                md={isClassroomRunning ? 6 : 8}
                sm={isClassroomRunning ? 6 : 8}
              >
                <ClassroomBatchDetails showStats={showStats} setShowStats={setShowStats} />
                <LessonDetails
                  setShowStats={setShowStats}
                  setVideoSize={setVideoSize}
                  videoSize={videoSize}
                />
              </Grid.Col>
            ) : (
              ''
            )
          ) : (
            <Grid.Col
              className={'class-room-transition'}
              md={isClassroomRunning ? 6 : 8}
              sm={isClassroomRunning ? 6 : 8}
            >
              <ClassroomBatchDetails showStats={showStats} setShowStats={setShowStats} />
              <LessonDetails
                setShowStats={setShowStats}
                setVideoSize={setVideoSize}
                videoSize={videoSize}
              />
            </Grid.Col>
          )
        ) : (
          ''
        )}
        {isClassroomRunning && (
          <Grid.Col
            className={'class-room-transition'}
            md={
              wildcardClassroomComponent !== 'default' ? (videoSize !== 'fullscreen' ? 6 : 12) : 8
            }
            sm={
              wildcardClassroomComponent !== 'default' ? (videoSize !== 'fullscreen' ? 6 : 12) : 8
            }
          >
            <VideoSection setVideoSize={setVideoSize} videoSize={videoSize} />
          </Grid.Col>
        )}
        {showSidebar() && (
          <Grid.Col
            className={'class-room-transition '}
            md={isClassroomRunning || wildcardClassroomComponent !== 'default' ? 4 : 4}
            sm={isClassroomRunning || wildcardClassroomComponent !== 'default' ? 4 : 4}
          >
            {/* <ScrollArea h={'screen'} scrollbarSize={12}> */}
            {/* <ClassroomLessonsList /> */}
            <LessonsList showStats={showStats} setShowStats={setShowStats} />
            {/* </ScrollArea> */}
          </Grid.Col>
        )}
      </Grid>
      <ClassroomChat />
    </>
  );
};
