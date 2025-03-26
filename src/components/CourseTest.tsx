import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import type { CourseTest, TestQuestion } from '../types';
import CodeEditor from './CodeEditor';

interface CourseTestProps {
  test: CourseTest;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function CourseTest({ test, onComplete, onBack }: CourseTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(test.timeLimit * 60); // Convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate score
    let totalScore = 0;
    let totalPoints = 0;
    
    test.questions.forEach((question) => {
      totalPoints += question.points;
      if (question.type === 'multiple-choice' && answers[question.id] === question.correctAnswer) {
        totalScore += question.points;
      }
      // For coding questions, we'd need to run tests
    });

    const finalScore = (totalScore / totalPoints) * 100;
    onComplete(finalScore);
  };

  const renderQuestion = (question: TestQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-900 dark:text-white">{question.question}</p>
            <div className="space-y-2">
              {question.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'coding':
        return (
          <div className="space-y-4">
            <p className="text-lg text-gray-900 dark:text-white">{question.question}</p>
            {question.problem && <CodeEditor problem={question.problem} />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={onBack}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                {test.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(timeLeft)}
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1 bg-indigo-600"
              style={{
                width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="p-6">
            {/* Question Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestion + 1} of {test.questions.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  • {test.questions[currentQuestion].points} points
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.min(test.questions.length - 1, prev + 1))}
                  disabled={currentQuestion === test.questions.length - 1}
                  className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Question Content */}
            {renderQuestion(test.questions[currentQuestion])}
          </div>
        </div>

        {/* Test Information */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Important Information
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You need to score at least {test.passingScore}% to pass this test.
                Make sure to complete all questions before submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}