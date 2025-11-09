import React, { useState } from "react";
import { getPageText, getElevenLabsAudio, playAudio, stopAudio } from "../utils/elevenLabsService";

export default function AccessibilityPageReader() {
  const [isReading, setIsReading] = useState(false);

  const handleReadPage = async () => {
    if (isReading) {
      stopAudio();
      setIsReading(false);
      return;
    }

    setIsReading(true);
    try {
      const pageText = getPageText();
      if (pageText) {
        const audioUrl = await getElevenLabsAudio(pageText);
        if (audioUrl) {
          playAudio(audioUrl);
        }
      }
    } finally {
      setIsReading(false);
    }
  };

  return (
    <button
      onClick={handleReadPage}
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-2xl transition-all ${
        isReading
          ? "bg-cyan-600 hover:bg-cyan-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
      title="Read entire page aloud for accessibility"
    >
      {isReading ? "Stop Reading" : "Read Page"}
    </button>
  );
}
