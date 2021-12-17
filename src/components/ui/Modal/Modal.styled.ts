import styled from "styled-components";

export const ModalWrapper = styled.div`
position: fixed;  
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

export const ModalCard = styled.div`
position: relative;
min-width: 20vw;
z-index: 10;
background: ${ t => t.theme.colors.cardBackground};
border-radius: 5px;
padding: 15px;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

export const Background = styled.div`
position: absolute;
width: 100vw;
height: 100vh;
top: 0;
left: 0;
background: black;
opacity: 0.5;
`;


export const CloseButton = styled.button`
position: absolute;
top: 0;
right: 0;
color: ${ t => t.theme.colors.text};
border: none;
background: transparent;
padding: 10px;
&:hover {    
  cursor: pointer;
}`;
