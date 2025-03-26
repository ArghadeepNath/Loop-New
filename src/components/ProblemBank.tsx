import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  TrendingUp,
  Clock,
  Bookmark,
  BookOpen,
  Calendar,
  List,
  BarChart,
  ExternalLink,
  Eye,
  Info,
} from "lucide-react";
import type { DSAProblem, Language } from "../types";
import CodeEditor from "./CodeEditor";
import ReactMarkdown from "react-markdown";
import { SAMPLE_PROBLEMS } from "../data/problems";
import Split from 'react-split';

// Topics for the roadmap
const topics = [
  "Array & Hashing",
  "Two Pointers",
  "Stack",
  "Binary Search",
  "Sliding Window",
  "Linked List",
  "Trees",
  "Tries",
  "Heap / Priority Queue",
  "Backtracking",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Intervals",
  "Math & Geometry",
  "Bit Manipulation",
];

const categories = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Dynamic Programming",
  "Graphs",
];
const difficulties = ["Easy", "Medium", "Hard"];
const lists = ["All Problems", "NeetCode 150", "Blind 75", "Daily Challenges"];

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
} as const;

// Problem Detail View Component
const ProblemDetail = ({
  problem,
  onBack,
}: {
  problem: DSAProblem;
  onBack: () => void;
}) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="h-[calc(100vh-5rem)] bg-white dark:bg-gray-900">
      <Split
        sizes={[40, 60]}
        minSize={300}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        className="flex h-full"
      >
        {/* Left Panel - Problem Description & Solution */}
        <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={onBack}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back
              </button>
            </div>
            
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {problem.title}
                </h1>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    difficultyColors[problem.difficulty]
                  }`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {problem.category}
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{problem.description}</ReactMarkdown>
                </div>

                {/* Examples Section */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Examples</h2>
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">Example {index + 1}:</p>
                        <p className="text-gray-600 dark:text-gray-300">Input: {example.input}</p>
                        <p className="text-gray-600 dark:text-gray-300">Output: {example.output}</p>
                        {example.explanation && (
                          <p className="text-gray-600 dark:text-gray-300">Explanation: {example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints Section */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Constraints:</h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Show Solution Button */}
                <div className="pt-8">
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {showSolution ? "Hide Solution" : "Show Solution"}
                  </button>
                </div>

                {/* Solution Section */}
                {showSolution && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Solution</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <ReactMarkdown>{typeof problem.solution === 'string' 
                        ? problem.solution 
                        : problem.solution?.javascript || ''}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="h-full">
          <CodeEditor problem={problem} />
        </div>
      </Split>
    </div>
  );
};

interface ProblemBankProps {
  selectedProblem: DSAProblem | null;
  setSelectedProblem: (problem: DSAProblem | null) => void;
}

export default function ProblemBank({ selectedProblem, setSelectedProblem }: ProblemBankProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null,
  );
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedList, setSelectedList] = useState<string>("All Problems");
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [problems, setProblems] = useState<DSAProblem[]>(SAMPLE_PROBLEMS);

  // Progress tracking
  const totalProblems = problems.length;
  const solvedProblems = problems.filter((p) => p.completed).length;
  const neetcodeSolved = problems.filter(
    (p) => p.list === "neetcode150" && p.completed,
  ).length;
  const neetcodeTotal = problems.filter((p) => p.list === "neetcode150").length;
  const blind75Solved = problems.filter(
    (p) => p.list === "blind75" && p.completed,
  ).length;
  const blind75Total = problems.filter((p) => p.list === "blind75").length;

  // Filter problems based on search, category, difficulty, topic, and list
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || problem.category === selectedCategory;
    const matchesDifficulty =
      !selectedDifficulty || problem.difficulty === selectedDifficulty;
    const matchesTopic = !selectedTopic || problem.topic === selectedTopic;
    const matchesList =
      selectedList === "All Problems" ||
      (selectedList === "NeetCode 150" && problem.list === "neetcode150") ||
      (selectedList === "Blind 75" && problem.list === "blind75") ||
      (selectedList === "Daily Challenges" && problem.list === "daily");
    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesTopic &&
      matchesList
    );
  });

  // Handle problem completion
  const markProblemCompleted = (problemId: string) => {
    setProblems(
      problems.map((p) => (p.id === problemId ? { ...p, completed: true } : p)),
    );
  };

  // If a problem is selected, show the problem detail view
  if (selectedProblem) {
    return (
      <ProblemDetail
        problem={selectedProblem}
        onBack={() => setSelectedProblem(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: CheckCircle2,
            label: "Problems Solved",
            value: `${solvedProblems}/${totalProblems}`,
            color: "text-green-500",
          },
          {
            icon: List,
            label: "NeetCode 150",
            value: `${neetcodeSolved}/${neetcodeTotal}`,
            color: "text-blue-500",
          },
          {
            icon: Star,
            label: "Blind 75",
            value: `${blind75Solved}/${blind75Total}`,
            color: "text-yellow-500",
          },
          {
            icon: Calendar,
            label: "Daily Streak",
            value: "15 days",
            color: "text-purple-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className={`${stat.color} dark:opacity-90`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => setShowRoadmap(!showRoadmap)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <BarChart className="w-5 h-5 mr-2" />
          {showRoadmap ? "Hide Roadmap" : "Show Roadmap"}
        </button>
      </div>

      {/* Roadmap Section */}
      {showRoadmap && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            DSA Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => {
              const topicProblems = problems.filter((p) => p.topic === topic);
              const solvedCount = topicProblems.filter(
                (p) => p.completed,
              ).length;
              const totalCount = topicProblems.length;
              const progressPercent =
                totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

              return (
                <div
                  key={topic}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedTopic === topic ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700"}`}
                  onClick={() =>
                    setSelectedTopic(selectedTopic === topic ? null : topic)
                  }
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    {topic}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {solvedCount} / {totalCount} problems
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Problem List Selector */}
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            {lists.map((list) => (
              <option key={list} value={list}>
                {list}
              </option>
            ))}
          </select>

          {/* Category Dropdown */}
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            value={selectedDifficulty || ""}
            onChange={(e) => setSelectedDifficulty(e.target.value || null)}
          >
            <option value="">All Difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => setSelectedProblem(problem)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    {problem.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {problem.title}
                        {problem.list === "neetcode150" && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
                            NeetCode 150
                          </span>
                        )}
                        {problem.list === "blind75" && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs rounded-full">
                            Blind 75
                          </span>
                        )}
                        {problem.list === "daily" && (
                          <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs rounded-full">
                            Daily Challenge
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                          {problem.category}
                        </span>
                        {problem.topic && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Topic: {problem.topic}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        problem.difficulty === "Easy"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : problem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Acceptance: {problem.acceptance}%
                    </span>
                    {problem.pattern && (
                      <span className="text-sm text-indigo-600 dark:text-indigo-400">
                        Pattern: {problem.pattern}
                      </span>
                    )}
                    <div className="flex items-center space-x-2">
                      {problem.companies.slice(0, 3).map((company, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
                        >
                          {company}
                        </span>
                      ))}
                      {problem.companies.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{problem.companies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {problem.solution && (
                      <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                        <Info className="w-4 h-4 mr-1" />
                        Solution
                      </span>
                    )}
                    {problem.videoExplanation && (
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Video
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No problems match your filters. Try adjusting your search
              criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




