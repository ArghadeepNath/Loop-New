import React from 'react';
import { CheckCircle2, Circle, Trophy, Star, TrendingUp, Target } from 'lucide-react';
import type { DailyChallenge } from '../types';

const DAILY_CHALLENGES: DailyChallenge[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', completed: true, category: 'Arrays' },
  { id: '2', title: 'Valid Parentheses', difficulty: 'Easy', completed: true, category: 'Stacks' },
  { id: '3', title: 'Merge Intervals', difficulty: 'Medium', completed: false, category: 'Arrays' },
  { id: '4', title: 'LRU Cache', difficulty: 'Hard', completed: false, category: 'Design' },
];

export default function DailyChallenges() {
  const completedCount = DAILY_CHALLENGES.filter(c => c.completed).length;

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <h2 className="text-xl font-bold">Daily Goals</h2>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg font-bold">{completedCount}/4</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{(completedCount / 4 * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(completedCount / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Trophy, label: 'Current Rank', value: '156' },
            { icon: Star, label: 'Total XP', value: '2,450' },
            { icon: TrendingUp, label: 'Streak', value: '15 days' },
            { icon: CheckCircle2, label: 'Completed', value: '324' }
          ].map((stat, index) => (
            <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <stat.icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400 mb-2" />
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenges List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Challenges</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {DAILY_CHALLENGES.map((challenge) => (
            <div 
              key={challenge.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {challenge.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                )}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{challenge.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}