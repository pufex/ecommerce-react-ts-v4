import type { ThemeContextType } from "../contexts/Theme";

export const fetchTheme = (): ThemeContextType["theme"] => {
    const theme = localStorage.getItem("theme");
    if(theme == "light" || theme == "dark") return theme
    else{
        localStorage.setItem("theme", "light")
        return "light";
    }
}