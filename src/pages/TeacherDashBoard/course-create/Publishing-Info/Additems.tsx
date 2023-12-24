import React, { useState } from 'react';
import {
  Button,
  Text,
  Title,
  TextInput,
  Textarea,
  Accordion,
  Drawer,
  Divider,
  Image,
  Grid,
  Card,
  Box,
  ActionIcon,
} from '@mantine/core';
import {
  faMicrophoneLines,
  faFile,
  faLayerGroup,
  faDesktop,
  faTrash,
  faPhone,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { IconTrash, IconEdit } from '@tabler/icons';
import { Plus } from '../../../../utils/assets/image';
import { IconPlus as TablerPlus } from '@tabler/icons-react';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { INITIAL_FAQ, Ifaq } from '../../../../utils/interfaces/Course.model';
import { useForm } from '@mantine/form';
import { APICreateFaq, APIDeleteFaq } from '../../../../api/faq';
import { errorNotification } from '../../../../utils/helpers/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../../../../components/common/Logo';
import { TeacherProfile } from '../../../../components/modules/course/Coursedetails/TeacherProfile';
import Tags from '../../../coursedetails/Tags';
import moment from 'moment';
import LearningObjective from '../../../coursedetails/LearningObjective';
import Requirements from '../../../coursedetails/Requirements';
import FrequentlyAskedQuestions from '../../../faq';
import Preview from '../Preview';

interface Task {
  question: string;
  answer: string;
}

export default function AddItems(props: any) {
  const [faqsList, setFaqsList] = useState<Task[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [visible, setVisible] = useState(false);
  const courseDetails = useSelector((state: any) => state.courseReducer.courseCreateData);
  const dispatch = useDispatch() as any;
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { setActive } = props;

  const form = useForm({
    initialValues: {
      faqsList: courseDetails?.courseFaqs?.length ? [...courseDetails.courseFaqs] : [],
      question: '',
      answer: '',
    },
  });

  function createTask() {
    if (form.values.question.trim() === '') {
      return; // Don't create a faq with an empty question
    }

    const newTask: Task = {
      question: form.values.question,
      answer: form.values.answer,
    };

    form.setValues({
      ...form.values,
      faqsList: [...form.values.faqsList, newTask],
      question: '',
      answer: '',
    });
  }

  function deleteTask(index: number, id: string) {
    const reponse = APIDeleteFaq(id);
    const clonedTasks = [...form.values.faqsList];
    clonedTasks.splice(index, 1);
    form.setValues({ ...form.values, faqsList: clonedTasks });
  }

  function toggleEdit(index: number) {
    const updatedFaqs = form.values.faqsList.map((faq, i) =>
      i === index ? { ...faq, isEditing: !faq.isEditing } : faq,
    );

    form.setValues({ ...form.values, faqsList: updatedFaqs });
  }

  function saveEdit(index: number) {
    const updatedFaqs = form.values.faqsList.map((faq, i) =>
      i === index ? { ...faq, isEditing: false } : faq,
    );

    form.setValues({ ...form.values, faqsList: updatedFaqs });
  }

  const updatedTasks = form.values.faqsList.map((faq) => ({
    ...faq,
    course: courseId,
  }));
  console.log(updatedTasks, 'updatedtasks');

  const submit = async (e: any) => {
    e.preventDefault();
    console.log('submitted data', updatedTasks);

    try {
      await APICreateFaq(updatedTasks);

      // props.nextStep();
      open();
    } catch (error: any) {
      console.log(error);
      errorNotification(error);
    }
  };

  return (
    <>
      {/* <Accordion
        variant="separated"
        chevron={<img src={Plus} />}
        styles={{
          chevron: {
            '&[data-rotate]': {
              transform: 'rotate(45deg)',
            },
          },
        }}
      >
        {form.values.faqsList.map((faq, index) => (
          <Accordion.Item
            value={index.toString()}
            className="bg-Grayscale-200 shadow-md"
            key={index}
          >
            <Accordion.Control className="text-lg !font-extrabold">
              <span className="font-extrabold">
                {faq.question || 'Is there a free trial available?'}
              </span>
            </Accordion.Control>
            <Accordion.Panel className="font-normal text-base">
              <span className="font-normal text-base">
                {faq.answer ||
                  'Colors, fonts, shadows and many other parts are customizable to fit your'}
              </span>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion> */}
      <form onSubmit={submit}>
        <div>
          {form.values.faqsList.length > 0 ? (
            form.values.faqsList.map((faq, index) => (
              <div key={index} className="p-sm">
                {faq.isEditing ? (
                  <div>
                    <TextInput
                      variant="filled"
                      size="lg"
                      value={faq.question}
                      placeholder="FAQ Question"
                      onChange={(event) => {
                        const updatedFaqs = form.values.faqsList.map((t, i) =>
                          i === index ? { ...t, question: event.target.value } : t,
                        );

                        form.setValues({ ...form.values, faqsList: updatedFaqs });
                      }}
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
                    <Textarea
                      size="xl"
                      variant="filled"
                      placeholder="FAQ Answer"
                      value={faq.answer}
                      onChange={(event) => {
                        const updatedFaqs = form.values.faqsList.map((t, i) =>
                          i === index ? { ...t, answer: event.target.value } : t,
                        );

                        form.setValues({ ...form.values, faqsList: updatedFaqs });
                      }}
                      mt="md"
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
                      radius={'md'}
                    />
                    <div className="flex justify-between items-center mt-md">
                      <Button onClick={() => saveEdit(index)}>Save</Button>
                      <Button onClick={() => toggleEdit(index)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  // <div className="flex justify-between items-center my-lg border-solid border-2 border-gray-200 p-sm">
                  //   <div>
                  //     <Text weight="bold">{faq.question}</Text>
                  //     <Text color="dimmed" size="md" mt="sm">
                  //       {faq.answer || 'No answer was provided for this faq'}
                  //     </Text>
                  //   </div>
                  //   <div className="flex justify-between">
                  //     <IconEdit
                  //       className="text-secondary-dark cursor-pointer"
                  //       size={24}
                  //       onClick={() => toggleEdit(index)}
                  //     />
                  //     <IconTrash
                  //       className="text-secondary-dark cursor-pointer ml-sm"
                  //       size={24}
                  //       color="red"
                  //       onClick={() => deleteTask(index)}
                  //     />
                  //   </div>
                  // </div>
                  // <></>
                  <Accordion
                    // variant="separated"
                    chevron={<img src={Plus} />}
                    chevronPosition="left"
                    variant="separated"
                    radius="md"
                    styles={{
                      chevron: {
                        '&[data-rotate]': {
                          transform: 'rotate(45deg)',
                        },
                      },
                    }}
                  >
                    {/* {form.values.faqsList.map((faq, index) => ( */}
                    <Accordion.Item value={index.toString()} className="" key={index}>
                      <Box className="flex justify-between items-center">
                        <Accordion.Control className="text-lg !font-extrabold">
                          <span className="font-extrabold">
                            {faq.question || 'Is there a free trial available?'}
                          </span>
                        </Accordion.Control>
                        <div className="flex justify-between pr-sm">
                          <ActionIcon>
                            <IconEdit
                              className="text-secondary-dark"
                              size={24}
                              onClick={() => toggleEdit(index)}
                            />
                          </ActionIcon>

                          <ActionIcon className="ml-sm">
                            <IconTrash
                              className="text-secondary-dark "
                              size={24}
                              color="red"
                              onClick={() => deleteTask(index, faq._id)}
                            />
                          </ActionIcon>
                        </div>
                      </Box>

                      <Accordion.Panel className="font-normal text-base">
                        <span className="font-normal text-base">
                          {faq.answer ||
                            'Colors, fonts, shadows and many other parts are customizable to fit your'}
                        </span>
                      </Accordion.Panel>
                    </Accordion.Item>
                    {/* ))} */}
                  </Accordion>
                )}
              </div>
            ))
          ) : (
            <Text size="lg" mt="md" color="dimmed">
              You have no FAQs
            </Text>
          )}
          <div className="mt-lg">
            <Text className="text-lg text-secondary-dark font-semibold mb-xs">New FAQ</Text>
            <TextInput
              variant="filled"
              size="lg"
              value={form.values.question}
              onChange={(event) => form.setValues({ ...form.values, question: event.target.value })}
              placeholder="Enter Question"
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
            <Textarea
              size="xl"
              variant="filled"
              value={form.values.answer}
              onChange={(event: any) =>
                form.setValues({ ...form.values, answer: event.target.value })
              }
              mt="md"
              radius="md"
              placeholder="Enter Answer"
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
          </div>
          {/* <div className="flex justify-center mt-md mb-md rounded-md border-dashed border-2 border-primary-1000 py-xs cursor-pointer">
            <div className="flex justify-center items-center ">
              <img src={Plus} alt="plus-icon" />
              <p className="text-lg font-medium ml-xs">Add New FAQs</p>
            </div>
          </div> */}
          <Button
            className={` w-[100%] text-secondary-dark font-poppin font-medium text-lg mt-md border-dashed border-2 border-primary-1000`}
            variant="unstyled"
            size="lg"
            color="blue"
            fullWidth
            radius="md"
            onClick={createTask}
            // onClick={addNewSection}
          >
            <TablerPlus
              size={24}
              strokeWidth={1.5}
              className=" rounded-full  mr-xs text-primary-1000 "
            />
            Add New FAQ
          </Button>
        </div>
        <div className="sticky bottom-none bg-white z-10 py-xs pt-md flex justify-between border-t-gray-400">
          <div className="flex gap-sm">
            <Button type="button" variant="outline" onClick={() => navigate('/teacher')}>
              Discard
            </Button>
            <Button onClick={open}>Preview</Button>
          </div>
          <div>
            <Button variant="outline" onClick={props.prevStep}>
              Back
            </Button>
            <Button type="submit" className="bg-primary-1000 ml-xs">
              Next step
            </Button>
          </div>
        </div>
      </form>
      {/* <Preview
        opened={visible}
        close={() => {
          setVisible(false);
        }}
      /> */}

      <Preview opened={opened} close={close} setActive={setActive} />

      {/* <Drawer.Root
        opened={visible}
        onClose={() => {
          setVisible(true);
        }}
        position="bottom"
        size="100%"
      >
        <Drawer.Content>
          <Drawer.Header className=" wrapper-x flex justify-between backdrop-blur-xl bg-white/90">
            <div className="logo ">
              <Logo />
            </div>
            <Drawer.Title className="flex justify-center items-center ml-sm">
              <p className="text-center text-xl mt-[5px] font-semibold"> Course Preview</p>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <div className="wrapper-x mt-lg mb-3xl flex justify-between gap-lg ">
              <Grid className="">
                <Grid.Col lg={9} md={8} sm={8} xs={12}>
                  <div>
                    {courseDetails?.courseTitle ? (
                      <p className="text-5xl font-semibold mb-sm">{courseDetails?.courseTitle}</p>
                    ) : (
                      ''
                    )}
                    {courseDetails?.shortDescription ? (
                      <p>{courseDetails?.shortDescription}</p>
                    ) : (
                      ''
                    )}
                  </div>
                  {courseDetails.tags.length > 1 ? <Tags tags={courseDetails?.tags} /> : ''}

                  <TeacherProfile teacher={courseDetails?.teacher} />
                  <p className="text-base font-semibold text-primary-1000 my-normal">
                    Last Updated:
                    {moment(courseDetails?.updatedAt).format('YYYY/MM/DD') ?? ''}
                  </p>
                  <Divider my="sm" />
                  {courseDetails.learningObjective.length > 1 ? (
                    <LearningObjective objective={courseDetails.learningObjective} />
                  ) : (
                    ''
                  )}
                  {courseDetails.toolsAndLanguage.length > 1 ? (
                    <div>
                      <p className="text-2xl font-bold my-md">Course OverView</p>
                      <p className="text-xl font-semibold">Tools, Language and Frameworks</p>
                      <div className="mt-[12px] flex flex-start gap-md">
                        {courseDetails.toolsAndLanguage.map((value: string, index: number) => (
                          <div
                            className="text-xs bg-secondary-1000 px-sm py-xs font-normal"
                            key={index}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {courseDetails.requirements.length > 1 ? (
                    <Requirements requirements={courseDetails?.requirements} />
                  ) : null}
                  {form.values.faqsList.length > 0 ? (
                    <FrequentlyAskedQuestions faqsList={form.values.faqsList} />
                  ) : null}
                </Grid.Col>
                <Grid.Col lg={3} md={4} sm={4} xs={12}>
                  <div className="sticky top-[86px]">
                    <Card padding="lg" radius="md" withBorder>
                      {courseDetails.courseImageUrl !== '' ? (
                        <Card.Section>
                          <Image
                            src={courseDetails.courseImageUrl}
                            alt="Norway"
                            style={{ aspectRatio: 384 / 232 }}
                          />
                        </Card.Section>
                      ) : (
                        ''
                      )}

                      <div>
                        <div className="flex flex-start gap-xs items-center mt-sm mb-normal">
                          <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
                          <Text weight={500}>English</Text>
                        </div>
                        <div className="flex flex-start gap-xs items-center mb-normal">
                          <FontAwesomeIcon icon={faFile} style={{ color: '#0F83FE' }} />
                          <Text weight={500}>Documents and Video available for support</Text>
                        </div>
                        <div className="flex flex-start gap-xs items-center mb-normal">
                          <FontAwesomeIcon icon={faLayerGroup} style={{ color: '#0F83FE' }} />
                          <Text weight={500}>For Intermediate Level</Text>
                        </div>
                        <div className="flex flex-start gap-xs items-center mb-normal">
                          <FontAwesomeIcon icon={faDesktop} style={{ color: '#0F83FE' }} />
                          <Text weight={500}>2 Assessments for certification</Text>
                        </div>
                        <div className="flex flex-start gap-xs items-center mb-normal">
                          <FontAwesomeIcon icon={faMicrophoneLines} style={{ color: '#0F83FE' }} />
                          <Text weight={500}>Total 8 lessons</Text>
                        </div>
                        <Divider />
                      </div>
                      <div className="my-sm">
                        <p className="text-base font-semibold">Rs 1,00,000 - Rs 2,00,000</p>
                        <p className="text-xs font-normal mt-xs">
                          Note: Price may vary according to the schedule{' '}
                        </p>
                      </div>
                      <Button className="mt-sm mb-md bg-primary-1000" size="lg" fullWidth>
                        Apply Now
                      </Button>
                    </Card>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root> */}
    </>
  );
}
