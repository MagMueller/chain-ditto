# chain-ditto

A voice-controlled web app that dispatches natural-language tasks to
[Browser Use Cloud](https://browser-use.com/) agents. Speak a trigger word,
then a command — the command is transcribed by ElevenLabs Scribe and dispatched
as a task. Multiple chats, follow-ups within the same browser session, and
optional spoken results via ElevenLabs Flash v2.5.

## How it works

1. Browser keeps a Web Speech API recognizer running locally (free) listening
   for the trigger word (default: `bro`).
2. On detection, a notification ding plays and a fresh `MediaRecorder` starts.
3. Recording stops on 1.4s of silence (or 12s max).
4. The audio is uploaded to `/api/stt`, which proxies to **ElevenLabs Scribe v2**.
5. The clean transcript is dispatched to **Browser Use Cloud** as a task.
6. The result streams into the chat as live step updates, then converts to a
   final markdown-rendered assistant message.
7. If "Read results aloud" is enabled, the result is spoken via **ElevenLabs
   Flash v2.5** through an `<audio>` element with optional `setSinkId()` for
   speaker selection.

## Local development

```bash
npm install
export ELEVENLABS_API_KEY=sk_...           # required for Scribe + TTS
export ELEVENLABS_VOICE_ID=pNInz6obpgDQGcFmaJgB   # optional, default Adam (male)
npm start
# → http://localhost:5173
```

The Browser Use API key is configured in the UI (Settings → Browser Use → API key).

## Deploy

Designed for Vercel:

```bash
npm i -g vercel
vercel deploy --prod
vercel env add ELEVENLABS_API_KEY production
```

`vercel.json` rewrites `/api/*` to `api/index.js` (which re-exports the Express
app from `server.js`). Static `public/` is served by Vercel's CDN.

## Browser support

- **Chrome desktop** — fully supported.
- **Chrome Android** — fully supported.
- **iOS Safari / iOS Chrome** — Web Speech API is unavailable, so the trigger
  word never fires. Everything else works.
