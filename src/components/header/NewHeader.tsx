import { UserContext } from 'contexts/user.context';
import SignInModal from 'features/auth/SignInModal';
import SignUpModal from 'features/auth/SignUpModal';
import React, { useContext, useEffect, useState } from 'react'
import HeaderContainer, { Btn, BtnGray, Left, Right } from './NewHeader.styled'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components';
import ArtisticTitle from 'components/ui/typography/ArtisticTitle';



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
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    const [modalContent, setmodelContent] = useState<JSX.Element>()
    const { colors, title } = useContext(ThemeContext)

    useEffect(() => {
        return
    }, [authenticated, modalContent])
    const onSignUpClick = () => {
        setmodelContent(
            <>
                <SignUpModal />
            </>
        )
    }

    const onSignInClick = () => {
        setmodelContent(
            <>
                <SignInModal />
            </>
        )
    }


    useEffect(() => {

    }, [modalContent])
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
            {modalContent}
        </>
    )
}

export default NewHeader
