import React, { useState } from 'react';
import { Button, Checkbox, Grid, Input, Radio, Text } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { APICreateQuiz } from '../../../../api/quiz';
import { useParams } from 'react-router-dom';

interface AssessmentSectionProps {
  close?: any;
  index?: number;
  SectionIndex?: number;
  LessonIndex?: number;
  UnitIndex?: number;
  form?: any;
  sectionName?: string;
  setAssignment?: any;
}

interface Quiz {
  type: 'multiple' | 'single';
  question: string;
  options: string[];
  correctAnswers: number[];
  course: string | undefined;
}

const AssessmentSection = (props: AssessmentSectionProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { courseId } = useParams();
  const form = useForm<Quiz>({
    initialValues: {
      question: '',
      type: 'multiple',
      options: ['', '', '', ''],
      correctAnswers: [],
      course: courseId,
    },
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number,
  ) => {
    console.log(e.target.name, 'target');
    if (e.target.name === 'type' || e.target.name === 'question') {
      form.setValues({
        ...form.values,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name.startsWith('option-') && index !== undefined) {
      const optionIndex = parseInt(e.target.name.split('-')[1], 10);
      const updatedOptions = [...form.values.options];
      updatedOptions[optionIndex] = e.target.value;
      form.setValues({
        ...form.values,
        options: updatedOptions,
      });
    }
  };

  const addQuestion = () => {
    if (editIndex !== null) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes[editIndex] = {
        type: form.values.type as 'multiple' | 'single',
        question: form.values.question,
        options: form.values.options,
        correctAnswers: form.values.correctAnswers,
        course: courseId?.toString(),
      };
      setQuizzes(updatedQuizzes);
      setEditIndex(null);
    } else {
      setQuizzes([
        ...quizzes,
        {
          type: form.values.type as 'multiple' | 'single',
          question: form.values.question,
          options: form.values.options,
          correctAnswers: form.values.correctAnswers,
          course: courseId,
        },
      ]);
    }
    form.reset();
  };

  const editQuiz = (index: number) => {
    const quizToEdit = quizzes[index];
    form.setValues({
      ...quizToEdit,
      type: quizToEdit.type, // Ensure type is of the correct type
    });
    setEditIndex(index);
  };

  const deleteQuiz = (index: number) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes.splice(index, 1);
    setQuizzes(updatedQuizzes);
  };

  const handleCheckboxChange = (index: number) => {
    const { correctAnswers } = form.values;

    const updatedCorrectAnswers = [...correctAnswers];

    if (updatedCorrectAnswers.includes(index)) {
      // If the index is already in the correctAnswers array, remove it
      updatedCorrectAnswers.splice(updatedCorrectAnswers.indexOf(index), 1);
    } else {
      // Otherwise, add it to the correctAnswers array
      updatedCorrectAnswers.push(index);
    }

    form.setValues({
      ...form.values,
      correctAnswers: updatedCorrectAnswers,
    });
  };
  const handleCheckRadioChange = (index: number) => {
    const { correctAnswers } = form.values;

    const updatedCorrectAnswers = [...correctAnswers];

    if (updatedCorrectAnswers.includes(index)) {
      // If the index is already in the correctAnswers array, remove it
      updatedCorrectAnswers.splice(updatedCorrectAnswers.indexOf(index), 1);
    } else {
      // Otherwise, add it to the correctAnswers array
      updatedCorrectAnswers.push(index);
    }

    form.setValues({
      ...form.values,
      correctAnswers: [index],
    });
  };
  console.log(quizzes, 'quiz');
  const submit = async () => {
    const quizData = {
      course: courseId?.toString(),
      questions: quizzes.map((quiz) => ({
        questionTitle: quiz.question,
        type: quiz.type,
        options: quiz.options,
        correctAnswer: quiz.correctAnswers,
      })),
    };

    console.log(quizData, 'quizData');

    const response = await APICreateQuiz(quizData);
    props.setAssignment(response?.data?.message);
    // Handle the API response as needed...
  };
  return (
    <>
      <Grid>
        <Grid.Col md={6} lg={8}>
          <div className="">
            <p className="text-xl font-semibold">Create Quiz</p>
            <p className="text-lg font-medium my-normal">Question</p>
            <div>
              <div className="flex gap-normal mt-normal">
                <Button
                  variant={form.values.type === 'multiple' ? 'filled' : 'outline'}
                  onClick={() => {
                    form.setValues({
                      ...form.values,
                      type: 'multiple',
                      options: ['', '', '', ''],
                      correctAnswers: [], // Clear correctAnswers for multiple-choice
                    });
                  }}
                >
                  Multiple Choice
                </Button>
                <Button
                  variant={form.values.type === 'single' ? 'filled' : 'outline'}
                  onClick={() => {
                    form.setValues({
                      ...form.values,
                      type: 'single',
                      options: ['', '', '', ''],
                      correctAnswers: [], // Clear correctAnswers for single-choice
                    });
                  }}
                >
                  Single Choice
                </Button>
              </div>
            </div>
            <div className="my-normal">
              <Input
                styles={{
                  input: {
                    fontWeight: 'bold',
                  },
                }}
                className="font-semibold"
                type="text"
                name="question"
                value={form.values.question}
                onChange={(e: any) => handleInputChange(e)}
              />
            </div>
            <div>
              <h3>
                Options:
                {form.values.type === 'multiple' && (
                  <span className="text-tiny font-semibold">(Select the Correct Answer(s))</span>
                )}
                {form.values.type === 'single' && (
                  <span className="text-tiny font-semibold">(Select the Correct Answer)</span>
                )}
              </h3>
              <div className="w-full">
                {form.values.options.map((option, index) => (
                  <div className="flex items-center gap-xs" key={index}>
                    {form.values.type === 'multiple' ? (
                      <Checkbox
                        name={`correctAnswer-${index}`}
                        checked={form.values.correctAnswers.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    ) : (
                      <Radio
                        name="correctAnswer"
                        value={index.toString()}
                        checked={form.values.correctAnswers.includes(index)}
                        onChange={() => handleCheckRadioChange(index)}
                      />
                    )}
                    <Input
                      className="my-normal w-2/3"
                      type="text"
                      name={`option-${index}`}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    {form.values.type === 'multiple' &&
                      form.values.correctAnswers.includes(index) && (
                        <span className="text-green-600 font-semibold ml-2">
                          Marked As A Correct Answer
                        </span>
                      )}
                    {form.values.type === 'single' &&
                      form.values.correctAnswers.includes(index) && (
                        <span className="text-green-600 font-semibold ml-2">Correct Answer</span>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button onClick={submit}>Submit</Button>
              <Button
                variant="outline"
                onClick={addQuestion}
                className="mt-normal"
                leftIcon={
                  <IconPlus
                    size={16}
                    strokeWidth={1.5}
                    color="white"
                    className={` rounded-full bg-primary-1000  `}
                  />
                }
              >
                {editIndex !== null ? 'Update Question' : 'Add Question'}
              </Button>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col md={6} lg={4}>
          <div className="border-solid h-full border border-gray-200 rounded-lg p-xs">
            <h2 className="text-xl font-semibold">Edit/Delete Questions</h2>

            {quizzes.map((quiz, index) => (
              <div key={index} className="mt-normal">
                <div className="flex justify-between">
                  <div>
                    <Text className="text-base font-semibold">
                      {index + 1}. {quiz.question}
                    </Text>
                  </div>

                  <div>
                    <IconEdit
                      className="text-secondary-dark"
                      size={20}
                      onClick={() => editQuiz(index)}
                    />
                    <IconTrash size={20} onClick={() => deleteQuiz(index)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default AssessmentSection;
