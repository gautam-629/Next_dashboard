/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Menu,
  Modal,
  NumberInput,
  Text,
  TextInput,
  Textarea,
  TypographyStylesProvider,
} from '@mantine/core';
import { MouseEvent, useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { ISection, INITIAL_SECTION } from '../../../../utils/interfaces/Course.model';
import Lesson from './Lesson';
import {
  IconTrash,
  IconEdit,
  IconFile,
  IconClipboardCheck,
  IconBrandZoom,
  IconChartHistogram,
  IconCircleCheck,
  IconCaretDown,
} from '@tabler/icons-react';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { useParams } from 'react-router-dom';
import LessonModal from './LessonModal';
import { useDisclosure, useFocusTrap } from '@mantine/hooks';
import { APIDeleteTopic } from '../../../../api/course';
import { useForm } from '@mantine/form';
import TextEditorComponent from '../input-field/TextEditorComponent';
interface LectureProps {
  section: ISection;
  SectionIndex: number;
  deleteSection: (e: MouseEvent<HTMLButtonElement>, index: number, id: string) => void;
  form: any;
  permission: any;
  role: string;
}

const Lecture = (props: LectureProps) => {
  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [descriptionEdit, setdescriptionEdit] = useState<boolean>(false);
  const { courseId } = useParams();
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [formError, setFormError] = useState<any>();

  const focusTrapRef = useFocusTrap();

  const {
    SectionIndex,
    deleteSection,
    form,
    form: { values },
    permission,
    role,
  } = props;

  const addNewSection = () => {
    console.log(form.topics);
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      setFormError(true);
      return;
    }

    setFormError(false);

    form.insertListItem(`topics.${SectionIndex}.topics`, {
      ...INITIAL_SECTION,
      index: values?.topics[SectionIndex]?.topics?.length ?? 0,
      course: courseId,
    });
    setAccordionValue(values.topics[SectionIndex].topics?.length.toString());
  };

  // const addNewSection = () => {
  //   form.insertListItem('sections.sections', { ...INITIAL_SECTION, index: values.sections.length });
  // };

  const deleteLesson = (
    e: MouseEvent<HTMLButtonElement>,
    sectionIndex: number,
    LessonIndex: number,
    id: string,
  ) => {
    e.stopPropagation();
    form.removeListItem(`topics.${sectionIndex}.topics`, LessonIndex);
    id ? APIDeleteTopic(id) : '';
  };

  const description = values?.topics[SectionIndex]?.description;
  const title = values?.topics[SectionIndex]?.title;
  const creditHours = values?.topics[SectionIndex]?.creditHours;

  const saveEdit = () => {
    if (isEditing == false) {
      setIsEditing(true);
      useFocusTrap(true); // -> focus trap active

      return;
    }
    const { hasErrors, errors } = form.validate();
    if (hasErrors) {
      setFormError(true);
      console.log('@error', errors?.title);

      return;
    }
    setFormError(false);

    setIsEditing(!isEditing);
    // setdescriptionEdit(!descriptionEdit);
  };

  const saveDescriptionEdit = () => {
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      setFormError(errors);

      return;
    }

    if (descriptionEdit == false) {
      setdescriptionEdit(true);
      return;
    }

    setFormError(false);

    setdescriptionEdit(!descriptionEdit);
  };

  useEffect(
    () => {
      const description = values?.topics[SectionIndex]?.description;
      const title = values?.topics[SectionIndex]?.title;
      console.log('The title inside useEffect is ', title);
      const creditHours = values?.topics[SectionIndex]?.creditHours;
      if (role != 'user') {
        title == undefined ? setIsEditing(true) : setIsEditing(false);
        creditHours < 1 ? setIsEditing(true) : setIsEditing(false);
      }

      // description == '' ? setdescriptionEdit(true) : setdescriptionEdit(false);
    },
    [
      // values?.topics[SectionIndex]?.description,
      // values?.topics[SectionIndex]?.title,
      // values?.topics[SectionIndex]?.creditHours,
    ],
  );

  // if (description == '') {
  //   setdescriptionEdit(true);
  // }
  console.log(modalType, 'modalType');
  return (
    <div className="w-full">
      <Modal
        styles={{
          content: {
            height: '70vh',
          },
        }}
        centered
        size={modalType === 'Assessment' ? '60%' : '50%'}
        opened={opened}
        onClose={() => {
          setOpened(false);
          console.log(form.values.topics);
        }}
      >
        {/* Modal content */}
        <LessonModal
          sectionName="section"
          SectionIndex={SectionIndex}
          LessonIndex={0}
          UnitIndex={0}
          close={setOpened}
          type={modalType}
          form={form}
        />
      </Modal>
      {/* <LessonModal open={modalOpen} type={modalType} /> */}
      <Box className="flex ">
        <Box className="flex-1 ">
          <Accordion.Control className="">
            <div
              // className="flex justify-start items-center"
              className="mt-sm "
            >
              {isEditing ? (
                <Grid className="">
                  <Grid.Col className=" flex  " span={7}>
                    <TextInput
                      placeholder="Section Title"
                      // {...form.getInputProps('email')}
                      {...props.form.getInputProps(`topics.${SectionIndex}.title`)}
                      variant="unstyled"
                      className=" mr-sm grow "
                      size="md"
                      style={{
                        borderBottom: '2px solid lightgrey',
                      }}
                      styles={{
                        input: {
                          borderBottom: '2px solid lightgrey',
                        },
                      }}
                      ref={focusTrapRef}
                    />
                    <Text className="text-secondary-dark flex items-end grow font-semibold tracking-wider font-poppin">
                      {' '}
                      Title
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={5}> </Grid.Col>
                </Grid>
              ) : (
                <Text className="text-secondary-dark font-semibold tracking-wider font-poppin">
                  {values?.topics[SectionIndex]?.title}
                </Text>
              )}
              {isEditing ? (
                <>
                  <div className=" flex">
                    <div className=" mt-xs flex">
                      <TextInput
                        placeholder="Credit Hours"
                        // {...form.getInputProps('email')}
                        {...props.form.getInputProps(`topics.${SectionIndex}.creditHours`)}
                        className="w-1/2 mr-sm"
                        size="xs"
                        variant="unstyled"
                        style={{
                          borderBottom: '2px solid lightgrey',
                        }}
                        styles={{
                          input: {
                            borderBottom: '2px solid lightgrey',
                          },
                        }}
                      />
                      <Text className="text-sm flex items-end  text-primary-1000 font-poppin mr-md mt-xs">
                        {' '}
                        Credit Hours
                      </Text>
                    </div>
                    <div></div>
                  </div>
                </>
              ) : (
                <Text className="text-sm text-primary-1000 font-poppin mr-md mt-xs">
                  {values?.topics[SectionIndex]?.creditHours} Credit Hours
                </Text>
              )}

              {/* <EditText
                  value="H"
                  name="textbox3"
                  editButtonProps={<IconEdit className="text-secondary-dark " size={24} />}
                  showEditButton
                  {...props.form.getInputProps(`sections.${SectionIndex}.sectionTitle`)}
                /> */}
            </div>
          </Accordion.Control>
        </Box>
        <Box className="flex items-center pr-md">
          {/* {isEditing ? (
            <>
              <div className="flex justify-end ">
                <TextInput
                  placeholder="Credit Hours"
                  // {...form.getInputProps('email')}
                  {...props.form.getInputProps(`topics.${SectionIndex}.creditHours`)}
                  className="w-1/2 mr-sm"
                  size="xs"
                  variant="unstyled"
                  style={{ borderBottom: '2px solid lightgrey' }}
                />
              </div>
            </>
          ) : (
            <Text className="text-sm text-primary-1000 font-poppin mr-md">
              {values?.topics[SectionIndex]?.creditHours} Credit Hours
            </Text>
          )} */}
          <ActionIcon
            color="text-secondary-dark"
            className={`${permission[role]}`}
            onClick={() => {
              saveEdit();
              // setIsEditing(!isEditing);
            }}
          >
            {isEditing ? (
              // <IconCircleCheck className=" text-primary-1000 " size={24} />
              <Button className="mr-xl" color="teal" radius={'lg'}>
                Done
              </Button>
            ) : (
              <IconEdit className="text-secondary-dark " size={24} />
            )}
          </ActionIcon>
          <ActionIcon
            color="red"
            className={`ml-sm ${permission[role]}`}
            onClick={(e) => deleteSection(e, SectionIndex, values?.topics[SectionIndex]?._id)}
          >
            <IconTrash size={24} />
          </ActionIcon>
        </Box>
      </Box>

      <Accordion.Panel className="mt-sm">
        <Box className={`flex items-center  mb-sm ${permission[role]} `}>
          <Menu
            transitionProps={{ transition: 'pop-bottom-right' }}
            position="bottom-end"
            width={220}
            withinPortal
          >
            <Menu.Target>
              <Button
                className="mr-md"
                variant="outline"
                rightIcon={<IconCaretDown size={24} stroke={1.5} />}
                pr={12}
                radius="md"
              >
                <Text className="text-sm font-semibold font-poppin leading-7">Add Activity</Text>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setModalType('Resource');
                  setOpened(true);
                }}
              >
                <Text>Resource</Text>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setModalType('Assignment');
                  setOpened(true);
                }}
              >
                Assignment
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setModalType('Video');
                  setOpened(true);
                }}
              >
                Video
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setModalType('Assessment');
                  setOpened(true);
                }}
              >
                Assessment
              </Menu.Item>
              {/* <Menu.Item>Assessment</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
          <Button
            variant={`${descriptionEdit ? '' : 'outline'}`}
            radius="md"
            className={`${descriptionEdit && 'bg-green-400/90 text-white'}`}
            leftIcon={
              <IconPlus
                size={16}
                strokeWidth={1.5}
                color={`${descriptionEdit ? 'teal' : 'white'}`}
                className={` rounded-full ${descriptionEdit ? 'bg-white' : 'bg-primary-1000'}  `}
              />
            }
            onClick={() => {
              // setdescriptionEdit(!descriptionEdit);
              saveDescriptionEdit();
            }}
          >
            {descriptionEdit ? (
              <>
                <Text className="text-sm font-semibold font-poppin leading-7">
                  Save Description
                </Text>
              </>
            ) : (
              <Text className="text-sm font-semibold font-poppin leading-7">
                {description == '' || description == null ? 'Add Description' : 'Edit Description'}
              </Text>
            )}
          </Button>
        </Box>

        <Box className="flex justify-start items-center ">
          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Resource');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconFile className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {form.values?.topics[SectionIndex]?.resources?.length} Resource Files
            </Text>
          </Box>

          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Assignment');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconClipboardCheck className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {form.values?.topics[SectionIndex]?.assignment?.length} Assignment
            </Text>
          </Box>

          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Video');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconBrandZoom className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {form.values?.topics[SectionIndex]?.videoUrl?.length} Videos
            </Text>
          </Box>
          {/* <Box className="flex  mr-md">
            <IconChartHistogram className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">1 Assessment</Text>
          </Box> */}
        </Box>

        {descriptionEdit ? (
          <TextEditorComponent
            form={props.form}
            className="mt-xs  text-xl leading-8 tracking-wider"
            courseModel={`topics.${SectionIndex}.description`}
            title=""
            placeholder="Description"
            errorMessage={'enter description'}
            content={form.values?.topics[SectionIndex]?.description}
          />
        ) : (
          // <Text className="text-red-500 mt-sm">Description Cannot be Empty</Text>
          form.values?.topics[SectionIndex]?.description != '' && (
            <TypographyStylesProvider className="h-fit">
              <Text
                className=" mt-xs  h-fit font-poppin text-lg leading-8 tracking-wider"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </TypographyStylesProvider>
          )
        )}

        <Accordion
          chevronPosition="left"
          defaultValue={accordionValue}
          value={accordionValue}
          onChange={setAccordionValue}
          variant="separated"
          className="mt-md"
          styles={{
            label: {
              paddingTop: '0',
              paddingBottom: '0',
            },
          }}
          // key={index}
        >
          {values?.topics[SectionIndex]?.topics?.map((section: ISection, index: number) => (
            <Accordion.Item value={index.toString()} className="bg-white" key={index}>
              <Lesson
                section={section}
                // index={index}
                SectionIndex={SectionIndex}
                LessonIndex={index}
                key={index}
                deleteSection={deleteLesson}
                form={form}
                permission={permission}
                role={role}
              />
            </Accordion.Item>
          ))}
        </Accordion>

        <Group className={`pt-lg pb-sm ${permission[role]} `}>
          <Button
            className=""
            variant="filled"
            color="primary-1000"
            radius="md"
            size="md"
            onClick={addNewSection}
          >
            <IconPlus
              size={16}
              strokeWidth={2.5}
              color={'#3CC3CF'}
              className=" rounded-full bg-white mr-xs text-primary-1000 "
            />
            <Text className="text-sm font-semibold">Add Lesson</Text>
          </Button>
        </Group>
      </Accordion.Panel>
    </div>
  );
};

export default Lecture;
