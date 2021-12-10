import styled from 'styled-components'

const CardButton = styled.a`
      

 color: ${p => p.theme.colors.primary};
 box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
 cursor: pointer;
 display: block;
 font-weight: 300;
 font-size: 20px;
 max-height: auto;
 padding: 15px;
 text-align: center;
 border-radius: 6px;
 max-width: 200px;
 opacity: 1;
 text-decoration: none;
 text-shadow: 0 0 0;
 display: flex;
 align-items: center;
 justify-content: center;
 justify-items: center;
 font-family: 'Maven Pro', sans-serif;


 &:hover {
    box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
  }
 `
export default CardButton