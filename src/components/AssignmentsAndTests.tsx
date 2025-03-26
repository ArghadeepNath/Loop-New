import React from 'react';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import type { Assignment, Test } from '../types';

const SAMPLE_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Build a REST API',
    course: 'Web Development',
    dueDate: '2025-03-20',
    status: 'pending',
    description: 'Create a RESTful API using Node.js and Express'
  },
  {
    id: '2',
    title: 'Database Design Project',
    course: 'Database Systems',
    dueDate: '2025-03-15',
    status: 'submitted',
    description: 'Design and implement a database schema'
  }
];

const SAMPLE_TESTS: Test[] = [
  {
    id: '1',
    title: 'Midterm Exam',
    course: 'Data Structures',
    date: '2025-03-25',
    duration: 180,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Quiz 2',
    course: 'Algorithms',
    date: '2025-03-18',
    duration: 60,
    status: 'completed',
    score: 92
  }
];

export default function AssignmentsAndTests() {
  return (
    <div className="space-y-6">
      {/* Assignments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assignments</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{SAMPLE_ASSIGNMENTS.length} pending</span>
        </div>

        <div className="space-y-4">
          {SAMPLE_ASSIGNMENTS.map((assignment) => (
            <div 
              key={assignment.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.course}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  assignment.status === 'submitted' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tests Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Tests</h2>
          <GraduationCap className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </div>

        <div className="space-y-4">
          {SAMPLE_TESTS.map((test) => (
            <div 
              key={test.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{test.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.course}</p>
                </div>
                {test.status === 'completed' && test.score && (
                  <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    {test.score}%
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(test.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {test.duration} mins
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}