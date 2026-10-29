/**
 * Configurable data source for Fatima's private experience.
 * Merges Option A's tactile hooks and Option B's deep keepsakes and reflections.
 * All writing is original, respectful, and free of pressure.
 */

export interface DetailObject {
  id: string;
  symbol: string;
  title: string;
  kicker: string;
  thought: string;
}

export interface PoeticCard {
  tag: string;
  line: string;
  sub: string;
  badge: string;
  bgGradient: string;
}

export interface MatterCard {
  id: string;
  title: string;
  quote: string;
  deep: string;
  iconName: string;
}

export interface PulseTile {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  reveal: string;
}

export interface KeepsakeNote {
  eyebrow: string;
  title: string;
  body: string;
  date?: string;
  photo?: string;
}

export const SIX_OBJECTS: DetailObject[] = [
  {
    id: "envelope",
    symbol: "✉",
    title: "A Quiet Letter",
    kicker: "Lafz aur waqt",
    thought:
      "Kuch baatein jaldbazi mein bheje gaye messages ke qabil nahi hotin. Screen par lafz ooper nikal jaate hain, isiliye ek aisi jagah banai jahan ehsaas thehar sake.",
  },
  {
    id: "star",
    symbol: "✦",
    title: "A Distant Star",
    kicker: "Khamoshi ka wujood",
    thought:
      "Har gehre rishtey ko har waqt wazaahat ki zaroorat nahi hoti. Khamoshi ke darmiyan bhi kuch raabtey hamesha wazeh rehte hain.",
  },
  {
    id: "heart",
    symbol: "♡",
    title: "The Honest Heart",
    kicker: "Care without pressure",
    thought:
      "Parwah woh hoti hai jo samne wale ko azaad mehsoos karaye—na ke bandhan. Jab kisi cheez se mana kiya jaye, toh uski izzat karna hi sabse bada saboot hai.",
  },
  {
    id: "flower",
    symbol: "✿",
    title: "October Bloom",
    kicker: "15th October & beyond",
    thought:
      "Fatima ke liye ek meethi belated dua. Aane wala saal halka, mehfooz aur usi sukoon se bhara ho jiska zikr tum hamesha karti ho.",
  },
  {
    id: "box",
    symbol: "⌑",
    title: "The Keepsake Box",
    kicker: "The missing piece",
    thought:
      "Is sandook mein: thakan ke waqt ice-cream ka nuskha, ek aashna dhun, aur woh ek 'kami' jo sirf samne aane par khulegi.",
  },
  {
    id: "moon",
    symbol: "☾",
    title: "Midnight Karachi Sky",
    kicker: "A moment of rest",
    thought:
      "Agar raat ke 2 ya 3 baj rahe hain, toh phone side par rakh do. Kisi sawaal ka jawab aaj dhoondna zaroori nahi—tumhara aaram sab se aage hai.",
  },
];

export const POETIC_CARDS: PoeticCard[] = [
  {
    tag: "LATE NIGHT REFLECTION",
    line: "Muskura de agar tu, ye be-noor shehar thora thehar jata hai...",
    sub: "Gham chupaye inn aankhon mein, wo toh hamesha hasti rahi hai.",
    badge: "Acoustic Vibe 💜",
    bgGradient: "from-purple-900/30 via-purple-950/20 to-black/40",
  },
  {
    tag: "UNSPOKEN TRUTH",
    line: "Jahan khushbuein gulaab ki hon, wahan yaad tera naam le...",
    sub: "Ghalti meri thi jab maine waqt maangne par lafzon ka shor machaya. Sabr ka matlab ab samjh aaya hai.",
    badge: "Respect & Peace ✨",
    bgGradient: "from-rose-900/25 via-purple-950/20 to-black/40",
  },
  {
    tag: "TELEPATHY MOMENT",
    line: "Phir se jeena chahta hun...",
    sub: "Wohi line jo tum gaa rahi thi aur maine usi pal note ki thi. Dil ke taar pehle se jude hue the.",
    badge: "Unspoken Bond 🎵",
    bgGradient: "from-amber-900/20 via-purple-950/20 to-black/40",
  },
  {
    tag: "THE SECRET HOOK",
    line: "Bracelet toh behad pyara tha... par woh ek kami abhi bhi baqi hai 😉",
    sub: "Aur woh kami chat ya screen par nahi, sirf samne aane par nazar aayegi.",
    badge: "15 Oct Surprise 🎁",
    bgGradient: "from-fuchsia-900/25 via-purple-950/20 to-black/40",
  },
  {
    tag: "MIDNIGHT OBSERVATION",
    line: "Chaand ban ke chhup gayi hai peeche badalon ke...",
    sub: "Khud se saadgi ka waada, sarr pe hamesha hath Khuda ka.",
    badge: "Pure Grace 🌙",
    bgGradient: "from-indigo-900/30 via-purple-950/20 to-black/40",
  },
  {
    tag: "SUKOON FIRST",
    line: "Jab dimaag bhari ho ya thakan ho — Ice cream kha lena 🍦",
    sub: "Kyunke tumhara sukoon aur muskurahat har behas se hazaar guna zaroori hai.",
    badge: "Zero Expectations 🤍",
    bgGradient: "from-cyan-900/20 via-purple-950/20 to-black/40",
  },
];

export const MATTER_CARDS: MatterCard[] = [
  {
    id: "listening",
    title: "Listening",
    quote: "Understanding someone starts with listening, not assuming.",
    deep: "Asal sunna yeh hota hai ke jo kaha gaya—aur jo nahi kaha gaya—dono ko baghair kisi jaldbaazi ya apne matlab ke samjha jaye. Apni baat jeetne se zyada tumhare sukoon ki qadr karna.",
    iconName: "Ear",
  },
  {
    id: "respect",
    title: "Respect",
    quote: "When someone says no, their words deserve respect the first time.",
    deep: "Boundaries koi tode jaane wali deewar nahi hotin, balkay aitmaad ki bunyaad hotin hain. Chahe woh family ka waqt ho, akele rehne ki zaroorat ho, ya aaram karna—tumhari marzi sab se pehle hai.",
    iconName: "ShieldCheck",
  },
  {
    id: "consistency",
    title: "Consistency",
    quote: "Real change is something you show over time, not something you announce once.",
    deep: "Jazbaat mein aakar lafzon ke mahal koi bhi khade kar sakta hai. Asal tabdeeli khamosh, mustaqil aur thehri hui hoti hai—chahe koi dekh raha ho ya na dekh raha ho.",
    iconName: "Compass",
  },
];

export const PULSE_TILES: PulseTile[] = [
  {
    id: 1,
    emoji: "🍨",
    title: "Ice Cream = Sukoon",
    subtitle: "Tumhara verified totka",
    reveal: "Jab bhi sar dard ho, busy din ho ya mood down ho: 'Ice cream khyn, skn milega.' Tumhara sukoon hamesha top priority hai.",
  },
  {
    id: 2,
    emoji: "📿",
    title: "Gajre & 3 Piercings",
    subtitle: "Chhoti observant details",
    reveal: "Center wali Ramzan piercing ho ya hath mein pehne gajre—chhoti se chhoti khoobsurat detail bina kahe yaad rehti hai.",
  },
  {
    id: 3,
    emoji: "🎂",
    title: "15 Oct • Libra Queen",
    subtitle: "Pending Belated Chapter",
    reveal: "Yousuf Plaza ke 1400 flats mein courier nahi bheja—kyunke woh surprise sirf mere hath se tumhare hath mein aane ke liye bana hai.",
  },
  {
    id: 4,
    emoji: "📱",
    title: "Side Pe Rakh Ke Sona",
    subtitle: "Woh 5:14 AM ka sach",
    reveal: "'Phone pass rakh ke soti thi aur feel karti aap call pe hain.' Kuch ehsaas lafzon se kahin zyada gehre hote hain.",
  },
];

export const KEEPSAKE_NOTES: KeepsakeNote[] = [
  {
    eyebrow: "NOTE 01",
    title: "Keep your own pace.",
    body: "You don't have to explain every quiet moment or have every answer ready. Your pace is allowed to be your own.",
  },
  {
    eyebrow: "NOTE 02",
    title: "Softness is strength too.",
    body: "Be gentle with yourself. You can be strong and still need a slower day, a little peace, or a reason to laugh.",
  },
  {
    eyebrow: "NOTE 03",
    title: "Leave room for good things.",
    body: "More calm days, less noise in your head, and people who make life feel lighter without asking you to be anything else.",
  },
];

export const CONSTELLATION_POINTS = [
  { id: 1, x: 50, y: 26, label: "Patience", freq: 523.25 },
  { id: 2, x: 30, y: 16, label: "Grace", freq: 587.33 },
  { id: 3, x: 14, y: 32, label: "Warmth", freq: 659.25 },
  { id: 4, x: 24, y: 58, label: "Peace", freq: 698.46 },
  { id: 5, x: 50, y: 84, label: "Trust", freq: 783.99 },
  { id: 6, x: 76, y: 58, label: "Kindness", freq: 880.0 },
  { id: 7, x: 86, y: 32, label: "Light", freq: 987.77 },
  { id: 8, x: 70, y: 16, label: "Care", freq: 1046.5 },
];
