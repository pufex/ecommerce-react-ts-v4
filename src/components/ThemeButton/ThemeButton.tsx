import { useThemeContext } from "../../contexts/Theme"
import { useIconsContext } from "../../contexts/Icon"

import { mergeClasses } from "../../utils/mergeClasses"

import "./ThemeButton.css"

const ThemeButton = (): React.ReactElement => {
    
    const { theme, switchTheme } = useThemeContext()
    const { FaSun, FaMoon } = useIconsContext();

    return <button
        className={mergeClasses(
            "btn",
            "theme-switch",
            theme == "light" ? "light" : "dark"
        )}
        onClick={switchTheme}
    >
        {
            theme == "light"
                ? <FaSun 
                    className="theme-switch__icon"
                    size={30}
                    />
                : <FaMoon 
                    className="theme-switch__icon"
                    size={28}
                />
        }
    </button>
}

export default ThemeButton;