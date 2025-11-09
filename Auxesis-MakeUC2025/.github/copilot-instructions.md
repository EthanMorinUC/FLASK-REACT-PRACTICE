## Quick orientation

This is a small Create React App (CRA) single-page app focused on accessibility/demo features.
Key locations:
- `package.json` — standard CRA scripts: `npm start`, `npm run build`, `npm test`.
- `src/` — application code. Major subfolders:
  - `src/components/` — UI components (e.g. `AccessibilityToggle.jsx`, `QuizLarge.jsx`, `TextToSpeechEnhanced.jsx`, `Mascot.jsx`).
  - `src/utils/` — helper services (notably `elevenLabsService.js` for TTS and `cursor.js`).
  - `src/styles/` — alternative styles like `highContrast.css`.
- `public/` — static assets and `manifest.json` (PWA metadata).

## Big-picture architecture

- Single-page client app bootstrapped with CRA. No server code in this repo.
- Components import small utility modules for features such as custom cursor, TTS, and accessibility toggles.
- TTS integration: `src/utils/elevenLabsService.js` handles ElevenLabs text-to-speech calls and exposes `getElevenLabsAudio(text)`, `playAudio(url,speed)`, and `stopAudio()`.

Why this matters to an AI agent:
- When editing UI components, be aware of direct DOM queries in `elevenLabsService.getPageText()` and side-effectful audio playback. Prefer component-level state for UI changes and call these utils from effect handlers.
- The repository includes debug-friendly console logging (see `src/App.jsx` resolveModule usage) — keep those logs when diagnosing module interop issues.

## Developer workflows (concrete commands)

- Start dev server: `npm start` (CRA default) — opens at http://localhost:3000.
- Build for production: `npm run build`.
- Run tests: `npm test` (uses react-scripts testing setup and Testing Library).

Environment variables and secrets

- `src/utils/elevenLabsService.js` reads `process.env.REACT_APP_ELEVENLABS_API_KEY`. Provide this in a local `.env` file (example: `REACT_APP_ELEVENLABS_API_KEY=...`).
- The project currently logs whether the key is present — do NOT commit real secret values to the repo.

Project-specific patterns and gotchas

- Module interop: `src/App.jsx` contains `resolveModule()` to handle `module.default` wrapping; use the same pattern when importing third-party modules that might be transpiled differently.
- DOM-text extraction: `getPageText()` collects text from many tags and limits string length — if you change page structure, update this function accordingly.
- Audio lifecycle: `playAudio()` and `stopAudio()` use a module-scoped `currentAudio`. Be careful when components unmount; ensure `stopAudio()` is called to avoid leaks.
- Styling: There is both custom CSS in `src/styles/` and Tailwind listed in devDependencies. Confirm which system is active before changing global styles.

Tailwind / PostCSS gotcha

- CRA looks for `postcss.config.js` at the project root. If the file is misnamed (e.g., `postconfig.js`) Tailwind plugins won't run and the `@tailwind` directives in `src/index.css` will be left unprocessed — utilities won't appear. If Tailwind classes look unstyled, first check that `postcss.config.js` exists and that `src/index.css` is imported from `src/index.js`.

Examples (how to use common pieces)

- Call TTS inside a component effect:
  - import `{ getElevenLabsAudio, playAudio, stopAudio }` from `src/utils/elevenLabsService.js`.
  - const url = await getElevenLabsAudio(text); playAudio(url);

Files to inspect first when assigned a task

- `src/components/AccessibilityToggle.jsx` — accessibility feature wiring.
- `src/components/TextToSpeechEnhanced.jsx` — example TTS usage and UI hooks.
- `src/utils/elevenLabsService.js` — network integration and audio helpers. Note: confirm endpoint and headers when modifying TTS code (see project notes below).
- `src/App.jsx` — small entry points and module-resolution helper.

ElevenLabs TTS notes

- Use `process.env.REACT_APP_ELEVENLABS_API_KEY` for the API key (do not hard-code secrets).
- The TTS endpoint used in this project is `https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}` and requires the header `xi-api-key`. When debugging 404s, confirm the URL includes the `text-to-speech` segment and that `VOICE_ID` is valid for your account. Error responses are now surfaced with status and body to help diagnosis.

If you modify build or dependencies

- Update `package.json` and verify `npm start` still runs locally. This repo uses CRA's `react-scripts` (v5).

When in doubt

- Run the app (`npm start`) and use browser devtools console — the codebase uses console logs for visibility.
- If you need to add long-running services or server-side keys, propose creating a backend or a secrets manager rather than embedding keys in the client.

Questions? Leave a short TODO in the PR describing what you changed and where (e.g., "TTS: replaced inline fetch with shared ElevenLabs helper — updated `TextToSpeechEnhanced.jsx`").

---
Keep the file short and actionable. If you want I can iterate this with specific examples after you point to a target task.
