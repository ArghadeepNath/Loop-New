import React from 'react';
import { type Course } from '../types';
import { Trophy, BookOpen, Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
  onClick: (course: Course) => void;
}

export default function CourseCard({ course, onEnroll, onClick }: CourseCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] group cursor-pointer"
      onClick={() => onClick(course)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">2.5k students</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{course.duration}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.title}</h3>
          <div className="flex items-center text-yellow-500">
            <Trophy className="w-5 h-5" />
            <span className="ml-1 font-semibold">{course.xpPoints} XP</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(4.8)</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">${course.price}</span>
        </div>
        
        {course.enrolled ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <button 
              className="w-full flex items-center justify-center space-x-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 py-2.5 rounded-lg font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClick(course);
              }}
            >
              <BookOpen className="w-5 h-5" />
              <span>Continue Learning</span>
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnroll(course.id);
            }}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Enroll Now</span>
          </button>
        )}
      </div>
    </div>
  );
}