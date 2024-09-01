import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
`;

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
};

export default ThemeToggle;
