"use client";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex items-center justify-between bg-light-gray dark:bg-dark-gray w-64 h-12 px-4 rounded-xl relative">
      <FaSun className="text-med-gray text-xl" />
      <div
        onClick={toggleDarkMode}
        className={`w-16 h-8 bg-purple rounded-full flex items-center cursor-pointer ${
          darkMode ? "justify-end" : "justify-start"
        }`}
      >
        <div className="w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300" />
      </div>
      <FaMoon className="text-med-gray text-xl" />
    </div>
  );
}
