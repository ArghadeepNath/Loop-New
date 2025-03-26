import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  Upload,
  List,
  X,
  Plus,
  Save,
  Trash2,
  Edit,
} from "lucide-react";
import type { DSAProblem } from "../types";
import { SAMPLE_PROBLEMS } from "../data/problems";

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
const lists = ["neetcode150", "blind75", "daily"];

export default function AdminProblemBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [problems, setProblems] = useState<DSAProblem[]>(SAMPLE_PROBLEMS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newProblem, setNewProblem] = useState<Partial<DSAProblem>>({});
  const [editingProblem, setEditingProblem] = useState<DSAProblem | null>(null);

  // Filter problems based on search
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle problem upload/edit
  const handleSaveProblem = () => {
    if (!newProblem.title || !newProblem.difficulty || !newProblem.topic) {
      alert("Please fill in all required fields");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    
    if (editingProblem) {
      // Update existing problem
      setProblems(
        problems.map((p) =>
          p.id === editingProblem.id
            ? {
                ...p,
                ...newProblem,
                difficulty: newProblem.difficulty as "Easy" | "Medium" | "Hard",
              }
            : p
        )
      );
      setEditingProblem(null);
    } else {
      // Add new problem
      const newId = problems.length > 0
        ? (Math.max(...problems.map((p) => parseInt(p.id))) + 1).toString()
        : "1";

      const problemToAdd: DSAProblem = {
        id: newId,
        title: newProblem.title || "",
        difficulty: (newProblem.difficulty as "Easy" | "Medium" | "Hard") || "Medium",
        category: newProblem.category || "Arrays",
        topic: newProblem.topic || "",
        completed: false,
        acceptance: newProblem.acceptance || 70,
        companies: newProblem.companies || ["Various"],
        description: newProblem.description || "Problem description",
        examples: newProblem.examples || [
          {
            input: "Example input",
            output: "Example output",
          },
        ],
        constraints: newProblem.constraints || ["Constraints"],
        starterCode: newProblem.starterCode || {
          javascript: `function solution() {\n    // Write your code here\n};`,
          python: `def solution():\n    # Write your code here\n    pass`,
          java: `class Solution {\n    public void solution() {\n        // Write your code here\n    }\n}`,
        },
        testCases: newProblem.testCases || [
          {
            input: "Test input",
            expectedOutput: "Test output",
          },
        ],
        list: newProblem.list || "daily",
        uploadDate: today,
        pattern: newProblem.pattern || "",
        solution: newProblem.solution || "",
        videoExplanation: newProblem.videoExplanation || "",
      };

      setProblems([...problems, problemToAdd]);
    }

    setNewProblem({});
    setShowUploadModal(false);
  };

  // Handle editing a problem
  const handleEditProblem = (problem: DSAProblem) => {
    setEditingProblem(problem);
    setNewProblem({ ...problem });
    setShowUploadModal(true);
  };

  // Handle deleting a problem
  const handleDeleteProblem = (problemId: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      setProblems(problems.filter((p) => p.id !== problemId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Problem Bank
        </h1>
        <button
          onClick={() => {
            setEditingProblem(null);
            setNewProblem({});
            setShowUploadModal(true);
          }}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Problem
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Problems List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Problems ({problems.length})
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Daily uploads: {problems.filter(p => p.list === "daily" && p.uploadDate === new Date().toISOString().split("T")[0]).length}/4
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {problem.title}
                      {problem.list && (
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          problem.list === "neetcode150" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
                            : problem.list === "blind75" 
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" 
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        }`}>
                          {problem.list === "neetcode150" 
                            ? "NeetCode 150" 
                            : problem.list === "blind75" 
                              ? "Blind 75" 
                              : "Daily Challenge"}
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                        {problem.category}
                      </span>
                      {problem.topic && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">
                          Topic: {problem.topic}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Acceptance: {problem.acceptance}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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
                    <button
                      onClick={() => handleEditProblem(problem)}
                      className="p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProblem(problem.id)}
                      className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {problem.description.substring(0, 150)}...
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    {problem.pattern && (
                      <span className="text-sm text-indigo-600 dark:text-indigo-400">
                        Pattern: {problem.pattern}
                      </span>
                    )}
                    {problem.videoExplanation && (
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Has Video
                      </span>
                    )}
                    {problem.solution && (
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        Has Solution
                      </span>
                    )}
                  </div>
                  {problem.uploadDate && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Uploaded: {problem.uploadDate}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No problems found. Add a new problem to get started.
            </div>
          )}
        </div>
      </div>

      {/* Upload/Edit Problem Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingProblem ? "Edit Problem" : "Add New Problem"}
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={newProblem.title || ""}
                  onChange={(e) =>
                    setNewProblem({ ...newProblem, title: e.target.value })
                  }
                  placeholder="Problem title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={newProblem.difficulty || ""}
                    onChange={(e) =>
                      setNewProblem({
                        ...newProblem,
                        difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                      })
                    }
                  >
                    <option value="">Select Difficulty</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={newProblem.category || ""}
                    onChange={(e) =>
                      setNewProblem({ ...newProblem, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    List *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={newProb