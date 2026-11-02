export type WorldPhase =
  | "preDawn"
  | "sunrise"
  | "morning"
  | "afternoon"
  | "goldenHour"
  | "sunset"
  | "blueHour"
  | "night";

export interface WorldPalette {
  skyTop: string;
  skyMiddle: string;
  skyHorizon: string;
  cloudLight: string;
  cloudShadow: string;
  atmosphericAccent: string;
  hillFar: string;
  hillMid: string;
  hillForeground: string;
}

/**
 * Konpeitō Night & The Living Karachi World master colour tokens.
 */
export const KONPEITO_TOKENS = {
  midnightIndigo: "#171233",
  deepVioletNight: "#2A1F55",
  duskHorizon: "#3E2F7A",
  duskLavender: "#5B48A0",
  nightWash: "#241B4D",
  creamPaper: "#FFF8F1",
  lavenderPaper: "#F4EEFF",
  amethystDream: "#9B7BE8",
  royalViolet: "#5E3FB8",
  sakuraPink: "#F6B8CF",
  butterYellow: "#FFE9A8",
  softPeach: "#FFD3BF",
  periwinkle: "#B9C4FF",
  starlight: "#FFF4D6",
  inkViolet: "#2E2452",
  dustyViolet: "#6B628A",
  moonlitCream: "#F4EFFF",
  lavenderMist: "#BDB3DC",
  paperLine: "#E8E0F5",
  mochiBase: "#FFF3DF",
  mochiShadow: "#F1DDBE",
  yumeBase: "#D8CCF7",
  yumeShadow: "#BFB0EA",
} as const;

export const PHASE_PALETTES: Record<WorldPhase, WorldPalette> = {
  preDawn: {
    skyTop: "#171A46",
    skyMiddle: "#2B2A63",
    skyHorizon: "#7569A8",
    cloudLight: "#C9C4E2",
    cloudShadow: "#756B9E",
    atmosphericAccent: "#B9C4FF",
    hillFar: "#493E7E",
    hillMid: "#362C65",
    hillForeground: "#251E4B",
  },
  sunrise: {
    skyTop: "#6F75B7",
    skyMiddle: "#B59DCE",
    skyHorizon: "#F5C1B0",
    cloudLight: "#FFF2E6",
    cloudShadow: "#B88FAE",
    atmosphericAccent: "#FFE9A8",
    hillFar: "#9E7FA8",
    hillMid: "#7A5E8E",
    hillForeground: "#584272",
  },
  morning: {
    skyTop: "#92A4E4",
    skyMiddle: "#C7CBF7",
    skyHorizon: "#F5E9EA",
    cloudLight: "#FFF8F1",
    cloudShadow: "#B5B9E0",
    atmosphericAccent: "#F6B8CF",
    hillFar: "#9D97CC",
    hillMid: "#7D74B3",
    hillForeground: "#5E5594",
  },
  afternoon: {
    skyTop: "#8599DC",
    skyMiddle: "#B9C3F0",
    skyHorizon: "#EAE3FF",
    cloudLight: "#FFF8F1",
    cloudShadow: "#A5ACE0",
    atmosphericAccent: "#B9C4FF",
    hillFar: "#948EC6",
    hillMid: "#756DAE",
    hillForeground: "#58508F",
  },
  goldenHour: {
    skyTop: "#6B5FA5",
    skyMiddle: "#B982A7",
    skyHorizon: "#FFD0A1",
    cloudLight: "#FFF0D4",
    cloudShadow: "#8E638B",
    atmosphericAccent: "#FFE9A8",
    hillFar: "#8B6391",
    hillMid: "#694978",
    hillForeground: "#49325C",
  },
  sunset: {
    skyTop: "#44366F",
    skyMiddle: "#8F567F",
    skyHorizon: "#F3A079",
    cloudLight: "#E6AFB0",
    cloudShadow: "#5D426F",
    atmosphericAccent: "#FFD3BF",
    hillFar: "#6D4674",
    hillMid: "#4F335E",
    hillForeground: "#342147",
  },
  blueHour: {
    skyTop: "#202957",
    skyMiddle: "#4A4A83",
    skyHorizon: "#8A74A4",
    cloudLight: "#BEB8DA",
    cloudShadow: "#3A386D",
    atmosphericAccent: "#B9C4FF",
    hillFar: "#52467D",
    hillMid: "#3B3164",
    hillForeground: "#261E4B",
  },
  night: {
    skyTop: "#171233",
    skyMiddle: "#2A1F55",
    skyHorizon: "#5B48A0",
    cloudLight: "#AFA7D1",
    cloudShadow: "#30275F",
    atmosphericAccent: "#FFF4D6",
    hillFar: "#3D2E72",
    hillMid: "#2B2056",
    hillForeground: "#1D153E",
  },
};

export const PHASE_LABELS: Record<WorldPhase, string> = {
  preDawn: "Pre-dawn stillness",
  sunrise: "Sunrise light",
  morning: "Morning sky",
  afternoon: "Gentle afternoon",
  goldenHour: "Golden hour",
  sunset: "Sunset glow",
  blueHour: "Blue hour",
  night: "Quiet night sky",
};
