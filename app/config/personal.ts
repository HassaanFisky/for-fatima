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
    shortLabel: "Letter",
    title: "A Small Letter",
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
    shortLabel: "Quiet Sky",
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

export const SMALL_LETTER = {
  salutation: "Dear Fatima,",
  title: "A calmer place than a notification",
  paragraphs: [
    "Some thoughts deserve a quieter home than a rushed message on a loud day. This little world was built to sit patiently under the sky until whenever you feel like turning its pages.",
    "When someone asks for time and space, the right answer is calm understanding. I am sorry for the moment I let impatience turn into noise when my only intention was to care.",
    "There is no timer here and no expectation attached to these pages. It is simply a handmade keepsake of appreciation, respect, and quiet sincerity.",
  ],
  footerNote: "Kept at your own pace",
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
    note: "Jahan khushbuein phoolon ki hon, wahan saadgi khud bolti hai. The effortless way you wear gajre stays in memory without ever trying to stand out.",
    poeticLine: "Small details remembered quietly.",
  },
  {
    id: "piercings",
    num: "02",
    title: "The three ear piercings",
    subtitle: "Delicate silver light, including the center one from Ramzan",
    note: "Like three tiny stars aligned along the ear, including the center Ramzan piercing you once mentioned. The smallest details are always worth noticing.",
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
    note: "Muskura de agar tu, ye be-noor shehar thora thehar jata hai. Those peaceful late-night hours and the line you once hummed, 'Phir se jeena chahta hun,' remain a warm memory.",
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
    title: "A quiet letter",
    subtitle: "Lafz aur thehrao",
    reflection:
      "Kuch baatein jaldbazi mein bheje gaye messages ke qabil nahi hotin. Screen par shor ke bajaye ek aisi jagah jahan ehsaas thehar sake, bina kisi dabao ke.",
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
    id: "respect",
    num: "03",
    title: "Care without pressure",
    subtitle: "Izzat sab se pehle",
    reflection:
      "Asal parwah woh hoti hai jo samne wale ko azaad mehsoos karaye. Jab kisi baat ya waqt ke liye mana kiya jaye, toh uski pehli baar mein izzat karna hi sabse bada saboot hai.",
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
  kicker: "Atmospheric interlude",
  title: "Waves of the evening sky",
  caption:
    "Between words and stars, a quiet current of lavender light moves at its own unhurried rhythm. Pause here for a breath before we look up at the constellation.",
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
    "If it is late at night when you are reading this, set your phone aside soon and get some rest. wherever your days take you, I hope you always feel respected and surrounded by calm.",
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
    label: "Trust",
    description:
      "Built slowly through listening and keeping every boundary safe.",
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
    label: "Respect",
    description:
      "Honoring your words and your pace the very first time.",
  },
  {
    label: "Honesty",
    description:
      "Owning mistakes clearly and growing without excuses.",
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
