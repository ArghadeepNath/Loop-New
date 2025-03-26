import React from "react";
import { BookOpen, Trophy, User, Flame, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-indigo-600 dark:bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8" />
              <span className="ml-2 text-xl font-bold">Loop</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center bg-indigo-700 dark:bg-indigo-800 px-3 py-1 rounded-full">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="ml-2">15 day streak</span>
            </div>
            <div className="flex items-center bg-indigo-700 dark:bg-indigo-800 px-3 py-1 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="ml-2">2,450 XP</span>
            </div>
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors">
                <User className="w-6 h-6" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium">
                    {user?.user_metadata?.full_name || "User"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
