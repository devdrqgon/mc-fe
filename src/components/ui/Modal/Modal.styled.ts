import styled from "styled-components";

export const ModalWrapper = styled.div`
position: fixed;  top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100%;  height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

export const ModalCard = styled.div`
position: relative;
min-width: 320px;
z-index: 10;
margin-bottom: 100px;
background: ${ t => t.theme.colors.cardBackground};
border-radius: 5px;
padding: 15px;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
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

export const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background: black;
opacity: 0.5;
`;