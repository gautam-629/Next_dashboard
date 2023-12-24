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
  FocusTrap,
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
import { ISection } from '../../../../utils/interfaces/Course.model';
import TextEditorComponent from '../input-field/TextEditorComponent';
interface UnitProps {
  section: ISection;
  key: number;
  SectionIndex: number;
  LessonIndex: number;
  UnitIndex: number;
  deleteSection: (
    e: MouseEvent<HTMLButtonElement>,
    sectionIndex: number,
    lessonIndex: number,
    UnitIndex: number,
    id: string,
  ) => void;
  form: any;
  permission: any;
  role: string;
}
const Unit = (props: UnitProps) => {
  const [type, setType] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [descriptionEdit, setdescriptionEdit] = useState<boolean>(false);
  const focusTrapRef = useFocusTrap();

  // const [resource, setResource] = useState(false);
  // const [video, setVideo] = useState(false);
  // const [description, setDescription] = useState(false);
  // const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  // const { index, SectionIndex, deleteLesson, form } = props;

  const {
    SectionIndex,
    LessonIndex,
    UnitIndex,
    deleteSection,
    form,
    form: { values },
    permission,
    role,
  } = props;

  const description =
    values?.topics[SectionIndex]?.topics[LessonIndex].topics[UnitIndex].description;
  const title = values?.topics[SectionIndex]?.topics[LessonIndex].title;

  const saveEdit = () => {
    console.log(
      'In save edit',
      form.values?.topics[SectionIndex]?.topics[LessonIndex].topics[UnitIndex],
    );
    if (isEditing == false) {
      setIsEditing(true);
      return;
    }
    const { hasErrors, errors } = form.validate();
    if (hasErrors) {
      console.log('Form has errors');
      return;
    }
    setIsEditing(false);
  };

  const saveDescriptionEdit = () => {
    if (descriptionEdit == false) {
      setdescriptionEdit(true);
      return;
    }
    // const { hasErrors, errors } = form.validate();
    // if (hasErrors) {
    //   return;
    // }
    setdescriptionEdit(!descriptionEdit);
  };

  useEffect(
    () => {
      const title = values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.title;
      const creditHours =
        values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.creditHours;

      console.log('The title inside useEffect is ', title);
      // title == undefined ? setIsEditing(true) : setIsEditing(false);
      if (role != 'user') {
        title == undefined ? setIsEditing(true) : setIsEditing(false);
        creditHours < 1 ? setIsEditing(true) : setIsEditing(false);
      }
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
          sectionName="unit"
          close={setOpened}
          SectionIndex={SectionIndex}
          LessonIndex={LessonIndex}
          UnitIndex={UnitIndex}
          type={modalType}
          form={form}
        />
      </Modal>
      <Box className="flex  ">
        <Box className="flex-1">
          <Accordion.Control className="mt-sm">
            {/* <div className="">
              {isEditing ? (
                <div className=" flex items-center">
                  <TextInput
                    placeholder="Section Title"
                    // {...form.getInputProps('email')}
                    {...props.form.getInputProps(
                      `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.title`,
                    )}
                    variant="unstyled"
                    className=" "
                    style={{ borderBottom: '2px solid lightgrey' }}
                  />
                  <Text className="text-secondary-dark font-semibold tracking-wider font-poppin">
                    {' '}
                    Title
                  </Text>
                </div>
              ) : (
                <Text className="text-secondary-dark font-semibold tracking-wider font-poppin">
                  {values.topics[SectionIndex].topics[LessonIndex].topics[UnitIndex].title}
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
                        `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.title`,
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
                  {values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.title}
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
                          `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.creditHours`,
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
                  {
                    values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]
                      ?.creditHours
                  }{' '}
                  Credit Hours
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
        <Box className={`flex justify-end items-end pr-md ${permission[role]}`}>
          <ActionIcon
            color="text-secondary-dark"
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
            className="ml-sm"
            onClick={(e) =>
              deleteSection(
                e,
                SectionIndex,
                LessonIndex,
                UnitIndex,
                values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?._id,
              )
            }
          >
            <IconTrash size={24} />
          </ActionIcon>
        </Box>
      </Box>
      <Accordion.Panel className="mt-sm">
        <Box className={`flex items-center ${permission[role]}`}>
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

        <Box className="flex justify-start items-center mt-sm">
          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Resource');
              // setModalType('Resource');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconFile className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {
                form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.resources
                  ?.length
              }{' '}
              Resource Files
            </Text>
          </Box>
          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Assignment');
              // setModalType('Resource');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconClipboardCheck className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {
                form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]
                  ?.assignment?.length
              }{' '}
              Assignment
            </Text>
          </Box>
          <Box
            className={`flex mr-md ${permission[role] == 'hidden' ? '' : 'cursor-pointer'} `}
            onClick={() => {
              setModalType('Video');
              // setModalType('Resource');
              {
                permission[role] == 'hidden' ? '' : setOpened(true);
              }
            }}
          >
            <IconBrandZoom className="mr-xs text-primary-1000" size={20} />
            <Text className="text-sm text-Grayscale-700 font-medium font-poppin">
              {
                form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]?.videoUrl
                  ?.length
              }
              &nbsp;Videos
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
                `topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.description`,
              )}
            /> */}
            <TextEditorComponent
              form={props.form}
              className="mt-xs  text-xl leading-8 tracking-wider"
              courseModel={`topics.${SectionIndex}.topics.${LessonIndex}.topics.${UnitIndex}.description`}
              title=""
              placeholder="Description"
              errorMessage={'enter description'}
              content={
                form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]
                  ?.description
              }
            />
          </>
        ) : form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex]
            ?.description == '' ? (
          // <Text className="text-red-500 mt-sm">Description Cannot be Empty</Text>
          ''
        ) : (
          // <Box className=" mt-xs font-poppin text-lg leading-8 tracking-wider">{description}</Box>
          form.values?.topics[SectionIndex]?.topics[LessonIndex]?.topics[UnitIndex].description !=
            '' && (
            <TypographyStylesProvider className="h-fit">
              <Text
                className=" mt-xs  h-fit font-poppin text-lg leading-8 tracking-wider"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </TypographyStylesProvider>
          )
        )}

        {/* <Lesson
              lesson={lesson}
              index={index}
              SectionIndex={SectionIndex}
              key={index}
              deleteLesson={deleteLesson}
              form={form}
            /> */}
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

export default Unit;
