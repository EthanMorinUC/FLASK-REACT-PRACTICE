import React, { useState, useEffect } from "react";
import { getElevenLabsAudio, playAudio, stopAudio } from "../utils/elevenLabsService";

export default function TTSQuickTest() {
  const [text, setText] = useState("Hello from ElevenLabs. This is a quick TTS test.");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    return () => stopAudio();
  }, []);

  async function handlePlay() {
    setStatus("");
    if (!text || text.trim().length === 0) {
      setStatus("Enter text to speak.");
      return;
    }
    setBusy(true);
    setStatus("Requesting audio...");
    try {
      const url = await getElevenLabsAudio(text);
      if (url) {
        setStatus("Playing audio...");
        playAudio(url);
      } else {
        setStatus("No audio returned from TTS service.");
      }
    } catch (err) {
      console.error("TTSQuickTest error:", err);
      setStatus(`TTS Error: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function handleStop() {
    stopAudio();
    setStatus("Stopped");
  }

  return (
    <div className="p-6 bg-black/20 backdrop-blur rounded-xl border border-white/10">
      <h3 className="text-xl font-semibold mb-4 text-white">Quick TTS Test</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows={4}
        placeholder="Enter text to speak..."
      />
      <div className="mt-4 flex gap-3">
        <button
          onClick={handlePlay}
          disabled={busy}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {busy ? "Converting..." : "Play TTS"}
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium active:scale-[0.98] transition-all"
        >
          Stop
        </button>
      </div>
      {status && (
        <div className="mt-3 text-sm text-purple-200 font-medium">{status}</div>
      )}
    </div>
  );
}
