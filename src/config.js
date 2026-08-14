// ============================================================================
// MO FẸ́ NÍ ṢỌ́LÁ — the one config file that rules everything.
//
// Five screens: Summons → Case → Defense → Ruling → Verdict/Judgment.
// Every piece of personal and variable content lives HERE; components
// render entirely from this object. The copy is final — if a line isn't
// here, it doesn't exist.
// ============================================================================

const config = {
  her: {
    fullFirstName: 'Mọ́nísọ́lá',
    shortName: 'Ṣọ́lá',
    surname: 'Olomola',
  },
  him: {
    firstName: 'Isaac X',
    whatsappNumber: '2348165868081',
  },

  // --------------------------------------------------------------------------
  // Screen 1 — The Summons
  // --------------------------------------------------------------------------
  summons: {
    chip: 'CONFIDENTIAL',
    court: 'THE HIGH COURT OF UNFINISHED BUSINESS',
    attention: 'For the attention of Barr. Mọ́nísọ́lá Olomola',
    summoned: 'You’ve been summoned. 💌',
    sealHint: 'tap to break',
  },

  // --------------------------------------------------------------------------
  // Screen 2 — The Case
  // --------------------------------------------------------------------------
  theCase: {
    defendant: 'His Own Bad Timing', // rendered as "{him.firstName} v. {defendant}"
    charge: 'The charge: liking you since April, and doing a terrible job of showing it.',
    nextButton: 'Fair. Continue →',
  },
  photo: {
    src: '/date-photo.jpg',
    caption: 'Exhibit A. You, being unforgettable.',
  },

  // --------------------------------------------------------------------------
  // Screen 3 — The Defense
  // --------------------------------------------------------------------------
  defense: {
    title: 'Why rule in my favour:',
    perks: [
      'Building something for a billion people — you’d get veto power.',
      'Can’t always be around. But when I show up, I show up fully.',
      'You’re already a muse. Evidence: this entire app.',
      'High risk, high reward. Early investors do best.',
    ],
    nextButton: 'Noted. Proceed →',
  },

  // --------------------------------------------------------------------------
  // Screen 4 — Your Ruling
  // --------------------------------------------------------------------------
  ruling: {
    title: 'Your ruling, My Lady:',
    question1: 'The date shall be —',
    dateOptions: [
      { id: 'suya', emoji: '🍢', label: 'Suya & small chops', shortText: 'suya & small chops' },
      { id: 'dessert', emoji: '🍦', label: 'Dessert + a long walk', shortText: 'dessert + a long walk' },
      { id: 'local', emoji: '🍲', label: 'One properly good spot', shortText: 'a properly good spot' },
      { id: 'movie', emoji: '🎬', label: 'Movie + street food', shortText: 'movie + street food' },
    ],
    question2: 'And it shall happen —',
    weekendOptions: [
      { id: 'w1', label: 'Aug 29' },
      { id: 'w2', label: 'Sep 5' },
      { id: 'w3', label: 'Sep 12' },
      { id: 'own', label: 'I’ll pick my own date', ownDate: true, shortText: 'a date I’ll name' },
    ],
    binding: 'I’ll come to Lagos. This is binding.',
    nextButton: 'To the verdict →',
  },

  // --------------------------------------------------------------------------
  // Screen 5 — The Verdict → Judgment
  // --------------------------------------------------------------------------
  verdict: {
    title: 'Motion for a second date:',
    grantLabel: '✓ MOTION GRANTED',
    // Index 0 is the resting label; each dodge advances one label.
    // After maxDodges the button fades out, disabled.
    deniedLabels: ['MOTION DENIED', 'Objection!', 'Overruled.', 'Be serious, counsel.', 'Ṣọ́lá... 🥺'],
    maxDodges: 4,
  },
  judgment: {
    granted: 'Motion granted. ❤︎',
    handleLine: 'I’ll handle everything. See you in Lagos.',
    offRecord: 'Off the record: you mentioned you journal. I’ve been hoping I made the page.',
    bigLine: 'Mo fẹ́ ní Ṣọlá.',
    deliverButton: 'Deliver the ruling 📩',
    remarksLink: 'the Court has remarks',
    // {dateType} and {weekend} are replaced with her selections.
    whatsappTemplate: 'Ruling delivered ⚖️❤️ Motion granted: {dateType} on {weekend}.',
    remarksPrefill: '',
  },

  // --------------------------------------------------------------------------
  // Soundtrack — OFF by default; the 🎵 toggle starts it.
  // --------------------------------------------------------------------------
  soundtrack: {
    enabled: true,
    src: '/soundtrack.mp3',
    label: '🎵 play soundtrack',
    stopLabel: '🔇 stop soundtrack',
  },
}

export default config
