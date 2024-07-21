import { create } from "zustand";

export type ThemeKey = keyof typeof themes;
export type Theme = (typeof themes)[ThemeKey];

type ThemeStore = {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "default",
  setTheme: (theme) =>
    set(() => {
      return { theme };
    }),
}));

export const useTheme = () => useThemeStore(state => themes[state.theme])

export const themes = {
  default: {
    text: "#494949",
    primary: "#D4D4D4",
    primaryLight: "#EDEDED",
    primaryDark: "#ADADAD",
    primaryDark2: "#959595",
    primaryDarker: "#717171",
    screenOutline: "#2B2B2B",
    screen: "#D9D9D9",
    screenLight: "#FFFFFF",
    screenText: "black",
    screenTextAlt: "white",
    screenTopBarLight: "#FFFFFF",
    screenTopBarDark: "#D9D9D9",
    screenTopBarText: "black",
    accent: "#7392E4",
    accentLight: "#9FC7F5",
    accentDark: "#526AD7",
    backgroundLight: "#D4D4D4",
    backgroundDark: "#ADADAD",
  },
  blue: {
    text: "#FFFFFF",
    primary: "#416FB5",
    primaryLight: "#6C9FEC",
    primaryDark: "#416FB5",
    primaryDark2: "#2C5DA7",
    primaryDarker: "#2B5490",
    screenOutline: "#2B2B2B",
    screen: "#1D2E46",
    screenLight: "#264066",
    screenText: "white",
    screenTextAlt: "#1D2E46",
    screenTopBarLight: "#264066",
    screenTopBarDark: "#1D2E46",
    screenTopBarText: "white",
    accent: "#94B6E9",
    accentLight: "#A4C8FF",
    accentDark: "#699CE8",
    backgroundLight: "#416FB5",
    backgroundDark: "#416FB5",
  },
};
