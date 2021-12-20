import { ModalContext } from "contextProviders/modal.provider"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import WithConfirm from "./WithConfirm"

const MenuButton = () => {
    const { openModal } = useContext(ModalContext)
    const onMenuClick = () => {
        openModal(<> H i ! </>)
    }
    return (
        <MenuContainer>
            <span className="material-icons">
                more_vert
            </span>
            <DropDownContent>
                <MenuOption><WithConfirm/></MenuOption>
                <MenuOption>Edit</MenuOption>
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
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color:  #2c2c2c33;
   }
`
