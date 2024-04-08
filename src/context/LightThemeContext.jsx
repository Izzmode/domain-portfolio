import { createContext, useState } from "react";

export const LightThemeContext = createContext()

export const LightThemeProvider = ({ children }) => {
  const [lightTheme, setLightTheme] = useState(false)

  const toggleLightTheme = () => {
    setLightTheme(!lightTheme)
  }

  return (
    <LightThemeContext.Provider value = {{ lightTheme, toggleLightTheme }}>
      {children}
    </LightThemeContext.Provider>
  )
}