import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const themes = {
    light: {
        background: '#f8f9fa',   // Light theme page background
        color: '#333333',        // Light theme text and border color
        linkActiveColor: '#007bff', // Link active color
        buttonBackground: '#007bff', // Light theme button background
        buttonHoverBackground: '#0056b3', // Light theme button hover background
    },
    dark: {
        background: '#333333',   // Dark theme page background
        color: '#ffffff',        // Dark theme text and border color
        linkActiveColor: '#66afe9', // Link active color
        buttonBackground: '#333333;', // Dark theme button background
        buttonHoverBackground: '#1459a8', // Dark theme button hover background
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