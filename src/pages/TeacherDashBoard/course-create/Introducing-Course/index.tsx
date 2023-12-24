/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import { useDisclosure } from '@mantine/hooks';
import { Box, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { createCourseUpdateCourse } from '../../../../store/modules/sections/action';
import { Button, Divider, Grid, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';

import DropFileSection from './DropFileSection';

import AddItemInputField from './AddItemInputField';
import TextInputField from '../input-field/TextInputField';

import SelectInputField from '../input-field/SelectInputField';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { TeacherProfile } from '../../../../components/modules/course/Coursedetails/TeacherProfile';
import { APIGetAllChildNodes } from '../../../../api/categories';
import TagsInput from './TagsInput';
import Preview from '../Preview';
import TextEditorComponent from '../input-field/TextEditorComponent';

const IntroducingCourse = (props: any) => {
  const { nextStep, prevStep, setActive } = props;
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<any>({});
  const [categoryData, setCategoryData] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [testValue, setTestValue] = useState<string | null>('ng');

  const { courseId } = useParams();
  const courseCreateData = useSelector((state: any) => state?.courseReducer?.courseCreateData);
  const userProfile = useSelector((state: any) => state?.authReducer?.userProfile);
  const {
    courseTitle,
    learningObjective,
    courseImageUrl,
    category,
    shortDescription,
    tags,
    demoVideoUrl,
    toolsAndLanguage,
  } = courseCreateData;

  const form = useForm({
    initialValues: {
      courseTitle,
      courseImageUrl,
      category: Array.isArray(category) && category.length ? category[0] : [],
      shortDescription,
      toolsAndLanguage,
      learningObjective,
      tags,
      demoVideoUrl,
    },
    validate: {
      courseTitle: (value) => value.length === 0 && 'Course Title cannot be empty',
      shortDescription: (value) => value.length === 0 && 'Course Description cannot be empty',

      category: (value) => value == undefined && 'Category cannot be empty',

      tags: (value) => {
        const filteredValue = value.filter((str: string) => str.length > 0);
        return filteredValue.length === 0 && 'This field cannot be empty';
      },
      learningObjective: (value) => {
        const filteredValue = value.filter((str: string) => str.length > 0);
        return filteredValue.length === 0 && 'This field cannot be empty';
      },
      toolsAndLanguage: (value) => {
        const filteredValue = value.filter((str: string) => str.length > 0);
        return filteredValue.length === 0 && 'This field cannot be empty';
      },
      courseImageUrl: (value) => {
        if (value.length === 0) return 'Course image cannot be empty';
      },

      demoVideoUrl: (value) => value.length === 0 && 'DemoVideo URL cannot be empty',
    },
  });

  useEffect(() => {
    console.log(courseCreateData, '@courseCreate Data');
  }, [courseCreateData.longDescription]);
  //  course: singleBatchData.data.course?.courseId ?? '',
  useEffect(() => {
    console.log(courseCreateData, '@courseCreateData inside use effect');
    form.setValues({
      learningObjective,
      courseTitle,
      courseImageUrl,
      category: courseCreateData?.category?.[0]?._id,
      shortDescription,
      tags,
      demoVideoUrl,
      toolsAndLanguage,
    });
    (async () => {
      try {
        const res = await APIGetAllChildNodes();
        const c = res?.data?.map((d: any) => {
          return { value: d._id, label: d.title ?? 'Untitled' };
        });
        setCategoryData(c);
      } catch (error: any) {
        errorNotification(error?.toString());
      }
    })();
  }, [courseCreateData]);
  const { values } = form;

  const submit = async (e: any) => {
    console.log('@Course Intro', form.values);

    e.preventDefault();
    const { hasErrors, errors } = form.validate();
    console.log(errors, '@errors');
    if (hasErrors) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    form.validate();
    dispatch(createCourseUpdateCourse({ ...values, course: courseId }));
    nextStep();
  };
  const [isTextArea, setTextAreaEditing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('untitled');
  const [textarea, setTextArea] = useState('Write Short Description');
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handleTextAreaDoubleClick = () => {
    setTextAreaEditing(true);
  };

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };
  const handleTextAreaChange = (event: any) => {
    setTextArea(event.target.value);
  };

  const textHandleBlur = () => {
    console.log('@blur');
    setIsEditing(false);
  };
  const textAreaHandleBlur: any = () => {
    setTextAreaEditing(false);
  };

  console.log(courseCreateData.learningObjective.length, '@length');
  return (
    <>
      <form onSubmit={submit} className={'pt-sm bg-white rounded-lg'}>
        <Grid p={0} gutter={0}>
          <Grid.Col>
            <div className="px-xs mb-xl dropzone-course">
              <div className="text-xl font-semibold leading-5 ">Introducing Course</div>
              <Grid p={0}>
                <Grid.Col span={8}>
                  {' '}
                  {/* <TextInputField
                  title="Course Title"
                  placeholder="Enter Course Title"
                  {...form.getInputProps(`courseTitle`)}
                /> */}
                  {/* <EditText
                  className="text-5xl font-semibold"
                  name="textbox3"
                  style={{ fontSize: '48px', fontWeight: 600 }}
                  defaultValue="Your Course Title Goes"
                  editButtonProps={{
                    style: {
                      marginLeft: '5px',
                      width: 16,
                    },
                  }}
                  showEditButton
                  {...form.getInputProps(`courseTitle`)}
                /> */}
                  <div className="mt-md">
                    <TextInputField
                      variant="unstyled"
                      {...form.getInputProps(`courseTitle`)}
                      placeholder="Your Course Title"
                      className=""
                      type="text"
                      styles={{
                        input: {
                          fontSize: '2.5rem',
                          fontStyle: 'normal',
                          fontWeight: 600,
                          lineHeight: '2rem',
                          letterSpacing: '-0.06rem',
                          color: '#414141',
                        },
                      }}
                      // value={text}
                      // onChange={handleTextChange}
                      // onBlur={textHandleBlur}
                      onBlur={textHandleBlur}
                      autoFocus
                    />
                  </div>
                  <Divider className="mt-xs" />
                  <div className="mt-sm">
                    {/* <EditTextarea
                    name="textbox4"
                    defaultValue="Write Short Description"
                    style={{
                      borderColor: '',
                      borderBottom: '1px solid',
                    }}
                    {...form.getInputProps(`longDescription`)}
                  /> */}

                    {/* <Textarea
                        variant="unstyled"
                        className="grow text-secondary-default font-medium"
                        {...form.getInputProps(`shortDescription`)}
                        placeholder="Write Short Description"
                        // value={textarea}
                        // onChange={handleTextAreaChange}
                        onBlur={textAreaHandleBlur}
                        autoFocus
                        autosize
                        minRows={3} // Set the number of rows as needed
                        styles={{
                          input: {
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: '1.75rem',
                            letterSpacing: '0.04688rem',
                            color: '#414141',
                          },
                        }}
                      /> */}
                    {/* {form?.values?.shortDescription} */}
                    <TextEditorComponent
                      form={form}
                      className="w-full text-xl leading-8 tracking-wider"
                      courseModel={`shortDescription`}
                      title=""
                      placeholder="Description"
                      errorMessage={'enter description'}
                      content={form.values.shortDescription}
                    />

                    <Divider className="mt-xs" />
                  </div>
                  {/* <TextInputField
                  title="Tags"
                  placeholder="Enter Tags"
                  {...form.getInputProps(`longDescription`)}
                /> */}
                  <Box className="mt-md">
                    <Text className="text-xl text-secondary-dark font-semibold">Tags</Text>
                    <TagsInput
                      label={''}
                      form={form}
                      errorMessage={formErrors.tags}
                      courseModel={'tags'}
                      placeholder={'Add Tags'}
                    />
                    <Divider className="" />
                  </Box>
                  {courseCreateData?.teacher ? (
                    <Box className="mt-lg">
                      <TeacherProfile teacher={courseCreateData?.teacher} />
                    </Box>
                  ) : (
                    <Box className="mt-lg">
                      <TeacherProfile teacher={userProfile} />
                    </Box>
                  )}
                </Grid.Col>
                <Grid.Col span={4}>
                  {' '}
                  <DropFileSection
                    form={form}
                    errorMessage={formErrors.courseImageUrl}
                    setFormErrors={(val: string) =>
                      setFormErrors({ ...formErrors, courseImageUrl: val })
                    }
                  />
                  {/* <DropFileSection /> */}
                  <Box className="mt-lg">
                    <TextInputField
                      // title="Enter Video URl"
                      placeholder="Enter Video URl"
                      {...form.getInputProps(`demoVideoUrl`)}
                      radius="md"
                      styles={{
                        input: {
                          fontSize: '1rem',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          lineHeight: '1.75rem',
                          letterSpacing: '0.04688rem',
                          color: '#414141',
                        },
                      }}
                    />
                  </Box>
                  <Box className="mt-md">
                    <Text className="text-xl text-secondary-dark font-semibold">Category</Text>
                    <SelectInputField
                      form={form}
                      title={''}
                      placeholder={'Select Category'}
                      courseModel={'category'}
                      data={categoryData}
                      errorMessage={formErrors.category}
                    />
                  </Box>
                </Grid.Col>
              </Grid>

              {/* <TextEditorComponent
              placeholder="Edit your Description here."
              courseModel={'longDescription'}
              title="Description"
              errorMessage={formErrors.longDescription}
              form={form}
            />

            <SelectInputField
              form={form}
              title={'Category'}
              placeholder={'----  Choose the Category  ---'}
              courseModel={'category'}
              data={categoryData}
            /> */}

              <AddItemInputField
                form={form}
                title={'Learning Objectives'}
                courseModel={'learningObjective'}
                placeholder={'Add Learning Objectives'}
                errorMessage={formErrors.learningObjective}
              />

              {/* <AddItemInputField
              form={form}
              title={'Prerequisites'}
              courseModel={'prerequisites'}
              placeholder={'Add Learning Prerequisites'}
              errorMessage={formErrors.prerequisites}
            />

            <AddItemInputField
              form={form}
              title={'Requirements'}
              courseModel={'requirements'}
              placeholder={'Add Requirements'}
              errorMessage={formErrors.requirements}
            /> */}
              {/* <Tools
              form={form}
              errorMessage={formErrors.toolsAndLanguage}
              courseModel={'toolsAndLanguage'}
            /> */}

              <Divider className="mt-md" />

              <Box className="mt-md">
                <Text className="text-xl text-secondary-dark font-semibold">
                  Add Tools and Technology
                </Text>
                <TagsInput
                  label={''}
                  form={form}
                  errorMessage={formErrors.toolsAndLanguage}
                  courseModel={'toolsAndLanguage'}
                  placeholder={'Add Tools and Technology'}
                />
                <Divider className="" />
              </Box>
            </div>
          </Grid.Col>
          {/* <Grid.Col span={4}>
          <div className=" sticky top-[74px] bg-courseCreateBg-500">
            <SecondaryDetails />
          </div>
        </Grid.Col> */}
        </Grid>

        <Group
          position="right"
          py="xs"
          px="md"
          className="sticky bottom-none bg-white z-10 flex justify-between border-t-gray-400"
        >
          <div className="flex gap-sm">
            {' '}
            <Button type={'submit'} variant="outline" onClick={() => navigate('/teacher')}>
              Discard
            </Button>
            <Button onClick={open}>Preview</Button>
          </div>

          <div className="flex">
            {/* <Button type={'submit'} variant="default" onClick={prevStep} className="bg-primary-1000">
            Back
          </Button> */}
            <Button type={'submit'} className="ml-md bg-primary-1000">
              Next step
            </Button>
          </div>
        </Group>
      </form>
      <Preview values={values} opened={opened} close={close} setActive={setActive} />
    </>
  );
};

export default IntroducingCourse;
