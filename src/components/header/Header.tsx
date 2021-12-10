import { UserContext } from 'contextProviders/user.context';
import SignInCard from 'features/auth/SignInCard';
import SignUpCard from 'features/auth/SignUpCard';
import React, { useContext, useEffect, useState } from 'react'
import HeaderContainer, { Btn, BtnGray, Left, Right } from './Header.styled'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components';
import ArtisticTitle from 'components/ui/typography/ArtisticTitle';
import { ModalContext } from 'contextProviders/modal.provider';

import Modal from 'components/ui/Modal/Modal'

/**
 * 
 * How u render a modal perfectly  
 * 
 * Call The Primitive Portal Modal Component
 * Give it a child
 * When clicked on close the Portal must unmount  
 * 
 * How i render a modal now 
 * Call The Primitive Portal Modal Component
 *  Givt it a Child AND A CLOSECALLBACK, and control the visibility of the modal from parent 
 */

interface Props {
    _toggletheme(): void
}
const NewHeader: React.FC<Props> = (props) => {
    const {  logout, authenticated } = useContext(UserContext);
    const [modalContent, setmodelContent] = useState<JSX.Element>()
    const { colors, title } = useContext(ThemeContext)

    const { openModal } = useContext(ModalContext)
    useEffect(() => {
        return
    }, [authenticated, modalContent])
    const onSignUpClick = () => {

        openModal(<SignUpCard />)
    }

    const onSignInClick = () => {
        openModal(<SignInCard />)
    }


    return (
        <>
            <HeaderContainer>
                <Left>
                    <ArtisticTitle>
                        MoneyCoach
                    </ArtisticTitle>
                </Left>
                <Right>
                    <Switch
                        onChange={props._toggletheme}
                        checked={title === 'dark'}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        height={10}
                        width={40}
                        handleDiameter={20}
                        offColor={'#e6dddd'}
                        onColor={'#264653'}
                    />
                    {!authenticated ?
                        <>
                            <BtnGray
                                onClick={onSignInClick}
                            > Sign In
                            </BtnGray>

                            <Btn
                                onClick={onSignUpClick}
                            > Sign Up</Btn>
                        </>
                        :
                        <>
                            <BtnGray
                                onClick={() => { logout() }}
                            > Sign Out
                            </BtnGray>
                        </>
                    }
                </Right>
            </HeaderContainer>
        </>
    )
}

export default NewHeader
