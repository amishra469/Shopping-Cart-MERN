import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    transition: background 0.3s ease, color 0.3s ease;
  }
`;

export default GlobalStyle;