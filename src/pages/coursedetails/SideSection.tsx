import {
  AspectRatio,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Modal,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { ChangeByDesign, DefaultImage } from '../../utils/assets/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../plugins/axios';
import {
  faMicrophoneLines,
  faFile,
  faLayerGroup,
  faDesktop,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Enquiry from './Enquiry';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { duration } from 'moment';
import { formatDate } from '../../utils/helpers/date.helper';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface sideSectionProps {
  level?: any;
}
const SideSection = (level: sideSectionProps) => {
  const courseCreateData = useSelector((state: any) => state.courseReducer.courseCreateData);
  const sectionsLength = courseCreateData?.topics?.length;
  const [selectedBatch, setSelectedBatch] = useState('.....');
  const [statusMessage, setStatusMessage] = useState('');
  const [batchName, setBatchName] = useState('');
  const [status, setStatus] = useState({ data: { successMessage: '', id: '' } });
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [classDuration, setClassDuration] = useState('');
  const [price, setPrice] = useState('');
  console.log(userProfile, 'userProfile');
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { course } = useParams();
  console.log(courseCreateData.demoVideoUrl, '@demovideourl');
  const ApplyNow = () => {
    navigate(`/course/applynow/${course}`);
  };

  useEffect(() => {
    (async () => {
      await requestEnrolledStatus();
    })();
  }, []);

  async function requestEnrolledStatus() {
    let responseStatus: any;
    try {
      responseStatus = await axios.get(`enrollment-requests/enrolled-status/${course}`);
      console.log(responseStatus, '@response Status');
      setSelectedBatch(responseStatus?.data?.id ?? '');
      responseStatus && setStatus(responseStatus);
      if (responseStatus === 'REQUEST_PENDING') {
        setStatusMessage('Request Pending');
      }
    } catch (error: any) {
      // error && errorNotification(error?.toString());
    }
  }

  function convertToEmbeddedURL(url: any) {
    // Check if the URL is a valid YouTube watch URL
    if (url.includes('youtube.com/watch?v=')) {
      // Extract the video ID
      const videoId = url.split('v=')[1];
      // Construct the embedded URL
      const embeddedURL = `https://www.youtube.com/embed/${videoId}`;
      return embeddedURL;
    } else {
      // Handle invalid URLs
      return 'Invalid YouTube URL';
    }
  }

  useEffect(() => {
    const selectedBatchName =
      courseCreateData?.batches?.find((batch: any) => batch.id === selectedBatch)?.batchName ?? '';
    const ClassRoomStartDate =
      courseCreateData?.batches?.find((batch: any) => batch.id === selectedBatch)?.startDate ?? '';
    const classRoomStartTime =
      courseCreateData?.batches?.find((batch: any) => batch.id === selectedBatch)?.startTime ?? '';
    const Duration =
      courseCreateData?.batches?.find((batch: any) => batch.id === selectedBatch)?.classDuration ??
      '';
    const classRoomPrice =
      courseCreateData?.batches?.find((batch: any) => batch.id === selectedBatch)?.price ?? '';
    console.log(selectedBatchName, 'selected BatchName');
    setBatchName(selectedBatchName);
    setStartDate(ClassRoomStartDate);
    setStartTime(classRoomStartTime);
    setClassDuration(Duration);
    setPrice(classRoomPrice);

    console.log('@Course Video', courseCreateData?.demoVideoUrl);
  }, [courseCreateData]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const playVideo = () => {
    console.log('playvideo');
    open();
  };
  return (
    <div className="sticky top-[86px]">
      <Modal opened={opened} onClose={close} title="Video" centered size="lg">
        <AspectRatio ratio={16 / 9}>
          <iframe
            // src={courseCreateData?.demoVideoUrl}
            src={convertToEmbeddedURL(courseCreateData?.demoVideoUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </Modal>{' '}
      <Card padding="sm" radius="md" withBorder>
        <Card.Section>
          {/* <Image
            src={courseCreateData?.courseImageUrl}
            alt="Norway"
            style={{ aspectRatio: 384 / 232 }}
          /> */}
          <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={courseCreateData?.courseImageUrl ?? DefaultImage}
              alt="Norway"
              style={{ aspectRatio: 384 / 232 }}
              onError={DefaultImage}
            />
            {isHovered && (
              <div
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="flex items-center justify-center rounded-full p-xs bg-black/50 text-white cursor-pointer"
                onClick={playVideo}
              >
                <IconPlayerPlayFilled className="" onClick={playVideo} size={24} />
              </div>
            )}
          </div>
        </Card.Section>
        <div>
          {' '}
          <div className="flex flex-start gap-xs items-center mt-sm mb-normal">
            {' '}
            <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
            <Text weight={500}>English</Text>
          </div>
          <div className="flex flex-start gap-xs items-center mb-normal">
            {' '}
            <FontAwesomeIcon icon={faFile} style={{ color: '#0F83FE' }} />
            <Text weight={500}>Documents and Video available for support</Text>
          </div>
          <div className="flex flex-start gap-xs items-center mb-normal">
            {' '}
            <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#0F83FE' }} />
            <Text weight={500}>{level.level} Level</Text>
          </div>
          <div className="flex flex-start gap-xs items-center mb-normal">
            {' '}
            <FontAwesomeIcon icon={faDesktop} style={{ color: '#0F83FE' }} />
            <Text weight={500}>0 Assessments for certification</Text>
          </div>
          <div className="flex flex-start gap-xs items-center mb-normal">
            {' '}
            <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
            <Text weight={500}>Total {sectionsLength} sections</Text>
          </div>
          <Divider />
        </div>
        <div className="my-sm">
          <p className="text-base font-semibold">
            Rs {courseCreateData?.minMaxPrice?.minPrice ?? '0'} - Rs{' '}
            {courseCreateData?.minMaxPrice?.maxPrice ?? '0'}
          </p>
          <p className="text-xs font-normal mt-xs">
            Note: Price may vary according to the schedule{' '}
          </p>
        </div>
        {/* <Button className="">Apply Now</Button> */}
        {/* {['ENROLLED'].includes(status.data.successMessage)} */}

        <div>
          {' '}
          {!userProfile?.roles?.includes('TEACHER') ? (
            <div>
              {' '}
              <div className="flex ">
                {['REQUEST_PENDING']?.includes(status?.data?.successMessage) ? (
                  <div className="cursor-pointer w-full">
                    <div className="flex group flex-col gap-sm p-sm rounded-lg  bg-primary-1000 my-sm">
                      <div className="flex w-full justify-between items-center">
                        <p className=" font-medium text-lg text-white">{batchName}</p>
                      </div>
                      <div className="flex gap-xs">
                        <IconCalendar
                          size={24}
                          strokeWidth={1.5}
                          color={'#14142B'}
                          className="stroke-white"
                        />
                        <p className="text-base  font-normal text-white ">
                          Date:{formatDate(startDate) ?? '2023 - 09 - 14'}
                        </p>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex gap-xs">
                          <IconClock
                            size={24}
                            strokeWidth={1.5}
                            color={'#14142B'}
                            className="stroke-white"
                          />
                          <p className="text-base  font-normal text-white">
                            Time:{startTime ?? '9:00'}{' '}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg  font-normal text-white">RS &nbsp;</span>
                          <p className=" font-normal text-lg text-white">{price ?? '2000'}</p>
                        </div>
                        {/* <Button onClick={ApplyNow} fullWidth size="lg">
                          Change Batch
                        </Button> */}
                      </div>
                    </div>
                    <p className="underline" onClick={ApplyNow}>
                      {' '}
                      Change Batch
                    </p>
                    {/* <Button onClick={ApplyNow} fullWidth size="lg">
                      Change Batch
                    </Button> */}
                  </div>
                ) : (
                  <Button
                    disabled={['ENROLLED']?.includes(status?.data?.successMessage)}
                    className="mt-sm mb-md bg-primary-1000"
                    fullWidth
                    onClick={ApplyNow}
                    size="lg"
                  >
                    Apply Now
                  </Button>
                )}
              </div>
              <div className="my-xs">
                {['ENROLLED']?.includes(status?.data?.successMessage) ? (
                  <div className="text-base font-semibold text-primary-1000">
                    Your are Enrolled in {batchName} Classroom.
                  </div>
                ) : null}
                {['REQUEST_PENDING']?.includes(status?.data?.successMessage) ? (
                  <div className="text-base text-primary-1000 font-semibold">
                    Your Requested Classroom is {batchName}.
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        {/* <p>{batchName}</p> */}
      </Card>
      <div className="mt-md py-sm px-[12px] border border-solid border-gray-200 rounded-xl">
        <p className="text-base font-semibold">Request More Information</p>
        {/* <TextInput placeholder="Name" className="my-sm"></TextInput>
        <TextInput placeholder="Email" className="my-sm"></TextInput>
        <TextInput placeholder="Phone Number" className="my-sm"></TextInput>
        <Textarea placeholder="Message" className="my-sm"></Textarea>
        <Button size="lg" fullWidth className="bg-primary-1000">
          Send Enquiry
        </Button> */}
        <Enquiry />
      </div>
      <div className="mt-md py-sm px-[12px] border border-solid border-gray-200 rounded-xl flex flex-start gap-md items-center">
        <div className="">
          <FontAwesomeIcon icon={faPhone} size="2xl" />
        </div>
        <div>
          <p className="text-base font-semibold">Call Us Now</p>
          <a href="tel:+01-5437592" className="text-lg font-normal">
            01-5437592
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideSection;
