/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { MouseEvent, useEffect, useState } from 'react';
import facebook from '../../../../../src/assets/facebook.svg';
import git from '../../../../../src/assets/git.svg';
import linkedIn from '../../../../../src/assets/LinkedIn.svg';
import { Button, Input, Grid, TextInput, Textarea, Card } from '@mantine/core';

import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { INITIAL_TEACHER_PROFILE } from '../../../../utils/interfaces/UpdateUserProfile';
import axios from '../../../../plugins/axios';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { APIGetTeacherProfile } from '../../../../api/users';
import FileUpload from '../../../student/pages/task/components/FileUpload';

import { APIUploadImage } from '../../../../api/file-handler';
import ImageUpload from '../../../../components/common/ImageUpload';
import IndustryForm from '../../../onboarding/industry/Industryform';
import ExperienceForm from '../../../onboarding/experience/ExperienceForm';
import {
  INITIAL_CERTIFICATION,
  INITIAL_EDUCATION,
  INITIAL_EXPERIENCE,
  Icertification,
  Ieducation,
  Iexperience,
} from '../../../../utils/interfaces/Onboarding.model';
import StepTwoForm from '../../../onboarding/qualification/StepTwoForm';
import StepFourForm from '../../../onboarding/certification/StepFourForm';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { IconPlus } from '@tabler/icons-react';

const EditUsername = () => {
  const [teacherProfile, setTeacherProfile] = useState<any>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const userProfile = useSelector((state: any) => state.authReducer.userProfile);
  const location = useLocation();
  const profile = location.pathname.includes('teacher') ? 'teacher' : 'student';
  console.log(userProfile._id, 'userprofile');
  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response: any = await APIGetTeacherProfile(id);
          console.log(response, 'response');
          setTeacherProfile(response?.data);
          setCoverImage(response?.data?.avatar);
          const temp: any = {
            firstName: response.data?.firstName ?? '',
            lastName: response.data?.lastName ?? '',
            bio: response.data?.bio ?? '',
            avatar: response.data?.avatar ?? '',
            phoneNumber: response.data?.phoneNumber ?? '',
            address: {
              country: response.data?.address?.country ?? '',
              city: response.data?.address?.city ?? '',
              district: response.data?.address?.district ?? '',
            },
            socialMedia: {
              facebook: response.data?.socialMedia?.facebook ?? '',
              gitHub: response.data?.socialMedia?.gitHub ?? '',
              linkedIn: response.data?.socialMedia?.linkedIn ?? '',
            },
            username: response.data?.username ?? '',
            dob: response.data.dob ? new Date(response.data.dob) : new Date(),
            experience: response.data.experience?.length
              ? [...response.data.experience]
              : [INITIAL_EXPERIENCE],
            education: response.data.education?.length
              ? [...response.data.education]
              : [INITIAL_EDUCATION],
            certification: response.data.certification?.length
              ? [...response.data.certification]
              : [INITIAL_CERTIFICATION],
          };

          // form.setValues({ ...response?.data });
          form.setValues(temp);
        }
      } catch (error) {
        console.log(error, 'error');
      }
    })();
  }, []);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      bio: '',
      avatar: '',
      address: {
        country: '',
        city: '',
        district: '',
      },
      socialMedia: {
        facebook: '',
        gitHub: '',
        linkedIn: '',
      },
      username: '',
      dob: null,
      experience: [INITIAL_EXPERIENCE],
      education: [INITIAL_EDUCATION],
      certification: [INITIAL_CERTIFICATION],
    },
  });
  const { values } = form;

  const updateProfile = async () => {
    try {
      if (id) {
        const response = await axios.put(`users/${id}`, { ...values, avatar: profilePicture });
        navigate(`/teacher`);
      }
    } catch (error: any) {
      errorNotification(error?.toString());
    }
  };

  const addExperienceForm = () => {
    const experience = values.experience || [];

    form.insertListItem('experience', {
      ...INITIAL_EXPERIENCE,
      index: experience.length,
    });
  };
  const addEducationForm = () => {
    const education = values.education || [];

    form.insertListItem('education', {
      ...INITIAL_EDUCATION,
      index: education.length,
    });
  };
  const addCertification = () => {
    const certification = values.certification || [];

    form.insertListItem('certification', {
      ...INITIAL_CERTIFICATION,
      index: certification.length,
    });
  };
  const deleteExperienceForm = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('experience', index);
  };
  const deleteEducationForm = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('education', index);
  };
  const deleteCertification = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    form.removeListItem('certification', index);
  };

  const reset = () => {
    form.reset();
  };
  console.log(values.certification, '@certification');
  return (
    <Card>
      <form onSubmit={form.onSubmit(updateProfile)}>
        <div className="flex justify-between">
          <div className="mb-[44px]">
            <p className="text-3xl font-bold  text-secondary-dark m-[0px]">My Profile</p>
            <p className="font-normal text-base text-secondary-default  m-[0px] ">
              You can change your account settings here.
            </p>
          </div>
          {/* <div className="flex gap-md items-center">
            <Link to={`/teacher/profile/${userProfile?._id}`}>
              <Pencil size={38} strokeWidth={1.5} color={'black'} />
            </Link>
            <Button>Edit Profile</Button>
          </div> */}
        </div>

        <Grid className="w-full basis-full">
          <Grid.Col className="w-full basis-full">
            <Grid gutter={'lg'}>
              <Grid.Col span={6} className="p-sm">
                <p className="m-none mb-[10px] font-semibold text-2xl text-secondary-dark  ">
                  Personal Details
                </p>
                <p className="text-base font-normal mb-xs">Upload your Image</p>
                <ImageUpload setImageUrl={setProfilePicture} />
                <p className="text-base font-normal mb-xs mt-sm">
                  Write Short Bio that including your Experiences?
                </p>
                <Textarea
                  size="lg"
                  placeholder="write your description"
                  label="Bio"
                  withAsterisk
                  mt={'sm'}
                  {...form.getInputProps(`bio`)}
                  variant={'filled'}
                />
                <div className="mt-sm">
                  <div>Social media details</div>
                  <div className="flex mt-lg">
                    <img src={facebook} />
                    <TextInput
                      size="lg"
                      className="ml-sm flex-grow"
                      variant="filled"
                      {...form.getInputProps(`socialMedia.facebook`)}
                    ></TextInput>
                  </div>
                  <div className="flex mt-lg">
                    <img src={linkedIn} />
                    <TextInput
                      size="lg"
                      className="ml-sm flex-grow"
                      variant="filled"
                      {...form.getInputProps(`socialMedia.linkedIn`)}
                    ></TextInput>
                  </div>
                  <div className="flex mt-lg">
                    <img src={git} />
                    <TextInput
                      className="ml-sm flex-grow"
                      size="lg"
                      variant="filled"
                      {...form.getInputProps(`socialMedia.gitHub`)}
                    ></TextInput>
                  </div>
                  <Grid>
                    <Grid.Col span={6}>
                      <Input.Wrapper label={'First Name'}>
                        <TextInput
                          size="lg"
                          variant="filled"
                          placeholder="First Name"
                          {...form.getInputProps(`firstName`)}
                        ></TextInput>
                      </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Input.Wrapper label={'Last Name'}>
                        <TextInput
                          size="lg"
                          variant="filled"
                          placeholder="Enter your last name"
                          {...form.getInputProps(`lastName`)}
                        ></TextInput>
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={12}>
                      <Input.Wrapper label={'Phone Number'}>
                        <TextInput
                          size="lg"
                          variant="filled"
                          placeholder="Phone Number"
                          type="number"
                          {...form.getInputProps(`phoneNumber`)}
                        ></TextInput>
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>
                  <Grid>
                    <Grid.Col span={12}>
                      <DatePickerInput
                        size="lg"
                        label="Date of birth"
                        placeholder="Pick date"
                        {...form.getInputProps('dob')}
                        mx="auto"
                        className={'w-full'}
                        variant={'filled'}
                      />

                      <div className="text-md mt-sm">Address</div>
                      <Input.Wrapper mt="xs" label={'Country'}>
                        <TextInput
                          size="lg"
                          placeholder="Country"
                          variant="filled"
                          {...form.getInputProps(`address.country`)}
                        ></TextInput>
                      </Input.Wrapper>
                      <Input.Wrapper mt="xs" label={'District'}>
                        <TextInput
                          size="lg"
                          variant="filled"
                          placeholder="District"
                          {...form.getInputProps(`address.district`)}
                        ></TextInput>
                      </Input.Wrapper>
                      <Input.Wrapper mt="xs" label={'City'}>
                        <TextInput
                          size="lg"
                          variant="filled"
                          placeholder="City"
                          {...form.getInputProps(`address.city`)}
                        ></TextInput>
                      </Input.Wrapper>
                    </Grid.Col>
                  </Grid>
                </div>
              </Grid.Col>
              <Grid.Col span={6} className="p-sm">
                {/* <Grid>
                  <Grid.Col span={12}>
                    <h1>industry information</h1>
                    <IndustryForm form={form} />
                  </Grid.Col>
                </Grid> */}
                {/* <Grid>
                  <Grid.Col span={12}>
                    <h1 className="font-semibold text-2xl">Experience information</h1>
                    {values?.experience?.map((experience: Iexperience, index: number) => (
                      <ExperienceForm
                        experience={experience}
                        key={index}
                        index={index}
                        deleteForm={deleteExperienceForm}
                        form={form}
                      />
                    ))}
                    <div className=" flex justify-center mt-md mb-md rounded-md">
                      <Button onClick={addExperienceForm} fullWidth>
                        Add More
                      </Button>
                    </div>
                  </Grid.Col>
                </Grid> */}
                <Grid>
                  <Grid.Col span={12}>
                    <h1 className="font-semibold text-2xl">Qualification information</h1>
                    {values?.education?.map((education: Ieducation, index: number) => (
                      <StepTwoForm
                        education={education}
                        key={index}
                        index={index}
                        deleteEducation={deleteEducationForm}
                        form={form}
                      />
                    ))}
                    {/* <div className="flex justify-center mt-md mb-md rounded-md">
                      <Button onClick={addEducationForm} fullWidth>
                        Add More
                      </Button>
                    </div> */}
                    <div className=" flex justify-center mt-md mb-md rounded-md">
                      <Button
                        onClick={addEducationForm}
                        fullWidth
                        variant="unstyled"
                        size="xl"
                        className="border-dashed border-2 rounded-lg border-gray-400"
                      >
                        <IconPlus size={44} className="text-gray-400" />
                      </Button>
                    </div>
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={12}>
                    <h1>Certification information</h1>

                    {values?.certification?.map((certification: Icertification, index: number) => (
                      <StepFourForm
                        certification={certification}
                        key={index}
                        index={index}
                        values={values}
                        deleteForm={deleteCertification}
                        form={form}
                        setFileUrl={setFileUrl}
                      />
                    ))}
                    {/* <div className=" flex justify-center mt-md mb-md rounded-md">
                      <Button onClick={addCertification} fullWidth>
                        Add More
                      </Button>
                    </div> */}
                    <div className=" flex justify-center mt-md mb-md rounded-md">
                      <Button
                        onClick={addCertification}
                        fullWidth
                        variant="unstyled"
                        size="xl"
                        className="border-dashed border-2 rounded-lg border-gray-400"
                      >
                        <IconPlus size={44} className="text-gray-400" />
                      </Button>
                    </div>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
            <div className="flex mb-sm w-full justify-between sticky bottom-none mt-2xl ">
              <Button variant={'light'} color={'dark'} onClick={reset}>
                Reset my settings
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </Grid.Col>
        </Grid>
      </form>
    </Card>
  );
};

export default EditUsername;
