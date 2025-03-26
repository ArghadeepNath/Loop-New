export interface Course {
  id: string;
  title: string;
  description: string;
  xpPoints: number;
  imageUrl: string;
  price: number;
  instructor: {
    name: string;
    title: string;
    imageUrl: string;
  };
  duration: string;
  totalLessons: number;
  enrolled?: boolean;
  progress?: number;
  syllabus: CourseSyllabus[];
  prerequisites: string[];
  skills: string[];
  certificate: {
    title: string;
    description: string;
    imageUrl: string;
  };
  finalTest?: CourseTest;
}

export interface CourseSyllabus {
  id: string;
  title: string;
  description: string;
  xpPoints: number;
  completed?: boolean;
  checkpoints: Checkpoint[];
  test?: CourseTest;
}

export interface Checkpoint {
  id: string;
  title: string;
  type: "video" | "notes" | "playground" | "test";
  completed?: boolean;
  content: {
    videoUrl?: string;
    notes?: string;
    problem?: DSAProblem;
    test?: CourseTest;
  };
  duration?: string;
  xpPoints: number;
}

export interface CourseTest {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number;
  questions: TestQuestion[];
  attempts?: TestAttempt[];
}

export interface TestQuestion {
  id: string;
  type: "multiple-choice" | "coding";
  question: string;
  points: number;
  options?: string[];
  correctAnswer?: string;
  problem?: DSAProblem;
}

export interface TestAttempt {
  id: string;
  startTime: string;
  endTime?: string;
  score?: number;
  answers: {
    questionId: string;
    answer: string;
    correct: boolean;
  }[];
}

export interface User {
  name: string;
  xp: number;
  rank: string;
  enrolledCourses: string[];
  streak: number;
  dailyProgress: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  category: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  topic: string;
  completed: boolean;
  acceptance: number;
  companies: string[];
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  starterCode: {
    javascript: string;
    python: string;
    java: string;
  };
  testCases: TestCase[];
  list?: "neetcode150" | "blind75" | "daily";
  uploadDate?: string;
  videoExplanation?: string;
  pattern?: string;
  solution?:
    | string
    | {
        javascript: string;
        python: string;
        java: string;
      };
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
  description: string;
}

export interface Test {
  id: string;
  title: string;
  course: string;
  date: string;
  duration: number;
  status: "upcoming" | "completed";
  score?: number;
}

export type Language = "javascript" | "python" | "java";
