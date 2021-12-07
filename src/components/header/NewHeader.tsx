import SavingPlanCreator from 'components/savingPlan/savingPlanCreator';
import VContainer from 'components/ui/Layout/VContainer';
import ModalChild from 'components/ui/Modal/ModalChild';
import ModalPortal from 'components/ui/Modal/PortalModal';
import { UserContext } from 'contexts/user.context';
import SignInModal from 'features/auth/SignInModal';
import SignUpModal from 'features/auth/SignUpModal';
import React, { useContext, useEffect, useState } from 'react'
import HeaderContainer, { Btn, BtnGray, Left, Right } from './NewHeader.styled'



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
const NewHeader = () => {
    const { user, token, tokenValid, login, logout, authenticated } = useContext(UserContext);
    const [signUpModalIsVisible, setSignUpModalIsVisible] = useState(false)
    const [signInModalIsVisible, setSignInModalIsVisible] = useState(false)
    const [modalContent, setmodelContent] = useState<JSX.Element>()
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
    const onModalClose = () => {
        setSignUpModalIsVisible(false)

    }

    useEffect(() => {

    }, [modalContent])
    return (
        <>
            <HeaderContainer>
                <Left>

                </Left>
                <Right>
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
