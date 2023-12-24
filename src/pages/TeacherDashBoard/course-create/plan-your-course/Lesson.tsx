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
  Space,
  Text,
  TextInput,
  Textarea,
  TypographyStylesProvider,
} from '@mantine/core';
import { useDisclosure, useFocusTrap } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { MouseEvent, useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import {
  IconTrash,
  IconEdit,
  IconFile,
  IconClipboardCheck,
  IconBrandZoom,
  IconCaretDown,
  IconChartHistogram,
  IconCircleCheck,
} from '@tabler/icons-react';
import { EditText } from 'react-edit-text';
import { useSelector } from 'react-redux';
import LessonModal from './LessonModal';
import { File2, Video1 } from '../../../../utils/assets/image';
import Unit from './Unit';
import { INITIAL_SECTION, ISection } from '../../../../utils/interfaces/Course.model';
import { useParams } from 'react-router-dom';
import { APIDeleteTopic } from '../../../../api/course';
import TextEditorComponent from '../input-field/TextEditorComponent';
interface LessonProps {
  section: ISection;
  SectionIndex: number;
  LessonIndex: number;
  deleteSection: (
    e: MouseEvent<HTMLButtonElement>,
    sectionIndex: number,
    lessonIndex: number,
    id: string,
  ) => void;
  form: any;
  permission: any;
  role: string;
}
const Lesson = (props: LessonProps) => {
  // const [type, setType] = useState('');
  // // const [resource, setResource] = useState(false);
  // // const [video, setVideo] = useState(false);
  // // const [description, setDescription] = useState(false);
  // const [opened, { open, close }] = useDisclosure(false);
  // const theme = useMantineTheme();
  // const { index, SectionIndex, deleteLesson, form } = props;

  // const {
  //   SectionIndex,
  //   // deleteSection,
  //   form,
  //   form: { values },
  // } = props;

  // const deleteLesson = (e: any, index: number) => {
  //   e.stopPropagation();
  //   form.removeListItem(`topics.${SectionIndex}.lessons`, index);
  // };

  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [descriptionEdit, setdescriptionEdit] = useState<boolean>(false);
  const { courseId } = useParams();
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const focusTrapRef = useFocusTrap();

  const {
    SectionIndex,
    LessonIndex,
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
      return;
    }
    form.insertListItem(`topics.${SectionIndex}.topics.${LessonIndex}.topics`, {
      ...INITIAL_SECTION,
      index: values?.topics[SectionIndex]?.topics[LessonIndex]?.topics?.length ?? 0,
      course: courseId,
      topics: [],
    });
    setAccordionValue(values.topics[SectionIndex].topics[LessonIndex].topics?.length.toString());
  };

  // const addNewSection = () => {
  //   form.insertListItem('topics.topics', { ...INITIAL_SECTION, index: values.topics.length });
  // };

  const deleteUnit = (
    e: MouseEvent<HTMLButtonElement>,
    SectionIndex: number,
    LessonIndex: number,
    UnitIndex: number,
    id: string,
  ) => {
    e.stopPropagation();
    id ? APIDeleteTopic(id) : '';

    form.removeListItem(`topics.${SectionIndex}.topics.${LessonIndex}.topics`, UnitIndex);
  };

  const description = values?.topics[SectionIndex]?.topics[LessonIndex].description;
  const title = values?.topics[SectionIndex]?.topics[LessonIndex].title;

  const saveEdit = () => {
    if (isEditing == false) {
      setIsEditing(true);
      return;
    }
    const { hasErrors, errors } = form.validate();
    if (hasErrors) {
      return;
    }
    setIsEditing(!isEditing);
  };

  const saveDescriptionEdit = () => {
    const { hasErrors, errors } = form.validate();

    if (hasErrors) {
      return;
    }
    if (descriptionEdit == false) {
      setdescriptionEdit(true);
      return;
    }

    setdescriptionEdit(!descriptionEdit);
  };

  useEffect(
    () => {
      const title = values?.topics[SectionIndex]?.topics[LessonIndex].title;
      const creditHours = values?.topics[SectionIndex]?.topics[LessonIndex].creditHours;

      if (role != 'user') {
        title == undefined ? setIsEditing(true) : setIsEditing(false);
        creditHours < 1 ? setIsEditing(true) : setIsEditing(false);
      }
      // console.log('The title inside useEffect is ', title);
      // title == undefined ? setIsEditing(true) : setIsEditing(false);
    },
    [
      // values?.topics[SectionIndex]?.description,
      // values?.topics[SectionIndex]?.title,
      // values?.topics[SectionIndex]?.creditHours,
    ],
  );

  return (
    <div className="w-full">
      <Modal
        size={modalType === 'Assessment' ? '60%' : '50%'}
        opened={opened}
        onClose={() => {
          setOpened(false);
          console.log(form.values.topics);
        }}
        centered
      >
        {/* Modal content */}
        <LessonModal
          sectionName="lesson"
          close={setOpened}
          SectionIndex={SectionIndex}
          LessonIndex={LessonIndex}
          UnitIndex={0}
          type={modalType}
          form={form}
          // type={modalType}
        />
      </Modal>
      <Box className="flex  ">
        <Box className="flex-1">
          <Accordion.Control className="mt-sm">
            {/* <div>
              {isEditing ? (
                <div className=" flex items-center">
                  <TextInput
                    placeholder="Section Title"
                    // {...form.getInputProps('email')}
                    {...props.form.getInputProps(
                      `topics.${SectionIndex}.topics.${LessonIndex}.title`,
                    )}
                    variant="unstyled"
                    className=" mr-sm "
                    style={{ borderBottom: '2px solid lightgrey' }}
                  />
                  <Text className="text-secondary-dark font-semibold tracking-wider font-poppin">
                    {' '}
                    Title
                  </Text>
                </div>
              ) : (
                <Text className="text-secondary-dark font-semibold tracking-wider font-poppin text-lg">
                  {values.topics[SectionIndex].topics[LessonIndex].title}
                </Text>
              )}
            </div> */}
            <div
            // className="flex justify-start items-center"
            >
              {isEditing ? (
                <Grid className="">
                  <Grid.Col className=" flex  " span={6}>
                    <TextInput
                      placeholder="Section Title"
                      // {...form.getInputProps('email')}
                      {...props.form.getInputProps(
                        `topics.${SectionIndex}.topics.${LessonIndex}.title`,
                      )}
                      variant="unstyled"
                      className="grow mr-sm "
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
                    <Text className="text-secondary-dark flex items-end font-semibold tracking-wider font-poppin grow">
                      {' '}
                      Title
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}> </Grid.Col>
                </Grid>
              ) : (
                <Text className="text-secondary-dark font-semibold tracking-wider font-poppin">
                  {values?.topics[SectionIndex]?.topics[LessonIndex]?.title}
                </Text>
              )}
              {isEditing ? (
                <>
                  <div className=" flex">
                    <div className=" mt-xs flex">
                      <TextInput
                        placeholder="Credit Hours"
                        // {...form.getInputProps('email')}
                        {...props.form.getInputProps(
                          `topics.${SectionIndex}.topics.${LessonIndex}.creditHours`,
                        )}
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
                      <Text className="text-sm text-primary-1000 font-poppin mr-md mt-xs">
                        {' '}
                        Credit Hours
                      </Text>
                    </div>
                    <div></div>
                  </div>
                </>
              ) : (
                <Text className="text-sm text-primary-1000 font-poppin mr-md mt-xs">
                  {values?.topics[SectionIndex]?.topics[LessonIndex]?.creditHours} Credit Hours
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
        <Box className="flex justify-end items-end pr-md">
          <ActionIcon
            color="text-secondary-dark"
            className={`${permission[role]}`}
            onClick={() => {
              // setIsEditing(!isEditing);
              saveEdit();
            }}
          >
            {isEditing ? (
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
            onClick={(e) =>
              deleteSection(
                e,
                SectionIndex,
                LessonIndex,
                values.topics[SectionIndex].topics[LessonIndex]._id,
              )
            }
          >
            <IconTrash size={24} />
          </ActionIcon>
        </Box>
      </Box>
      <Accordion.Panel className="mt-sm">
        <Box className={`flex items-center  mb-sm ${permission[role]}`}>
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

        <Box className="flex justify-start items-center">
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
              {form.values?.topics[SectionIndex]?.topics[LessonIndex]?.resources?.length} Resource
              Files
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
              {form.values?.topics[SectionIndex]?.topics[LessonIndex]?.assignment?.length}{' '}
              Assignment
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
              {form.values?.topics[SectionIndex]?.topics[LessonIndex]?.videoUrl?.length} Videos
            </Text>
          </Box>
          {/* <Box className="flex  mr-md">
            <IconChartHistogram className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">1 Assessment</Text>
          </Box> */}
        </Box>

        {descriptionEdit ? (
          <>
            {/* <Textarea
              autosize
              minRows={4}
              className="mt-xs font-poppin text-xl leading-8 tracking-wider"
              {...props.form.getInputProps(
                `topics.${SectionIndex}.topics.${LessonIndex}.description`,
              )}
            /> */}
            <TextEditorComponent
              form={props.form}
              className="mt-xs  text-xl leading-8 tracking-wider"
              courseModel={`topics.${SectionIndex}.topics.${LessonIndex}.description`}
              title=""
              placeholder="Description"
              errorMessage={'enter description'}
              content={form.values?.topics[SectionIndex]?.topics[LessonIndex]?.description}
            />
          </>
        ) : form.values?.topics[SectionIndex]?.topics[LessonIndex]?.description == '' ? (
          ''
        ) : (
          // <Text className="text-red-500 mt-sm">Description Cannot be Empty</Text>
          // <Box className=" mt-xs font-poppin text-lg leading-8 tracking-wider">{description}</Box>
          form.values?.topics[SectionIndex]?.topics[LessonIndex]?.description != '' && (
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
          {values?.topics[SectionIndex]?.topics[LessonIndex]?.topics?.map(
            (section: ISection, index: number) => (
              <Accordion.Item value={index.toString()} className="bg-white" key={index}>
                <Unit
                  section={section}
                  SectionIndex={SectionIndex}
                  LessonIndex={LessonIndex}
                  UnitIndex={index}
                  key={index}
                  deleteSection={deleteUnit}
                  form={form}
                  permission={permission}
                  role={role}
                />
              </Accordion.Item>
            ),
          )}
        </Accordion>

        <Group className="pt-lg pb-sm ">
          <Button
            className={`${permission[role]}`}
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
            <Text className="text-sm font-semibold">Add Unit</Text>
          </Button>
        </Group>
      </Accordion.Panel>
    </div>

    // <div className="">
    //   <Accordion.Panel>
    //     <div className=" w-full ">
    //       <div className="border-solid border border-gray-300 p-sm rounded-[10px] ">
    //         <div className="flex justify-between items-center lecture-border border border-b border-gray-300">
    //           <span>
    //             <EditText
    //               name="textbox3"
    //               className="lecture "
    //               editButtonProps={{
    //                 style: {},
    //               }}
    //               showEditButton
    //               {...form.getInputProps(`topics.${SectionIndex}.lessons.${index}.lessonTitle`)}
    //             />
    //           </span>
    //           <ActionIcon color="red" onClick={(e) => deleteLesson(e, index)}>
    //             <IconTrash size="20px" />
    //           </ActionIcon>
    //         </div>

    //         {/* {resource ? (
    //           <Resource
    //             resource={resource}
    //             setResource={setResource}
    //             form={props.form}
    //             index={props.index}
    //             lessonIndex={props.lessonIndex}
    //           />
    //         ) : video ? (
    //           <VideoSection
    //             video={video}
    //             setVideo={setVideo}
    //             form={props.form}
    //             index={props.index}
    //             lessonIndex={props.lessonIndex}
    //           />
    //         ) : description ? (
    //           <Description
    //             description={description}
    //             setDescription={setDescription}
    //             form={props.form}
    //             index={props.index}
    //             lessonIndex={props.lessonIndex}
    //           />
    //         ) : ( */}
    //         {
    //           <div>
    //             <LessonModal
    //               open={open}
    //               theme={theme}
    //               close={close}
    //               opened={opened}
    //               type={type}
    //               setType={setType}
    //               form={props.form}
    //               index={props.index}
    //               SectionIndex={props.SectionIndex}
    //             />
    //           </div>
    //         }
    //         <div className="my-sm flex">
    //           <div className="flex items-center ">
    //             <img src={File2} />
    //             <span className=" ml-[4px] font-medium text-sm leading-[22px] tracking-[0.25px] text-[#4e4b66]">
    //               2 Resources files
    //             </span>
    //           </div>
    //           <div className="flex items-center ml-sm ">
    //             <img src={Video1} />
    //             <span className=" ml-[4px] font-medium text-sm leading-[22px] tracking-[0.25px] text-[#4e4b66]">
    //               1 Video
    //             </span>
    //           </div>
    //         </div>

    //         <div className="border-solid rounded-xl border border-gray-300">
    //           <p className="text-center">
    //             <Plus size={24} strokeWidth={1.5} color={'black'} className="pt-xs" />
    //             ADD
    //           </p>
    //           <div className=" px-xs py-xs flex justify-center">
    //             <Group>
    //               <Group className="flex-col">
    //                 <FileDescription
    //                   size={48}
    //                   strokeWidth={1.5}
    //                   color={'white'}
    //                   className="bg-blue-800 rounded-full p-[10px]"
    //                   onClick={() => {
    //                     setType('Resource');
    //                     open();
    //                   }}
    //                 />

    //                 <Text>Resources</Text>
    //               </Group>
    //               <Space w="md" />
    //               <Group className="flex-col">
    //                 <Video
    //                   size={48}
    //                   strokeWidth={1.5}
    //                   color={'white'}
    //                   className="bg-blue-800 rounded-full p-[10px]"
    //                   onClick={() => {
    //                     setType('Video');
    //                     open();
    //                   }}
    //                 />

    //                 <Text>Video</Text>
    //               </Group>
    //               <Space w="xs" />
    //               <Group className="flex-col">
    //                 <ClipboardList
    //                   size={48}
    //                   strokeWidth={1.5}
    //                   color={'white'}
    //                   className="bg-primary-700 rounded-full p-[10px]"
    //                   onClick={() => {
    //                     setType('Description');
    //                     open();
    //                   }}
    //                 />

    //                 <Text>Description</Text>
    //               </Group>
    //             </Group>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Accordion.Panel>
    // </div>
  );
};

export default Lesson;
