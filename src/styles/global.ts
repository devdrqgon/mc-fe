import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box; 
    }

    body {
        background: yellow;
        font-size: 14px;
        color: ${props => props.theme.colors.text};
        font-family: 'Roboto', sans-serif;
        
    }

    h6 {
        font-size: 20px;
       
    }



  
`