/**
 * Konpeitō Night — A little paper sky, handmade for one person.
 * Personal content for Fatima, created by Hassaan.
 *
 * Privacy & Editorial Guardrails:
 * - Strictly curated personal content with zero private or sensitive references.
 * - Concise, warm, emotionally mature writing with zero pressure or repetition.
 */

export interface StorySceneMeta {
  index: number;
  id: string;
  shortLabel: string;
  title: string;
  kicker: string;
}

export const STORY_SCENES: readonly StorySceneMeta[] = [
  {
    index: 0,
    id: "threshold",
    shortLabel: "Threshold",
    title: "The Threshold",
    kicker: "Scene I",
  },
  {
    index: 1,
    id: "letter",
    shortLabel: "Shikwa",
    title: "A Small Call & Response",
    kicker: "Scene II",
  },
  {
    index: 2,
    id: "noticed",
    shortLabel: "Noticed",
    title: "Things That Were Noticed",
    kicker: "Scene III",
  },
  {
    index: 3,
    id: "keepsakes",
    shortLabel: "Shelf",
    title: "Keepsake Shelf",
    kicker: "Scene IV",
  },
  {
    index: 4,
    id: "garden",
    shortLabel: "Garden",
    title: "The Garden",
    kicker: "Scene V",
  },
  {
    index: 5,
    id: "quiet-sky",
    shortLabel: "Post You",
    title: "The Quiet Sky",
    kicker: "Scene VI",
  },
  {
    index: 6,
    id: "constellation",
    shortLabel: "Stars",
    title: "The Constellation",
    kicker: "Scene VII",
  },
  {
    index: 7,
    id: "closing",
    shortLabel: "Closing",
    title: "Gift & Closing",
    kicker: "Scene VIII",
  },
] as const;

export const PERSONAL_CONTENT = {
  dedication: "for Fatima",
  creatorName: "Hassaan",
  heroTitle: "A little paper sky",
  heroSubtitle:
    "Handmade for one person, resting quietly under the same sky.",
  continueLabel: "Continue into the story",
} as const;

export interface ShikwaExchangeItem {
  id: "first-response" | "second-response";
  stepLabel: string;
  callContext: string;
  revealPrompt: string;
  spokenResponse: string;
  noteStep: number;
}

export const SHIKWA_MOMENT = {
  kicker: "Shikwa · Talhah Yunus",
  title: "From the ending of the second verse",
  intro:
    "That Snapchat video you liked used the close of the second verse — where the song speaks from its own side, and my spoken replies answer back.",
  exchanges: [
    {
      id: "first-response",
      stepLabel: "First reply",
      callContext: "When the song's narrator weighs the fault on its side",
      revealPrompt: "Tap to reveal what I said first",
      spokenResponse: "Meri galti hai.",
      noteStep: 1,
    },
    {
      id: "second-response",
      stepLabel: "Second reply",
      callContext: "When the verse says she does not understand",
      revealPrompt: "Tap to reveal my answer to that line",
      spokenResponse: "Wo toh samajhti bhi hai.",
      noteStep: 3,
    },
  ] satisfies readonly ShikwaExchangeItem[],
  footerNote: "A favourite little memory",
  signature: "Hassaan",
} as const;

export interface NoticedObservation {
  id: "gajre" | "piercings" | "bracelet" | "late-night";
  num: string;
  title: string;
  subtitle: string;
  note: string;
  poeticLine: string;
}

export const NOTICED_OBSERVATIONS: readonly NoticedObservation[] = [
  {
    id: "gajre",
    num: "01",
    title: "Gajre",
    subtitle: "Fragrant jasmine & quiet grace",
    note: "Hath mein pehne gajre aur unki saadgi. The effortless way you wear them stays in memory without ever trying to stand out.",
    poeticLine: "Small details remembered quietly.",
  },
  {
    id: "piercings",
    num: "02",
    title: "The three ear piercings",
    subtitle: "Three delicate points of silver light",
    note: "Three ear piercings aligned softly, including the center wali Ramzan piercing. Even the smallest details are always worth noticing.",
    poeticLine: "Three subtle points of light.",
  },
  {
    id: "bracelet",
    num: "03",
    title: "The bracelet",
    subtitle: "Simple elegance on your wrist",
    note: "Bracelet toh behad pyara tha. There is a calm grace in the things you choose to wear, understated and genuinely yours.",
    poeticLine: "Grace in everyday simplicity.",
  },
  {
    id: "late-night",
    num: "04",
    title: "Quiet late-night calm",
    subtitle: "When the city finally slows down",
    note: "Raat ke un khamosh ghanton ka sukoon jab shehar thora thehar jata hai. Those peaceful late-night hours remain a warm memory.",
    poeticLine: "Stillness after midnight.",
  },
] as const;

export interface KeepsakeItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  reflection: string;
  artifactType: "letter" | "jar" | "heart" | "flower";
}

export const KEEPSAKE_ITEMS: readonly KeepsakeItem[] = [
  {
    id: "letter",
    num: "01",
    title: "A quiet note",
    subtitle: "Lafz aur thehrao",
    reflection:
      "Kuch chhoti baatein aur yaadein jo waqt ke sath aur bhi pyari lagti hain, bilkul saadgi aur sukoon ke sath.",
    artifactType: "letter",
  },
  {
    id: "keepsake",
    num: "02",
    title: "The konpeitō jar",
    subtitle: "Small sweet moments",
    reflection:
      "Chhotay chhotay pur-sukoon lamhay, ek aashna dhun, aur woh saadgi jo har cheez ko halka aur behtar bana deti hai.",
    artifactType: "jar",
  },
  {
    id: "warmth",
    num: "03",
    title: "Steady warmth",
    subtitle: "Pur-sukoon khayal",
    reflection:
      "Har din ke shor se hat kar ek halka aur pur-sukoon ehsaas, jahan sirf aaram, muskurahat aur khushi ki dua ho.",
    artifactType: "heart",
  },
  {
    id: "bloom",
    num: "04",
    title: "October bloom",
    subtitle: "15th October and beyond",
    reflection:
      "Fatima ke liye ek meethi dua. Aane wala har mausam halka, pur-sukoon aur usi itminaan se bhara ho jiski tum hamesha qadr karti ho.",
    artifactType: "flower",
  },
] as const;

export interface GardenFlowerSpec {
  id: string;
  name: string;
  meaning: string;
  note: string;
  petalFill: string;
  centerFill: string;
}

export const GARDEN_FLOWERS: readonly GardenFlowerSpec[] = [
  {
    id: "sakura-blossom",
    name: "First Sakura",
    meaning: "Gentleness without hurry",
    note: "May your mornings begin softly and never ask you to rush your own pace.",
    petalFill: "var(--color-sakura-pink)",
    centerFill: "var(--color-butter-star)",
  },
  {
    id: "periwinkle-bell",
    name: "Twilight Bellflower",
    meaning: "Constancy in quiet hours",
    note: "Even when the day feels long, may there always be a peaceful corner waiting for you.",
    petalFill: "var(--color-periwinkle)",
    centerFill: "var(--color-paper-cream)",
  },
  {
    id: "butter-cosmos",
    name: "Starlight Cosmos",
    meaning: "Sukoon & quiet harmony",
    note: "A warm little wish that your heart feels light, respected, and rested tonight.",
    petalFill: "var(--color-butter-star)",
    centerFill: "var(--color-sakura-deep)",
  },
] as const;

export const QUIET_SKY_CONTENT = {
  kicker: "Post You · Talhah Yunus",
  title: "A lighter kind of day",
  spokenLine:
    "Tum khush hoti ho, toh mere mushkil din bhi thode halke lagne lagte hain.",
  caption:
    "As this quiet wave settles into stillness, one simple thought stays clear — seeing you happy naturally makes heavy days feel lighter.",
  visualNote:
    "3D liquid-glass ribbon wave in 4:3 harmonic stage · Source: creator-supplied Adobe 3D Wave study (verify commercial/redistribution licence if ever published publicly).",
} as const;

export const OCTOBER_GIFT = {
  subtitle: "A belated keepsake",
  dateBadge: "15 October",
  title: "The October thought",
  paragraphs: [
    "For 15th October and every season after it, my wish for you is a year filled with lightness, ease, and genuine sukoon.",
    "That one remaining birthday keepsake is still kept safely aside. Whenever the time is naturally right, without any formality or pressure, it will find its way to you.",
  ],
} as const;

export const CLOSING_PROMISE = {
  subtitle: "Under the same sky",
  title: "Wishing you peace tonight",
  paragraphs: [
    "If it is late at night when you are reading this, set your phone aside soon and get some rest. Wherever your days take you, I hope you always feel respected and surrounded by calm.",
  ],
  signoff: "With quiet respect and care,",
  signature: "Hassaan",
} as const;

export interface ConstellationStarSpec {
  id: number;
  index: number;
  hx: number;
  hy: number;
  sx: number;
  sy: number;
  label: string;
  description: string;
  noteStep: number;
}

const STAR_LABELS: ReadonlyArray<{ label: string; description: string }> = [
  {
    label: "Patience",
    description:
      "Giving time its rightful space without rushing what matters.",
  },
  {
    label: "Grace",
    description:
      "The quiet dignity with which you carry yourself through every day.",
  },
  {
    label: "Warmth",
    description:
      "A gentle presence that makes ordinary moments feel lighter.",
  },
  {
    label: "Peace",
    description:
      "Choosing sukoon and stillness over unnecessary noise.",
  },
  {
    label: "Calm",
    description:
      "A steady, reassuring stillness that makes the evening feel lighter.",
  },
  {
    label: "Kindness",
    description:
      "Thoughtfulness that asks for nothing in return.",
  },
  {
    label: "Light",
    description:
      "A soft smile that steadies the whole room.",
  },
  {
    label: "Care",
    description:
      "Remembering the smallest details simply because they matter to you.",
  },
  {
    label: "Stillness",
    description:
      "Late-night calm where no explanation is ever required.",
  },
  {
    label: "Gentleness",
    description:
      "Softness that remains strong even on tiring days.",
  },
  {
    label: "Simplicity",
    description:
      "Appreciating your quiet grace and the thoughtful way you move through life.",
  },
  {
    label: "Clarity",
    description:
      "Simple, genuine words spoken from a clear and warm heart.",
  },
  {
    label: "Sincerity",
    description:
      "Every word written here comes from a real and steady place.",
  },
  {
    label: "Hope",
    description:
      "Wishing you brighter mornings and peaceful nights ahead.",
  },
];

/**
 * Restored 14-star parametric heart constellation from commit 00fcf13,
 * enriched with the personal star labels from commit 0263749.
 */
export const CONSTELLATION_STARS: ConstellationStarSpec[] = Array.from(
  { length: 14 },
  (_, i) => {
    const N = 14;
    const t = (i / N) * Math.PI * 2;
    const hxRaw = 16 * Math.pow(Math.sin(t), 3);
    const hyRaw =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    return {
      id: i + 1,
      index: i,
      hx: Number((50 + hxRaw * 2.55).toFixed(2)),
      hy: Number((45 - hyRaw * 2.35).toFixed(2)),
      sx: 10 + ((i * 37 + 13) % 80),
      sy: 12 + ((i * 59 + 29) % 76),
      label: STAR_LABELS[i].label,
      description: STAR_LABELS[i].description,
      noteStep: i,
    };
  }
);
