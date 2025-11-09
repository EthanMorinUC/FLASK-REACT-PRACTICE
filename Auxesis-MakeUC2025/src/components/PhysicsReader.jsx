import React, { useState } from "react";
// Import your ElevenLabs TTS here (adjust path as needed)
// import { speakText } from "../elevenLabsService"; // must be implemented

const PAGES = [
  `Page 1: The SI System
Physics is based on measurement. The SI system, or metric system, defines units for length (meter), time (second), and mass (kilogram). For example, energy: 1 J = 1 kg·m²/s². Prefixes: kilo (k, 10^3), mega (M, 10^6), etc.`,
  `Page 2: Units & Prefixes
Prefixes indicate powers of 10, e.g. milli- (m, 10^-3), micro- (μ, 10^-6), pico- (p, 10^-12), giga- (G, 10^9). Convert by shifting decimal places.`,
  `Page 3: Density & Derived Quantities
Density is mass per unit volume: ρ = m/V. Common units are kg/m³ or g/cm³. Other derived units include force (N), pressure (Pa), and speed (m/s).`,
  `Page 4: Vectors & Scalar Quantities
Vectors have magnitude and direction (ex: velocity, force). Scalars have only magnitude (ex: temperature, mass). Vector addition uses tip-to-tail method.`,
];

export default function PhysicsReader({ onQuizStart }) {
  const [pageIdx, setPageIdx] = useState(0);

  const speak = () => {
    // If using ElevenLabs custom TTS:
    // speakText(PAGES[pageIdx]);
    // Else basic browser TTS for fallback:
    if (window.speechSynthesis) {
      const utter = new window.SpeechSynthesisUtterance(PAGES[pageIdx]);
      utter.rate = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-900 shadow rounded p-8 my-8 text-slate-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Physics Chapter 1</h2>
      <div className="flex gap-2 mb-4">
        {PAGES.map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded font-bold ${
              i === pageIdx
                ? "bg-blue-500 text-white"
                : "bg-slate-200 hover:bg-slate-300 text-slate-800"
            }`}
            onClick={() => setPageIdx(i)}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="ml-auto px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={speak}
          aria-label="Read aloud with ElevenLabs TTS"
        >
          🔊 Read Aloud
        </button>
      </div>
      <section tabIndex="0" aria-label={`Physics page ${pageIdx + 1}`} className="text-lg leading-relaxed">
        {PAGES[pageIdx]}
      </section>
      <button
        className="mt-6 px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700"
        onClick={onQuizStart}
      >
        Go to Quiz
      </button>
    </div>
  );
}
