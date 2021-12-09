import HContainer from 'components/ui/Layout/HContainer'
import React from 'react'
import styled from 'styled-components'
import { PrimitiveInput } from './PrimitiveInput'


const InputIconContainer = styled.div`
        min-width: 60px;
        min-height: 57px;
        border: none;
        border-radius: 2pt;
        box-shadow: 0 0 0 1pt grey, 0 0 0 1pt grey, 0 0 0 1pt grey, -12px 0 15px -4px transparent;
        outline: none;
        transition: .1s;
        display: inline;


`
const MoneyInput = () => {
    const StyledComp = styled(PrimitiveInput)`
        min-width: 400px;
        min-height: 55px;
        border: none;
    border-radius: 2pt;
    box-shadow: 0 0 0 1pt grey, 0 0 0 1pt grey, 0 0 0 1pt grey, 0 0 0 0 transparent;

    outline: none;
    transition: .1s;
    display: inline;
        transition: .1s;
        /* border-width: 2.6px 2.6px 2.6px 0px; */
        &:focus { 
            outline: none !important;
            border-color: #212422;
            box-shadow: 0 0 4px #212422;
        }
    `
    return (
        <HContainer>
            {/* <InputIconContainer/> */}
            <StyledComp />
        </HContainer>
    )
}

export default MoneyInput
