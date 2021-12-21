import { ModalContext } from "contextProviders/modal.provider"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import WithConfirm from "./WithConfirm"
import { v4 as uuidv4 } from 'uuid'

type Props = {
    _options: (SimpleOption | WithConfirmCancelOption)[]
}

export type SimpleOption = {
    optionName: string
    _onClick(): any
}

export type WithConfirmCancelOption = {
    optionName: string
    _onConfirmClick(): any
    _onCancelClick?(): any
}
const MenuButton: React.FC<Props> = ({ _options }) => {

    function isSimpleOption(o: SimpleOption | WithConfirmCancelOption): o is SimpleOption {
        return (o as SimpleOption)._onClick !== undefined;
    }

    return (
        <MenuContainer>
            <span className="material-icons">
                more_vert
            </span>
            <DropDownContent>
                <>
                    {_options.map((o,i) => (
                        <span key={uuidv4()}>
                            {isSimpleOption(o) ?
                                <MenuOption key={i}> {o.optionName}</MenuOption>
                                :
                                <MenuOption key={i}>
                                    <WithConfirm 
                                    _buttonText={o.optionName}
                                    _onConfirmCallback={o._onConfirmClick} />
                                </MenuOption>
                            }
                        </span>
                    ))}
                </>
            </DropDownContent>
        </MenuContainer>
    )
}


export default MenuButton

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  right: 0%;
  background-color: ${p => p.theme.colors.cardBackground};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`


const MenuContainer = styled.div`
   position: relative;
   display: inline-block;
   &:hover ${DropDownContent} {
    display: block;
   }
`

const MenuOption = styled.div`
 color: ${p => p.theme.colors.primary};
  text-decoration: none;
  &:hover {
    background-color:  #a7a7a733;
   }
`
