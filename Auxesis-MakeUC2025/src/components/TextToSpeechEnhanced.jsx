import React, { useState } from "react";
import { getElevenLabsAudio, playAudio, stopAudio } from "../utils/elevenLabsService";

export default function TextToSpeechEnhanced({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleSpeak = async () => {
    if (isSpeaking) {
      stopAudio();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    try {
      const audioUrl = await getElevenLabsAudio(text);
      if (audioUrl) {
        playAudio(audioUrl, speed); // ✅ Pass speed
      }
    } finally {
      setIsSpeaking(false);
    }
  };

  return (
    // Combined control: single visual unit that handles play/stop and speed selection
    <div className="inline-flex items-center rounded-lg overflow-hidden border border-purple-500/30 bg-slate-900/70">
      <button
        type="button"
        onClick={handleSpeak}
        className={`px-4 py-2 font-semibold transition-all flex items-center gap-3 ${
          isSpeaking
            ? "bg-cyan-600 hover:bg-cyan-700 text-white"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
        aria-pressed={isSpeaking}
        aria-label={isSpeaking ? "Stop speaking" : "Listen to question"}
      >
        <span className="sr-only">Text to speech</span>
        {isSpeaking ? "Stop" : "Listen"}
        <span className="text-sm opacity-80">({speed}x)</span>
      </button>

      <div className="px-2 flex items-center bg-transparent">
        <label className="sr-only" htmlFor="tts-speed">Speech speed</label>
        <select
          id="tts-speed"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="bg-transparent text-white text-sm font-semibold px-3 py-2 outline-none border-l border-white/20 appearance-none"
          aria-label="Speech speed"
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
}
