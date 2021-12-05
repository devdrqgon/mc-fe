import styled from "styled-components";

export const Container = styled.div`
    height: 60px;
    background:  ${ props => props.theme.colors.background};
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 30px;
` 