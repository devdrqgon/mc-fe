import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    }

    body {
        font-size: 18px;
        line-height: normal;
        font-family: Rotunda;
        font-weight: 400;
        font-style: normal;
        color: ${props => props.theme.colors.text};
        font-family: 'Roboto', sans-serif;
        
    }

    



  
`