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
}

/**
 * Konpeitō Night & The Living World master colour tokens.
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
  },
  sunrise: {
    skyTop: "#6F75B7",
    skyMiddle: "#B59DCE",
    skyHorizon: "#F5C1B0",
    cloudLight: "#FFF2E6",
    cloudShadow: "#B88FAE",
    atmosphericAccent: "#FFE9A8",
  },
  morning: {
    skyTop: "#A7B7EE",
    skyMiddle: "#D5D7FB",
    skyHorizon: "#FFF0DC",
    cloudLight: "#FFF8F1",
    cloudShadow: "#BEC1E4",
    atmosphericAccent: "#F6B8CF",
  },
  afternoon: {
    skyTop: "#91A7E1",
    skyMiddle: "#C3CCF4",
    skyHorizon: "#EEE9FF",
    cloudLight: "#FFF8F1",
    cloudShadow: "#ADB4DD",
    atmosphericAccent: "#B9C4FF",
  },
  goldenHour: {
    skyTop: "#6B5FA5",
    skyMiddle: "#B982A7",
    skyHorizon: "#FFD0A1",
    cloudLight: "#FFF0D4",
    cloudShadow: "#8E638B",
    atmosphericAccent: "#FFE9A8",
  },
  sunset: {
    skyTop: "#44366F",
    skyMiddle: "#8F567F",
    skyHorizon: "#F3A079",
    cloudLight: "#E6AFB0",
    cloudShadow: "#5D426F",
    atmosphericAccent: "#FFD3BF",
  },
  blueHour: {
    skyTop: "#202957",
    skyMiddle: "#4A4A83",
    skyHorizon: "#8A74A4",
    cloudLight: "#BEB8DA",
    cloudShadow: "#3A386D",
    atmosphericAccent: "#B9C4FF",
  },
  night: {
    skyTop: "#171233",
    skyMiddle: "#2A1F55",
    skyHorizon: "#5B48A0",
    cloudLight: "#AFA7D1",
    cloudShadow: "#30275F",
    atmosphericAccent: "#FFF4D6",
  },
};

export const PHASE_LABELS: Record<WorldPhase, string> = {
  preDawn: "Quiet before dawn",
  sunrise: "Sunrise atmosphere",
  morning: "Morning light",
  afternoon: "Gentle afternoon",
  goldenHour: "Golden hour",
  sunset: "Sunset atmosphere",
  blueHour: "Evening twilight",
  night: "Calm night sky",
};
