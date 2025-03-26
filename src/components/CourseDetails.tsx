import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { Play, Book, Code, CheckCircle2, Lock, Trophy, Clock, Users, Star, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import type { Course, Checkpoint } from '../types';
import CodeEditor from './CodeEditor';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
}

export default function CourseDetails({ course, onBack, onEnroll }: CourseDetailsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeCheckpoint, setActiveCheckpoint] = useState<Checkpoint | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalXP = course.syllabus.reduce((total, section) => 
    total + section.xpPoints, 0
  );

  const renderCheckpointContent = (checkpoint: Checkpoint) => {
    switch (checkpoint.type) {
      case 'video':
        return (
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <ReactPlayer
              url={checkpoint.content.videoUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        );
      case 'notes':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{checkpoint.content.notes || ''}</ReactMarkdown>
          </div>
        );
      case 'playground':
        return checkpoint.content.problem ? (
          <CodeEditor problem={checkpoint.content.problem} />
        ) : null;
      default:
        return null;
    }
  };

  if (activeCheckpoint) {
    return (
      <div className="h-full">
        <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveCheckpoint(null)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Course
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {activeCheckpoint.title}
          </h2>
          {renderCheckpointContent(activeCheckpoint)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <button
            onClick={onBack}
            className="flex items-center text-white/80 hover:text-white mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Courses
          </button>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">{course.description}</p>
          <div className="flex items-center space-x-8 text-white/80">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              2.5k students
            </div>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              {totalXP} XP
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              4.8 (420 reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.skills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prerequisites</h2>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Content</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {course.totalLessons} lessons • {course.duration} total length
                </p>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {course.syllabus.map((section) => (
                  <div key={section.id}>
                    <button
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-4">
                          {section.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {section.checkpoints.length} lessons • {section.xpPoints} XP
                          </p>
                        </div>
                      </div>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedSections.includes(section.id) && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                        <div className="space-y-2">
                          {section.checkpoints.map((checkpoint) => (
                            <button
                              key={checkpoint.id}
                              className="w-full flex items-center p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                              onClick={() => setActiveCheckpoint(checkpoint)}
                            >
                              <div className="mr-4">
                                {checkpoint.type === 'video' && <Play className="w-5 h-5 text-blue-500" />}
                                {checkpoint.type === 'notes' && <Book className="w-5 h-5 text-purple-500" />}
                                {checkpoint.type === 'playground' && <Code className="w-5 h-5 text-green-500" />}
                              </div>
                              <div className="flex-1 text-left">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {checkpoint.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {checkpoint.duration} • {checkpoint.xpPoints} XP
                                </p>
                              </div>
                              {checkpoint.completed && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 ml-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${course.price}
                    </div>
                    {course.enrolled ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                        Enrolled
                      </span>
                    ) : null}
                  </div>
                  {course.enrolled ? (
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      Continue Learning
                    </button>
                  ) : (
                    <button
                      onClick={() => onEnroll(course.id)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                  <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                      Certificate of completion
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Lifetime access
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Enterprise licensing available
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Your Instructor
                </h3>
                <div className="flex items-center">
                  <img
                    src={course.instructor.imageUrl}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {course.instructor.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.instructor.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Certificate
                </h3>
                <img
                  src={course.certificate.imageUrl}
                  alt="Certificate Preview"
                  className="w-full rounded-lg mb-4"
                />
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {course.certificate.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.certificate.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}