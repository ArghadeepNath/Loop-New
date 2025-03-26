import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";
import DailyChallenges from "./components/DailyChallenges";
import ProblemBank from "./components/ProblemBank";
import AssignmentsAndTests from "./components/AssignmentsAndTests";
import CourseDetails from "./components/CourseDetails";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { type Course } from "./types";
import {
  Search,
  BookOpen,
  Code,
  BrainCircuit,
  GraduationCap,
} from "lucide-react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import { AuthProvider, useAuth } from "./context/AuthContext";

const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    description:
      "Master the fundamentals of DSA with practical examples and daily coding challenges.",
    xpPoints: 1200,
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=2728&ixlib=rb-4.0.3",
    progress: 45,
    duration: "12 weeks",
    totalLessons: 48,
    enrolled: true,
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Algorithm Engineer at Google",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    prerequisites: [
      "Basic programming knowledge in any language",
      "Understanding of basic mathematics",
      "Familiarity with time complexity concepts",
    ],
    skills: [
      "Master fundamental data structures",
      "Implement efficient algorithms",
      "Solve complex coding problems",
      "Optimize code performance",
      "Ace technical interviews",
    ],
    certificate: {
      title: "DSA Master Certificate",
      description: "Showcase your expertise in data structures and algorithms",
      imageUrl:
        "https://images.unsplash.com/photo-1606159068539-43071c1aad5b?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    syllabus: [
      {
        id: "section-1",
        title: "Arrays and Strings",
        description: "Master fundamental data structures",
        xpPoints: 300,
        completed: true,
        checkpoints: [
          {
            id: "cp-1",
            title: "Introduction to Arrays",
            type: "video",
            completed: true,
            duration: "15 min",
            xpPoints: 50,
            content: {
              videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          },
          {
            id: "cp-2",
            title: "Array Operations",
            type: "notes",
            completed: true,
            duration: "20 min",
            xpPoints: 50,
            content: {
              notes:
                "# Array Operations\n\nIn this lesson, we'll cover:\n- Insertion\n- Deletion\n- Traversal\n- Search",
            },
          },
          {
            id: "cp-3",
            title: "Two Sum Problem",
            type: "playground",
            duration: "30 min",
            xpPoints: 100,
            content: {
              problem: {
                id: "two-sum",
                title: "Two Sum",
                difficulty: "Easy",
                category: "Arrays",
                completed: false,
                acceptance: 78,
                companies: ["Amazon", "Google", "Facebook"],
                description:
                  "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                examples: [
                  {
                    input: "nums = [2,7,11,15], target = 9",
                    output: "[0,1]",
                    explanation:
                      "Because nums[0] + nums[1] == 9, we return [0, 1].",
                  },
                ],
                constraints: [
                  "2 <= nums.length <= 104",
                  "-109 <= nums[i] <= 109",
                  "-109 <= target <= 109",
                ],
                starterCode: {
                  javascript:
                    "function twoSum(nums, target) {\n  // Write your code here\n}",
                  python:
                    "def twoSum(nums, target):\n    # Write your code here\n    pass",
                  java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}",
                },
                testCases: [
                  {
                    input: "[2,7,11,15], 9",
                    expectedOutput: "[0,1]",
                  },
                ],
              },
            },
          },
        ],
        test: {
          id: "test-1",
          title: "Arrays and Strings Test",
          description:
            "Test your knowledge of array operations and string manipulation",
          timeLimit: 30,
          passingScore: 70,
          questions: [
            {
              id: "q1",
              type: "multiple-choice",
              question:
                "What is the time complexity of array insertion at the end?",
              points: 10,
              options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
              correctAnswer: "O(1)",
            },
            {
              id: "q2",
              type: "coding",
              question: "Implement a function to reverse an array in-place",
              points: 20,
              problem: {
                id: "reverse-array",
                title: "Reverse Array",
                difficulty: "Easy",
                category: "Arrays",
                completed: false,
                acceptance: 85,
                companies: ["Microsoft", "Apple"],
                description:
                  "Write a function that reverses an array in-place.",
                examples: [
                  {
                    input: "[1,2,3,4,5]",
                    output: "[5,4,3,2,1]",
                  },
                ],
                constraints: ["1 <= arr.length <= 1000"],
                starterCode: {
                  javascript:
                    "function reverseArray(arr) {\n  // Write your code here\n}",
                  python:
                    "def reverseArray(arr):\n    # Write your code here\n    pass",
                  java: "class Solution {\n    public void reverseArray(int[] arr) {\n        // Write your code here\n    }\n}",
                },
                testCases: [
                  {
                    input: "[1,2,3,4,5]",
                    expectedOutput: "[5,4,3,2,1]",
                  },
                ],
              },
            },
          ],
        },
      },
      {
        id: "section-2",
        title: "Linked Lists",
        description: "Understanding linked list data structure",
        xpPoints: 400,
        checkpoints: [
          {
            id: "cp-4",
            title: "Introduction to Linked Lists",
            type: "video",
            duration: "20 min",
            xpPoints: 75,
            content: {
              videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          },
          {
            id: "cp-5",
            title: "Reverse Linked List",
            type: "playground",
            duration: "45 min",
            xpPoints: 150,
            content: {
              problem: {
                id: "reverse-linked-list",
                title: "Reverse Linked List",
                difficulty: "Medium",
                category: "Linked Lists",
                completed: false,
                acceptance: 70,
                companies: ["Microsoft", "Facebook"],
                description: "Reverse a singly linked list.",
                examples: [
                  {
                    input: "1->2->3->4->5",
                    output: "5->4->3->2->1",
                  },
                ],
                constraints: [
                  "The number of nodes in the list is the range [0, 5000]",
                ],
                starterCode: {
                  javascript:
                    "function reverseList(head) {\n  // Write your code here\n}",
                  python:
                    "def reverseList(head):\n    # Write your code here\n    pass",
                  java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your code here\n    }\n}",
                },
                testCases: [
                  {
                    input: "[1,2,3,4,5]",
                    expectedOutput: "[5,4,3,2,1]",
                  },
                ],
              },
            },
          },
        ],
      },
    ],
    finalTest: {
      id: "final-test",
      title: "DSA Final Assessment",
      description: "Complete this test to earn your certificate",
      timeLimit: 180,
      passingScore: 80,
      questions: [
        {
          id: "fq1",
          type: "multiple-choice",
          question:
            "Which data structure is best for implementing a LIFO pattern?",
          points: 10,
          options: ["Stack", "Queue", "Tree", "Graph"],
          correctAnswer: "Stack",
        },
        {
          id: "fq2",
          type: "coding",
          question:
            "Implement a function to find the longest substring without repeating characters",
          points: 30,
          problem: {
            id: "longest-substring",
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            category: "Strings",
            completed: false,
            acceptance: 75,
            companies: ["Amazon", "Microsoft", "Google"],
            description:
              "Given a string s, find the length of the longest substring without repeating characters.",
            examples: [
              {
                input: '"abcabcbb"',
                output: "3",
                explanation: 'The answer is "abc", with the length of 3.',
              },
            ],
            constraints: ["0 <= s.length <= 5 * 104"],
            starterCode: {
              javascript:
                "function lengthOfLongestSubstring(s) {\n  // Write your code here\n}",
              python:
                "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass",
              java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n    }\n}",
            },
            testCases: [
              {
                input: '"abcabcbb"',
                expectedOutput: "3",
              },
            ],
          },
        },
      ],
    },
  },
  {
    id: "2",
    title: "Full-Stack Web Development",
    description:
      "Build modern web applications with React, Node.js, and cloud technologies.",
    xpPoints: 1500,
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=2274&ixlib=rb-4.0.3",
    duration: "16 weeks",
    totalLessons: 64,
    instructor: {
      name: "Alex Thompson",
      title: "Lead Developer at Netflix",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    prerequisites: [
      "HTML, CSS basics",
      "JavaScript fundamentals",
      "Git version control",
    ],
    skills: [
      "Build full-stack applications",
      "Master React.js",
      "Develop Node.js backends",
      "Deploy to the cloud",
      "Implement authentication",
    ],
    certificate: {
      title: "Full-Stack Developer Certificate",
      description: "Professional certification in modern web development",
      imageUrl:
        "https://images.unsplash.com/photo-1606159068539-43071c1aad5b?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    syllabus: [
      {
        id: "section-1",
        title: "Frontend Fundamentals",
        description: "Master React.js and modern frontend development",
        xpPoints: 400,
        checkpoints: [
          {
            id: "cp-1",
            title: "React Basics",
            type: "video",
            duration: "20 min",
            xpPoints: 75,
            content: {
              videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    description:
      "Learn ML concepts, algorithms, and practical applications with Python.",
    xpPoints: 1800,
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    duration: "20 weeks",
    totalLessons: 80,
    instructor: {
      name: "Dr. Michael Zhang",
      title: "AI Research Scientist",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    prerequisites: [
      "Python programming",
      "Basic statistics",
      "Linear algebra fundamentals",
    ],
    skills: [
      "Implement ML algorithms",
      "Build neural networks",
      "Process big data",
      "Deploy ML models",
      "Solve real-world problems",
    ],
    certificate: {
      title: "Machine Learning Expert",
      description: "Professional certification in machine learning and AI",
      imageUrl:
        "https://images.unsplash.com/photo-1606159068539-43071c1aad5b?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    },
    syllabus: [
      {
        id: "section-1",
        title: "Introduction to ML",
        description: "Fundamentals of machine learning",
        xpPoints: 450,
        checkpoints: [
          {
            id: "cp-1",
            title: "What is Machine Learning?",
            type: "video",
            duration: "25 min",
            xpPoints: 100,
            content: {
              videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            },
          },
        ],
      },
    ],
  },
];

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();
  const tempoRoutes = import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;
  const [courses, setCourses] = useState<Course[]>(SAMPLE_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "problems" | "assignments">("courses");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<DSAProblem | null>(null);

  const handleEnroll = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: true, progress: 0 }
          : course,
      ),
    );
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const MainContent = () => {
    if (selectedCourse) {
      return (
        <CourseDetails
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          onEnroll={handleEnroll}
        />
      );
    }

    return (
      <>
        {/* Only show tabs if no problem is selected */}
        {!selectedProblem && (
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "courses"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Courses
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "problems"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("problems")}
            >
              <span className="flex items-center">
                <Code className="w-4 h-4 mr-2" />
                DSA Problems
              </span>
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "assignments"
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("assignments")}
            >
              <span className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                College Work
              </span>
            </button>
          </div>
        )}

        {activeTab === "courses" && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Level Up Your Programming Skills
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join our gamified learning platform. Master programming through
                hands-on projects, earn XP, and showcase your achievements.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <BookOpen className="w-6 h-6" />,
                  title: "Structured Learning",
                  description: "Follow carefully crafted learning paths",
                },
                {
                  icon: <Code className="w-6 h-6" />,
                  title: "Practice Projects",
                  description: "Build real-world applications",
                },
                {
                  icon: <BrainCircuit className="w-6 h-6" />,
                  title: "AI Assistance",
                  description: "Get help when you're stuck",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                  onClick={setSelectedCourse}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === "problems" && <ProblemBank 
          selectedProblem={selectedProblem}
          setSelectedProblem={setSelectedProblem}
        />}
        {activeTab === "assignments" && <AssignmentsAndTests />}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {tempoRoutes}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                  {/* Sidebar - Only show when no problem is selected and on dashboard */}
                  {!selectedCourse && !selectedProblem && (
                    <div className="w-80 flex-shrink-0">
                      <div className="sticky top-8">
                        <DailyChallenges />
                      </div>
                    </div>
                  )}
                  
                  {/* Main Content */}
                  <div className="flex-1">
                    <MainContent />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;



