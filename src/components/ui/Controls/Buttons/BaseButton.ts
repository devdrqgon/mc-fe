import styled from "styled-components";

export const BaseButton = styled.button`
    border-radius: 8px;
    font-size: 20px;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    background: #84C318;
    color:  #000;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    border: none;
    text-decoration: none;
`

export const DangerButton = styled(BaseButton)`
    border-radius: 8px;
    font-size: 20px;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    background: #000;
    color:  #000;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
    border: none;
    text-decoration: none;
`