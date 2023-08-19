import { ThemeMode } from "./ThemeContext";

export const getLogoSrc = (mode: ThemeMode) => {
    return (mode === ThemeMode.DARK) ? "icons/Logo-GeneralUseWeb-Dark.svg" : "icons/Logo-GeneralUseWeb-Light.svg"
}