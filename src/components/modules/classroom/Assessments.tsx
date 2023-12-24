import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Radio } from '@mantine/core';
import { Clock } from '../../../utils/assets/image';

const dummyQuestions = [
  {
    type: 'single',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswers: [false, false, true, false], // Correct answer: Paris
  },
  {
    type: 'multiple',
    question: 'Which of the following are planets in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus', 'Moon'],
    correctAnswers: [true, true, true, true, false], // Correct answers: Earth, Mars, Jupiter, Venus
  },
  {
    type: 'single',
    question: 'What is the largest mammal on Earth?',
    options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswers: [false, true, false, false], // Correct answer: Blue Whale
  },
];

const Assessments = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<Array<boolean | undefined>>>(
    Array.from({ length: dummyQuestions.length }, () => []),
  );
  const [submitted, setSubmitted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [viewingCorrectAnswers, setViewingCorrectAnswers] = useState(false);
  const [quizResults, setQuizResults] = useState<Array<Array<boolean>>>([]); // Store user answers
  const [userScore, setUserScore] = useState(0); // Store user's score

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
  }, [timer]);

  const handleCheckboxChange = (optionIndex: number) => {
    const newAnswers: Array<Array<boolean | undefined>> = [...answers];
    newAnswers[currentQuestionIndex][optionIndex] = !newAnswers[currentQuestionIndex][optionIndex];
    setAnswers(newAnswers);
  };

  const handleRadioChange = (optionIndex: number) => {
    const newAnswers: Array<Array<boolean | undefined>> = Array.from(
      { length: dummyQuestions.length },
      () => [],
    );

    if (dummyQuestions[currentQuestionIndex].type === 'single') {
      newAnswers[currentQuestionIndex][optionIndex] = true;
    }

    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      const updatedResults = [...quizResults];
      updatedResults[currentQuestionIndex] = answers[currentQuestionIndex].map((answer, index) =>
        answer === undefined
          ? false
          : answer === dummyQuestions[currentQuestionIndex].correctAnswers[index],
      );
      setQuizResults(updatedResults);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(60);
      setShowCorrectAnswer(false);
      setAnswers(
        Array.from({ length: dummyQuestions[currentQuestionIndex + 1].options.length }, () => []),
      );
    } else {
      // If on the last question, submit the quiz
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    setSubmitted(true);
    setShowCorrectAnswer(true);

    // Calculate the user's score for both single and multiple-choice questions
    const userScore = quizResults.reduce((score, result, index) => {
      const isCorrect =
        dummyQuestions[index].type === 'single' ? result[0] : result.every((selected) => selected);
      return isCorrect ? score + 1 : score;
    }, 0);

    // Store the user's score
    setUserScore(userScore);
  };

  const toggleCorrectAnswers = () => {
    setViewingCorrectAnswers(!viewingCorrectAnswers);
  };

  const currentQuestion = dummyQuestions[currentQuestionIndex];

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl">Quiz Questions</div>
        <div className="flex items-center gap-md">
          <div>
            <p className="text-tiny font-normal">Answered :</p>
            <span className="text-tiny font-medium"> 1/8</span>{' '}
          </div>
          <div className="flex items-center">
            {' '}
            <img src={Clock} alt="Clock" />
            <span>Time remaining: {timer} seconds</span>
          </div>
        </div>
      </div>

      {submitted && !viewingCorrectAnswers && (
        <div className="my-xs">
          <p>Quiz Finished</p>
          <p>
            Your Score: {userScore} / {dummyQuestions.length}
          </p>
          <Button onClick={toggleCorrectAnswers}>View Correct Answers</Button>
        </div>
      )}

      {viewingCorrectAnswers && (
        <div className="my-xs">
          <h2>Correct Answers</h2>
          {dummyQuestions.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              {question.correctAnswers.map((isCorrect, optionIndex) => (
                <p key={optionIndex}>
                  {isCorrect ? '✅ ' : '❌ '}
                  {question.options[optionIndex]}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {!submitted && !viewingCorrectAnswers && (
        <div key={currentQuestionIndex}>
          <p className="my-sm font-semibold text-base">{currentQuestion.question}</p>
          {currentQuestion.options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="px-sm py-xs my-normal b border-solid border border-gray-200 rounded-md"
            >
              {currentQuestion.type === 'multiple' ? (
                <Checkbox
                  className="my-normal text-7xl"
                  styles={{
                    label: {
                      fontSize: '16px',
                      fontWeight: 'normal',
                    },
                  }}
                  label={option}
                  checked={answers[currentQuestionIndex][optionIndex] || false}
                  onChange={() => handleCheckboxChange(optionIndex)}
                  disabled={submitted}
                />
              ) : (
                <Radio
                  styles={{
                    label: {
                      fontSize: '16px',
                      fontWeight: 'normal',
                    },
                  }}
                  className="my-normal"
                  label={option}
                  checked={answers[currentQuestionIndex][optionIndex] || false}
                  onChange={() => handleRadioChange(optionIndex)}
                  disabled={submitted}
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <div>
          {!submitted &&
            !viewingCorrectAnswers &&
            currentQuestionIndex < dummyQuestions.length - 1 && (
              <Button onClick={nextQuestion}>
                Next Question ({currentQuestionIndex + 1} of {dummyQuestions.length})
              </Button>
            )}
        </div>
        <div>
          {!submitted &&
            !viewingCorrectAnswers &&
            currentQuestionIndex === dummyQuestions.length - 1 && (
              <Button onClick={submitQuiz} className="my-sm ml-sm">
                Submit Quiz
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
