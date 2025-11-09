import React, { useState } from "react";

function AccessibilityToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return next;
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg font-bold transition ${
        isDarkMode ? "bg-slate-700 hover:bg-slate-800 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
      }`}
      title="Toggle dark mode"
    >
      {isDarkMode ? "🌙 Dark Mode ON" : "☀️ Dark Mode OFF"}
    </button>
  );
}

export default AccessibilityToggle;