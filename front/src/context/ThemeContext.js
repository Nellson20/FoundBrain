import React from 'react'

export const LIGHT="light"
export const DARK="dark"

const ThemeContext = React.createContext({
    theme: LIGHT,
    setTheme: () => { }
});
export default ThemeContext;