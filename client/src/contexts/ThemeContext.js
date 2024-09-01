import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const themes = {
    light: {
        background: '#ffffff',
        color: '#000000',
        linkActiveColor: '#007bff',
    },
    dark: {
        background: '#333333',
        color: '#ffffff',
        linkActiveColor: '#66afe9',
    },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        document.body.className = theme.name;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            <StyledThemeProvider theme={themes[theme]}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;