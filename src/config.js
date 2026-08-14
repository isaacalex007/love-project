// ============================================================================
// MO FẸ́ NÍ ṢỌ́LÁ — the one config file that rules everything.
//
// Every piece of personal and variable content lives HERE. Components render
// entirely from this object — no personal text is hardcoded in JSX.
//
// >>> FILL IN every value marked with ⚠️ FILL before sending. <<<
// Search this file for "FILL" to find them all.
// ============================================================================

const config = {
  // --------------------------------------------------------------------------
  // People
  // --------------------------------------------------------------------------
  her: {
    fullFirstName: 'Mọ́nísọ́lá',
    shortName: 'Ṣọ́lá',
    surname: '[HER SURNAME]', // ⚠️ FILL — for the case caption "Barr. Mọ́nísọ́lá [Surname]"
  },
  him: {
    firstName: '[YOUR FIRST NAME]', // ⚠️ FILL
    // ⚠️ FILL — international format, digits only, no "+" (e.g. "2348012345678")
    whatsappNumber: '[YOUR WHATSAPP NUMBER]',
  },

  // --------------------------------------------------------------------------
  // Case-file furniture
  // --------------------------------------------------------------------------
  caseMeta: {
    court: 'IN THE HIGH COURT OF UNFINISHED BUSINESS',
    holden: 'Holden at Lagos',
    suitNo: 'Suit No. LD/2026/❤︎',
    confidentialStamp: 'CONFIDENTIAL',
    sealInstruction:
      'Tap the seal to break it. By breaking this seal, counsel agrees to proceed with an open mind and, ideally, an open weekend.',
  },

  // --------------------------------------------------------------------------
  // Screen 1 — case caption & preliminary statement
  // --------------------------------------------------------------------------
  caption: {
    plaintiffNote: '(Plaintiff — appearing in person, slightly nervous)',
    defendantName: 'HIS OWN BAD TIMING',
    defendantNote: '(Defendant — appearing everywhere, constantly)',
    preliminaryTitle: 'PRELIMINARY STATEMENT',
    preliminaryParagraphs: [
      'My Lady, before we begin: your parents named you Mọ́nísọ́lá — “I have wealth.”',
      'The Plaintiff has reviewed the evidence and finds the name to be accurate, well-founded, and frankly an understatement.',
      'This case concerns the Plaintiff’s application to one day truthfully say the short version:',
    ],
    bigLine: '“Mo ní Ṣọlá.”',
    afterBigLine: 'But we’re getting ahead of ourselves. First — the exhibits.',
    nextButton: 'Proceed to Exhibit A →',
  },

  // --------------------------------------------------------------------------
  // Screen 2 — Exhibit A: evidence of interest
  // --------------------------------------------------------------------------
  exhibitA: {
    tab: 'EXHIBIT A',
    title: 'EXHIBIT A — EVIDENCE OF INTEREST',
    intro: 'The Plaintiff submits the following into the record:',
    firstDateDate: '[DATE OF FIRST DATE]', // ⚠️ FILL — e.g. "14th of June, 2026"
    // ⚠️ FILL — a real detail: something she said, something you both laughed at,
    // what she ordered. Specificity is the whole gesture.
    specificMemory: '[ONE SPECIFIC MEMORY FROM THE DATE]',
    herQuote: '[ONE THING SHE SAID THAT STUCK WITH YOU]', // ⚠️ FILL
    itemA3:
      'The Plaintiff has, on multiple occasions, drafted messages to the Respondent, deleted them, and sent “hope your day is going well 😊” instead. The Court is asked to note this as evidence of interest poorly executed, not absence of interest.',
    footnote: '*“Respondent” — you. The beautiful lawyer reading this. Yes, you.',
    nextButton: 'Exhibit B →',
  },

  // --------------------------------------------------------------------------
  // Screen 3 — Exhibit B: confession & qualifications
  // --------------------------------------------------------------------------
  exhibitB: {
    tab: 'EXHIBIT B',
    confessionTitle: 'EXHIBIT B — THE CONFESSION',
    confessionIntro: 'The Plaintiff admits the following without objection:',
    confessionParagraphs: [
      'He has been building a company, and he let that become an excuse to pursue you at 40% capacity. Check-ins. The occasional gift. Vibes without a verdict.',
      'You deserve 100% capacity. This document is the Plaintiff operating at it.',
    ],
    qualificationsTitle: 'QUALIFICATIONS OF THE PLAINTIFF',
    qualificationsNote: '(submitted with 92% confidence)',
    perks: [
      'Founder — meaning: unreasonable persistence, now finally pointed in the right direction',
      'Replies texts faster than your associates reply emails',
      '[TRUE SPECIFIC PERK #1 — e.g. “makes a jollof that has ended arguments”]', // ⚠️ FILL
      '[TRUE SPECIFIC PERK #2]', // ⚠️ FILL
      'Will learn the difference between your “I’m fine” and your “I’m fine” — committed to continuing legal education',
      'Based in Ibadan; willing to appear before this Court in Lagos as often as summoned',
    ],
    nextButton: 'Exhibit C →',
  },

  // --------------------------------------------------------------------------
  // Screen 4 — Exhibit C: the subject
  // --------------------------------------------------------------------------
  exhibitC: {
    tab: 'EXHIBIT C',
    title: 'EXHIBIT C — KNOWN FACTS ABOUT THE RESPONDENT',
    facts: [
      { emoji: '✈️', label: 'Travels', text: 'has better passport stamps than most diplomats' },
      { emoji: '🍜', label: 'Eats well', text: 'a woman of documented taste' },
      { emoji: '👗', label: 'Dresses like a closing argument', text: 'no further questions' },
      {
        emoji: '🎶',
        label: 'Music',
        // ⚠️ FILL — her favorite artist or genre
        text: '[HER FAVORITE ARTIST/GENRE], played at volumes the neighbors have learned to accept',
      },
    ],
    outro:
      'The Plaintiff notes that all of the above are better experienced in company. His, specifically. Which brings us to the motion.',
    nextButton: 'File the Motion →',
  },

  // --------------------------------------------------------------------------
  // Screen 5 — the motion
  // --------------------------------------------------------------------------
  motion: {
    stamp: 'FILED',
    title: 'MOTION FOR A SECOND DATE',
    paragraphs: [
      'The Plaintiff respectfully moves this Honourable Court for an Order granting:',
    ],
    order:
      'One (1) second date, to take place in Lagos, at a time of the Court’s choosing, with the Plaintiff handling the planning, the logistics, and the burden of proof that he is worth her time.',
    closing:
      'The Plaintiff further submits that he is not asking the Court to feel anything it doesn’t. He is asking for one properly-executed evening — full attention, no phone, no 40%.',
    directionNote: 'The Court will now issue directions.',
    nextButton: 'Issue Directions →',
  },

  // --------------------------------------------------------------------------
  // Screen 6 — the Court's directions (interactive)
  // Arrays of arbitrary length (2–6); the UI adapts. Edit freely — swap in
  // real affordable spots you know. The value of the date is presence and
  // planning, not spend.
  // --------------------------------------------------------------------------
  directions: {
    question1: 'The Court orders that the second date shall be:',
    dateOptions: [
      {
        id: 'suya',
        emoji: '🍢',
        label: 'Suya & small chops evening',
        description: 'a good spot, plastic chairs optional, conversation mandatory',
        // Warm restatement used in the final Order + WhatsApp message:
        orderText: 'A suya & small chops evening — plastic chairs optional, conversation mandatory',
        shortText: 'a suya & small chops evening',
      },
      {
        id: 'dessert',
        emoji: '☕',
        label: 'Dessert + a long walk',
        description:
          'ice cream or coffee, then wandering and talking until one of us gets tired (it won’t be her)',
        orderText: 'Dessert and a long walk — wandering and talking until one of us gets tired (it won’t be her)',
        shortText: 'dessert + a long walk',
      },
      {
        id: 'local',
        emoji: '🍲',
        label: 'One properly good local spot',
        description: 'nothing fancy, everything delicious',
        orderText: 'One properly good local spot — nothing fancy, everything delicious',
        shortText: 'a properly good local spot',
      },
      {
        id: 'movie',
        emoji: '🎬',
        label: 'Movie + street food after',
        description: 'she picks the film, he defends his snack choices',
        orderText: 'A movie (her pick) + street food after — snack choices will be defended',
        shortText: 'movie + street food',
      },
    ],
    question2: 'The Court further orders that this shall occur on:',
    weekendOptions: [
      // ⚠️ FILL — 2–3 real weekends you can actually travel to Lagos.
      // Only offer dates you will honor.
      { id: 'w1', label: '[WEEKEND OPTION 1, e.g. Sat, Aug 29]' },
      { id: 'w2', label: '[WEEKEND OPTION 2]' },
      { id: 'w3', label: '[WEEKEND OPTION 3]' },
      {
        id: 'own',
        label: '“I’ll name my own date”',
        sub: '(the Court is powerful like that)',
        ownDate: true,
        // Text used in the final Order / WhatsApp when she picks this:
        orderText: 'A date the Court will name — its word is law',
        shortText: 'a date the Court will name',
      },
    ],
    smallPrint:
      'All orders are binding on the Plaintiff. He has already checked the road from Ibadan. He is not joking.',
    nextButton: 'Proceed to Verdict →',
  },

  // --------------------------------------------------------------------------
  // Screen 7 — the verdict
  // --------------------------------------------------------------------------
  verdict: {
    title: 'RULING',
    intro: 'On the Motion for a Second Date, this Honourable Court rules as follows:',
    grantLabel: '✓ MOTION GRANTED',
    // Labels the dodging "denied" button cycles through, in order.
    // After the last one it fades out, disabled.
    deniedLabels: [
      'Motion Denied',
      'Objection: hearsay',
      'Overruled. Try again.',
      'Counsel, be serious.',
      'This button has recused itself',
      'Ṣọ́lá... 🥺',
    ],
    deniedDisabledCaption: 'denied on procedural grounds',
  },

  // --------------------------------------------------------------------------
  // Screen 8 — judgment & celebration
  // --------------------------------------------------------------------------
  judgment: {
    title: 'JUDGMENT',
    granted: 'Motion granted. ❤︎',
    orderTitle: 'THE ORDER OF THIS COURT:',
    travelLine: '🚗 Plaintiff to appear in Lagos. He’ll handle everything else.',
    offRecordIntro: 'One last thing, off the record:',
    offRecordLine: 'Mo fẹ́ ní Ṣọlá. Properly this time.',
    adjourned: 'Court is adjourned.',
    deliverButton: '📩 Deliver the ruling to the Plaintiff',
    remarksLink: 'The Court wishes to add remarks',
    // The pre-filled WhatsApp message. {dateType} and {weekend} are replaced
    // with her selections (shortText of each).
    whatsappTemplate:
      'Ruling delivered ⚖️❤️ Motion granted: {dateType} on {weekend}. — The Court',
    // Prefill for the "remarks" link (her graceful path to say anything,
    // including no). Keep it empty or very short.
    remarksPrefill: '',
  },

  // --------------------------------------------------------------------------
  // Photos — all optional. The app works with zero (falls back to
  // illustrated/animated elements). Put files in /public and reference like
  // "/first-date.jpg". Set to null to omit.
  // --------------------------------------------------------------------------
  photos: {
    firstDate: {
      src: null, // e.g. '/first-date.jpg'
      caption:
        'Exhibit A-1: photographic evidence, quality of image inversely proportional to quality of evening',
    },
    herPortrait: {
      src: null, // e.g. '/sola.jpg' — one tasteful image maximum
      caption: 'Exhibit C-1: the subject. The Court is asked to maintain composure.',
    },
  },

  // --------------------------------------------------------------------------
  // Soundtrack — OFF by default (browsers block autoplay anyway).
  // Set enabled: true and provide a short hosted clip to show the toggle.
  // --------------------------------------------------------------------------
  soundtrack: {
    enabled: false,
    src: '', // e.g. '/song-clip.mp3' — [HER FAVORITE SONG OR ARTIST]
    label: '🎵 play soundtrack',
    stopLabel: '🔇 stop soundtrack',
  },
}

export default config
