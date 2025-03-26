import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Split from 'react-split';
import ReactMarkdown from 'react-markdown';
import { Play, RotateCcw, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import type { DSAProblem, TestCase, Language } from '../types';

interface CodeEditorProps {
  problem: DSAProblem;
}

interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
}

const languageExtensions = {
  javascript: [javascript({ jsx: true })],
  python: [python()],
  java: [java()]
};

export default function CodeEditor({ problem }: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(problem.starterCode[language]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(problem.starterCode[newLanguage]);
    setTestResults([]);
  };

  const runCode = async () => {
    setIsRunning(true);
    try {
      // Create a function from the code string
      let testFunction;
      if (language === 'javascript') {
        testFunction = new Function('return ' + code)();
      }

      // Run test cases
      const results: TestResult[] = problem.testCases.map(testCase => {
        let passed = false;
        let actualOutput = 'Error';

        try {
          if (language === 'javascript') {
            // Parse input string to actual parameters
            const params = JSON.parse(`[${testCase.input}]`);
            const result = testFunction(...params);
            actualOutput = JSON.stringify(result);
            passed = actualOutput === testCase.expectedOutput;
          }
        } catch (error) {
          actualOutput = error.message;
        }

        return {
          passed,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput
        };
      });

      setTestResults(results);
    } catch (error) {
      console.error('Error running code:', error);
      setTestResults([{
        passed: false,
        input: 'N/A',
        expectedOutput: 'N/A',
        actualOutput: error.message
      }]);
    }
    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(problem.starterCode[language]);
    setTestResults([]);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex space-x-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-1" />
              Run
            </button>
            <button
              onClick={resetCode}
              className="flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </button>
          </div>
          <select
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-gray-600"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={languageExtensions[language]}
          onChange={(value) => setCode(value)}
          className="h-full"
        />
      </div>

      {/* Test Results Panel */}
      <div className="h-64 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'description'
                ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Test Cases
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'submissions'
                ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-2.5rem)] p-4">
          {activeTab === 'description' ? (
            <div className="space-y-2">
              {testResults.length > 0 ? (
                testResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-2 rounded bg-gray-50 dark:bg-gray-700/50"
                  >
                    {result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 text-sm">
                      <p className="font-medium mb-1 text-gray-900 dark:text-white">Test Case {index + 1}</p>
                      <p className="text-gray-600 dark:text-gray-300">Input: {result.input}</p>
                      <p className="text-gray-600 dark:text-gray-300">Expected: {result.expectedOutput}</p>
                      <p className="text-gray-600 dark:text-gray-300">Output: {result.actualOutput}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
                  Run your code to see test results
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No submissions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

