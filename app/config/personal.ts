/**
 * Quiet Luxury Editorial Content for Fatima Kamran
 * Authentic, respectful, deeply personal, and free of emotional pressure.
 */

export interface KeepsakeItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  reflection: string;
  iconSymbol: string;
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
  label: string;
  heading: string;
  body: string;
  tag: string;
}

export interface EditorialNote {
  number: string;
  headline: string;
  content: string;
}

export const KEEPSAKE_ITEMS: KeepsakeItem[] = [
  {
    id: "letter",
    num: "01",
    title: "A Quiet Letter",
    subtitle: "Lafz aur thehrao",
    reflection:
      "Kuch baatein jaldbazi mein bheje gaye messages ke qabil nahi hotin. Screen par shor ke bajaye ek aisi jagah jahan ehsaas thehar sake, bina kisi dabao ke.",
    iconSymbol: "✉",
  },
  {
    id: "star",
    num: "02",
    title: "A Distant Star",
    subtitle: "Khamoshi ka wujood",
    reflection:
      "Har gehre rishtey ko har lamha wazaahat ki zaroorat nahi hoti. Khamoshi ke darmiyan bhi kuch raabtey hamesha wazeh aur ba-waqar rehte hain.",
    iconSymbol: "✦",
  },
  {
    id: "respect",
    num: "03",
    title: "Care Without Pressure",
    subtitle: "Izzat sab se pehle",
    reflection:
      "Asal parwah woh hoti hai jo samne wale ko azaad mehsoos karaye—na ke bandhan. Jab kisi baat se mana kiya jaye, toh uski izzat karna hi sabse bada saboot hai.",
    iconSymbol: "♡",
  },
  {
    id: "bloom",
    num: "04",
    title: "October Bloom",
    subtitle: "15th October & beyond",
    reflection:
      "Fatima ke liye ek meethi belated dua: aane wala saal halka, pur-sukoon aur usi itminaan se bhara ho jiska zikr tum hamesha karti ho.",
    iconSymbol: "✿",
  },
  {
    id: "keepsake",
    num: "05",
    title: "The Thoughtful Gift",
    subtitle: "The missing piece",
    reflection:
      "Thakan ke waqt ice-cream ka nuskha, ek aashna dhun, aur woh ek baat jo bina kisi formality ke, waqt aane par khud ba khud wazeh hogi.",
    iconSymbol: "⌑",
  },
  {
    id: "sky",
    num: "06",
    title: "Midnight Karachi Sky",
    subtitle: "A moment of stillness",
    reflection:
      "Agar raat ke 2 ya 3 baj rahe hain, toh phone side par rakh do. Kisi sawaal ka jawab dhoondna zaroori nahi—tumhara aaram aur sukoon sab se aage hai.",
    iconSymbol: "☾",
  },
];

export const POETIC_REFLECTIONS: PoeticReflection[] = [
  {
    id: 1,
    kicker: "LATE NIGHT STILLNESS",
    quote: "Muskura de agar tu, ye be-noor shehar thora thehar jata hai...",
    context: "Gham chupaye inn aankhon mein, wo toh hamesha hasti rahi hai. Tumhari muskurahat be-panah qeemti hai.",
  },
  {
    id: 2,
    kicker: "HONEST REFLECTION",
    quote: "Jahan khushbuein gulaab ki hon, wahan yaad tera naam le...",
    context: "Ghalti meri thi jab maine waqt maangne par lafzon ka shor machaya. Sabr ka matlab ab samjh aaya hai.",
  },
  {
    id: 3,
    kicker: "A SHARED MEMORY",
    quote: "Phir se jeena chahta hun...",
    context: "Wohi line jo tum gunguna rahi thi aur maine usi pal note ki thi—kuch chhotay lamhay hamesha thehar jaate hain.",
  },
  {
    id: 4,
    kicker: "A PENDING WISH",
    quote: "Bracelet toh behad pyara tha... par woh ek kami abhi bhi baqi hai 😉",
    context: "Aur woh baat screen par nahi—jab bhi kabhi munasib waqt ho, tab wazeh hogi. Zero pressure, pure respect.",
  },
  {
    id: 5,
    kicker: "MIDNIGHT OBSERVATION",
    quote: "Chaand ban ke chhup gayi hai peeche badalon ke...",
    context: "Khud se saadgi ka waada, sarr pe hamesha hath Khuda ka. Teri saadgi hi tera sab se bada husn hai.",
  },
  {
    id: 6,
    kicker: "SUKOON FIRST",
    quote: "Jab dimaag bhari ho ya thakan ho — Ice cream kha lena 🍦",
    context: "Kyunke tumhara sukoon aur muskurahat har behas aur har shor se hazaar guna zaroori hai.",
  },
];

export const CORE_PILLARS: CorePillar[] = [
  {
    id: "listening",
    number: "I",
    title: "Intentional Listening",
    mantra: "Understanding someone starts with listening, not assuming.",
    detail:
      "Asal sunna yeh hota hai ke jo kaha gaya—aur jo nahi kaha gaya—dono ko baghair kisi jaldbaazi ya apne matlab ke samjha jaye. Apni baat jeetne se zyada tumhare sukoon ki qadr karna.",
  },
  {
    id: "respect",
    number: "II",
    title: "Uncompromising Respect",
    mantra: "When someone says no, their words deserve respect the first time.",
    detail:
      "Boundaries koi tode jaane wali deewar nahi hotin, balkay aitmaad ki bunyaad hotin hain. Chahe family ka waqt ho, akele rehne ki zaroorat ho, ya aaram karna—tumhari marzi sab se pehle hai.",
  },
  {
    id: "consistency",
    number: "III",
    title: "Quiet Consistency",
    mantra: "Real change is something you show over time, not something you announce once.",
    detail:
      "Jazbaat mein aakar lafzon ke mahal koi bhi khade kar sakta hai. Asal tabdeeli khamosh, mustaqil aur thehri hui hoti hai—chahe koi dekh raha ho ya na dekh raha ho.",
  },
];

export const COMFORT_NOTES: ComfortNote[] = [
  {
    id: 1,
    tag: "SUKOON",
    label: "Ice Cream = Sukoon",
    heading: "Tumhara verified totka",
    body: "Jab bhi sar dard ho, busy medical routine ho ya mood down ho: 'Ice cream khyn, skn milega.' Tumhara sukoon hamesha top priority hai.",
  },
  {
    id: 2,
    tag: "DETAILS",
    label: "Gajre & Quiet Details",
    heading: "Chhoti observant baatein",
    body: "Center wali Ramzan piercing ho ya hath mein pehne gajre—chhoti se chhoti khoobsurat detail bina kahe yaad rehti hai.",
  },
  {
    id: 3,
    tag: "15 OCT",
    label: "A Belated Chapter",
    heading: "15th October Wish",
    body: "Bina kisi formality ke—ek chhota sa gift jo sahi waqt par baghair kisi shor ke tum tak pohnch jayega.",
  },
  {
    id: 4,
    tag: "MIDNIGHT",
    label: "Late Night Calm",
    heading: "Khamosh ghantay",
    body: "Raat ke un ghanton mein jab sab so rahe hotay hain, woh thehri hui baatein aur sukoon hamesha zehen mein rehta hai.",
  },
];

export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    number: "01",
    headline: "Keep your own pace.",
    content: "You don't have to explain every quiet moment or have every answer ready. Your pace is allowed to be your own.",
  },
  {
    number: "02",
    headline: "Softness is strength too.",
    content: "Be gentle with yourself. You can be strong and still need a slower day, a little peace, or a reason to laugh.",
  },
  {
    number: "03",
    headline: "Leave room for good things.",
    content: "More calm days, less noise in your head, and people who make life feel lighter without asking you to be anything else.",
  },
];
