export enum ThemeMode {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

export type Palette = {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    alert: {
      success: string;
      warning: string;
      error: string;
      lowError: string;
      info: string;
      special: string;
    };
}

export type Theme = {
    mode: ThemeMode;
    palette: Palette
}

export const Colors = {
    Nord0: "#2E3440",
    Nord1: "#3B4252",
    Nord2: "#434C5E",
    Nord3: "#4C566A",
    Nord4: "#D8DEE9",
    Nord5: "#E5E9F0",
    Nord6: "#ECEFF4",
    Nord7: "#8FBCBB",
    Nord8: "#88C0D0",
    Nord9: "#81A1C1",
    Nord10: "#5E81AC",
    Nord11: "#BF616A",
    Nord12: "#D08770",
    Nord13: "#EBCB8B",
    Nord14: "#A3BE8C",
    Nord15: "#B48EAD"
} as const;

const DarkPalette:Palette = {
    text: "#5E81AC",
    background: "#2f2f4f8",
    primary: "#8FBCBB",
    secondary: "#D8DEE9",
    accent: "#26374b",
    alert: {
        success: Colors.Nord14,
        error: Colors.Nord11,
        lowError: Colors.Nord12,
        info: Colors.Nord10,
        warning: Colors.Nord13,
        special: Colors.Nord15
    }
}
const LightPalette:Palette = {
    text: "#4c566a",
    background: "#f2f4f8",
    primary: "#8fbcbb",
    secondary: "#ffffff",
    accent: "#434c5e",
    alert: {
        success: Colors.Nord14,
        error: Colors.Nord11,
        lowError: Colors.Nord12,
        info: Colors.Nord10,
        warning: Colors.Nord13,
        special: Colors.Nord15
    }
}

export const tokens = (mode:ThemeMode):Theme => ({
    mode: mode,
    palette: (mode === ThemeMode.LIGHT) ? LightPalette : DarkPalette,
});