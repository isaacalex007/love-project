# MO FẸ́ NÍ ṢỌ́LÁ ⚖︎❤︎

An interactive case file, in the matter of a second date. Single-page
Vite + React + Tailwind app; all state in React, no backend, no storage.
Her verdict is delivered back via a WhatsApp deep link.

## Before sending — fill in the config

**Everything personal lives in one file: [`src/config.js`](src/config.js).**
Search it for `FILL` and complete every placeholder:

- Her surname
- Your first name and WhatsApp number (international format, digits only, e.g. `2348012345678`)
- The date of the first date, one specific memory, and one thing she said
- Two true, specific perks of you
- Her favorite artist/genre (Exhibit C music card)
- 2–3 real weekends you can actually travel to Lagos — only dates you'll honor

Optional, also in `config.js`:

- **Photos** (`photos.firstDate`, `photos.herPortrait`) — drop files in `public/`
  and set `src: '/your-file.jpg'`. The app works fine with zero photos.
- **Date-type options** — rewrite, reorder, add, or delete freely (2–6 options);
  the UI adapts. Swap in real affordable spots you know.
- **Soundtrack** — set `soundtrack.enabled: true` and provide a short hosted
  clip to show the 🎵 toggle. Off by default.

No component hardcodes personal text — every tweak is a one-line edit in `config.js`.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL and test at a 380px viewport (Chrome DevTools → mobile view).

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Pick an unguessable-but-pretty project name, e.g. `mo-fe-ni-sola` →
`mo-fe-ni-sola.vercel.app`. The page already carries `noindex, nofollow`.

**Before sending: test the full flow from a real phone** — break the seal,
pick directions, attempt the denied button, grant the motion, and tap
"Deliver the ruling" to confirm the WhatsApp message arrives pre-filled.
Re-test after any config change.

## Sending it

- Send the link yourself with a short personal message or voice note —
  e.g. *"I filed something in court today. You're the presiding judge. [link]"*
  Never a bare link.
- Send at a time she's likely relaxed (weekend morning / evening).
- When the ruling lands, reply like a human, then **book what she picked
  within 24 hours** and send confirmation. The follow-through is the gesture.
