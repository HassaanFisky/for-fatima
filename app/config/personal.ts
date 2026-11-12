/**
 * Personal content for Fatima, created by Hassaan.
 *
 * Editorial & Privacy Principles:
 * - Simple, natural, warm language with zero artist or song attributions.
 * - Authentic personal lines preserved verbatim without unnecessary explanations.
 */

export interface StorySceneMeta {
  index: number;
  id: string;
  shortLabel: string;
  title: string;
}

export const STORY_SCENES: readonly StorySceneMeta[] = [
  {
    index: 0,
    id: "threshold",
    shortLabel: "Start",
    title: "For Fatima",
  },
  {
    index: 1,
    id: "letter",
    shortLabel: "Moment",
    title: "Two Small Replies",
  },
  {
    index: 2,
    id: "noticed",
    shortLabel: "Noticed",
    title: "Little Details",
  },
  {
    index: 3,
    id: "keepsakes",
    shortLabel: "Keepsakes",
    title: "Keepsakes",
  },
  {
    index: 4,
    id: "garden",
    shortLabel: "Garden",
    title: "The Garden",
  },
  {
    index: 5,
    id: "quiet-sky",
    shortLabel: "Happiness",
    title: "When You Are Happy",
  },
  {
    index: 6,
    id: "constellation",
    shortLabel: "Stars",
    title: "Fourteen Stars",
  },
  {
    index: 7,
    id: "closing",
    shortLabel: "Closing",
    title: "A Quiet Wish",
  },
] as const;

export const PERSONAL_CONTENT = {
  dedication: "for Fatima",
  creatorName: "Hassaan",
  heroTitle: "A little world made for you",
  heroSubtitle: "Take your time and look around whenever you feel like it.",
  continueLabel: "Step inside",
} as const;

export interface PersonalExchangeItem {
  id: "first-response" | "second-response";
  musicalThought: string;
  spokenResponse: string;
  noteStep: number;
}

export const PERSONAL_MOMENT = {
  title: "Two lines, and what I said back",
  exchanges: [
    {
      id: "first-response",
      musicalThought: "Teri galti nahi hai",
      spokenResponse: "Meri galti hai.",
      noteStep: 1,
    },
    {
      id: "second-response",
      musicalThought: "Wo samajhti nahi hai",
      spokenResponse: "Wo toh samajhti bhi hai.",
      noteStep: 3,
    },
  ] satisfies readonly PersonalExchangeItem[],
  signature: "Hassaan",
} as const;

export interface NoticedObservation {
  id: "gajre" | "piercings" | "bracelet" | "late-night";
  num: string;
  title: string;
  subtitle: string;
  note: string;
}

export const NOTICED_OBSERVATIONS: readonly NoticedObservation[] = [
  {
    id: "gajre",
    num: "01",
    title: "Gajre",
    subtitle: "Jasmine on your wrist",
    note: "Hath mein pehne gajre aur unki saadgi. The natural, effortless way you wear them always stays in mind.",
  },
  {
    id: "piercings",
    num: "02",
    title: "Three ear piercings",
    subtitle: "Including the center Ramzan piercing",
    note: "Three ear piercings aligned softly, including the center wali Ramzan piercing.",
  },
  {
    id: "bracelet",
    num: "03",
    title: "The bracelet",
    subtitle: "Simple and graceful",
    note: "Bracelet toh behad pyara tha. Simple, understated, and genuinely yours.",
  },
  {
    id: "late-night",
    num: "04",
    title: "Late-night calm",
    subtitle: "When the city slows down",
    note: "Raat ke un khamosh ghanton ka sukoon jab shehar thora thehar jata hai.",
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
    subtitle: "Simple words",
    reflection:
      "Kuch chhoti baatein aur yaadein jo waqt ke sath aur bhi pyari lagti hain, bilkul saadgi aur sukoon ke sath.",
  artifactType: "letter",
  },
  {
    id: "keepsake",
    num: "02",
    title: "Sugar stars",
    subtitle: "Small sweet moments",
    reflection:
      "Chhotay chhotay pur-sukoon lamhay aur woh saadgi jo har cheez ko halka aur behtar bana deti hai.",
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
    title: "Evening bloom",
    subtitle: "Warm wishes",
    reflection:
      "Fatima ke liye ek meethi dua. Aane wala har mausam halka, pur-sukoon aur itminaan se bhara ho.",
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
    name: "Garden Rose",
    meaning: "Warmth and grace",
    note: "May your mornings begin softly and never ask you to rush your own pace.",
    petalFill: "var(--color-sakura-pink)",
    centerFill: "var(--color-butter-star)",
  },
  {
    id: "periwinkle-bell",
    name: "Evening Blossom",
    meaning: "Calm in quiet hours",
    note: "Even when the day feels long, may there always be a peaceful corner waiting for you.",
    petalFill: "var(--color-periwinkle)",
    centerFill: "var(--color-paper-cream)",
  },
  {
    id: "butter-cosmos",
    name: "Starlight Rose",
    meaning: "Sukoon and ease",
    note: "A warm wish that your evening feels light, comfortable, and rested.",
    petalFill: "var(--color-butter-star)",
    centerFill: "var(--color-sakura-deep)",
  },
] as const;

export const LIQUID_WAVE_CONTENT = {
  spokenLine:
    "Tum khush ho, toh meri mushkilein bhi thodi halki lagne lagti hain.",
} as const;

export const OCTOBER_GIFT = {
  title: "A quiet wish for your year",
  paragraphs: [
    "My wish for you is a year filled with lightness, ease, and genuine sukoon.",
    "One small birthday keepsake is still kept safely aside, waiting quietly until it can be given to you in person.",
  ],
  dateBadge: "15 October",
} as const;

export const CLOSING_PROMISE = {
  paragraphs: [
    "If it is late at night when you are looking through this, set your phone aside soon and get some rest.",
  ],
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
    description: "Unhurried moments that let the day breathe.",
  },
  {
    label: "Grace",
    description: "The natural ease you bring to ordinary days.",
  },
  {
    label: "Warmth",
    description: "A gentle presence that makes everything feel lighter.",
  },
  {
    label: "Peace",
    description: "Quiet evenings after the city slows down.",
  },
  {
    label: "Calm",
    description: "A steady stillness that makes heavy days feel softer.",
  },
  {
    label: "Kindness",
    description: "Thoughtfulness in the smallest gestures.",
  },
  {
    label: "Light",
    description: "A warm smile that brightens the whole room.",
  },
  {
    label: "Care",
    description: "Noticing the little details that make you who you are.",
  },
  {
    label: "Stillness",
    description: "Peaceful late-night hours when everything feels calm.",
  },
  {
    label: "Gentleness",
    description: "Softness that stays steady even on busy days.",
  },
  {
    label: "Simplicity",
    description: "Finding beauty in simple, everyday things.",
  },
  {
    label: "Clarity",
    description: "Simple words shared from a warm and happy place.",
  },
  {
    label: "Laughter",
    description: "Moments of happiness that make the week feel lighter.",
  },
  {
    label: "Ease",
    description: "Wishing you bright mornings and restful nights.",
  },
];

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
