import styled from "styled-components";

const HeaderContainer = styled.div`
    height: 7vh;
    width: 100vw;
    display: flex;
    border-bottom: 1px solid #84C318;
`


export const Left = styled.div`
    width: 89%;
    /* background-color: #FFCCC9; */
    display: flex;
    justify-content: center;
    align-items: center
    `

export const Right = styled.div`
    width: 11%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 100px;

`

export const Btn = styled.a`
    border-radius: 8px;
    font-size: 20px;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    background: #84C318;
    color: #000;
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
    background: transparent;
    color: #645959;
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