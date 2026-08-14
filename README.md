# MO FẸ́ NÍ ṢỌ́LÁ ⚖︎❤︎

An interactive case file, in the matter of a second date. Five screens,
~90 seconds: the Summons (seal break) → the Case (photo) → the Defense
(checklist) → her Ruling (date + weekend) → the Verdict & Judgment
(confetti, WhatsApp delivery).

Single-page Vite + React + Tailwind app; all state in React, no backend,
no storage. Her verdict is delivered back via a WhatsApp deep link.

## Content

Everything personal lives in one file: [`src/config.js`](src/config.js) —
names, copy, date/weekend options, dodge labels, the WhatsApp template.
Components render entirely from it; every tweak is a one-line edit.
Date and weekend options are arrays — add, remove, or reword freely.

Assets in `public/`: `date-photo.jpg` (Exhibit A), `soundtrack.mp3`
(40s GWAGWALADA chorus clip, wired to the 🎵 toggle, off by default),
and self-hosted Instrument Sans/Serif in `fonts/`.

## Run locally

```bash
npm install
npm run dev
```

Test at a 380px viewport (Chrome DevTools → mobile view).

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Pick an unguessable-but-pretty project name, e.g. `mo-fe-ni-sola` →
`mo-fe-ni-sola.vercel.app`. The page carries `noindex, nofollow`.

**Before sending: test the full flow from a real phone** — break the seal,
make both picks, try the denied button, grant the motion, and tap
"Deliver the ruling" to confirm the WhatsApp message arrives pre-filled.
Re-test after any config change.

## Sending it

- Send the link yourself with a short personal message or voice note —
  never a bare link.
- Send at a time she's likely relaxed (weekend morning / evening).
- When the ruling lands, reply like a human, then **book what she picked
  within 24 hours** and send confirmation. The follow-through is the gesture.
