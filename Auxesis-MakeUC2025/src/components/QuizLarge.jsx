import { useState } from "react";
import TextSize from "./TextSize";
import TextToSpeechEnhanced from "./TextToSpeechEnhanced.jsx";
import AccessibilityPageReader from "./AccessibilityPageReader";
import NotificationSystem from "./NotificationSystem";

// Add 'onBack' prop for the "Back to Reader" navigation
export default function QuizLarge({ onBack }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [points, setPoints] = useState(0);
  const [difficulty, setDifficulty] = useState(2);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  // QUESTIONS: One easy, one difficult per each Physics page
  const questions = [
    // Page 1: SI System
    {
      text: "What is the SI unit of length?",
      options: ["second", "joule", "meter", "kilogram"],
      correct: 2,
      difficulty: 1,
    },
    {
      text: "How is energy defined in SI units?",
      options: ["kg·m/s", "kg·m²/s²", "m/s²", "kg/s"],
      correct: 1,
      difficulty: 2,
    },
    // Page 2: Prefixes
    {
      text: "What prefix means 10^-3?",
      options: ["kilo-", "mega-", "milli-", "centi-"],
      correct: 2,
      difficulty: 1,
    },
    {
      text: "How many grams in one kilogram?",
      options: ["1", "10", "100", "1000"],
      correct: 3,
      difficulty: 2,
    },
    // Page 3: Density
    {
      text: "What is density?",
      options: ["force per area", "mass per volume", "speed per time", "length per unit time"],
      correct: 1,
      difficulty: 1,
    },
    {
      text: "If mass is 4kg and volume 2m³, what is density?",
      options: ["2kg/m³", "8kg/m³", "0.5kg/m³", "4kg/m³"],
      correct: 0,
      difficulty: 2,
    },
    // Page 4: Vectors
    {
      text: "Which is a scalar?",
      options: ["velocity", "force", "temperature", "displacement"],
      correct: 2,
      difficulty: 1,
    },
    {
      text: "Best way to add vectors?",
      options: [
        "Add magnitudes only",
        "Use tip-to-tail method",
        "Multiply by powers of 10",
        "Use Celsius degrees"
      ],
      correct: 1,
      difficulty: 2,
    },
  ];

  const currentQuestion = questions[questionIndex];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    setFeedback(isCorrect ? "CORRECT" : "TRY AGAIN");
    setIsAnswered(true);

    if (isCorrect) {
      setPoints(points + 1);
      if (difficulty < 3) setDifficulty(difficulty + 1);
      showNotification(
        points === 0
          ? "🎯 First one down! Keep going, you're doing great!"
          : ["🔥 You're on fire!", "🌟 Mathematical genius!", "🎮 Perfect score!"][Math.floor(Math.random() * 3)],
        'success'
      );
    } else {
      if (difficulty > 1) setDifficulty(difficulty - 1);
      showNotification(
        ["💪 Keep trying! You're getting better!", "🎮 No game over here - try again!", "🌟 Every attempt makes you stronger!"][Math.floor(Math.random() * 3)],
        'error'
      );
    }

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
        setFeedback("");
        setIsAnswered(false);
      } else {
        setFeedback("QUIZ COMPLETE");
      }
    }, 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm">
      <div className="px-6 py-4">
        {/* Back Button */}
        {onBack && (
          <button
            className="mb-4 px-4 py-2 rounded bg-purple-500 text-white font-bold hover:bg-purple-600"
            onClick={onBack}
          >
            ← Back to Reader
          </button>
        )}

        {/* Quiz Title */}
        <div className="flex items-center justify-between mb-6">
          <TextSize size="2xl" className="font-bold">
            Adaptive Quiz
          </TextSize>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto space-y-8">
          {/* Progress Bar */}
          <div className="bg-blue-700 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm opacity-90 font-semibold">Question</p>
                <TextSize size="3xl" className="font-black">
                  {questionIndex + 1}/{questions.length}
                </TextSize>
              </div>
              <div>
                <p className="text-sm opacity-90 font-semibold">Points</p>
                <TextSize size="3xl" className="font-black">
                  {points}
                </TextSize>
              </div>
              <div>
                <p className="text-sm opacity-90 font-semibold">Difficulty</p>
                <TextSize size="3xl" className="font-black">
                  {"■".repeat(difficulty)}{"□".repeat(3 - difficulty)}
                </TextSize>
              </div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
              <div
                className="bg-white h-4 rounded-full transition-all duration-500"
                style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-slate-800 border-blue-500 p-10 rounded-2xl shadow-2xl border-2 transition-colors space-y-8">
            <div className="flex justify-between items-center">
              <TextSize size="lg" className="font-semibold opacity-90">
                Difficulty: {"■".repeat(difficulty)}{"□".repeat(3 - difficulty)}
              </TextSize>
              <TextToSpeechEnhanced text={currentQuestion.text} />
            </div>

            <TextSize size="4xl" className="font-black leading-tight mb-8">
              {currentQuestion.text}
            </TextSize>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !isAnswered && setSelectedAnswer(index)}
                  disabled={isAnswered}
                  className={`
                    w-full p-6 text-left rounded-xl border-2 transition-all font-bold
                    ${
                      selectedAnswer === index
                        ? "border-blue-400 bg-blue-900/50"
                        : "border-blue-600 hover:border-blue-400 hover:bg-blue-900/30"
                    }
                    ${
                      isAnswered && index === currentQuestion.correct
                        ? "border-green-400 bg-green-900/50"
                        : isAnswered && index === selectedAnswer
                        ? "border-red-400 bg-red-900/50"
                        : ""
                    }
                    ${isAnswered ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:shadow-lg"}
                    active:scale-95
                  `}
                >
                  <span className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-black">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <TextSize size="lg">{option}</TextSize>
                  </span>
                </button>
              ))}
            </div>

            {feedback && (
              <div
                className={`
                  text-center font-black p-6 rounded-xl transition-all
                  ${
                    feedback === "CORRECT"
                      ? "bg-green-900/50 border-2 border-green-400 text-green-300"
                      : feedback === "QUIZ COMPLETE"
                      ? "bg-blue-900/50 border-2 border-blue-400 text-blue-300"
                      : "bg-red-900/50 border-2 border-red-400 text-red-300"
                  }
                `}
              >
                <TextSize size="2xl">{feedback}</TextSize>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isAnswered}
              className={`
                w-full py-4 rounded-xl font-black transition-all text-lg
                ${
                  selectedAnswer === null || isAnswered
                    ? "bg-gray-600 cursor-not-allowed opacity-50 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg active:scale-95"
                }
              `}
            >
              {isAnswered ? "Loading..." : "Submit Answer"}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-blue-900/30 border-blue-600 p-6 rounded-xl border-2">
            <TextSize size="base" className="opacity-90">
              Answer correctly → harder. Answer wrong → easier. Always at the right level.
            </TextSize>
          </div>
        </main>

        {/* Accessibility Page Reader Button */}
        <AccessibilityPageReader />
        
        {/* Notification Popup */}
        {notification && (
          <NotificationSystem
            {...notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}
