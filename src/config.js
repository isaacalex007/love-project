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
    surname: 'Olomola',
  },
  him: {
    firstName: '[YOUR FIRST NAME]', // ⚠️ FILL — still missing!
    whatsappNumber: '2348165868081',
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
  // A-1 is the photo (see photos.firstDate below); A-2 and A-3 are text.
  // --------------------------------------------------------------------------
  exhibitA: {
    tab: 'EXHIBIT A',
    title: 'EXHIBIT A — EVIDENCE OF INTEREST',
    intro: 'The Plaintiff submits the following into the record:',
    itemA2:
      'The record shows the Respondent* journals. The Plaintiff has since wondered, more than once, whether he ever made the page.',
    itemA3:
      'The Plaintiff has, on multiple occasions, drafted messages to the Respondent, deleted them, and sent “how are you doing Monisola” instead. The Court is asked to note this as evidence of interest poorly executed, not absence of interest.',
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
      'Currently building a company he insists will reach a billion people. By ruling in his favour, the Court acquires veto power over at least one founder’s decisions — more than his investors can say.',
      'Cannot promise constant availability (see: founder). Can promise that when he is there, he is fully there — and a hopeless romantic about it.',
      'Will back your goals, dreams, and ambitions like they are his own quarterly targets.',
      'You are already, annoyingly, a muse. Evidence: this entire document.',
      'A gentleman on purpose, not by accident. Grounded when everything else isn’t — when you’re all over the place, that’s fine; he’ll hold still.',
      'Founder profile: high risk, high reward. The Court is advised that early investors historically do best.',
      'Takes the spiritual life seriously, and growing.',
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
      {
        emoji: '📚',
        label: 'African novels',
        text: 'keeps better company with Adichie and Achebe than most people manage with friends',
      },
      {
        emoji: '⚡',
        label: 'The most energetic person in the room',
        text: 'any room; the room adjusts',
      },
      {
        emoji: '📓',
        label: 'Journals',
        text: 'documents her life more faithfully than most firms document billables',
      },
      {
        emoji: '👗',
        label: 'Dresses like a closing argument',
        text: 'no further questions',
      },
      {
        emoji: '🎶',
        label: 'Music',
        text: 'see: the soundtrack currently playing',
      },
    ],
    outro:
      'Brilliant. Independent. Passionate. Funny without trying. The Plaintiff notes that all of the above are better experienced in company. His, specifically. Which brings us to the motion.',
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
      { id: 'w1', label: 'Sat, Aug 29' },
      { id: 'w2', label: 'Sat, Sep 5' },
      { id: 'w3', label: 'Sat, Sep 12' },
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
  // Photos — files live in /public. Set src to null to omit one; the app
  // works with zero photos.
  // --------------------------------------------------------------------------
  photos: {
    firstDate: {
      src: '/date-photo.jpg',
      caption:
        'Exhibit A-1 — taken by the Plaintiff, 12 April. The Court will note the subject is incapable of taking a bad photo. The Plaintiff has not recovered.',
    },
    herPortrait: {
      src: '/portrait.jpg',
      caption: 'Exhibit C-1 — the subject. The Court is asked to maintain composure.',
    },
  },

  // --------------------------------------------------------------------------
  // Soundtrack — GWAGWALADA (BNXN ft. Kizz Daniel & Seyi Vibez), ~40s chorus
  // clip, looped. OFF by default; the 🎵 toggle starts it.
  // --------------------------------------------------------------------------
  soundtrack: {
    enabled: true,
    src: '/soundtrack.mp3',
    label: '🎵 play soundtrack',
    stopLabel: '🔇 stop soundtrack',
  },
}

export default config
