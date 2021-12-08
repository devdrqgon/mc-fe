import styled from "styled-components";

const HeaderContainer = styled.div`
    height: 7vh;
    width: 100vw;
    display: flex;
    border-bottom: 1px solid ${p=> p.theme.colors.cardBackground};
    background-color: ${p=> p.theme.colors.background};
`


export const Left = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: yellow; */

    `

export const Right = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
    /* background-color: red; */


`

export const Btn = styled.a`
    border-radius: 8px;
    font-size: 20px;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    background: #84C318;
    color:   ${p => p.theme.colors.primary};

    cursor: pointer;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    border: none;
    text-decoration: none;`


export const BtnGray = styled.a`
    border-radius: 8px;
    font-size: 20px;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
    font-weight: 300;
    text-align: center;
    white-space: nowrap;
    border: none;
    text-decoration: none;
    
    &:hover {
    color: #000;

  }
    `
export default HeaderContainer