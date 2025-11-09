// Read API key from environment. Do NOT hard-code secret values here.
const sk_5920183f32fd40dec014250282d53358e9c93ab6e3d7e01e = process.env.REACT_APP_ELEVENLABS_API_KEY;
// Default to Rachel's voice ID (21m00Tcm4TlvDq8ikWAM) - one of ElevenLabs' pre-made voices.
// To use a different voice:
// 1. Go to https://elevenlabs.io/speech-synthesis
// 2. Click on a voice you want to use
// 3. Copy the voice ID from the URL (the last segment in the URL path)
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel (default voice)

console.log("ElevenLabs API Key loaded:", sk_5920183f32fd40dec014250282d53358e9c93ab6e3d7e01e ? "✓ YES" : "✗ NO");

let currentAudio = null;

export async function getElevenLabsAudio(text) {
  if (!text || text.trim().length === 0) return null;

  try {
    // Use the documented ElevenLabs Text-to-Speech endpoint and request audio
    const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The official header name is `xi-api-key`
        "xi-api-key": sk_5920183f32fd40dec014250282d53358e9c93ab6e3d7e01e,
        // Ask for an audio response
        "Accept": "audio/mpeg"
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      // Try to include body text (JSON or plain) in the thrown error to aid debugging
      let details = null;
      try {
        details = await response.text();
      } catch (e) {
        details = response.statusText;
      }
      throw new Error(`ElevenLabs API error: ${response.status} ${details}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("TTS Error:", err);
    return null;
  }
}

export function getPageText() {
  const elements = document.querySelectorAll(
    "h1, h2, h3, h4, p, button, label, span, div"
  );
  
  const textArray = [];
  elements.forEach((el) => {
    const text = el.textContent?.trim();
    if (text && text.length > 0 && text.length < 500) {
      textArray.push(text);
    }
  });

  return textArray.join(". ");
}

export function playAudio(audioUrl, speed = 1) {
  stopAudio();

  if (audioUrl) {
    currentAudio = new Audio(audioUrl);
    // Note: Speed control works with browser Audio API
    currentAudio.playbackRate = speed;
    currentAudio.play();
  }
}

export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
