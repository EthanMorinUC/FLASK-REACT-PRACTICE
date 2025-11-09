import React, { useState, useEffect } from "react";
import PhysicsReader from "./components/PhysicsReader";
import QuizLarge from "./components/QuizLarge";
import AccessibilityToggle from "./components/AccessibilityToggle";
import LeaderboardCard from "./components/LeaderboardCard";
import Mascot from "./components/Mascot";

function App() {
 function HiButton() {
  const [response, setResponse] = useState("");

  const handleClick = () => {
    fetch("/button-press", { method: "POST" })
      .then(res => res.json())
      .then(data => setResponse(data.message))
      .catch(console.error);
  };

  return (
    <div>
      <button onClick={handleClick}>hi</button>
      {response && <p>{response}</p>}
    </div>
  );
}
  const [thankYouMessage, setThankYouMessage] = useState("");
  const handleButtonClick = () => {
    fetch("/button-press", { method: "POST" })
      .then(res => res.json())
      .then(data => setThankYouMessage(data.message))
      .catch(console.error);
  };

  const [page, setPage] = useState("reader"); // 'reader' or 'quiz'
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(() => {
    try {
      return localStorage.getItem("dyslexiaMode") === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isDyslexiaMode) document.body.classList.add("dyslexia-mode");
    else document.body.classList.remove("dyslexia-mode");
  }, [isDyslexiaMode]);

  const handleDyslexiaToggle = () => {
    setIsDyslexiaMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("dyslexiaMode", next ? "true" : "false");
      } catch {}
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-slate-200 text-slate-900 dark:bg-slate-900 dark:text-white">
      <header className="border-b border-slate-300 bg-white/60 backdrop-blur">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2">AUXESIS</h1>
          <p className="text-xl text-slate-600 dark:text-white">
            Adaptive Learning for Everyone
          </p>
        </div>
      </header>
      <div className="bg-white/40 backdrop-blur border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center gap-4">
          <button
            onClick={handleDyslexiaToggle}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
          >
            Dyslexia Mode: {isDyslexiaMode ? "On" : "Off"}
          </button>
          <AccessibilityToggle />
        </div>
      </div>
      <main className="container mx-auto px-2 py-2">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="bg-white/60 dark:bg-slate-800 backdrop-blur rounded-2xl border border-slate-200 shadow-lg">
              {page === "reader" ? (
                <PhysicsReader onQuizStart={() => setPage("quiz")} />
              ) : (
                <QuizLarge onBack={() => setPage("reader")} />
              )}
            </div>
          </div>
          <aside className="space-y-6">
            <LeaderboardCard />
          </aside>
        </div>
      </main>
      <Mascot />
    </div>
  );
}
export default App;
