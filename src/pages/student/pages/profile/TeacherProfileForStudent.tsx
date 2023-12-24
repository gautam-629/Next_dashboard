import { Box, Button, Divider } from '@mantine/core';
import {
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandGit,
  IconBrandLinkedin,
} from '@tabler/icons-react';
import User from '../../../../assets/Anna.png';
import { APIGetTeacherProfile } from '../../../../api/users';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Experience from './components/Experience';
import Education from './components/Education';
import Certification from './components/Certification';
import CourseList from './components/CourseList';
import BatchList from './components/BatchList';
import Bio from './components/Bio';
import { Link } from 'react-router-dom';
import { DummyProfile } from '../../../../utils/assets/image';
import { useSelector } from 'react-redux';

const TeacherProfileForStudent = () => {
  const [teacherProfile, setTeacherProfile] = useState<any>({});
  const [isTeacher, setIsTeacher] = useState(false);
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const { id } = useParams();
  console.log(userProfile, 'userprofile');

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response: any = await APIGetTeacherProfile(id);
          setTeacherProfile(response?.data);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    })();
    if (userProfile?._id === id) {
      setIsTeacher(true);
    }
  }, []);
  console.log(teacherProfile, '@teacherProfile');
  return (
    <div className="wrapper-x">
      <Box className="">
        <div
          className="btn-gradient relative mt-xs rounded-lg flex justify-center items-center "
          style={{ aspectRatio: '1220 / 206' }}
        >
          <p className="text-4xl font-normal text-white ">Python Developer</p>

          <div className="flex gap-sm absolute bottom-xs right-sm">
            <Button className="bg-white text-primary-700">
              <IconPhone size={24} strokeWidth={2} color={'#1EA7DC'} className="mr-xs" />
              Call Now
            </Button>

            <Button variant="outline" className="border-white">
              <IconMail size={24} strokeWidth={2} color={'#ffffff'} />
            </Button>
          </div>
        </div>

        <div className="flex w-full ">
          <div
            className=" flex items-center justify-between w-full"
            style={{ marginTop: '-50px', zIndex: '999' }}
          >
            <div className="flex gap-xs  w-1/3">
              <div className=" pl-sm">
                <img
                  src={teacherProfile?.avatar ?? DummyProfile}
                  className="w-7xl h-7xl rounded-full object-fill"
                  onError={DummyProfile}
                ></img>
              </div>

              <div className="" style={{ paddingTop: '50px' }}>
                <p className="text-secondary-dark text-2xl font-semibold">
                  {`${teacherProfile?.firstName} ${teacherProfile?.lastName}`}
                  {isTeacher ? (
                    <Link to={`/teacher/profile/${teacherProfile?._id}`} className="ml-sm">
                      Edit Profile
                    </Link>
                  ) : null}
                </p>
                <div className="socialIcons mt-sm flex gap-xs ">
                  <IconBrandFacebook size={20} strokeWidth={2} color={'#1f1f1f'} />
                  <IconBrandGit size={20} strokeWidth={2} color={'#1f1f1f'} />
                  <IconBrandLinkedin size={20} strokeWidth={2} color={'#1f1f1f'} />
                </div>
              </div>
            </div>
            <div
              className="w-6/12 h-full justify-between grid grid-cols-3 gap-sm"
              style={{ paddingTop: '56px' }}
            >
              <div className=" h-full flex flex-col justify-center items-center rounded-lg">
                <p className="text-4xl font-normal text-Grayscale-600">
                  {teacherProfile?.courseCount ?? 0}
                </p>
                <span className="text-sm font-normal text-Grayscale-600">Total Course</span>
              </div>
              <div className=" h-full flex flex-col justify-center items-center rounded-lg">
                <p className="text-4xl font-normal text-Grayscale-600">
                  {teacherProfile?.studentCount ?? 0}
                </p>
                <span className="text-sm font-normal text-Grayscale-600">Total Students</span>
              </div>
              <div className=" h-full flex flex-col justify-center items-center rounded-lg">
                <p className="text-4xl font-normal text-Grayscale-600">
                  {teacherProfile?.batchCount ?? 0}
                </p>
                <span className="text-sm font-normal text-Grayscale-600">Total Batches</span>
              </div>
            </div>
          </div>
        </div>
      </Box>

      <Divider className="border border-t border-Grayscale-400 border-solid mt-sm mb-md"></Divider>

      <div className="flex gap-md">
        <div className="w-1/3">
          <Bio bio={teacherProfile?.bio ?? ''} />
          <Education education={teacherProfile?.education ?? []} />
          <Certification certification={teacherProfile?.certification ?? []} />
        </div>
        <div className="w-2/3">
          {/* <Experience experience={teacherProfile?.experience ?? []} /> */}
          <BatchList batches={teacherProfile?.batches ?? []} />
          <CourseList courses={teacherProfile?.courses ?? []} />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileForStudent;
