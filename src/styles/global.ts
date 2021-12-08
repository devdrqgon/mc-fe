import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    }

    body {
        background: ${p => p.theme.colors.background};
        font-size: 18px;
        line-height: normal;
        font-family: Rotunda;
        font-weight: 400;
        font-style: normal;
        color: ${p => p.theme.colors.primary};
        font-family: 'Roboto', sans-serif;
        
    }

  

`

// ${props => props.theme.colors.text}