import type { ReactElement } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fetchTheme } from "../utils/fetchTheme"

export type ThemeContextType = {
    theme: "light" | "dark",
    switchTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
    const themeContext = useContext(ThemeContext)
    if(!themeContext)
        throw Error("Cannot use outside a provider")
    else return themeContext
}

type ThemeProps = {
    children: ReactElement[] | ReactElement
}

const ThemeProvider = ({children}:ThemeProps) => {

    const [theme, setTheme] = useState<ThemeContextType["theme"]>(fetchTheme())

    useEffect(() => {
        const body = document.querySelector("body")!
        localStorage.setItem("theme", theme)
        switch(theme){
            case "light":
                if(!body.classList.contains("light"))
                    body.classList.add("light")
                body.classList.remove("dark")
                break;
            case "dark":
                if(!body.classList.contains("dark"))
                    body.classList.add("dark")
                body.classList.remove("light")
                break;
        }
    }, [theme])

    const switchTheme = () => {
        switch(theme){
            case "light":
                setTheme("dark")
                break;
            case "dark":
                setTheme("light")
                break;
        }
    }

    return <ThemeContext.Provider
        value={{
            theme,
            switchTheme
        }}
    >
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider
