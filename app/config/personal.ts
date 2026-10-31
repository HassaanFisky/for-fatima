/**
 * Konpeitō Night & The Living World personal content for Fatima Kamran.
 * Authentic, respectful, deeply personal, and free of emotional pressure.
 * Zero em dashes and zero ellipsis trails.
 */

export const PERSONAL_CONTENT = {
  recipientShort: "for Fatima",
  recipientName: "Fatima Kamran",
  creatorName: "Hassaan",
  heroTitle: "for fatima kamran",
  heroSubtitle:
    "A little paper night-sky, handmade with quiet care, patience, and sincerity.",
} as const;

export const DIRECT_OPENING_MESSAGE = {
  salutation: "Dear Fatima,",
  paragraphs: [
    "Some words deserve a calmer place than a rushed message notification. This little space was built to sit quietly under the sky until whenever you feel like reading it.",
    "There is no expectation attached to these pages, no timer, and no pressure to reply. It is simply a handmade keepsake of appreciation, respect, and honest reflection.",
  ],
} as const;

export const SINCERE_APOLOGY = {
  subtitle: "Honest reflection",
  title: "An apology written with clarity",
  paragraphs: [
    "Looking back, the mistake was mine when I let impatience turn into noise at the exact moment you asked for time and space. When someone asks for quiet, the right response is calm understanding.",
    "You never owed an explanation for needing rest or peace of mind. I am genuinely sorry for making things feel heavy when my only intention was to care.",
  ],
} as const;

export const CALM_BREATH_GUIDE = {
  subtitle: "Take a slow pause",
  title: "A quiet rhythm for busy days",
  instruction:
    "Whenever medical studies, long hours, or a heavy headache make the day feel loud, let your shoulders drop and take one unhurried breath.",
  inhaleSeconds: 4,
  holdSeconds: 4,
  exhaleSeconds: 6,
} as const;

export const OCTOBER_GIFT = {
  subtitle: "A belated keepsake",
  dateBadge: "15 October",
  title: "The October thought",
  paragraphs: [
    "For 15th October and every season after it, my wish for you is a year filled with lightness, ease, and the calm sukoon you always talk about.",
    "The bracelet was lovely, yet that one remaining birthday keepsake is still kept safely aside. Whenever the time is naturally right, without any formality or pressure, it will find its way to you.",
  ],
} as const;

export const CLOSING_PROMISE = {
  subtitle: "Under the same sky",
  title: "Wishing you peace tonight",
  paragraphs: [
    "If it is late at night when you are reading this, set your phone aside soon and get some rest. You do not need to figure everything out at once.",
    "Wherever your days take you, I hope you always feel respected, valued for your gentleness, and surrounded by genuine peace.",
  ],
  signoff: "With quiet respect and care,",
  signature: "Hassaan",
} as const;

export interface KeepsakeItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  reflection: string;
  artifactType: "letter" | "star" | "heart" | "flower" | "jar" | "moon";
}

export interface PoeticReflection {
  id: number;
  kicker: string;
  quote: string;
  context: string;
}

export interface CorePillar {
  id: string;
  number: string;
  title: string;
  mantra: string;
  detail: string;
}

export interface ComfortNote {
  id: number;
  tag: string;
  label: string;
  heading: string;
  body: string;
}

export interface EditorialNote {
  number: string;
  headline: string;
  content: string;
}

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

export const KEEPSAKE_ITEMS: KeepsakeItem[] = [
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
    id: "star",
    num: "02",
    title: "A distant star",
    subtitle: "Khamoshi ka wujood",
    reflection:
      "Har gehre rishtey ko har lamha wazaahat ki zaroorat nahi hoti. Khamoshi ke darmiyan bhi kuch raabtey hamesha wazeh aur ba-waqar rehte hain.",
    artifactType: "star",
  },
  {
    id: "respect",
    num: "03",
    title: "Care without pressure",
    subtitle: "Izzat sab se pehle",
    reflection:
      "Asal parwah woh hoti hai jo samne wale ko azaad mehsoos karaye, na ke bandhan. Jab kisi baat se mana kiya jaye, toh uski izzat karna hi sabse bada saboot hai.",
    artifactType: "heart",
  },
  {
    id: "bloom",
    num: "04",
    title: "October bloom",
    subtitle: "15th October and beyond",
    reflection:
      "Fatima ke liye ek meethi belated dua. Aane wala saal halka, pur-sukoon aur usi itminaan se bhara ho jiska zikr tum hamesha karti ho.",
    artifactType: "flower",
  },
  {
    id: "keepsake",
    num: "05",
    title: "The konpeitō jar",
    subtitle: "Small sweet moments",
    reflection:
      "Thakan ke waqt thoda sa sukoon, ek aashna dhun, aur woh ek baat jo bina kisi formality ke, waqt aane par khud ba khud wazeh hogi.",
    artifactType: "jar",
  },
  {
    id: "sky",
    num: "06",
    title: "Midnight sky",
    subtitle: "A moment of stillness",
    reflection:
      "Agar raat ke 2 ya 3 baj rahe hain, toh phone side par rakh do. Kisi sawaal ka jawab dhoondna zaroori nahi, tumhara aaram aur sukoon sab se aage hai.",
    artifactType: "moon",
  },
];

export const POETIC_REFLECTIONS: PoeticReflection[] = [
  {
    id: 1,
    kicker: "Late night stillness",
    quote: "Muskura de agar tu, ye be-noor shehar thora thehar jata hai.",
    context:
      "Gham chupaye inn aankhon mein, wo toh hamesha hasti rahi hai. Tumhari muskurahat be-panah qeemti hai.",
  },
  {
    id: 2,
    kicker: "Honest reflection",
    quote: "Jahan khushbuein gulaab ki hon, wahan yaad tera naam le.",
    context:
      "Ghalti meri thi jab maine waqt maangne par lafzon ka shor machaya. Sabr ka matlab ab samjh aaya hai.",
  },
  {
    id: 3,
    kicker: "A shared memory",
    quote: "Phir se jeena chahta hun.",
    context:
      "Wohi line jo tum gunguna rahi thi aur maine usi pal note ki thi, kuch chhotay lamhay hamesha thehar jaate hain.",
  },
  {
    id: 4,
    kicker: "A pending wish",
    quote: "Bracelet toh behad pyara tha, par woh ek kami abhi bhi baqi hai.",
    context:
      "Aur woh baat screen par nahi, jab bhi kabhi munasib waqt ho, tab wazeh hogi. Zero pressure, pure respect.",
  },
  {
    id: 5,
    kicker: "Midnight observation",
    quote: "Chaand ban ke chhup gayi hai peeche badalon ke.",
    context:
      "Khud se saadgi ka waada, sarr pe hamesha hath Khuda ka. Teri saadgi hi tera sab se bada husn hai.",
  },
  {
    id: 6,
    kicker: "Sukoon first",
    quote: "Jab dimaag bhari ho ya thakan ho, ice cream kha lena.",
    context:
      "Kyunke tumhara sukoon aur muskurahat har behas aur har shor se hazaar guna zaroori hai.",
  },
];

export const CORE_PILLARS: CorePillar[] = [
  {
    id: "listening",
    number: "01",
    title: "Intentional listening",
    mantra: "Understanding someone starts with listening, not assuming.",
    detail:
      "Asal sunna yeh hota hai ke jo kaha gaya, aur jo nahi kaha gaya, dono ko baghair kisi jaldbaazi ya apne matlab ke samjha jaye. Apni baat jeetne se zyada tumhare sukoon ki qadr karna.",
  },
  {
    id: "respect",
    number: "02",
    title: "Uncompromising respect",
    mantra: "When someone says no, their words deserve respect the first time.",
    detail:
      "Boundaries koi tode jaane wali deewar nahi hotin, balkay aitmaad ki bunyaad hotin hain. Chahe family ka waqt ho, akele rehne ki zaroorat ho, ya aaram karna, tumhari marzi sab se pehle hai.",
  },
  {
    id: "consistency",
    number: "03",
    title: "Quiet consistency",
    mantra:
      "Real change is something you show over time, not something you announce once.",
    detail:
      "Jazbaat mein aakar lafzon ke mahal koi bhi khade kar sakta hai. Asal tabdeeli khamosh, mustaqil aur thehri hui hoti hai, chahe koi dekh raha ho ya na dekh raha ho.",
  },
];

export const COMFORT_NOTES: ComfortNote[] = [
  {
    id: 1,
    tag: "Sukoon",
    label: "Peace of mind first",
    heading: "Tumhara verified totka",
    body: "Jab bhi sar dard ho, busy medical routine ho ya mood down ho: 'Ice cream khyn, skn milega.' Tumhara sukoon hamesha top priority hai.",
  },
  {
    id: 2,
    tag: "Details",
    label: "Gajre and quiet details",
    heading: "Chhoti observant baatein",
    body: "Center wali Ramzan piercing ho ya hath mein pehne gajre, chhoti se chhoti khoobsurat detail bina kahe yaad rehti hai.",
  },
  {
    id: 3,
    tag: "15 Oct",
    label: "A belated chapter",
    heading: "15th October wish",
    body: "Bina kisi formality ke, ek chhota sa gift jo sahi waqt par baghair kisi shor ke tum tak pohnch jayega.",
  },
  {
    id: 4,
    tag: "Midnight",
    label: "Late night calm",
    heading: "Khamosh ghantay",
    body: "Raat ke un ghanton mein jab sab so rahe hotay hain, woh thehri hui baatein aur sukoon hamesha zehen mein rehta hai.",
  },
];

export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    number: "01",
    headline: "Keep your own pace.",
    content:
      "You don't have to explain every quiet moment or have every answer ready. Your pace is allowed to be your own.",
  },
  {
    number: "02",
    headline: "Softness is strength too.",
    content:
      "Be gentle with yourself. You can be strong and still need a slower day, a little peace, or a reason to laugh.",
  },
  {
    number: "03",
    headline: "Leave room for good things.",
    content:
      "More calm days, less noise in your head, and people who make life feel lighter without asking you to be anything else.",
  },
];

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
